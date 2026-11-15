"""Draw a schematic plan from export-plan.mjs output. No browser or CAD rendering."""
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA = json.loads((ROOT / 'previews/plan-data.json').read_text(encoding='utf-8'))
S = 2
im = Image.new('RGB', (1500*S, 880*S), '#11191f')
d = ImageDraw.Draw(im)
fonts = Path('C:/Windows/Fonts')
def font(size, bold=False):
    return ImageFont.truetype(str(fonts / ('seguisb.ttf' if bold else 'segoeui.ttf')), size*S)
def xy(p):
    return ((1110 + 145*p[0])*S, (650 + 145*p[1])*S)
def text(p, value, size=19, color='#edf2f5', bold=False):
    d.text((p[0]*S,p[1]*S), value, fill=color, font=font(size,bold))
def line(points, color, width):
    pixels=[xy(p) for p in points]
    d.line(pixels, fill=color, width=width*S, joint='curve')
    if len(points)>2:
        r=width*S/2
        for x,y in pixels:
            d.ellipse((x-r,y-r,x+r,y+r),fill=color)
def dashed(points, color, width, dash=13, gap=9):
    a,b=map(xy,points); length=math.dist(a,b)
    for start in range(0, int(length), (dash+gap)*S):
        end=min(length,start+dash*S)
        p=lambda t:(a[0]+(b[0]-a[0])*t/length,a[1]+(b[1]-a[1])*t/length)
        d.line([p(start),p(end)],fill=color,width=width*S)
def polygon(points, fill, outline):
    pts=[xy(p) for p in points]
    d.polygon(pts,fill=fill)
    d.line(pts+[pts[0]],fill=outline,width=2*S)
def callout(key, pos, title, subtitle=''):
    anchor=xy(DATA['anchors'][key])
    end=(pos[0]*S,(pos[1]+14)*S)
    d.line([anchor,end],fill='#657a89',width=S)
    w=max(d.textlength(title,font=font(21,True)),d.textlength(subtitle,font=font(15)))
    d.rounded_rectangle([((pos[0]-10)*S,(pos[1]-6)*S),((pos[0]+10)*S+w,(pos[1]+61)*S)],radius=5*S,fill='#192832')
    text(pos,title,21,bold=True)
    if subtitle:text((pos[0],pos[1]+32),subtitle,15,'#afc0cb')

text((48,30),'ТЕПЛООБМЕННИК · V4',16,'#9fc8da',True)
text((48,64),'План газового тракта',32,bold=True)
text((48,111),'Условная схема сверху · не монтажный чертёж',18,'#aebfc9')

# Нижний вход и верхний выход частично совпадают в проекции.
dashed(DATA['inlet'],'#b67d54',24,19,8)
dashed(DATA['continuation'],'#b67d54',3,11,9)
for name in ('outlet','elbow','duct','exhaust'):
    line(DATA[name],'#4b4137',42)
    line(DATA[name],'#edb77d',3)
line(DATA['shod'],'#7f709c',20)
line(DATA['shod'],'#c6b1ed',3)
polygon(DATA['shell'],'#263d4b','#9abccc')
polygon(DATA['fan'],'#69533f','#e5b784')
polygon(DATA['motor'],'#395768','#9cbccc')
center=xy(DATA['chimney']);r=DATA['chimneyRadius']*145*S
d.ellipse((center[0]-r,center[1]-r,center[0]+r,center[1]+r),fill='#5a4a3d',outline='#f0c699',width=4*S)
for arrow in DATA['arrows']:
    a,b=xy(arrow['from']),xy(arrow['to']);angle=math.atan2(b[1]-a[1],b[0]-a[0])
    d.line([a,b],fill='#ffe1ab',width=4*S)
    d.polygon([b,(b[0]-15*S*math.cos(angle-.48),b[1]-15*S*math.sin(angle-.48)),(b[0]-15*S*math.cos(angle+.48),b[1]-15*S*math.sin(angle+.48))],fill='#ffe1ab')
b=xy(DATA['break'])
d.line([(b[0]+(-5 if i%2 else 5)*S,b[1]+(i*7-28)*S) for i in range(9)],fill='#ffc68f',width=3*S)
callout('chimney',(300,185),'Дымоход','За поворотом · вертикальный')
callout('fan',(800,160),'Дымосос','Перед ним — врезка ШОД')
callout('shod',(920,300),'ШОД','Подсос наружного воздуха')
callout('turn',(420,385),'Направо 90°','По ходу газа из верхнего корпуса')
callout('st',(925,470),'ШД / ШТ','Выход верхнего корпуса')
callout('inlet',(180,605),'От печи ARANGA','Обрыв · вход по оси нижнего корпуса')
callout('shell',(1150,540),'Теплообменник','Разворот 12° по часовой стрелке')
d.line([(48*S,782*S),(1452*S,782*S)],fill='#354650',width=S)
text((48,803),'Вход нижнего корпуса показан прерывистой линией: сверху он частично совпадает с верхним выходом.',18,'#b9c8d1')
text((48,834),'Формы и длины условны. 3D-модель открывается через index.html; корпуса и внутренние детали CAD сохранены.',16,'#91a7b5')
im.resize((1500,880),Image.Resampling.LANCZOS).save(ROOT / 'previews/plan.png')
