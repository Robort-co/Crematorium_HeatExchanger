"""Offline triangle preview of the same scene; does not invoke a browser or WebGL."""
import base64
import json
import math
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parent.parent
data=json.loads((ROOT/'previews/scene-data.json').read_text(encoding='utf-8'))
W,H,S=1600,1180,2
im=Image.new('RGB',(W*S,H*S),'#131f28')
d=ImageDraw.Draw(im,'RGBA')
camera=np.array([-6.,5.4,10.]);target=np.array([-.55,2.45,-.70])
forward=target-camera;forward/=np.linalg.norm(forward)
right=np.cross(forward,[0,1,0]);right/=np.linalg.norm(right)
up=np.cross(right,forward)
scale=155*S
def project(a):
    a=np.asarray(a)-target
    return np.stack([W*S/2+a@right*scale,665*S-a@up*scale],axis=-1)
def font(size,bold=False):
    return ImageFont.truetype('C:/Windows/Fonts/'+('seguisb.ttf' if bold else 'segoeui.ttf'),size*S)
def text(p,value,size=20,color='#edf2f5',bold=False):
    d.text((p[0]*S,p[1]*S),value,fill=color,font=font(size,bold))

# Ground grid is decoration only.
for k in range(-5,5):
    for a,b in [([k,0,-4],[k,0,3]),([-4,0,k],[3,0,k])]:
        d.line([tuple(p) for p in project([a,b])],fill=(78,103,118,40),width=S)

all_xy=[];all_depth=[];all_color=[]
light=np.array([-.4,.85,.65]);light/=np.linalg.norm(light)
for mesh in data['meshes']:
    vertices=np.frombuffer(base64.b64decode(mesh['positions']),dtype='<f4').reshape(-1,3)
    normals=np.frombuffer(base64.b64decode(mesh['normals']),dtype='<f4').reshape(-1,3)
    ix=np.frombuffer(base64.b64decode(mesh['indices']),dtype='<u4').reshape(-1,3)
    pixels=project(vertices)[ix]
    a=pixels[:,1]-pixels[:,0];b=pixels[:,2]-pixels[:,0]
    area=np.abs(a[:,0]*b[:,1]-a[:,1]*b[:,0])/2
    keep=area>.25
    pixels=pixels[keep];indices=ix[keep]
    avg=normals[indices].mean(axis=1)
    lengths=np.linalg.norm(avg,axis=1);avg/=np.maximum(lengths[:,None],1e-12)
    brightness=.45+.5*np.abs(avg@light)
    if mesh['category']=='gasflow':brightness[:]=1.18
    color=np.array([int(mesh['color'][i:i+2],16) for i in (0,2,4)])
    rgb=np.clip(brightness[:,None]*color,0,255).astype(np.uint8)
    rgba=np.column_stack([rgb,np.full(len(rgb),round(mesh['opacity']*255),dtype=np.uint8)])
    all_xy.append(pixels);all_depth.append(((vertices-target)@forward)[indices].mean(axis=1));all_color.append(rgba)
xy=np.concatenate(all_xy);depth=np.concatenate(all_depth);colors=np.concatenate(all_color)
for index in np.argsort(depth)[::-1]:
    d.polygon([tuple(p) for p in xy[index]],fill=tuple(int(v) for v in colors[index]))

text((48,30),'ТЕПЛООБМЕННИК · V5 НА ОСНОВЕ V2',16,'#a9d4e5',True)
text((48,67),'Квадратный короб и концентричная арка',32,bold=True)
text((48,115),'Программный рендер геометрии · не снимок браузера',17,'#9fb5c3')
L=data['layout']
def callout(point,pos,title,subtitle):
    anchor=tuple(project([point])[0]);end=(pos[0]*S,(pos[1]+16)*S)
    d.line([anchor,end],fill='#7f9aaa',width=S)
    width=max(d.textlength(title,font=font(19,True)),d.textlength(subtitle,font=font(14)))
    d.rounded_rectangle(((pos[0]-9)*S,(pos[1]-5)*S,(pos[0]+9)*S+width,(pos[1]+58)*S),radius=5*S,fill='#172a35')
    text(pos,title,19,bold=True);text((pos[0],pos[1]+29),subtitle,14,'#b7cad4')
callout([L['boxX'],L['stY'],.4],(1030,590),'ШТ после сужения','Обе стороны сечения уменьшены')
callout([L['boxX']+.35,L['archCenterY'],0],(1030,425),'Арка концентрична трубе','Круглый проём с общим центром')
callout([L['fanX'],L['fanY'],.25],(1080,300),'Дымосос над теплообменником','Всасывание обратно вдоль банок')
callout([L['fanX'],L['fanDischargeY'],-1.2],(135,370),'Верхний выпуск налево','По ходу входящего газа')
callout([L['chimneyX'],4.8,L['chimneyZ']],(180,205),'Вертикальный дымоход','После горизонтального участка')
callout([.5,1.3,.4],(1070,845),'Исходный теплообменник','Корпуса и внутренности v2')
d.line([(48*S,1080*S),(1552*S,1080*S)],fill='#3c5362',width=S)
text((48,1100),'Компоновка и форма согласованы для эскиза. Размеры, опоры и исполнения оборудования условны.',18,'#adbfca')
text((48,1135),'Интерактивная версия: index.html. Для проверки общего центра — «Арка крупно».',16,'#94adbd')
im.resize((W,H),Image.Resampling.LANCZOS).save(ROOT/'previews/overview.png')
print('Rendered',len(xy),'triangles to previews/overview.png',flush=True)

# Face-on geometric illustration, with shared center marked explicitly.
W2,H2=1100,900
im2=Image.new('RGB',(W2*S,H2*S),'#111d26');d=ImageDraw.Draw(im2,'RGBA')
text((45,30),'АРКА И ВСАСЫВАЮЩИЙ ПАТРУБОК',27,bold=True)
text((45,77),'Фрагмент со стороны дымососа · двигатель и улитка скрыты',17,'#a9becb')
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
im2.resize((W2,H2),Image.Resampling.LANCZOS).save(ROOT/'previews/concentric.png')
