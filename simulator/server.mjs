import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { Simulation } from './src/simulation.mjs';

/** Сервер только локальной симуляции. Разрешённых направлений к оборудованию нет. */
export function createSimulatorServer() {
  const sim = new Simulation(); // Один тестовый мир; несколько управляющих HMI в этой версии не поддерживаются.
  const server = http.createServer(async (req, res) => { // req/res — локальный HTTP-запрос и ответ.
    try {
      const origin = req.headers.origin; // Браузерный источник: посторонним сайтам мутации не разрешены.
      if (origin && origin !== 'http://' + req.headers.host) throw new Error('Чужой Origin запрещён');
      if (req.method === 'GET' && req.url === '/api/state') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(sim.snapshot()));
        return;
      }
      if (req.method === 'POST' && req.url === '/api/action') {
        if (!req.headers['content-type']?.startsWith('application/json')) throw new Error('Требуется application/json');
        let body = ''; // Ограниченное тело команды; не путь к файлу и не выполняемый код.
        for await (const chunk of req) { // chunk — очередная часть тела запроса.
          body += chunk;
          if (body.length > 65536) throw new Error('Слишком большой запрос');
        }
        const data = JSON.parse(body); // Декларативное действие из фиксированного набора.
        if (data.generation !== sim.generation) throw new Error('Устаревшее окно: обновите состояние, команда не выполнена');
        if (data.type === 'fixture') sim.loadFixture();
        else if (data.type === 'restart') sim.restart();
        else if (data.type === 'advance') sim.advance(data.ms);
        else if (data.type === 'aranga') sim.arangaOperation(data.operation, data.payload);
        else if (data.type === 'command') {
          if (!Number.isInteger(data.procedureId)) throw new Error('Не указан контекст процедуры');
          sim.command(data.action, data.value, data.procedureId);
        }
        else if (data.type === 'group') sim.sampleGroup(data.name);
        else if (data.type === 'signal') {
          sim.signals.set(data.name, data.value, data.quality, data.fresh, data.repeat);
          sim.log('INPUT', data.name + ': задан образец испытателем');
          sim.tick();
        } else if (data.type === 'deliver') {
          sim.outputs.deliver(data.name, data.id, data.success);
          sim.tick();
        } else if (data.type === 'deliver_all') {
          for (const [name, command] of Object.entries(sim.outputs.commands)) { // name/command — текущие недоставленные команды.
            if (command.delivery === 'PENDING') sim.outputs.deliver(name, command.id);
          }
          sim.tick();
        } else if (data.type === 'exchange' && ['hmi', 'aranga'].includes(data.name) && typeof data.enabled === 'boolean') {
          sim.exchange[data.name] = data.enabled;
          sim.tick();
        } else if (data.type === 'service' && ['mainEnabled', 'supervisionEnabled'].includes(data.name) && typeof data.enabled === 'boolean') {
          sim[data.name] = data.enabled;
        } else throw new Error('Неизвестное действие');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
        res.end(JSON.stringify(sim.snapshot()));
        return;
      }
      const assets = { '/': ['index.html', 'text/html'], '/app.js': ['app.js', 'text/javascript'], '/style.css': ['style.css', 'text/css'] }; // Белый список файлов; произвольных путей нет.
      const asset = assets[req.url]; // Только три статических ресурса HMI.
      if (req.method !== 'GET' || !asset) { res.writeHead(404); res.end('Not found'); return; }
      res.writeHead(200, { 'Content-Type': asset[1] + '; charset=utf-8', 'Cache-Control': 'no-store',
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; frame-ancestors 'none'" });
      res.end(await readFile(new URL('./web/' + asset[0], import.meta.url)));
    } catch (error) { // error — ошибка валидации/обработки, возвращается клиенту без скрытого выполнения команды.
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
  return { server, sim };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const port = Number(process.env.HX_SIM_PORT || 8765); // Порт локальной HMI; не адрес контроллера/устройства.
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Неверный HX_SIM_PORT');
  const { server } = createSimulatorServer(); // Локальный сервер имитатора.
  server.on('error', error => { console.error(error.message); process.exitCode = 1; }); // error — ошибка запуска, без выбора другого адреса оборудования.
  server.listen(port, '127.0.0.1', () => console.log('Симулятор: http://127.0.0.1:' + port + ' — остановка Ctrl+C. Реального I/O нет.'));
}
