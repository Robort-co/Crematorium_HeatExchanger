"""Software triangle previews of the scene; no browser or WebGL is invoked."""
import base64
import json
import math
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent.parent
data=json.loads((ROOT/'previews/scene-data.json').read_text(encoding='utf-8'))
L=data['layout']; S=2
meshes=[]
for raw in data['meshes']:
    mesh=dict(raw)
    for key in ['positions','normals']:
        mesh[key]=np.frombuffer(base64.b64decode(raw[key]),dtype='<f4').reshape(-1,3)
    mesh['indices']=np.frombuffer(base64.b64decode(raw['indices']),dtype='<u4').reshape(-1,3)
    meshes.append(mesh)

def font(size,bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/'+('seguisb.ttf' if bold else 'segoeui.ttf'),size*S)

def render(name,size,camera,target,scale,center_y,water=False):
    W,H=size
    im=Image.new('RGB',(W*S,H*S),'#131f28'); d=ImageDraw.Draw(im,'RGBA')
    camera=np.array(camera,dtype=float);target=np.array(target,dtype=float)
    forward=target-camera;forward/=np.linalg.norm(forward)
    right=np.cross(forward,[0,1,0]);right/=np.linalg.norm(right);up=np.cross(right,forward)
    def project(a):
        a=np.asarray(a)-target
        return np.stack([W*S/2+a@right*scale*S,center_y*S-a@up*scale*S],axis=-1)
    def text(p,value,size=20,color='#edf2f5',bold=False):
        d.text((p[0]*S,p[1]*S),value,fill=color,font=font(size,bold))
    def callout(point,pos,title,subtitle):
        anchor=tuple(project([point])[0]);end=(pos[0]*S,(pos[1]+16)*S)
        d.line([anchor,end],fill='#7f9aaa',width=S)
        width=max(d.textlength(title,font=font(19,True)),d.textlength(subtitle,font=font(14)))
        d.rounded_rectangle(((pos[0]-9)*S,(pos[1]-5)*S,(pos[0]+9)*S+width,(pos[1]+58)*S),radius=5*S,fill='#172a35')
        text(pos,title,19,bold=True);text((pos[0],pos[1]+29),subtitle,14,'#b7cad4')
    if not water:
        for k in range(-5,5):
            for a,b in [([k,0,-4],[k,0,3]),([-4,0,k],[3,0,k])]:
                d.line([tuple(p) for p in project([a,b])],fill=(78,103,118,40),width=S)
    all_xy=[];all_depth=[];all_color=[]
    light=np.array([-.4,.85,.65]);light/=np.linalg.norm(light)
    for mesh in meshes:
        opacity=mesh['opacity']
        if water:
            if mesh['category']=='shell':opacity=.055
            elif mesh['category'] not in ['water','water_return','water_cap']:continue
        vertices=mesh['positions'];normals=mesh['normals'];ix=mesh['indices']
        pixels=project(vertices)[ix]
        a=pixels[:,1]-pixels[:,0];b=pixels[:,2]-pixels[:,0]
        area=np.abs(a[:,0]*b[:,1]-a[:,1]*b[:,0])/2
        keep=area>.25;pixels=pixels[keep];indices=ix[keep]
        avg=normals[indices].mean(axis=1);lengths=np.linalg.norm(avg,axis=1)
        avg/=np.maximum(lengths[:,None],1e-12)
        brightness=.45+.5*np.abs(avg@light)
        if mesh['category']=='gasflow':brightness[:]=1.18
        color=np.array([int(mesh['color'][i:i+2],16) for i in (0,2,4)])
        rgb=np.clip(brightness[:,None]*color,0,255).astype(np.uint8)
        rgba=np.column_stack([rgb,np.full(len(rgb),round(opacity*255),dtype=np.uint8)])
        all_xy.append(pixels);all_depth.append(((vertices-target)@forward)[indices].mean(axis=1));all_color.append(rgba)
    xy=np.concatenate(all_xy);depth=np.concatenate(all_depth);colors=np.concatenate(all_color)
    for index in np.argsort(depth)[::-1]:
        d.polygon([tuple(p) for p in xy[index]],fill=tuple(int(v) for v in colors[index]))
    text((48,30),'ТЕПЛООБМЕННИК · V6 НА ОСНОВЕ V5',16,'#a9d4e5',True)
    if water:
        text((48,67),'Перенос водяной обратки',32,bold=True)
        text((48,115),'Вид вдоль банок · корпуса прозрачны, внутренности скрыты для осмотра',17,'#9fb5c3')
        callout([.83,1.95,.601],(65,230),'Обратка перенесена','Те же отвод, труба и фланцы')
        callout([.83,1.125,.46],(55,565),'Прежний свободный фланец','Теперь соединён с обраткой')
        callout([.83,1.125,-.466],(1030,650),'Прежнее подключение','Закрыто глухой крышкой')
        text((48,900),'Положение и форма остальных водяных деталей сохранены.',19,'#b7cad4')
        text((48,941),'Рендер геометрии. Толщина и исполнение крышки условны; исходный STEP не изменён.',16,'#94adbd')
    else:
        text((48,67),'Поворот газового тракта и перенос обратки',32,bold=True)
        text((48,115),'Программный рендер геометрии · не снимок браузера',17,'#9fb5c3')
        callout([L['boxX'],L['stY'],.4],(1050,590),'ШТ после сужения','Сужение квадратного короба')
        callout([L['boxX'],L['archCenterY'],-.35],(1060,395),'Арка повёрнута на 90°','Общий центр с круглой трубой')
        callout([L['fanX'],L['fanY'],L['fanZ']],(95,505),'Дымосос в конце трубы','Круглый тракт продлён')
        callout([L['chimneyX'],4.6,L['chimneyZ']],(100,345),'Выпуск вверх','Прямоугольное → круглое')
        callout([L['chimneyX'],5.6,L['chimneyZ']],(150,195),'Дымовая труба','Диаметр уменьшен условно')
        callout([L['boxX'],1.265,0],(85,820),'Закруглённый низ короба','Продолжает верхнюю банку')
        callout([.83,1.95,.601],(1100,805),'Водяная обратка','На противоположной стороне')
        d.line([(48*S,1080*S),(1552*S,1080*S)],fill='#3c5362',width=S)
        text((48,1100),'Новая итерация для просмотра. Размеры новой обвязки, опоры и исполнения условны.',18,'#adbfca')
        text((48,1135),'Интерактивная версия: index.html. Перенос трубы и крышка показаны крупно в water-return.png.',16,'#94adbd')
    im.resize((W,H),Image.Resampling.LANCZOS).save(ROOT/'previews'/name)
    print('Rendered',len(xy),'triangles to',name,flush=True)

render('overview.png',(1600,1180),[-6,5.8,10],[-.4,2.65,-.65],145,650)
render('water-return.png',(1400,1000),[8,2.8,-4],[.83,1.6,0],295,485,True)

# Face-on geometric illustration using the shared layout parameters.
W,H=1100,900
im=Image.new('RGB',(W*S,H*S),'#111d26');d=ImageDraw.Draw(im,'RGBA')
def text(p,value,size=20,color='#edf2f5',bold=False):
    d.text((p[0]*S,p[1]*S),value,fill=color,font=font(size,bold))
text((45,30),'АРКА И ВСАСЫВАЮЩИЙ ПАТРУБОК · V6',25,bold=True)
text((45,77),'После поворота на 90° · взгляд вдоль круглого тракта со стороны дымососа',17,'#a9becb')
cx,cy,k=550*S,345*S,600*S
R=L['archRadius']*k;r=L['pipeRadius']*k;bottom=600*S
points=[(cx-R,bottom),(cx+R,bottom),(cx+R,cy)]
points += [(cx+R*math.cos(a),cy-R*math.sin(a)) for a in np.linspace(0,math.pi,100)]
d.polygon(points,fill='#796750');d.line(points+[points[0]],fill='#e9caa1',width=3*S)
d.ellipse((cx-r,cy-r,cx+r,cy+r),fill='#13212b',outline='#ffe0af',width=4*S)
d.line([(cx-R-40*S,cy),(cx+R+40*S,cy)],fill='#88b9d0',width=S)
d.line([(cx,cy-R-20*S),(cx,cy+r+35*S)],fill='#88b9d0',width=S)
d.ellipse((cx-5*S,cy-5*S,cx+5*S,cy+5*S),fill='#d2ecf8')
d.line([(cx+7*S,cy),(805*S,390*S)],fill='#88b9d0',width=S)
text((820,382),'Общий центр O',18,'#d2ecf8')
text((48,660),'Полукруглая верхушка и отверстие соосны.',22,bold=True)
text((48,702),'В сечении обе стороны короба равны.',19,'#b8c9d4')
text((48,742),'Радиусы арки и трубы разные; центр и ось общие.',19,'#b8c9d4')
text((48,830),'Геометрическая иллюстрация, не монтажный чертёж.',16,'#91a9b9')
im.resize((W,H),Image.Resampling.LANCZOS).save(ROOT/'previews/concentric.png')
