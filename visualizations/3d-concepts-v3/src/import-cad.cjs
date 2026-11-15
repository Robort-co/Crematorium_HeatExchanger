const fs=require('fs'),path=require('path'),crypto=require('crypto');
const out=path.resolve(__dirname,'..'),source=path.join(out,'source','heat-exchanger.step');
(async()=>{
 const bytes=fs.readFileSync(source),sha256=crypto.createHash('sha256').update(bytes).digest('hex');
 if(sha256!=='e90225f91f506330535a02c0996e705f850cd4b033a835b3d39b6c7855736e2c')throw Error('Источник изменился: сначала проверить геометрию и соответствие ID, не перезаписывать модель автоматически.');
 const occt=await require('occt-import-js')();
 const model=occt.ReadStepFile(bytes,{linearUnit:'millimeter',linearDeflectionType:'absolute_value',linearDeflection:1,angularDeflection:.3});
 if(!model.success||model.meshes.length!==247)throw Error('Результат импорта не соответствует проверенной сборке.');
 const parents={};function walk(n){for(const i of n.meshes)parents[i]=n.name;for(const c of n.children)walk(c)}walk(model.root);
 const b64=(a,T)=>Buffer.from(new T(a).buffer).toString('base64');
 const parts=model.meshes.map((m,i)=>({id:i,name:m.name||parents[i]||('Деталь '+i),p:b64(m.attributes.position.array,Float32Array),n:b64(m.attributes.normal.array,Float32Array),ix:b64(m.index.array,Uint32Array)}));
 fs.writeFileSync(path.join(out,'model-data.js'),'window.CAD_PARTS='+JSON.stringify(parts)+';\n');
 console.log('Импортировано '+parts.length+' сеток. SHA256: '+sha256);
})();
