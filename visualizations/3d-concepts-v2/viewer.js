(()=>{var Vo="169",$n={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},uh=0,ml=1,dh=2;var Sc=1,Ho=2,cn=3,In=0,ve=1,Ue=2,Cn=0,gi=1,gl=2,_l=3,xl=4,fh=5,Hn=100,ph=101,mh=102,gh=103,_h=104,xh=200,yh=201,vh=202,Mh=203,ga=204,_a=205,Sh=206,bh=207,Eh=208,wh=209,Th=210,Ah=211,Rh=212,Ch=213,Ph=214,xa=0,ya=1,va=2,vi=3,Ma=4,Sa=5,ba=6,Ea=7,bc=0,Ih=1,Lh=2,Pn=0,Dh=1,Uh=2,Nh=3,Go=4,Oh=5,Fh=6,Bh=7;var Ec=300,Mi=301,Si=302,wa=303,Ta=304,yr=306,Aa=1e3,Xn=1001,Ra=1002,Be=1003,zh=1004;var hs=1005;var We=1006,Nr=1007;var Yn=1008;var dn=1009,wc=1010,Tc=1011,$i=1012,Wo=1013,qn=1014,hn=1015,os=1016,Xo=1017,Yo=1018,bi=1020,Ac=35902,Rc=1021,Cc=1022,Xe=1023,Pc=1024,Ic=1025,_i=1026,Ei=1027,Lc=1028,qo=1029,Dc=1030,Zo=1031;var Jo=1033,Ns=33776,Os=33777,Fs=33778,Bs=33779,Ca=35840,Pa=35841,Ia=35842,La=35843,Da=36196,Ua=37492,Na=37496,Oa=37808,Fa=37809,Ba=37810,za=37811,ka=37812,Va=37813,Ha=37814,Ga=37815,Wa=37816,Xa=37817,Ya=37818,qa=37819,Za=37820,Ja=37821,zs=36492,Ka=36494,$a=36495,Uc=36283,ja=36284,Qa=36285,to=36286;var Vs=2300,eo=2301,Or=2302,yl=2400,vl=2401,Ml=2402;var kh=3200,Vh=3201;var Nc=0,Hh=1,An="",Ke="srgb",Ln="srgb-linear",Ko="display-p3",vr="display-p3-linear",Hs="linear",ne="srgb",Gs="rec709",Ws="p3";var ti=7680;var Sl=519,Gh=512,Wh=513,Xh=514,Oc=515,Yh=516,qh=517,Zh=518,Jh=519,bl=35044;var El="300 es",un=2e3,Xs=2001,fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},_e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wl=1234567,Yi=Math.PI/180,ji=180/Math.PI;function Li(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_e[i&255]+_e[i>>8&255]+_e[i>>16&255]+_e[i>>24&255]+"-"+_e[t&255]+_e[t>>8&255]+"-"+_e[t>>16&15|64]+_e[t>>24&255]+"-"+_e[e&63|128]+_e[e>>8&255]+"-"+_e[e>>16&255]+_e[e>>24&255]+_e[n&255]+_e[n>>8&255]+_e[n>>16&255]+_e[n>>24&255]).toLowerCase()}function fe(i,t,e){return Math.max(t,Math.min(e,i))}function $o(i,t){return(i%t+t)%t}function Kh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function $h(i,t,e){return i!==t?(e-i)/(t-i):0}function qi(i,t,e){return(1-e)*i+e*t}function jh(i,t,e,n){return qi(i,t,1-Math.exp(-e*n))}function Qh(i,t=1){return t-Math.abs($o(i,t*2)-t)}function tu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function eu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function nu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function iu(i,t){return i+Math.random()*(t-i)}function su(i){return i*(.5-Math.random())}function ru(i){i!==void 0&&(wl=i);let t=wl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function au(i){return i*Yi}function ou(i){return i*ji}function lu(i){return(i&i-1)===0&&i!==0}function cu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function hu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function uu(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),p=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*p,o*c);break;case"YZY":i.set(l*p,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*p,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function pi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function be(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Fc={DEG2RAD:Yi,RAD2DEG:ji,generateUUID:Li,clamp:fe,euclideanModulo:$o,mapLinear:Kh,inverseLerp:$h,lerp:qi,damp:jh,pingpong:Qh,smoothstep:tu,smootherstep:eu,randInt:nu,randFloat:iu,randFloatSpread:su,seededRandom:ru,degToRad:au,radToDeg:ou,isPowerOfTwo:lu,ceilPowerOfTwo:cu,floorPowerOfTwo:hu,setQuaternionFromProperEuler:uu,normalize:be,denormalize:pi},ot=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},It=class i{constructor(t,e,n,s,r,a,o,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],p=n[2],m=n[5],g=n[8],_=s[0],u=s[3],f=s[6],w=s[1],M=s[4],b=s[7],D=s[2],R=s[5],T=s[8];return r[0]=a*_+o*w+l*D,r[3]=a*u+o*M+l*R,r[6]=a*f+o*b+l*T,r[1]=c*_+h*w+d*D,r[4]=c*u+h*M+d*R,r[7]=c*f+h*b+d*T,r[2]=p*_+m*w+g*D,r[5]=p*u+m*M+g*R,r[8]=p*f+m*b+g*T,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,p=o*l-h*r,m=c*r-a*l,g=e*d+n*p+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=p*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fr.makeScale(t,e)),this}rotate(t){return this.premultiply(Fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Fr=new It;function Bc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function du(){let i=Ys("canvas");return i.style.display="block",i}var Tl={};function ks(i){i in Tl||(Tl[i]=!0,console.warn(i))}function fu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function pu(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function mu(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Al=new It().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Rl=new It().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Bi={[Ln]:{transfer:Hs,primaries:Gs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Ke]:{transfer:ne,primaries:Gs,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[vr]:{transfer:Hs,primaries:Ws,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Rl),fromReference:i=>i.applyMatrix3(Al)},[Ko]:{transfer:ne,primaries:Ws,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Rl),fromReference:i=>i.applyMatrix3(Al).convertLinearToSRGB()}},gu=new Set([Ln,vr]),Xt={enabled:!0,_workingColorSpace:Ln,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!gu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=Bi[t].toReference,s=Bi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Bi[i].primaries},getTransfer:function(i){return i===An?Hs:Bi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Bi[t].luminanceCoefficients)}};function xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Br(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ei,no=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=Ys("canvas")),ei.width=t.width,ei.height=t.height;let n=ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Ys("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=xi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(xi(e[n]/255)*255):e[n]=xi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},_u=0,qs=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_u++}),this.uuid=Li(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(zr(s[a].image)):r.push(zr(s[a]))}else r=zr(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function zr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?no.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var xu=0,ze=class i extends fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Xn,s=Xn,r=We,a=Yn,o=Xe,l=dn,c=i.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xu++}),this.uuid=Li(),this.name="",this.source=new qs(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Aa:t.x=t.x-Math.floor(t.x);break;case Xn:t.x=t.x<0?0:1;break;case Ra:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Aa:t.y=t.y-Math.floor(t.y);break;case Xn:t.y=t.y<0?0:1;break;case Ra:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=Ec;ze.DEFAULT_ANISOTROPY=1;var $t=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],p=l[1],m=l[5],g=l[9],_=l[2],u=l[6],f=l[10];if(Math.abs(h-p)<.01&&Math.abs(d-_)<.01&&Math.abs(g-u)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+_)<.1&&Math.abs(g+u)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,b=(m+1)/2,D=(f+1)/2,R=(h+p)/4,T=(d+_)/4,U=(g+u)/4;return M>b&&M>D?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=R/n,r=T/n):b>D?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=R/s,r=U/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=T/r,s=U/r),this.set(n,s,r,e),this}let w=Math.sqrt((u-g)*(u-g)+(d-_)*(d-_)+(p-h)*(p-h));return Math.abs(w)<.001&&(w=1),this.x=(u-g)/w,this.y=(d-_)/w,this.z=(p-h)/w,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},io=class extends fn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $t(0,0,t,e),this.scissorTest=!1,this.viewport=new $t(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:We,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new ze(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new qs(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},pn=class extends io{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Zs=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var so=class extends ze{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ye=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],p=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==p||c!==m||h!==g){let u=1-o,f=l*p+c*m+h*g+d*_,w=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){let D=Math.sqrt(M),R=Math.atan2(D,f*w);u=Math.sin(u*R)/D,o=Math.sin(o*R)/D}let b=o*w;if(l=l*u+p*b,c=c*u+m*b,h=h*u+g*b,d=d*u+_*b,u===1-o){let D=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=D,c*=D,h*=D,d*=D}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],p=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+l*m-c*p,t[e+1]=l*g+h*p+c*d-o*m,t[e+2]=c*g+h*m+o*p-l*d,t[e+3]=h*g-o*d-l*p-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),p=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=p*h*d+c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d-p*m*g;break;case"YXZ":this._x=p*h*d+c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d+p*m*g;break;case"ZXY":this._x=p*h*d-c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d-p*m*g;break;case"ZYX":this._x=p*h*d-c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d+p*m*g;break;case"YZX":this._x=p*h*d+c*m*g,this._y=c*m*d+p*h*g,this._z=c*h*g-p*m*d,this._w=c*h*d-p*m*g;break;case"XZY":this._x=p*h*d-c*m*g,this._y=c*m*d-p*h*g,this._z=c*h*g+p*m*d,this._w=c*h*d+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],p=n+o+d;if(p>0){let m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>d){let m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>d){let m=2*Math.sqrt(1+o-n-d);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,p=Math.sin(e*h)/c;return this._w=a*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},A=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Cl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Cl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kr.copy(this).projectOnVector(t),this.sub(kr)}reflect(t){return this.sub(kr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},kr=new A,Cl=new Ye,mn=class{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ve):Ve.fromBufferAttribute(r,a),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),us.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),us.copy(n.boundingBox)),us.applyMatrix4(t.matrixWorld),this.union(us)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zi),ds.subVectors(this.max,zi),ni.subVectors(t.a,zi),ii.subVectors(t.b,zi),si.subVectors(t.c,zi),Mn.subVectors(ii,ni),Sn.subVectors(si,ii),Nn.subVectors(ni,si);let e=[0,-Mn.z,Mn.y,0,-Sn.z,Sn.y,0,-Nn.z,Nn.y,Mn.z,0,-Mn.x,Sn.z,0,-Sn.x,Nn.z,0,-Nn.x,-Mn.y,Mn.x,0,-Sn.y,Sn.x,0,-Nn.y,Nn.x,0];return!Vr(e,ni,ii,si,ds)||(e=[1,0,0,0,1,0,0,0,1],!Vr(e,ni,ii,si,ds))?!1:(fs.crossVectors(Mn,Sn),e=[fs.x,fs.y,fs.z],Vr(e,ni,ii,si,ds))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(sn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},sn=[new A,new A,new A,new A,new A,new A,new A,new A],Ve=new A,us=new mn,ni=new A,ii=new A,si=new A,Mn=new A,Sn=new A,Nn=new A,zi=new A,ds=new A,fs=new A,On=new A;function Vr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){On.fromArray(i,r);let o=s.x*Math.abs(On.x)+s.y*Math.abs(On.y)+s.z*Math.abs(On.z),l=t.dot(On),c=e.dot(On),h=n.dot(On);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var yu=new mn,ki=new A,Hr=new A,wi=class{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):yu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ki.subVectors(t,this.center);let e=ki.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ki,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Hr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ki.copy(t.center).add(Hr)),this.expandByPoint(ki.copy(t.center).sub(Hr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},rn=new A,Gr=new A,ps=new A,bn=new A,Wr=new A,ms=new A,Xr=new A,Zn=class{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(rn.copy(this.origin).addScaledVector(this.direction,e),rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Gr.copy(t).add(e).multiplyScalar(.5),ps.copy(e).sub(t).normalize(),bn.copy(this.origin).sub(Gr);let r=t.distanceTo(e)*.5,a=-this.direction.dot(ps),o=bn.dot(this.direction),l=-bn.dot(ps),c=bn.lengthSq(),h=Math.abs(1-a*a),d,p,m,g;if(h>0)if(d=a*l-o,p=a*o-l,g=r*h,d>=0)if(p>=-g)if(p<=g){let _=1/h;d*=_,p*=_,m=d*(d+a*p+2*o)+p*(a*d+p+2*l)+c}else p=r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-a*r+o)),p=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-r,-l),r),m=p*(p+2*l)+c):(d=Math.max(0,-(a*r+o)),p=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+p*(p+2*l)+c);else p=a>0?-r:r,d=Math.max(0,-(a*p+o)),m=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Gr).addScaledVector(ps,p),m}intersectSphere(t,e){rn.subVectors(t.center,this.origin);let n=rn.dot(this.direction),s=rn.dot(rn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),h>=0?(r=(t.min.y-p.y)*h,a=(t.max.y-p.y)*h):(r=(t.max.y-p.y)*h,a=(t.min.y-p.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(o=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,rn)!==null}intersectTriangle(t,e,n,s,r){Wr.subVectors(e,t),ms.subVectors(n,t),Xr.crossVectors(Wr,ms);let a=this.direction.dot(Xr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bn.subVectors(this.origin,t);let l=o*this.direction.dot(ms.crossVectors(bn,ms));if(l<0)return null;let c=o*this.direction.dot(Wr.cross(bn));if(c<0||l+c>a)return null;let h=-o*bn.dot(Xr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class i{constructor(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,u){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,u)}set(t,e,n,s,r,a,o,l,c,h,d,p,m,g,_,u){let f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=p,f[3]=m,f[7]=g,f[11]=_,f[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/ri.setFromMatrixColumn(t,0).length(),r=1/ri.setFromMatrixColumn(t,1).length(),a=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let p=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=p-_*c,e[9]=-o*l,e[2]=_-p*c,e[6]=g+m*c,e[10]=a*l}else if(t.order==="YXZ"){let p=l*h,m=l*d,g=c*h,_=c*d;e[0]=p+_*o,e[4]=g*o-m,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=_+p*o,e[10]=a*l}else if(t.order==="ZXY"){let p=l*h,m=l*d,g=c*h,_=c*d;e[0]=p-_*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=_-p*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let p=a*h,m=a*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=p*c+_,e[1]=l*d,e[5]=_*c+p,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-p*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=p-_*d}else if(t.order==="XZY"){let p=a*l,m=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=p*d+_,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=_*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(vu,t,Mu)}lookAt(t,e,n){let s=this.elements;return Ie.subVectors(t,e),Ie.lengthSq()===0&&(Ie.z=1),Ie.normalize(),En.crossVectors(n,Ie),En.lengthSq()===0&&(Math.abs(n.z)===1?Ie.x+=1e-4:Ie.z+=1e-4,Ie.normalize(),En.crossVectors(n,Ie)),En.normalize(),gs.crossVectors(Ie,En),s[0]=En.x,s[4]=gs.x,s[8]=Ie.x,s[1]=En.y,s[5]=gs.y,s[9]=Ie.y,s[2]=En.z,s[6]=gs.z,s[10]=Ie.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],p=n[9],m=n[13],g=n[2],_=n[6],u=n[10],f=n[14],w=n[3],M=n[7],b=n[11],D=n[15],R=s[0],T=s[4],U=s[8],Z=s[12],x=s[1],S=s[5],z=s[9],B=s[13],V=s[2],J=s[6],k=s[10],Q=s[14],G=s[3],lt=s[7],ct=s[11],_t=s[15];return r[0]=a*R+o*x+l*V+c*G,r[4]=a*T+o*S+l*J+c*lt,r[8]=a*U+o*z+l*k+c*ct,r[12]=a*Z+o*B+l*Q+c*_t,r[1]=h*R+d*x+p*V+m*G,r[5]=h*T+d*S+p*J+m*lt,r[9]=h*U+d*z+p*k+m*ct,r[13]=h*Z+d*B+p*Q+m*_t,r[2]=g*R+_*x+u*V+f*G,r[6]=g*T+_*S+u*J+f*lt,r[10]=g*U+_*z+u*k+f*ct,r[14]=g*Z+_*B+u*Q+f*_t,r[3]=w*R+M*x+b*V+D*G,r[7]=w*T+M*S+b*J+D*lt,r[11]=w*U+M*z+b*k+D*ct,r[15]=w*Z+M*B+b*Q+D*_t,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],p=t[10],m=t[14],g=t[3],_=t[7],u=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*o*p+n*c*p+s*o*m-n*l*m)+_*(+e*l*m-e*c*p+r*a*p-s*a*m+s*c*h-r*l*h)+u*(+e*c*d-e*o*m-r*a*d+n*a*m+r*o*h-n*c*h)+f*(-s*o*h-e*l*d+e*o*p+s*a*d-n*a*p+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],p=t[10],m=t[11],g=t[12],_=t[13],u=t[14],f=t[15],w=d*u*c-_*p*c+_*l*m-o*u*m-d*l*f+o*p*f,M=g*p*c-h*u*c-g*l*m+a*u*m+h*l*f-a*p*f,b=h*_*c-g*d*c+g*o*m-a*_*m-h*o*f+a*d*f,D=g*d*l-h*_*l-g*o*p+a*_*p+h*o*u-a*d*u,R=e*w+n*M+s*b+r*D;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let T=1/R;return t[0]=w*T,t[1]=(_*p*r-d*u*r-_*s*m+n*u*m+d*s*f-n*p*f)*T,t[2]=(o*u*r-_*l*r+_*s*c-n*u*c-o*s*f+n*l*f)*T,t[3]=(d*l*r-o*p*r-d*s*c+n*p*c+o*s*m-n*l*m)*T,t[4]=M*T,t[5]=(h*u*r-g*p*r+g*s*m-e*u*m-h*s*f+e*p*f)*T,t[6]=(g*l*r-a*u*r-g*s*c+e*u*c+a*s*f-e*l*f)*T,t[7]=(a*p*r-h*l*r+h*s*c-e*p*c-a*s*m+e*l*m)*T,t[8]=b*T,t[9]=(g*d*r-h*_*r-g*n*m+e*_*m+h*n*f-e*d*f)*T,t[10]=(a*_*r-g*o*r+g*n*c-e*_*c-a*n*f+e*o*f)*T,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*m-e*o*m)*T,t[12]=D*T,t[13]=(h*_*s-g*d*s+g*n*p-e*_*p-h*n*u+e*d*u)*T,t[14]=(g*o*s-a*_*s-g*n*l+e*_*l+a*n*u-e*o*u)*T,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*p+e*o*p)*T,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,p=r*c,m=r*h,g=r*d,_=a*h,u=a*d,f=o*d,w=l*c,M=l*h,b=l*d,D=n.x,R=n.y,T=n.z;return s[0]=(1-(_+f))*D,s[1]=(m+b)*D,s[2]=(g-M)*D,s[3]=0,s[4]=(m-b)*R,s[5]=(1-(p+f))*R,s[6]=(u+w)*R,s[7]=0,s[8]=(g+M)*T,s[9]=(u-w)*T,s[10]=(1-(p+_))*T,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=ri.set(s[0],s[1],s[2]).length(),a=ri.set(s[4],s[5],s[6]).length(),o=ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],He.copy(this);let c=1/r,h=1/a,d=1/o;return He.elements[0]*=c,He.elements[1]*=c,He.elements[2]*=c,He.elements[4]*=h,He.elements[5]*=h,He.elements[6]*=h,He.elements[8]*=d,He.elements[9]*=d,He.elements[10]*=d,e.setFromRotationMatrix(He),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=un){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),p=(n+s)/(n-s),m,g;if(o===un)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Xs)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=un){let l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),p=(e+t)*c,m=(n+s)*h,g,_;if(o===un)g=(a+r)*d,_=-2*d;else if(o===Xs)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},ri=new A,He=new ie,vu=new A(0,0,0),Mu=new A(1,1,1),En=new A,gs=new A,Ie=new A,Pl=new ie,Il=new Ye,je=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(fe(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-fe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(fe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Pl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Pl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Il.setFromEuler(this),this.setFromQuaternion(Il,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};je.DEFAULT_ORDER="XYZ";var Qi=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Su=0,Ll=new A,ai=new Ye,an=new ie,_s=new A,Vi=new A,bu=new A,Eu=new Ye,Dl=new A(1,0,0),Ul=new A(0,1,0),Nl=new A(0,0,1),Ol={type:"added"},wu={type:"removed"},oi={type:"childadded",child:null},Yr={type:"childremoved",child:null},Se=class i extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=Li(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new A,e=new je,n=new Ye,s=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new It}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qi,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.multiply(ai),this}rotateOnWorldAxis(t,e){return ai.setFromAxisAngle(t,e),this.quaternion.premultiply(ai),this}rotateX(t){return this.rotateOnAxis(Dl,t)}rotateY(t){return this.rotateOnAxis(Ul,t)}rotateZ(t){return this.rotateOnAxis(Nl,t)}translateOnAxis(t,e){return Ll.copy(t).applyQuaternion(this.quaternion),this.position.add(Ll.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dl,t)}translateY(t){return this.translateOnAxis(Ul,t)}translateZ(t){return this.translateOnAxis(Nl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_s.copy(t):_s.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Vi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Vi,_s,this.up):an.lookAt(_s,Vi,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),ai.setFromRotationMatrix(an),this.quaternion.premultiply(ai.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ol),oi.child=t,this.dispatchEvent(oi),oi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wu),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ol),oi.child=t,this.dispatchEvent(oi),oi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,t,bu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vi,Eu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),p=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Se.DEFAULT_UP=new A(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ge=new A,on=new A,qr=new A,ln=new A,li=new A,ci=new A,Fl=new A,Zr=new A,Jr=new A,Kr=new A,$r=new $t,jr=new $t,Qr=new $t,Gn=class i{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ge.subVectors(t,e),s.cross(Ge);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Ge.subVectors(s,e),on.subVectors(n,e),qr.subVectors(t,e);let a=Ge.dot(Ge),o=Ge.dot(on),l=Ge.dot(qr),c=on.dot(on),h=on.dot(qr),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let p=1/d,m=(c*l-o*h)*p,g=(a*h-o*l)*p;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,ln)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ln.x),l.addScaledVector(a,ln.y),l.addScaledVector(o,ln.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return $r.setScalar(0),jr.setScalar(0),Qr.setScalar(0),$r.fromBufferAttribute(t,e),jr.fromBufferAttribute(t,n),Qr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector($r,r.x),a.addScaledVector(jr,r.y),a.addScaledVector(Qr,r.z),a}static isFrontFacing(t,e,n,s){return Ge.subVectors(n,e),on.subVectors(t,e),Ge.cross(on).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ge.subVectors(this.c,this.b),on.subVectors(this.a,this.b),Ge.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;li.subVectors(s,n),ci.subVectors(r,n),Zr.subVectors(t,n);let l=li.dot(Zr),c=ci.dot(Zr);if(l<=0&&c<=0)return e.copy(n);Jr.subVectors(t,s);let h=li.dot(Jr),d=ci.dot(Jr);if(h>=0&&d<=h)return e.copy(s);let p=l*d-h*c;if(p<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(li,a);Kr.subVectors(t,r);let m=li.dot(Kr),g=ci.dot(Kr);if(g>=0&&m<=g)return e.copy(r);let _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(ci,o);let u=h*g-m*d;if(u<=0&&d-h>=0&&m-g>=0)return Fl.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(Fl,o);let f=1/(u+_+p);return a=_*f,o=p*f,e.copy(n).addScaledVector(li,a).addScaledVector(ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},xs={h:0,s:0,l:0};function ta(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Lt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=$o(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ta(a,r,t+1/3),this.g=ta(a,r,t),this.b=ta(a,r,t-1/3)}return Xt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){let n=zc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xi(t.r),this.g=xi(t.g),this.b=xi(t.b),this}copyLinearToSRGB(t){return this.r=Br(t.r),this.g=Br(t.g),this.b=Br(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return Xt.fromWorkingColorSpace(xe.copy(this),t),Math.round(fe(xe.r*255,0,255))*65536+Math.round(fe(xe.g*255,0,255))*256+Math.round(fe(xe.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(xe.copy(this),e);let n=xe.r,s=xe.g,r=xe.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=Ke){Xt.fromWorkingColorSpace(xe.copy(this),t);let e=xe.r,n=xe.g,s=xe.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(wn),this.setHSL(wn.h+t,wn.s+e,wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(wn),t.getHSL(xs);let n=qi(wn.h,xs.h,e),s=qi(wn.s,xs.s,e),r=qi(wn.l,xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xe=new Lt;Lt.NAMES=zc;var Tu=0,gn=class extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tu++}),this.uuid=Li(),this.name="",this.type="Material",this.blending=gi,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=_a,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Lt(0,0,0),this.blendAlpha=0,this.depthFunc=vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gi&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ga&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Ti=class extends gn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new je,this.combine=bc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var le=new A,ys=new ot,Me=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=bl,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ys.fromBufferAttribute(this,e),ys.applyMatrix3(t),this.setXY(e,ys.x,ys.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=pi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=be(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=be(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=be(e,this.array),n=be(n,this.array),s=be(s,this.array),r=be(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==bl&&(t.usage=this.usage),t}};var Js=class extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ks=class extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var qt=class extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}},Au=0,Fe=new ie,ea=new Se,hi=new A,Le=new mn,Hi=new mn,de=new A,pe=class i extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=Li(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bc(t)?Ks:Js)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new It().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Fe.makeRotationFromQuaternion(t),this.applyMatrix4(Fe),this}rotateX(t){return Fe.makeRotationX(t),this.applyMatrix4(Fe),this}rotateY(t){return Fe.makeRotationY(t),this.applyMatrix4(Fe),this}rotateZ(t){return Fe.makeRotationZ(t),this.applyMatrix4(Fe),this}translate(t,e,n){return Fe.makeTranslation(t,e,n),this.applyMatrix4(Fe),this}scale(t,e,n){return Fe.makeScale(t,e,n),this.applyMatrix4(Fe),this}lookAt(t){return ea.lookAt(t),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hi).negate(),this.translate(hi.x,hi.y,hi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new mn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];Le.setFromBufferAttribute(r),this.morphTargetsRelative?(de.addVectors(this.boundingBox.min,Le.min),this.boundingBox.expandByPoint(de),de.addVectors(this.boundingBox.max,Le.max),this.boundingBox.expandByPoint(de)):(this.boundingBox.expandByPoint(Le.min),this.boundingBox.expandByPoint(Le.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){let n=this.boundingSphere.center;if(Le.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Hi.setFromBufferAttribute(o),this.morphTargetsRelative?(de.addVectors(Le.min,Hi.min),Le.expandByPoint(de),de.addVectors(Le.max,Hi.max),Le.expandByPoint(de)):(Le.expandByPoint(Hi.min),Le.expandByPoint(Hi.max))}Le.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)de.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(de));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)de.fromBufferAttribute(o,c),l&&(hi.fromBufferAttribute(t,c),de.add(hi)),s=Math.max(s,n.distanceToSquared(de))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new A,l[U]=new A;let c=new A,h=new A,d=new A,p=new ot,m=new ot,g=new ot,_=new A,u=new A;function f(U,Z,x){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,Z),d.fromBufferAttribute(n,x),p.fromBufferAttribute(r,U),m.fromBufferAttribute(r,Z),g.fromBufferAttribute(r,x),h.sub(c),d.sub(c),m.sub(p),g.sub(p);let S=1/(m.x*g.y-g.x*m.y);isFinite(S)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(S),u.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(S),o[U].add(_),o[Z].add(_),o[x].add(_),l[U].add(u),l[Z].add(u),l[x].add(u))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let U=0,Z=w.length;U<Z;++U){let x=w[U],S=x.start,z=x.count;for(let B=S,V=S+z;B<V;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let M=new A,b=new A,D=new A,R=new A;function T(U){D.fromBufferAttribute(s,U),R.copy(D);let Z=o[U];M.copy(Z),M.sub(D.multiplyScalar(D.dot(Z))).normalize(),b.crossVectors(R,Z);let S=b.dot(l[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,S)}for(let U=0,Z=w.length;U<Z;++U){let x=w[U],S=x.start,z=x.count;for(let B=S,V=S+z;B<V;B+=3)T(t.getX(B+0)),T(t.getX(B+1)),T(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);let s=new A,r=new A,a=new A,o=new A,l=new A,c=new A,h=new A,d=new A;if(t)for(let p=0,m=t.count;p<m;p+=3){let g=t.getX(p+0),_=t.getX(p+1),u=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,u),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,u),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(u,c.x,c.y,c.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),a.fromBufferAttribute(e,p+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)de.fromBufferAttribute(t,e),de.normalize(),t.setXYZ(e,de.x,de.y,de.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,d=o.normalized,p=new c.constructor(l.length*h),m=0,g=0;for(let _=0,u=l.length;_<u;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let f=0;f<h;f++)p[g++]=c[m++]}return new Me(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let p=c[h],m=t(p,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,p=c.length;d<p;d++){let m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let p=0,m=d.length;p<m;p++)h.push(d[p].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bl=new ie,Fn=new Zn,vs=new wi,zl=new A,Ms=new A,Ss=new A,bs=new A,na=new A,Es=new A,kl=new A,ws=new A,Yt=class extends Se{constructor(t=new pe,e=new Ti){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Es.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(na.fromBufferAttribute(d,t),a?Es.addScaledVector(na,h):Es.addScaledVector(na.sub(e),h))}e.add(Es)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(r),Fn.copy(t.ray).recast(t.near),!(vs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(vs,zl)===null||Fn.origin.distanceToSquared(zl)>(t.far-t.near)**2))&&(Bl.copy(r).invert(),Fn.copy(t.ray).applyMatrix4(Bl),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fn)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let u=p[g],f=a[u.materialIndex],w=Math.max(u.start,m.start),M=Math.min(o.count,Math.min(u.start+u.count,m.start+m.count));for(let b=w,D=M;b<D;b+=3){let R=o.getX(b),T=o.getX(b+1),U=o.getX(b+2);s=Ts(this,f,t,n,c,h,d,R,T,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let u=g,f=_;u<f;u+=3){let w=o.getX(u),M=o.getX(u+1),b=o.getX(u+2);s=Ts(this,a,t,n,c,h,d,w,M,b),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=p.length;g<_;g++){let u=p[g],f=a[u.materialIndex],w=Math.max(u.start,m.start),M=Math.min(l.count,Math.min(u.start+u.count,m.start+m.count));for(let b=w,D=M;b<D;b+=3){let R=b,T=b+1,U=b+2;s=Ts(this,f,t,n,c,h,d,R,T,U),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=u.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let u=g,f=_;u<f;u+=3){let w=u,M=u+1,b=u+2;s=Ts(this,a,t,n,c,h,d,w,M,b),s&&(s.faceIndex=Math.floor(u/3),e.push(s))}}}};function Ru(i,t,e,n,s,r,a,o){let l;if(t.side===ve?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===In,o),l===null)return null;ws.copy(o),ws.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(ws);return c<e.near||c>e.far?null:{distance:c,point:ws.clone(),object:i}}function Ts(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Ms),i.getVertexPosition(l,Ss),i.getVertexPosition(c,bs);let h=Ru(i,t,e,n,Ms,Ss,bs,kl);if(h){let d=new A;Gn.getBarycoord(kl,Ms,Ss,bs,d),s&&(h.uv=Gn.getInterpolatedAttribute(s,o,l,c,d,new ot)),r&&(h.uv1=Gn.getInterpolatedAttribute(r,o,l,c,d,new ot)),a&&(h.normal=Gn.getInterpolatedAttribute(a,o,l,c,d,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let p={a:o,b:l,c,normal:new A,materialIndex:0};Gn.getNormal(Ms,Ss,bs,p.normal),h.face=p,h.barycoord=d}return h}var _n=class i extends pe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],p=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(d,2));function g(_,u,f,w,M,b,D,R,T,U,Z){let x=b/T,S=D/U,z=b/2,B=D/2,V=R/2,J=T+1,k=U+1,Q=0,G=0,lt=new A;for(let ct=0;ct<k;ct++){let _t=ct*S-B;for(let Vt=0;Vt<J;Vt++){let Zt=Vt*x-z;lt[_]=Zt*w,lt[u]=_t*M,lt[f]=V,c.push(lt.x,lt.y,lt.z),lt[_]=0,lt[u]=0,lt[f]=R>0?1:-1,h.push(lt.x,lt.y,lt.z),d.push(Vt/T),d.push(1-ct/U),Q+=1}}for(let ct=0;ct<U;ct++)for(let _t=0;_t<T;_t++){let Vt=p+_t+J*ct,Zt=p+_t+J*(ct+1),W=p+(_t+1)+J*(ct+1),$=p+(_t+1)+J*ct;l.push(Vt,Zt,$),l.push(Zt,W,$),G+=6}o.addGroup(m,G,Z),m+=G,p+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ai(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ee(i){let t={};for(let e=0;e<i.length;e++){let n=Ai(i[e]);for(let s in n)t[s]=n[s]}return t}function Cu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function kc(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}var Pu={clone:Ai,merge:Ee},Iu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qe=class extends gn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Iu,this.fragmentShader=Lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ai(t.uniforms),this.uniformsGroups=Cu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},$s=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=un}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Tn=new A,Vl=new ot,Hl=new ot,ye=class extends $s{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ji*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Yi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ji*2*Math.atan(Math.tan(Yi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Tn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z),Tn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Tn.x,Tn.y).multiplyScalar(-t/Tn.z)}getViewSize(t,e){return this.getViewBounds(t,Vl,Hl),e.subVectors(Hl,Vl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Yi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ui=-90,di=1,ro=class extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new ye(ui,di,t,e);s.layers=this.layers,this.add(s);let r=new ye(ui,di,t,e);r.layers=this.layers,this.add(r);let a=new ye(ui,di,t,e);a.layers=this.layers,this.add(a);let o=new ye(ui,di,t,e);o.layers=this.layers,this.add(o);let l=new ye(ui,di,t,e);l.layers=this.layers,this.add(l);let c=new ye(ui,di,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===un)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},js=class extends ze{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Mi,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ao=class extends pn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new js(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:We}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _n(5,5,5),r=new Qe({name:"CubemapFromEquirect",uniforms:Ai(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ve,blending:Cn});r.uniforms.tEquirect.value=e;let a=new Yt(s,r),o=e.minFilter;return e.minFilter===Yn&&(e.minFilter=We),new ro(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},ia=new A,Du=new A,Uu=new It,De=class{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ia.subVectors(n,e).cross(Du.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ia),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Uu.getNormalMatrix(t),s=this.coplanarPoint(ia).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Bn=new wi,As=new A,ts=class{constructor(t=new De,e=new De,n=new De,s=new De,r=new De,a=new De){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=un){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],p=s[7],m=s[8],g=s[9],_=s[10],u=s[11],f=s[12],w=s[13],M=s[14],b=s[15];if(n[0].setComponents(l-r,p-c,u-m,b-f).normalize(),n[1].setComponents(l+r,p+c,u+m,b+f).normalize(),n[2].setComponents(l+a,p+h,u+g,b+w).normalize(),n[3].setComponents(l-a,p-h,u-g,b-w).normalize(),n[4].setComponents(l-o,p-d,u-_,b-M).normalize(),e===un)n[5].setComponents(l+o,p+d,u+_,b+M).normalize();else if(e===Xs)n[5].setComponents(o,d,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Bn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Bn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Bn)}intersectsSprite(t){return Bn.center.set(0,0,0),Bn.radius=.7071067811865476,Bn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Bn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(As.x=s.normal.x>0?t.max.x:t.min.x,As.y=s.normal.y>0?t.max.y:t.min.y,As.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(As)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Vc(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Nu(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<d.length;m++){let g=d[p],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,d[p]=_)}d.length=p+1;for(let m=0,g=d.length;m<g;m++){let _=d[m];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Ri=class i extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,p=e/l,m=[],g=[],_=[],u=[];for(let f=0;f<h;f++){let w=f*p-a;for(let M=0;M<c;M++){let b=M*d-r;g.push(b,-w,0),_.push(0,0,1),u.push(M/o),u.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){let M=w+c*f,b=w+c*(f+1),D=w+1+c*(f+1),R=w+1+c*f;m.push(M,b,R),m.push(b,D,R)}this.setIndex(m),this.setAttribute("position",new qt(g,3)),this.setAttribute("normal",new qt(_,3)),this.setAttribute("uv",new qt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},Ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ku=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Gu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Xu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Zu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ju=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ku=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,rd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ad=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,od=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ld=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dd="gl_FragColor = linearToOutputTexel( gl_FragColor );",fd=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,yd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Md=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Sd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ad=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Id=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ld=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ud=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Nd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,zd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Xd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$d=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,tf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,af=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,of=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,lf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,df=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ff=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,mf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_f=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Mf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ef=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Tf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Af=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,If=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Lf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Df=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Nf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ff=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,$f=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ep=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ip=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ap=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,op=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,cp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Pt={alphahash_fragment:Ou,alphahash_pars_fragment:Fu,alphamap_fragment:Bu,alphamap_pars_fragment:zu,alphatest_fragment:ku,alphatest_pars_fragment:Vu,aomap_fragment:Hu,aomap_pars_fragment:Gu,batching_pars_vertex:Wu,batching_vertex:Xu,begin_vertex:Yu,beginnormal_vertex:qu,bsdfs:Zu,iridescence_fragment:Ju,bumpmap_pars_fragment:Ku,clipping_planes_fragment:$u,clipping_planes_pars_fragment:ju,clipping_planes_pars_vertex:Qu,clipping_planes_vertex:td,color_fragment:ed,color_pars_fragment:nd,color_pars_vertex:id,color_vertex:sd,common:rd,cube_uv_reflection_fragment:ad,defaultnormal_vertex:od,displacementmap_pars_vertex:ld,displacementmap_vertex:cd,emissivemap_fragment:hd,emissivemap_pars_fragment:ud,colorspace_fragment:dd,colorspace_pars_fragment:fd,envmap_fragment:pd,envmap_common_pars_fragment:md,envmap_pars_fragment:gd,envmap_pars_vertex:_d,envmap_physical_pars_fragment:Rd,envmap_vertex:xd,fog_vertex:yd,fog_pars_vertex:vd,fog_fragment:Md,fog_pars_fragment:Sd,gradientmap_pars_fragment:bd,lightmap_pars_fragment:Ed,lights_lambert_fragment:wd,lights_lambert_pars_fragment:Td,lights_pars_begin:Ad,lights_toon_fragment:Cd,lights_toon_pars_fragment:Pd,lights_phong_fragment:Id,lights_phong_pars_fragment:Ld,lights_physical_fragment:Dd,lights_physical_pars_fragment:Ud,lights_fragment_begin:Nd,lights_fragment_maps:Od,lights_fragment_end:Fd,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:zd,logdepthbuf_pars_vertex:kd,logdepthbuf_vertex:Vd,map_fragment:Hd,map_pars_fragment:Gd,map_particle_fragment:Wd,map_particle_pars_fragment:Xd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:qd,morphinstance_vertex:Zd,morphcolor_vertex:Jd,morphnormal_vertex:Kd,morphtarget_pars_vertex:$d,morphtarget_vertex:jd,normal_fragment_begin:Qd,normal_fragment_maps:tf,normal_pars_fragment:ef,normal_pars_vertex:nf,normal_vertex:sf,normalmap_pars_fragment:rf,clearcoat_normal_fragment_begin:af,clearcoat_normal_fragment_maps:of,clearcoat_pars_fragment:lf,iridescence_pars_fragment:cf,opaque_fragment:hf,packing:uf,premultiplied_alpha_fragment:df,project_vertex:ff,dithering_fragment:pf,dithering_pars_fragment:mf,roughnessmap_fragment:gf,roughnessmap_pars_fragment:_f,shadowmap_pars_fragment:xf,shadowmap_pars_vertex:yf,shadowmap_vertex:vf,shadowmask_pars_fragment:Mf,skinbase_vertex:Sf,skinning_pars_vertex:bf,skinning_vertex:Ef,skinnormal_vertex:wf,specularmap_fragment:Tf,specularmap_pars_fragment:Af,tonemapping_fragment:Rf,tonemapping_pars_fragment:Cf,transmission_fragment:Pf,transmission_pars_fragment:If,uv_pars_fragment:Lf,uv_pars_vertex:Df,uv_vertex:Uf,worldpos_vertex:Nf,background_vert:Of,background_frag:Ff,backgroundCube_vert:Bf,backgroundCube_frag:zf,cube_vert:kf,cube_frag:Vf,depth_vert:Hf,depth_frag:Gf,distanceRGBA_vert:Wf,distanceRGBA_frag:Xf,equirect_vert:Yf,equirect_frag:qf,linedashed_vert:Zf,linedashed_frag:Jf,meshbasic_vert:Kf,meshbasic_frag:$f,meshlambert_vert:jf,meshlambert_frag:Qf,meshmatcap_vert:tp,meshmatcap_frag:ep,meshnormal_vert:np,meshnormal_frag:ip,meshphong_vert:sp,meshphong_frag:rp,meshphysical_vert:ap,meshphysical_frag:op,meshtoon_vert:lp,meshtoon_frag:cp,points_vert:hp,points_frag:up,shadow_vert:dp,shadow_frag:fp,sprite_vert:pp,sprite_frag:mp},et={common:{diffuse:{value:new Lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new Lt(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},$e={basic:{uniforms:Ee([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:Pt.meshbasic_vert,fragmentShader:Pt.meshbasic_frag},lambert:{uniforms:Ee([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Pt.meshlambert_vert,fragmentShader:Pt.meshlambert_frag},phong:{uniforms:Ee([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new Lt(0)},specular:{value:new Lt(1118481)},shininess:{value:30}}]),vertexShader:Pt.meshphong_vert,fragmentShader:Pt.meshphong_frag},standard:{uniforms:Ee([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new Lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag},toon:{uniforms:Ee([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new Lt(0)}}]),vertexShader:Pt.meshtoon_vert,fragmentShader:Pt.meshtoon_frag},matcap:{uniforms:Ee([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:Pt.meshmatcap_vert,fragmentShader:Pt.meshmatcap_frag},points:{uniforms:Ee([et.points,et.fog]),vertexShader:Pt.points_vert,fragmentShader:Pt.points_frag},dashed:{uniforms:Ee([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pt.linedashed_vert,fragmentShader:Pt.linedashed_frag},depth:{uniforms:Ee([et.common,et.displacementmap]),vertexShader:Pt.depth_vert,fragmentShader:Pt.depth_frag},normal:{uniforms:Ee([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:Pt.meshnormal_vert,fragmentShader:Pt.meshnormal_frag},sprite:{uniforms:Ee([et.sprite,et.fog]),vertexShader:Pt.sprite_vert,fragmentShader:Pt.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pt.background_vert,fragmentShader:Pt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:Pt.backgroundCube_vert,fragmentShader:Pt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pt.cube_vert,fragmentShader:Pt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pt.equirect_vert,fragmentShader:Pt.equirect_frag},distanceRGBA:{uniforms:Ee([et.common,et.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pt.distanceRGBA_vert,fragmentShader:Pt.distanceRGBA_frag},shadow:{uniforms:Ee([et.lights,et.fog,{color:{value:new Lt(0)},opacity:{value:1}}]),vertexShader:Pt.shadow_vert,fragmentShader:Pt.shadow_frag}};$e.physical={uniforms:Ee([$e.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new Lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new Lt(0)},specularColor:{value:new Lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:Pt.meshphysical_vert,fragmentShader:Pt.meshphysical_frag};var Rs={r:0,b:0,g:0},zn=new je,gp=new ie;function _p(i,t,e,n,s,r,a){let o=new Lt(0),l=r===!0?0:1,c,h,d=null,p=0,m=null;function g(w){let M=w.isScene===!0?w.background:null;return M&&M.isTexture&&(M=(w.backgroundBlurriness>0?e:t).get(M)),M}function _(w){let M=!1,b=g(w);b===null?f(o,l):b&&b.isColor&&(f(b,1),M=!0);let D=i.xr.getEnvironmentBlendMode();D==="additive"?n.buffers.color.setClear(0,0,0,1,a):D==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function u(w,M){let b=g(M);b&&(b.isCubeTexture||b.mapping===yr)?(h===void 0&&(h=new Yt(new _n(1,1,1),new Qe({name:"BackgroundCubeMaterial",uniforms:Ai($e.backgroundCube.uniforms),vertexShader:$e.backgroundCube.vertexShader,fragmentShader:$e.backgroundCube.fragmentShader,side:ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),zn.copy(M.backgroundRotation),zn.x*=-1,zn.y*=-1,zn.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(zn.y*=-1,zn.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gp.makeRotationFromEuler(zn)),h.material.toneMapped=Xt.getTransfer(b.colorSpace)!==ne,(d!==b||p!==b.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=b,p=b.version,m=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Yt(new Ri(2,2),new Qe({name:"BackgroundMaterial",uniforms:Ai($e.background.uniforms),vertexShader:$e.background.vertexShader,fragmentShader:$e.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Xt.getTransfer(b.colorSpace)!==ne,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||p!==b.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=b,p=b.version,m=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,M){w.getRGB(Rs,kc(i)),n.buffers.color.setClear(Rs.r,Rs.g,Rs.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),l=M,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:_,addToRenderList:u}}function xp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,a=!1;function o(x,S,z,B,V){let J=!1,k=d(B,z,S);r!==k&&(r=k,c(r.object)),J=m(x,B,z,V),J&&g(x,B,z,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(J||a)&&(a=!1,b(x,S,z,B),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function d(x,S,z){let B=z.wireframe===!0,V=n[x.id];V===void 0&&(V={},n[x.id]=V);let J=V[S.id];J===void 0&&(J={},V[S.id]=J);let k=J[B];return k===void 0&&(k=p(l()),J[B]=k),k}function p(x){let S=[],z=[],B=[];for(let V=0;V<e;V++)S[V]=0,z[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:z,attributeDivisors:B,object:x,attributes:{},index:null}}function m(x,S,z,B){let V=r.attributes,J=S.attributes,k=0,Q=z.getAttributes();for(let G in Q)if(Q[G].location>=0){let ct=V[G],_t=J[G];if(_t===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(_t=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(_t=x.instanceColor)),ct===void 0||ct.attribute!==_t||_t&&ct.data!==_t.data)return!0;k++}return r.attributesNum!==k||r.index!==B}function g(x,S,z,B){let V={},J=S.attributes,k=0,Q=z.getAttributes();for(let G in Q)if(Q[G].location>=0){let ct=J[G];ct===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ct=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ct=x.instanceColor));let _t={};_t.attribute=ct,ct&&ct.data&&(_t.data=ct.data),V[G]=_t,k++}r.attributes=V,r.attributesNum=k,r.index=B}function _(){let x=r.newAttributes;for(let S=0,z=x.length;S<z;S++)x[S]=0}function u(x){f(x,0)}function f(x,S){let z=r.newAttributes,B=r.enabledAttributes,V=r.attributeDivisors;z[x]=1,B[x]===0&&(i.enableVertexAttribArray(x),B[x]=1),V[x]!==S&&(i.vertexAttribDivisor(x,S),V[x]=S)}function w(){let x=r.newAttributes,S=r.enabledAttributes;for(let z=0,B=S.length;z<B;z++)S[z]!==x[z]&&(i.disableVertexAttribArray(z),S[z]=0)}function M(x,S,z,B,V,J,k){k===!0?i.vertexAttribIPointer(x,S,z,V,J):i.vertexAttribPointer(x,S,z,B,V,J)}function b(x,S,z,B){_();let V=B.attributes,J=z.getAttributes(),k=S.defaultAttributeValues;for(let Q in J){let G=J[Q];if(G.location>=0){let lt=V[Q];if(lt===void 0&&(Q==="instanceMatrix"&&x.instanceMatrix&&(lt=x.instanceMatrix),Q==="instanceColor"&&x.instanceColor&&(lt=x.instanceColor)),lt!==void 0){let ct=lt.normalized,_t=lt.itemSize,Vt=t.get(lt);if(Vt===void 0)continue;let Zt=Vt.buffer,W=Vt.type,$=Vt.bytesPerElement,mt=W===i.INT||W===i.UNSIGNED_INT||lt.gpuType===Wo;if(lt.isInterleavedBufferAttribute){let ht=lt.data,Rt=ht.stride,St=lt.offset;if(ht.isInstancedInterleavedBuffer){for(let Nt=0;Nt<G.locationSize;Nt++)f(G.location+Nt,ht.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Nt=0;Nt<G.locationSize;Nt++)u(G.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let Nt=0;Nt<G.locationSize;Nt++)M(G.location+Nt,_t/G.locationSize,W,ct,Rt*$,(St+_t/G.locationSize*Nt)*$,mt)}else{if(lt.isInstancedBufferAttribute){for(let ht=0;ht<G.locationSize;ht++)f(G.location+ht,lt.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let ht=0;ht<G.locationSize;ht++)u(G.location+ht);i.bindBuffer(i.ARRAY_BUFFER,Zt);for(let ht=0;ht<G.locationSize;ht++)M(G.location+ht,_t/G.locationSize,W,ct,_t*$,_t/G.locationSize*ht*$,mt)}}else if(k!==void 0){let ct=k[Q];if(ct!==void 0)switch(ct.length){case 2:i.vertexAttrib2fv(G.location,ct);break;case 3:i.vertexAttrib3fv(G.location,ct);break;case 4:i.vertexAttrib4fv(G.location,ct);break;default:i.vertexAttrib1fv(G.location,ct)}}}}w()}function D(){U();for(let x in n){let S=n[x];for(let z in S){let B=S[z];for(let V in B)h(B[V].object),delete B[V];delete S[z]}delete n[x]}}function R(x){if(n[x.id]===void 0)return;let S=n[x.id];for(let z in S){let B=S[z];for(let V in B)h(B[V].object),delete B[V];delete S[z]}delete n[x.id]}function T(x){for(let S in n){let z=n[S];if(z[x.id]===void 0)continue;let B=z[x.id];for(let V in B)h(B[V].object),delete B[V];delete z[x.id]}}function U(){Z(),a=!0,r!==s&&(r=s,c(r.object))}function Z(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:Z,dispose:D,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:u,disableUnusedAttributes:w}}function yp(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}function l(c,h,d,p){if(d===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)a(c[g],h[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,p,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];for(let _=0;_<p.length;_++)e.update(g,n,p[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function vp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let T=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(T){return!(T!==Xe&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){let U=T===os&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==dn&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==hn&&!U)}function l(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(p===!0){let T=t.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),u=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=g>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:u,maxAttributes:f,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:b,vertexTextures:D,maxSamples:R}}function Mp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new De,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){let m=d.length!==0||p||n!==0||s;return s=p,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=h(d,p,0)},this.setState=function(d,p,m){let g=d.clippingPlanes,_=d.clipIntersection,u=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!u)r?h(null):c();else{let w=r?0:n,M=w*4,b=f.clippingState||null;l.value=b,b=h(g,p,M,m);for(let D=0;D!==M;++D)b[D]=e[D];f.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,p,m,g){let _=d!==null?d.length:0,u=null;if(_!==0){if(u=l.value,g!==!0||u===null){let f=m+_*4,w=p.matrixWorldInverse;o.getNormalMatrix(w),(u===null||u.length<f)&&(u=new Float32Array(f));for(let M=0,b=m;M!==_;++M,b+=4)a.copy(d[M]).applyMatrix4(w,o),a.normal.toArray(u,b),u[b+3]=a.constant}l.value=u,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,u}}function Sp(i){let t=new WeakMap;function e(a,o){return o===wa?a.mapping=Mi:o===Ta&&(a.mapping=Si),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===wa||o===Ta)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new ao(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Qs=class extends $s{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},mi=4,Gl=[.125,.215,.35,.446,.526,.582],Wn=20,sa=new Qs,Wl=new Lt,ra=null,aa=0,oa=0,la=!1,Vn=(1+Math.sqrt(5))/2,fi=1/Vn,Xl=[new A(-Vn,fi,0),new A(Vn,fi,0),new A(-fi,0,Vn),new A(fi,0,Vn),new A(0,Vn,-fi),new A(0,Vn,fi),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Ci=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ra=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel(),la=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ql(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ra,aa,oa),this._renderer.xr.enabled=la,t.scissorTest=!1,Cs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Mi||t.mapping===Si?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ra=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel(),la=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:We,minFilter:We,generateMipmaps:!1,type:os,format:Xe,colorSpace:Ln,depthBuffer:!1},s=Yl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yl(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=bp(r)),this._blurMaterial=Ep(r,t,e)}return s}_compileMaterial(t){let e=new Yt(this._lodPlanes[0],t);this._renderer.compile(e,sa)}_sceneToCubeUV(t,e,n,s){let o=new ye(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Wl),h.toneMapping=Pn,h.autoClear=!1;let m=new Ti({name:"PMREM.Background",side:ve,depthWrite:!1,depthTest:!1}),g=new Yt(new _n,m),_=!1,u=t.background;u?u.isColor&&(m.color.copy(u),t.background=null,_=!0):(m.color.copy(Wl),_=!0);for(let f=0;f<6;f++){let w=f%3;w===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):w===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let M=this._cubeSize;Cs(s,w*M,f>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=p,h.autoClear=d,t.background=u}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Mi||t.mapping===Si;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ql());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Yt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;Cs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,sa)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xl[(s-r-1)%Xl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new Yt(this._lodPlanes[s],c),p=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Wn-1),_=r/g,u=isFinite(r)?1+Math.floor(h*_):Wn;u>Wn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${Wn}`);let f=[],w=0;for(let T=0;T<Wn;++T){let U=T/_,Z=Math.exp(-U*U/2);f.push(Z),T===0?w+=Z:T<u&&(w+=2*Z)}for(let T=0;T<f.length;T++)f[T]=f[T]/w;p.envMap.value=t.texture,p.samples.value=u,p.weights.value=f,p.latitudinal.value=a==="latitudinal",o&&(p.poleAxis.value=o);let{_lodMax:M}=this;p.dTheta.value=g,p.mipInt.value=M-n;let b=this._sizeLods[s],D=3*b*(s>M-mi?s-M+mi:0),R=4*(this._cubeSize-b);Cs(e,D,R,3*b,2*b),l.setRenderTarget(e),l.render(d,sa)}};function bp(i){let t=[],e=[],n=[],s=i,r=i-mi+1+Gl.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>i-mi?l=Gl[a-i+mi-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,d=1+c,p=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,u=2,f=1,w=new Float32Array(_*g*m),M=new Float32Array(u*g*m),b=new Float32Array(f*g*m);for(let R=0;R<m;R++){let T=R%3*2/3-1,U=R>2?0:-1,Z=[T,U,0,T+2/3,U,0,T+2/3,U+1,0,T,U,0,T+2/3,U+1,0,T,U+1,0];w.set(Z,_*g*R),M.set(p,u*g*R);let x=[R,R,R,R,R,R];b.set(x,f*g*R)}let D=new pe;D.setAttribute("position",new Me(w,_)),D.setAttribute("uv",new Me(M,u)),D.setAttribute("faceIndex",new Me(b,f)),t.push(D),s>mi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Yl(i,t,e){let n=new pn(i,t,e);return n.texture.mapping=yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ep(i,t,e){let n=new Float32Array(Wn),s=new A(0,1,0);return new Qe({name:"SphericalGaussianBlur",defines:{n:Wn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ql(){return new Qe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Zl(){return new Qe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function jo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===wa||l===Ta,h=l===Mi||l===Si;if(c||h){let d=t.get(o),p=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==p)return e===null&&(e=new Ci(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let m=o.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Ci(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Tp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ks("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ap(i,t,e,n){let s={},r=new WeakMap;function a(d){let p=d.target;p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);for(let g in p.morphAttributes){let _=p.morphAttributes[g];for(let u=0,f=_.length;u<f;u++)t.remove(_[u])}p.removeEventListener("dispose",a),delete s[p.id];let m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function o(d,p){return s[p.id]===!0||(p.addEventListener("dispose",a),s[p.id]=!0,e.memory.geometries++),p}function l(d){let p=d.attributes;for(let g in p)t.update(p[g],i.ARRAY_BUFFER);let m=d.morphAttributes;for(let g in m){let _=m[g];for(let u=0,f=_.length;u<f;u++)t.update(_[u],i.ARRAY_BUFFER)}}function c(d){let p=[],m=d.index,g=d.attributes.position,_=0;if(m!==null){let w=m.array;_=m.version;for(let M=0,b=w.length;M<b;M+=3){let D=w[M+0],R=w[M+1],T=w[M+2];p.push(D,R,R,T,T,D)}}else if(g!==void 0){let w=g.array;_=g.version;for(let M=0,b=w.length/3-1;M<b;M+=3){let D=M+0,R=M+1,T=M+2;p.push(D,R,R,T,T,D)}}else return;let u=new(Bc(p)?Ks:Js)(p,1);u.version=_;let f=r.get(d);f&&t.remove(f),r.set(d,u)}function h(d){let p=r.get(d);if(p){let m=d.index;m!==null&&p.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Rp(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,m){i.drawElements(n,m,r,p*a),e.update(m,n,1)}function c(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,p*a,g),e.update(m,n,g))}function h(p,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,g);let u=0;for(let f=0;f<g;f++)u+=m[f];e.update(u,n,1)}function d(p,m,g,_){if(g===0)return;let u=t.get("WEBGL_multi_draw");if(u===null)for(let f=0;f<p.length;f++)c(p[f]/a,m[f],_[f]);else{u.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=m[w];for(let w=0;w<_.length;w++)e.update(f,n,_[w])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Cp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Pp(i,t,e){let n=new WeakMap,s=new $t;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,p=n.get(o);if(p===void 0||p.count!==d){let Z=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",Z)};p!==void 0&&p.texture.dispose();let m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[],M=0;m===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let b=o.attributes.position.count*M,D=1;b>t.maxTextureSize&&(D=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let R=new Float32Array(b*D*4*d),T=new Zs(R,b,D,d);T.type=hn,T.needsUpdate=!0;let U=M*4;for(let x=0;x<d;x++){let S=u[x],z=f[x],B=w[x],V=b*D*4*x;for(let J=0;J<S.count;J++){let k=J*U;m===!0&&(s.fromBufferAttribute(S,J),R[V+k+0]=s.x,R[V+k+1]=s.y,R[V+k+2]=s.z,R[V+k+3]=0),g===!0&&(s.fromBufferAttribute(z,J),R[V+k+4]=s.x,R[V+k+5]=s.y,R[V+k+6]=s.z,R[V+k+7]=0),_===!0&&(s.fromBufferAttribute(B,J),R[V+k+8]=s.x,R[V+k+9]=s.y,R[V+k+10]=s.z,R[V+k+11]=B.itemSize===4?s.w:1)}}p={count:d,texture:T,size:new ot(b,D)},n.set(o,p),o.addEventListener("dispose",Z)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let _=0;_<c.length;_++)m+=c[_];let g=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Ip(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var tr=class extends ze{constructor(t,e,n,s,r,a,o,l,c,h=_i){if(h!==_i&&h!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===_i&&(n=qn),n===void 0&&h===Ei&&(n=bi),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Hc=new ze,Jl=new tr(1,1),Gc=new Zs,Wc=new so,Xc=new js,Kl=[],$l=[],jl=new Float32Array(16),Ql=new Float32Array(9),tc=new Float32Array(4);function Di(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Kl[s];if(r===void 0&&(r=new Float32Array(s),Kl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function he(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Mr(i,t){let e=$l[t];e===void 0&&(e=new Int32Array(t),$l[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Lp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Dp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2fv(this.addr,t),he(e,t)}}function Up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ce(e,t))return;i.uniform3fv(this.addr,t),he(e,t)}}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4fv(this.addr,t),he(e,t)}}function Op(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;tc.set(n),i.uniformMatrix2fv(this.addr,!1,tc),he(e,n)}}function Fp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;Ql.set(n),i.uniformMatrix3fv(this.addr,!1,Ql),he(e,n)}}function Bp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),he(e,t)}else{if(ce(e,n))return;jl.set(n),i.uniformMatrix4fv(this.addr,!1,jl),he(e,n)}}function zp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2iv(this.addr,t),he(e,t)}}function Vp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ce(e,t))return;i.uniform3iv(this.addr,t),he(e,t)}}function Hp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4iv(this.addr,t),he(e,t)}}function Gp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Wp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ce(e,t))return;i.uniform2uiv(this.addr,t),he(e,t)}}function Xp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ce(e,t))return;i.uniform3uiv(this.addr,t),he(e,t)}}function Yp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ce(e,t))return;i.uniform4uiv(this.addr,t),he(e,t)}}function qp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Jl.compareFunction=Oc,r=Jl):r=Hc,e.setTexture2D(t||r,s)}function Zp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Wc,s)}function Jp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Xc,s)}function Kp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Gc,s)}function $p(i){switch(i){case 5126:return Lp;case 35664:return Dp;case 35665:return Up;case 35666:return Np;case 35674:return Op;case 35675:return Fp;case 35676:return Bp;case 5124:case 35670:return zp;case 35667:case 35671:return kp;case 35668:case 35672:return Vp;case 35669:case 35673:return Hp;case 5125:return Gp;case 36294:return Wp;case 36295:return Xp;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return Kp}}function jp(i,t){i.uniform1fv(this.addr,t)}function Qp(i,t){let e=Di(t,this.size,2);i.uniform2fv(this.addr,e)}function tm(i,t){let e=Di(t,this.size,3);i.uniform3fv(this.addr,e)}function em(i,t){let e=Di(t,this.size,4);i.uniform4fv(this.addr,e)}function nm(i,t){let e=Di(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function im(i,t){let e=Di(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function sm(i,t){let e=Di(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function rm(i,t){i.uniform1iv(this.addr,t)}function am(i,t){i.uniform2iv(this.addr,t)}function om(i,t){i.uniform3iv(this.addr,t)}function lm(i,t){i.uniform4iv(this.addr,t)}function cm(i,t){i.uniform1uiv(this.addr,t)}function hm(i,t){i.uniform2uiv(this.addr,t)}function um(i,t){i.uniform3uiv(this.addr,t)}function dm(i,t){i.uniform4uiv(this.addr,t)}function fm(i,t,e){let n=this.cache,s=t.length,r=Mr(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Hc,r[a])}function pm(i,t,e){let n=this.cache,s=t.length,r=Mr(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Wc,r[a])}function mm(i,t,e){let n=this.cache,s=t.length,r=Mr(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Xc,r[a])}function gm(i,t,e){let n=this.cache,s=t.length,r=Mr(e,s);ce(n,r)||(i.uniform1iv(this.addr,r),he(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Gc,r[a])}function _m(i){switch(i){case 5126:return jp;case 35664:return Qp;case 35665:return tm;case 35666:return em;case 35674:return nm;case 35675:return im;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return lm;case 5125:return cm;case 36294:return hm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}var oo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=$p(e.type)}},lo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_m(e.type)}},co=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ca=/(\w+)(\])?(\[|\.)?/g;function ec(i,t){i.seq.push(t),i.map[t.id]=t}function xm(i,t,e){let n=i.name,s=n.length;for(ca.lastIndex=0;;){let r=ca.exec(n),a=ca.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ec(e,c===void 0?new oo(o,i,t):new lo(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new co(o),ec(e,d)),e=d}}}var yi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);xm(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function nc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var ym=37297,vm=0;function Mm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Sm(i){let t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(i),n;switch(t===e?n="":t===Ws&&e===Gs?n="LinearDisplayP3ToLinearSRGB":t===Gs&&e===Ws&&(n="LinearSRGBToLinearDisplayP3"),i){case Ln:case vr:return[n,"LinearTransferOETF"];case Ke:case Ko:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ic(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Mm(i.getShaderSource(t),a)}else return s}function bm(i,t){let e=Sm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Em(i,t){let e;switch(t){case Dh:e="Linear";break;case Uh:e="Reinhard";break;case Nh:e="Cineon";break;case Go:e="ACESFilmic";break;case Fh:e="AgX";break;case Bh:e="Neutral";break;case Oh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ps=new A;function wm(){Xt.getLuminanceCoefficients(Ps);let i=Ps.x.toFixed(4),t=Ps.y.toFixed(4),e=Ps.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xi).join(`
`)}function Am(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Rm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Xi(i){return i!==""}function sc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Cm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ho(i){return i.replace(Cm,Im)}var Pm=new Map;function Im(i,t){let e=Pt[t];if(e===void 0){let n=Pm.get(t);if(n!==void 0)e=Pt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ho(e)}var Lm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ac(i){return i.replace(Lm,Dm)}function Dm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Um(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ho?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===cn&&(t="SHADOWMAP_TYPE_VSM"),t}function Nm(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Mi:case Si:t="ENVMAP_TYPE_CUBE";break;case yr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Om(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Si:t="ENVMAP_MODE_REFRACTION";break}return t}function Fm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case bc:t="ENVMAP_BLENDING_MULTIPLY";break;case Ih:t="ENVMAP_BLENDING_MIX";break;case Lh:t="ENVMAP_BLENDING_ADD";break}return t}function Bm(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function zm(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Um(e),c=Nm(e),h=Om(e),d=Fm(e),p=Bm(e),m=Tm(e),g=Am(r),_=s.createProgram(),u,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xi).join(`
`),u.length>0&&(u+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Xi).join(`
`),f.length>0&&(f+=`
`)):(u=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),f=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Pn?"#define TONE_MAPPING":"",e.toneMapping!==Pn?Pt.tonemapping_pars_fragment:"",e.toneMapping!==Pn?Em("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Pt.colorspace_pars_fragment,bm("linearToOutputTexel",e.outputColorSpace),wm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xi).join(`
`)),a=ho(a),a=sc(a,e),a=rc(a,e),o=ho(o),o=sc(o,e),o=rc(o,e),a=ac(a),o=ac(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,u=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,f=["#define varying in",e.glslVersion===El?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===El?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let M=w+u+a,b=w+f+o,D=nc(s,s.VERTEX_SHADER,M),R=nc(s,s.FRAGMENT_SHADER,b);s.attachShader(_,D),s.attachShader(_,R),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(S){if(i.debug.checkShaderErrors){let z=s.getProgramInfoLog(_).trim(),B=s.getShaderInfoLog(D).trim(),V=s.getShaderInfoLog(R).trim(),J=!0,k=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,D,R);else{let Q=ic(s,D,"vertex"),G=ic(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+z+`
`+Q+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(B===""||V==="")&&(k=!1);k&&(S.diagnostics={runnable:J,programLog:z,vertexShader:{log:B,prefix:u},fragmentShader:{log:V,prefix:f}})}s.deleteShader(D),s.deleteShader(R),U=new yi(s,_),Z=Rm(s,_)}let U;this.getUniforms=function(){return U===void 0&&T(this),U};let Z;this.getAttributes=function(){return Z===void 0&&T(this),Z};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,ym)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=R,this}var km=0,uo=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new fo(t),e.set(t,n)),n}},fo=class{constructor(t){this.id=km++,this.code=t,this.usedTimes=0}};function Vm(i,t,e,n,s,r,a){let o=new Qi,l=new uo,c=new Set,h=[],d=s.logarithmicDepthBuffer,p=s.reverseDepthBuffer,m=s.vertexTextures,g=s.precision,_={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(x){return c.add(x),x===0?"uv":`uv${x}`}function f(x,S,z,B,V){let J=B.fog,k=V.geometry,Q=x.isMeshStandardMaterial?B.environment:null,G=(x.isMeshStandardMaterial?e:t).get(x.envMap||Q),lt=G&&G.mapping===yr?G.image.height:null,ct=_[x.type];x.precision!==null&&(g=s.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));let _t=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Vt=_t!==void 0?_t.length:0,Zt=0;k.morphAttributes.position!==void 0&&(Zt=1),k.morphAttributes.normal!==void 0&&(Zt=2),k.morphAttributes.color!==void 0&&(Zt=3);let W,$,mt,ht;if(ct){let Te=$e[ct];W=Te.vertexShader,$=Te.fragmentShader}else W=x.vertexShader,$=x.fragmentShader,l.update(x),mt=l.getVertexShaderID(x),ht=l.getFragmentShaderID(x);let Rt=i.getRenderTarget(),St=V.isInstancedMesh===!0,Nt=V.isBatchedMesh===!0,Kt=!!x.map,Ot=!!x.matcap,C=!!G,Re=!!x.aoMap,Dt=!!x.lightMap,zt=!!x.bumpMap,Et=!!x.normalMap,te=!!x.displacementMap,At=!!x.emissiveMap,E=!!x.metalnessMap,y=!!x.roughnessMap,N=x.anisotropy>0,Y=x.clearcoat>0,K=x.dispersion>0,X=x.iridescence>0,xt=x.sheen>0,nt=x.transmission>0,ut=N&&!!x.anisotropyMap,kt=Y&&!!x.clearcoatMap,j=Y&&!!x.clearcoatNormalMap,dt=Y&&!!x.clearcoatRoughnessMap,wt=X&&!!x.iridescenceMap,Tt=X&&!!x.iridescenceThicknessMap,ft=xt&&!!x.sheenColorMap,Ut=xt&&!!x.sheenRoughnessMap,Ct=!!x.specularMap,Qt=!!x.specularColorMap,P=!!x.specularIntensityMap,rt=nt&&!!x.transmissionMap,H=nt&&!!x.thicknessMap,q=!!x.gradientMap,it=!!x.alphaMap,at=x.alphaTest>0,Ft=!!x.alphaHash,oe=!!x.extensions,we=Pn;x.toneMapped&&(Rt===null||Rt.isXRRenderTarget===!0)&&(we=i.toneMapping);let Ht={shaderID:ct,shaderType:x.type,shaderName:x.name,vertexShader:W,fragmentShader:$,defines:x.defines,customVertexShaderID:mt,customFragmentShaderID:ht,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:Nt,batchingColor:Nt&&V._colorsTexture!==null,instancing:St,instancingColor:St&&V.instanceColor!==null,instancingMorph:St&&V.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:Rt===null?i.outputColorSpace:Rt.isXRRenderTarget===!0?Rt.texture.colorSpace:Ln,alphaToCoverage:!!x.alphaToCoverage,map:Kt,matcap:Ot,envMap:C,envMapMode:C&&G.mapping,envMapCubeUVHeight:lt,aoMap:Re,lightMap:Dt,bumpMap:zt,normalMap:Et,displacementMap:m&&te,emissiveMap:At,normalMapObjectSpace:Et&&x.normalMapType===Hh,normalMapTangentSpace:Et&&x.normalMapType===Nc,metalnessMap:E,roughnessMap:y,anisotropy:N,anisotropyMap:ut,clearcoat:Y,clearcoatMap:kt,clearcoatNormalMap:j,clearcoatRoughnessMap:dt,dispersion:K,iridescence:X,iridescenceMap:wt,iridescenceThicknessMap:Tt,sheen:xt,sheenColorMap:ft,sheenRoughnessMap:Ut,specularMap:Ct,specularColorMap:Qt,specularIntensityMap:P,transmission:nt,transmissionMap:rt,thicknessMap:H,gradientMap:q,opaque:x.transparent===!1&&x.blending===gi&&x.alphaToCoverage===!1,alphaMap:it,alphaTest:at,alphaHash:Ft,combine:x.combine,mapUv:Kt&&u(x.map.channel),aoMapUv:Re&&u(x.aoMap.channel),lightMapUv:Dt&&u(x.lightMap.channel),bumpMapUv:zt&&u(x.bumpMap.channel),normalMapUv:Et&&u(x.normalMap.channel),displacementMapUv:te&&u(x.displacementMap.channel),emissiveMapUv:At&&u(x.emissiveMap.channel),metalnessMapUv:E&&u(x.metalnessMap.channel),roughnessMapUv:y&&u(x.roughnessMap.channel),anisotropyMapUv:ut&&u(x.anisotropyMap.channel),clearcoatMapUv:kt&&u(x.clearcoatMap.channel),clearcoatNormalMapUv:j&&u(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&u(x.clearcoatRoughnessMap.channel),iridescenceMapUv:wt&&u(x.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&u(x.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&u(x.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&u(x.sheenRoughnessMap.channel),specularMapUv:Ct&&u(x.specularMap.channel),specularColorMapUv:Qt&&u(x.specularColorMap.channel),specularIntensityMapUv:P&&u(x.specularIntensityMap.channel),transmissionMapUv:rt&&u(x.transmissionMap.channel),thicknessMapUv:H&&u(x.thicknessMap.channel),alphaMapUv:it&&u(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Et||N),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(Kt||it),fog:!!J,useFog:x.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:p,skinning:V.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Vt,morphTextureStride:Zt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:we,decodeVideoTexture:Kt&&x.map.isVideoTexture===!0&&Xt.getTransfer(x.map.colorSpace)===ne,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ue,flipSided:x.side===ve,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:oe&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&x.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ht.vertexUv1s=c.has(1),Ht.vertexUv2s=c.has(2),Ht.vertexUv3s=c.has(3),c.clear(),Ht}function w(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let z in x.defines)S.push(z),S.push(x.defines[z]);return x.isRawShaderMaterial===!1&&(M(S,x),b(S,x),S.push(i.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function M(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function b(x,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.alphaToCoverage&&o.enable(20),x.push(o.mask)}function D(x){let S=_[x.type],z;if(S){let B=$e[S];z=Pu.clone(B.uniforms)}else z=x.uniforms;return z}function R(x,S){let z;for(let B=0,V=h.length;B<V;B++){let J=h[B];if(J.cacheKey===S){z=J,++z.usedTimes;break}}return z===void 0&&(z=new zm(i,S,x,r),h.push(z)),z}function T(x){if(--x.usedTimes===0){let S=h.indexOf(x);h[S]=h[h.length-1],h.pop(),x.destroy()}}function U(x){l.remove(x)}function Z(){l.dispose()}return{getParameters:f,getProgramCacheKey:w,getUniforms:D,acquireProgram:R,releaseProgram:T,releaseShaderCache:U,programs:h,dispose:Z}}function Hm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Gm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function lc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function cc(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,p,m,g,_,u){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:p,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:u},i[t]=f):(f.id=d.id,f.object=d,f.geometry=p,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=u),t++,f}function o(d,p,m,g,_,u){let f=a(d,p,m,g,_,u);m.transmission>0?n.push(f):m.transparent===!0?s.push(f):e.push(f)}function l(d,p,m,g,_,u){let f=a(d,p,m,g,_,u);m.transmission>0?n.unshift(f):m.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,p){e.length>1&&e.sort(d||Gm),n.length>1&&n.sort(p||lc),s.length>1&&s.sort(p||lc)}function h(){for(let d=t,p=i.length;d<p;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Wm(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new cc,i.set(n,[a])):s>=r.length?(a=new cc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Xm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Lt};break;case"SpotLight":e={position:new A,direction:new A,color:new Lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Lt,groundColor:new Lt};break;case"RectAreaLight":e={color:new Lt,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function Ym(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var qm=0;function Zm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jm(i){let t=new Xm,e=Ym(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);let s=new A,r=new ie,a=new ie;function o(c){let h=0,d=0,p=0;for(let Z=0;Z<9;Z++)n.probe[Z].set(0,0,0);let m=0,g=0,_=0,u=0,f=0,w=0,M=0,b=0,D=0,R=0,T=0;c.sort(Zm);for(let Z=0,x=c.length;Z<x;Z++){let S=c[Z],z=S.color,B=S.intensity,V=S.distance,J=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=z.r*B,d+=z.g*B,p+=z.b*B;else if(S.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(S.sh.coefficients[k],B);T++}else if(S.isDirectionalLight){let k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let Q=S.shadow,G=e.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[m]=G,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=S.shadow.matrix,w++}n.directional[m]=k,m++}else if(S.isSpotLight){let k=t.get(S);k.position.setFromMatrixPosition(S.matrixWorld),k.color.copy(z).multiplyScalar(B),k.distance=V,k.coneCos=Math.cos(S.angle),k.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),k.decay=S.decay,n.spot[_]=k;let Q=S.shadow;if(S.map&&(n.spotLightMap[D]=S.map,D++,Q.updateMatrices(S),S.castShadow&&R++),n.spotLightMatrix[_]=Q.matrix,S.castShadow){let G=e.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=J,b++}_++}else if(S.isRectAreaLight){let k=t.get(S);k.color.copy(z).multiplyScalar(B),k.halfWidth.set(S.width*.5,0,0),k.halfHeight.set(0,S.height*.5,0),n.rectArea[u]=k,u++}else if(S.isPointLight){let k=t.get(S);if(k.color.copy(S.color).multiplyScalar(S.intensity),k.distance=S.distance,k.decay=S.decay,S.castShadow){let Q=S.shadow,G=e.get(S);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=J,n.pointShadowMatrix[g]=S.shadow.matrix,M++}n.point[g]=k,g++}else if(S.isHemisphereLight){let k=t.get(S);k.skyColor.copy(S.color).multiplyScalar(B),k.groundColor.copy(S.groundColor).multiplyScalar(B),n.hemi[f]=k,f++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=et.LTC_FLOAT_1,n.rectAreaLTC2=et.LTC_FLOAT_2):(n.rectAreaLTC1=et.LTC_HALF_1,n.rectAreaLTC2=et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;let U=n.hash;(U.directionalLength!==m||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==u||U.hemiLength!==f||U.numDirectionalShadows!==w||U.numPointShadows!==M||U.numSpotShadows!==b||U.numSpotMaps!==D||U.numLightProbes!==T)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=u,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=b+D-R,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,U.directionalLength=m,U.pointLength=g,U.spotLength=_,U.rectAreaLength=u,U.hemiLength=f,U.numDirectionalShadows=w,U.numPointShadows=M,U.numSpotShadows=b,U.numSpotMaps=D,U.numLightProbes=T,n.version=qm++)}function l(c,h){let d=0,p=0,m=0,g=0,_=0,u=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){let M=c[f];if(M.isDirectionalLight){let b=n.directional[d];b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),d++}else if(M.isSpotLight){let b=n.spot[m];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),b.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(u),m++}else if(M.isRectAreaLight){let b=n.rectArea[g];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),a.identity(),r.copy(M.matrixWorld),r.premultiply(u),a.extractRotation(r),b.halfWidth.set(M.width*.5,0,0),b.halfHeight.set(0,M.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){let b=n.point[p];b.position.setFromMatrixPosition(M.matrixWorld),b.position.applyMatrix4(u),p++}else if(M.isHemisphereLight){let b=n.hemi[_];b.direction.setFromMatrixPosition(M.matrixWorld),b.direction.transformDirection(u),_++}}}return{setup:o,setupView:l,state:n}}function hc(i){let t=new Jm(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Km(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new hc(i),t.set(s,[o])):r>=a.length?(o=new hc(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var po=class extends gn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=kh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},mo=class extends gn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},$m=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qm(i,t,e){let n=new ts,s=new ot,r=new ot,a=new $t,o=new po({depthPacking:Vh}),l=new mo,c={},h=e.maxTextureSize,d={[In]:ve,[ve]:In,[Ue]:Ue},p=new Qe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:$m,fragmentShader:jm}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new pe;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Yt(g,p),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sc;let f=this.type;this.render=function(R,T,U){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||R.length===0)return;let Z=i.getRenderTarget(),x=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),z=i.state;z.setBlending(Cn),z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);let B=f!==cn&&this.type===cn,V=f===cn&&this.type!==cn;for(let J=0,k=R.length;J<k;J++){let Q=R[J],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let lt=G.getFrameExtents();if(s.multiply(lt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/lt.x),s.x=r.x*lt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/lt.y),s.y=r.y*lt.y,G.mapSize.y=r.y)),G.map===null||B===!0||V===!0){let _t=this.type!==cn?{minFilter:Be,magFilter:Be}:{};G.map!==null&&G.map.dispose(),G.map=new pn(s.x,s.y,_t),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();let ct=G.getViewportCount();for(let _t=0;_t<ct;_t++){let Vt=G.getViewport(_t);a.set(r.x*Vt.x,r.y*Vt.y,r.x*Vt.z,r.y*Vt.w),z.viewport(a),G.updateMatrices(Q,_t),n=G.getFrustum(),b(T,U,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===cn&&w(G,U),G.needsUpdate=!1}f=this.type,u.needsUpdate=!1,i.setRenderTarget(Z,x,S)};function w(R,T){let U=t.update(_);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new pn(s.x,s.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(T,null,U,p,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(T,null,U,m,_,null)}function M(R,T,U,Z){let x=null,S=U.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(S!==void 0)x=S;else if(x=U.isPointLight===!0?l:o,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){let z=x.uuid,B=T.uuid,V=c[z];V===void 0&&(V={},c[z]=V);let J=V[B];J===void 0&&(J=x.clone(),V[B]=J,T.addEventListener("dispose",D)),x=J}if(x.visible=T.visible,x.wireframe=T.wireframe,Z===cn?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){let z=i.properties.get(x);z.light=U}return x}function b(R,T,U,Z,x){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&x===cn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,R.matrixWorld);let B=t.update(R),V=R.material;if(Array.isArray(V)){let J=B.groups;for(let k=0,Q=J.length;k<Q;k++){let G=J[k],lt=V[G.materialIndex];if(lt&&lt.visible){let ct=M(R,lt,Z,x);R.onBeforeShadow(i,R,T,U,B,ct,G),i.renderBufferDirect(U,null,B,ct,R,G),R.onAfterShadow(i,R,T,U,B,ct,G)}}}else if(V.visible){let J=M(R,V,Z,x);R.onBeforeShadow(i,R,T,U,B,J,null),i.renderBufferDirect(U,null,B,J,R,null),R.onAfterShadow(i,R,T,U,B,J,null)}}let z=R.children;for(let B=0,V=z.length;B<V;B++)b(z[B],T,U,Z,x)}function D(R){R.target.removeEventListener("dispose",D);for(let U in c){let Z=c[U],x=R.target.uuid;x in Z&&(Z[x].dispose(),delete Z[x])}}}var tg={[xa]:ya,[va]:ba,[Ma]:Ea,[vi]:Sa,[ya]:xa,[ba]:va,[Ea]:Ma,[Sa]:vi};function eg(i){function t(){let P=!1,rt=new $t,H=null,q=new $t(0,0,0,0);return{setMask:function(it){H!==it&&!P&&(i.colorMask(it,it,it,it),H=it)},setLocked:function(it){P=it},setClear:function(it,at,Ft,oe,we){we===!0&&(it*=oe,at*=oe,Ft*=oe),rt.set(it,at,Ft,oe),q.equals(rt)===!1&&(i.clearColor(it,at,Ft,oe),q.copy(rt))},reset:function(){P=!1,H=null,q.set(-1,0,0,0)}}}function e(){let P=!1,rt=!1,H=null,q=null,it=null;return{setReversed:function(at){rt=at},setTest:function(at){at?mt(i.DEPTH_TEST):ht(i.DEPTH_TEST)},setMask:function(at){H!==at&&!P&&(i.depthMask(at),H=at)},setFunc:function(at){if(rt&&(at=tg[at]),q!==at){switch(at){case xa:i.depthFunc(i.NEVER);break;case ya:i.depthFunc(i.ALWAYS);break;case va:i.depthFunc(i.LESS);break;case vi:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case Sa:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case Ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=at}},setLocked:function(at){P=at},setClear:function(at){it!==at&&(i.clearDepth(at),it=at)},reset:function(){P=!1,H=null,q=null,it=null}}}function n(){let P=!1,rt=null,H=null,q=null,it=null,at=null,Ft=null,oe=null,we=null;return{setTest:function(Ht){P||(Ht?mt(i.STENCIL_TEST):ht(i.STENCIL_TEST))},setMask:function(Ht){rt!==Ht&&!P&&(i.stencilMask(Ht),rt=Ht)},setFunc:function(Ht,Te,nn){(H!==Ht||q!==Te||it!==nn)&&(i.stencilFunc(Ht,Te,nn),H=Ht,q=Te,it=nn)},setOp:function(Ht,Te,nn){(at!==Ht||Ft!==Te||oe!==nn)&&(i.stencilOp(Ht,Te,nn),at=Ht,Ft=Te,oe=nn)},setLocked:function(Ht){P=Ht},setClear:function(Ht){we!==Ht&&(i.clearStencil(Ht),we=Ht)},reset:function(){P=!1,rt=null,H=null,q=null,it=null,at=null,Ft=null,oe=null,we=null}}}let s=new t,r=new e,a=new n,o=new WeakMap,l=new WeakMap,c={},h={},d=new WeakMap,p=[],m=null,g=!1,_=null,u=null,f=null,w=null,M=null,b=null,D=null,R=new Lt(0,0,0),T=0,U=!1,Z=null,x=null,S=null,z=null,B=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,k=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Q)[1]),J=k>=1):Q.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),J=k>=2);let G=null,lt={},ct=i.getParameter(i.SCISSOR_BOX),_t=i.getParameter(i.VIEWPORT),Vt=new $t().fromArray(ct),Zt=new $t().fromArray(_t);function W(P,rt,H,q){let it=new Uint8Array(4),at=i.createTexture();i.bindTexture(P,at),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<H;Ft++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,it):i.texImage2D(rt+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,it);return at}let $={};$[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),mt(i.DEPTH_TEST),r.setFunc(vi),Dt(!1),zt(ml),mt(i.CULL_FACE),C(Cn);function mt(P){c[P]!==!0&&(i.enable(P),c[P]=!0)}function ht(P){c[P]!==!1&&(i.disable(P),c[P]=!1)}function Rt(P,rt){return h[P]!==rt?(i.bindFramebuffer(P,rt),h[P]=rt,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=rt),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function St(P,rt){let H=p,q=!1;if(P){H=d.get(rt),H===void 0&&(H=[],d.set(rt,H));let it=P.textures;if(H.length!==it.length||H[0]!==i.COLOR_ATTACHMENT0){for(let at=0,Ft=it.length;at<Ft;at++)H[at]=i.COLOR_ATTACHMENT0+at;H.length=it.length,q=!0}}else H[0]!==i.BACK&&(H[0]=i.BACK,q=!0);q&&i.drawBuffers(H)}function Nt(P){return m!==P?(i.useProgram(P),m=P,!0):!1}let Kt={[Hn]:i.FUNC_ADD,[ph]:i.FUNC_SUBTRACT,[mh]:i.FUNC_REVERSE_SUBTRACT};Kt[gh]=i.MIN,Kt[_h]=i.MAX;let Ot={[xh]:i.ZERO,[yh]:i.ONE,[vh]:i.SRC_COLOR,[ga]:i.SRC_ALPHA,[Th]:i.SRC_ALPHA_SATURATE,[Eh]:i.DST_COLOR,[Sh]:i.DST_ALPHA,[Mh]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[wh]:i.ONE_MINUS_DST_COLOR,[bh]:i.ONE_MINUS_DST_ALPHA,[Ah]:i.CONSTANT_COLOR,[Rh]:i.ONE_MINUS_CONSTANT_COLOR,[Ch]:i.CONSTANT_ALPHA,[Ph]:i.ONE_MINUS_CONSTANT_ALPHA};function C(P,rt,H,q,it,at,Ft,oe,we,Ht){if(P===Cn){g===!0&&(ht(i.BLEND),g=!1);return}if(g===!1&&(mt(i.BLEND),g=!0),P!==fh){if(P!==_||Ht!==U){if((u!==Hn||M!==Hn)&&(i.blendEquation(i.FUNC_ADD),u=Hn,M=Hn),Ht)switch(P){case gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gl:i.blendFunc(i.ONE,i.ONE);break;case _l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case _l:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}f=null,w=null,b=null,D=null,R.set(0,0,0),T=0,_=P,U=Ht}return}it=it||rt,at=at||H,Ft=Ft||q,(rt!==u||it!==M)&&(i.blendEquationSeparate(Kt[rt],Kt[it]),u=rt,M=it),(H!==f||q!==w||at!==b||Ft!==D)&&(i.blendFuncSeparate(Ot[H],Ot[q],Ot[at],Ot[Ft]),f=H,w=q,b=at,D=Ft),(oe.equals(R)===!1||we!==T)&&(i.blendColor(oe.r,oe.g,oe.b,we),R.copy(oe),T=we),_=P,U=!1}function Re(P,rt){P.side===Ue?ht(i.CULL_FACE):mt(i.CULL_FACE);let H=P.side===ve;rt&&(H=!H),Dt(H),P.blending===gi&&P.transparent===!1?C(Cn):C(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),r.setFunc(P.depthFunc),r.setTest(P.depthTest),r.setMask(P.depthWrite),s.setMask(P.colorWrite);let q=P.stencilWrite;a.setTest(q),q&&(a.setMask(P.stencilWriteMask),a.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),a.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),te(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?mt(i.SAMPLE_ALPHA_TO_COVERAGE):ht(i.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(P){Z!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),Z=P)}function zt(P){P!==uh?(mt(i.CULL_FACE),P!==x&&(P===ml?i.cullFace(i.BACK):P===dh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ht(i.CULL_FACE),x=P}function Et(P){P!==S&&(J&&i.lineWidth(P),S=P)}function te(P,rt,H){P?(mt(i.POLYGON_OFFSET_FILL),(z!==rt||B!==H)&&(i.polygonOffset(rt,H),z=rt,B=H)):ht(i.POLYGON_OFFSET_FILL)}function At(P){P?mt(i.SCISSOR_TEST):ht(i.SCISSOR_TEST)}function E(P){P===void 0&&(P=i.TEXTURE0+V-1),G!==P&&(i.activeTexture(P),G=P)}function y(P,rt,H){H===void 0&&(G===null?H=i.TEXTURE0+V-1:H=G);let q=lt[H];q===void 0&&(q={type:void 0,texture:void 0},lt[H]=q),(q.type!==P||q.texture!==rt)&&(G!==H&&(i.activeTexture(H),G=H),i.bindTexture(P,rt||$[P]),q.type=P,q.texture=rt)}function N(){let P=lt[G];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function X(){try{i.texSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function xt(){try{i.texSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function nt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ut(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function kt(){try{i.texStorage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function j(){try{i.texStorage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function dt(){try{i.texImage2D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function wt(){try{i.texImage3D.apply(i,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Tt(P){Vt.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Vt.copy(P))}function ft(P){Zt.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),Zt.copy(P))}function Ut(P,rt){let H=l.get(rt);H===void 0&&(H=new WeakMap,l.set(rt,H));let q=H.get(P);q===void 0&&(q=i.getUniformBlockIndex(rt,P.name),H.set(P,q))}function Ct(P,rt){let q=l.get(rt).get(P);o.get(rt)!==q&&(i.uniformBlockBinding(rt,q,P.__bindingPointIndex),o.set(rt,q))}function Qt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,lt={},h={},d=new WeakMap,p=[],m=null,g=!1,_=null,u=null,f=null,w=null,M=null,b=null,D=null,R=new Lt(0,0,0),T=0,U=!1,Z=null,x=null,S=null,z=null,B=null,Vt.set(0,0,i.canvas.width,i.canvas.height),Zt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:mt,disable:ht,bindFramebuffer:Rt,drawBuffers:St,useProgram:Nt,setBlending:C,setMaterial:Re,setFlipSided:Dt,setCullFace:zt,setLineWidth:Et,setPolygonOffset:te,setScissorTest:At,activeTexture:E,bindTexture:y,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:dt,texImage3D:wt,updateUBOMapping:Ut,uniformBlockBinding:Ct,texStorage2D:kt,texStorage3D:j,texSubImage2D:X,texSubImage3D:xt,compressedTexSubImage2D:nt,compressedTexSubImage3D:ut,scissor:Tt,viewport:ft,reset:Qt}}function uc(i,t,e,n){let s=ng(n);switch(e){case Rc:return i*t;case Pc:return i*t;case Ic:return i*t*2;case Lc:return i*t/s.components*s.byteLength;case qo:return i*t/s.components*s.byteLength;case Dc:return i*t*2/s.components*s.byteLength;case Zo:return i*t*2/s.components*s.byteLength;case Cc:return i*t*3/s.components*s.byteLength;case Xe:return i*t*4/s.components*s.byteLength;case Jo:return i*t*4/s.components*s.byteLength;case Ns:case Os:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Fs:case Bs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Pa:case La:return Math.max(i,16)*Math.max(t,8)/4;case Ca:case Ia:return Math.max(i,8)*Math.max(t,8)/2;case Da:case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case qa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case zs:case Ka:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Uc:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Qa:case to:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ng(i){switch(i){case dn:case wc:return{byteLength:1,components:1};case $i:case Tc:case os:return{byteLength:2,components:1};case Xo:case Yo:return{byteLength:2,components:4};case qn:case Wo:case hn:return{byteLength:4,components:1};case Ac:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function ig(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ot,h=new WeakMap,d,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return m?new OffscreenCanvas(E,y):Ys("canvas")}function _(E,y,N){let Y=1,K=At(E);if((K.width>N||K.height>N)&&(Y=N/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let X=Math.floor(Y*K.width),xt=Math.floor(Y*K.height);d===void 0&&(d=g(X,xt));let nt=y?g(X,xt):d;return nt.width=X,nt.height=xt,nt.getContext("2d").drawImage(E,0,0,X,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+xt+")."),nt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),E;return E}function u(E){return E.generateMipmaps&&E.minFilter!==Be&&E.minFilter!==We}function f(E){i.generateMipmap(E)}function w(E,y,N,Y,K=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let X=y;if(y===i.RED&&(N===i.FLOAT&&(X=i.R32F),N===i.HALF_FLOAT&&(X=i.R16F),N===i.UNSIGNED_BYTE&&(X=i.R8)),y===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.R8UI),N===i.UNSIGNED_SHORT&&(X=i.R16UI),N===i.UNSIGNED_INT&&(X=i.R32UI),N===i.BYTE&&(X=i.R8I),N===i.SHORT&&(X=i.R16I),N===i.INT&&(X=i.R32I)),y===i.RG&&(N===i.FLOAT&&(X=i.RG32F),N===i.HALF_FLOAT&&(X=i.RG16F),N===i.UNSIGNED_BYTE&&(X=i.RG8)),y===i.RG_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RG8UI),N===i.UNSIGNED_SHORT&&(X=i.RG16UI),N===i.UNSIGNED_INT&&(X=i.RG32UI),N===i.BYTE&&(X=i.RG8I),N===i.SHORT&&(X=i.RG16I),N===i.INT&&(X=i.RG32I)),y===i.RGB_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RGB8UI),N===i.UNSIGNED_SHORT&&(X=i.RGB16UI),N===i.UNSIGNED_INT&&(X=i.RGB32UI),N===i.BYTE&&(X=i.RGB8I),N===i.SHORT&&(X=i.RGB16I),N===i.INT&&(X=i.RGB32I)),y===i.RGBA_INTEGER&&(N===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),N===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),N===i.UNSIGNED_INT&&(X=i.RGBA32UI),N===i.BYTE&&(X=i.RGBA8I),N===i.SHORT&&(X=i.RGBA16I),N===i.INT&&(X=i.RGBA32I)),y===i.RGB&&N===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),y===i.RGBA){let xt=K?Hs:Xt.getTransfer(Y);N===i.FLOAT&&(X=i.RGBA32F),N===i.HALF_FLOAT&&(X=i.RGBA16F),N===i.UNSIGNED_BYTE&&(X=xt===ne?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function M(E,y){let N;return E?y===null||y===qn||y===bi?N=i.DEPTH24_STENCIL8:y===hn?N=i.DEPTH32F_STENCIL8:y===$i&&(N=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===qn||y===bi?N=i.DEPTH_COMPONENT24:y===hn?N=i.DEPTH_COMPONENT32F:y===$i&&(N=i.DEPTH_COMPONENT16),N}function b(E,y){return u(E)===!0||E.isFramebufferTexture&&E.minFilter!==Be&&E.minFilter!==We?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function D(E){let y=E.target;y.removeEventListener("dispose",D),T(y),y.isVideoTexture&&h.delete(y)}function R(E){let y=E.target;y.removeEventListener("dispose",R),Z(y)}function T(E){let y=n.get(E);if(y.__webglInit===void 0)return;let N=E.source,Y=p.get(N);if(Y){let K=Y[y.__cacheKey];K.usedTimes--,K.usedTimes===0&&U(E),Object.keys(Y).length===0&&p.delete(N)}n.remove(E)}function U(E){let y=n.get(E);i.deleteTexture(y.__webglTexture);let N=E.source,Y=p.get(N);delete Y[y.__cacheKey],a.memory.textures--}function Z(E){let y=n.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let K=0;K<y.__webglFramebuffer[Y].length;K++)i.deleteFramebuffer(y.__webglFramebuffer[Y][K]);else i.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)i.deleteFramebuffer(y.__webglFramebuffer[Y]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let N=E.textures;for(let Y=0,K=N.length;Y<K;Y++){let X=n.get(N[Y]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(N[Y])}n.remove(E)}let x=0;function S(){x=0}function z(){let E=x;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),x+=1,E}function B(E){let y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function V(E,y){let N=n.get(E);if(E.isVideoTexture&&Et(E),E.isRenderTargetTexture===!1&&E.version>0&&N.__version!==E.version){let Y=E.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Zt(N,E,y);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+y)}function J(E,y){let N=n.get(E);if(E.version>0&&N.__version!==E.version){Zt(N,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+y)}function k(E,y){let N=n.get(E);if(E.version>0&&N.__version!==E.version){Zt(N,E,y);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+y)}function Q(E,y){let N=n.get(E);if(E.version>0&&N.__version!==E.version){W(N,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+y)}let G={[Aa]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Ra]:i.MIRRORED_REPEAT},lt={[Be]:i.NEAREST,[zh]:i.NEAREST_MIPMAP_NEAREST,[hs]:i.NEAREST_MIPMAP_LINEAR,[We]:i.LINEAR,[Nr]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},ct={[Gh]:i.NEVER,[Jh]:i.ALWAYS,[Wh]:i.LESS,[Oc]:i.LEQUAL,[Xh]:i.EQUAL,[Zh]:i.GEQUAL,[Yh]:i.GREATER,[qh]:i.NOTEQUAL};function _t(E,y){if(y.type===hn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===We||y.magFilter===Nr||y.magFilter===hs||y.magFilter===Yn||y.minFilter===We||y.minFilter===Nr||y.minFilter===hs||y.minFilter===Yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,G[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,G[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,G[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,lt[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,lt[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Be||y.minFilter!==hs&&y.minFilter!==Yn||y.type===hn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){let N=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Vt(E,y){let N=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",D));let Y=y.source,K=p.get(Y);K===void 0&&(K={},p.set(Y,K));let X=B(y);if(X!==E.__cacheKey){K[X]===void 0&&(K[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),K[X].usedTimes++;let xt=K[E.__cacheKey];xt!==void 0&&(K[E.__cacheKey].usedTimes--,xt.usedTimes===0&&U(y)),E.__cacheKey=X,E.__webglTexture=K[X].texture}return N}function Zt(E,y,N){let Y=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=i.TEXTURE_3D);let K=Vt(E,y),X=y.source;e.bindTexture(Y,E.__webglTexture,i.TEXTURE0+N);let xt=n.get(X);if(X.version!==xt.__version||K===!0){e.activeTexture(i.TEXTURE0+N);let nt=Xt.getPrimaries(Xt.workingColorSpace),ut=y.colorSpace===An?null:Xt.getPrimaries(y.colorSpace),kt=y.colorSpace===An||nt===ut?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt);let j=_(y.image,!1,s.maxTextureSize);j=te(y,j);let dt=r.convert(y.format,y.colorSpace),wt=r.convert(y.type),Tt=w(y.internalFormat,dt,wt,y.colorSpace,y.isVideoTexture);_t(Y,y);let ft,Ut=y.mipmaps,Ct=y.isVideoTexture!==!0,Qt=xt.__version===void 0||K===!0,P=X.dataReady,rt=b(y,j);if(y.isDepthTexture)Tt=M(y.format===Ei,y.type),Qt&&(Ct?e.texStorage2D(i.TEXTURE_2D,1,Tt,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,Tt,j.width,j.height,0,dt,wt,null));else if(y.isDataTexture)if(Ut.length>0){Ct&&Qt&&e.texStorage2D(i.TEXTURE_2D,rt,Tt,Ut[0].width,Ut[0].height);for(let H=0,q=Ut.length;H<q;H++)ft=Ut[H],Ct?P&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,ft.width,ft.height,dt,wt,ft.data):e.texImage2D(i.TEXTURE_2D,H,Tt,ft.width,ft.height,0,dt,wt,ft.data);y.generateMipmaps=!1}else Ct?(Qt&&e.texStorage2D(i.TEXTURE_2D,rt,Tt,j.width,j.height),P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,j.width,j.height,dt,wt,j.data)):e.texImage2D(i.TEXTURE_2D,0,Tt,j.width,j.height,0,dt,wt,j.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ct&&Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Tt,Ut[0].width,Ut[0].height,j.depth);for(let H=0,q=Ut.length;H<q;H++)if(ft=Ut[H],y.format!==Xe)if(dt!==null)if(Ct){if(P)if(y.layerUpdates.size>0){let it=uc(ft.width,ft.height,y.format,y.type);for(let at of y.layerUpdates){let Ft=ft.data.subarray(at*it/ft.data.BYTES_PER_ELEMENT,(at+1)*it/ft.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,at,ft.width,ft.height,1,dt,Ft,0,0)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,ft.width,ft.height,j.depth,dt,ft.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,H,Tt,ft.width,ft.height,j.depth,0,ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ct?P&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,H,0,0,0,ft.width,ft.height,j.depth,dt,wt,ft.data):e.texImage3D(i.TEXTURE_2D_ARRAY,H,Tt,ft.width,ft.height,j.depth,0,dt,wt,ft.data)}else{Ct&&Qt&&e.texStorage2D(i.TEXTURE_2D,rt,Tt,Ut[0].width,Ut[0].height);for(let H=0,q=Ut.length;H<q;H++)ft=Ut[H],y.format!==Xe?dt!==null?Ct?P&&e.compressedTexSubImage2D(i.TEXTURE_2D,H,0,0,ft.width,ft.height,dt,ft.data):e.compressedTexImage2D(i.TEXTURE_2D,H,Tt,ft.width,ft.height,0,ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ct?P&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,ft.width,ft.height,dt,wt,ft.data):e.texImage2D(i.TEXTURE_2D,H,Tt,ft.width,ft.height,0,dt,wt,ft.data)}else if(y.isDataArrayTexture)if(Ct){if(Qt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,Tt,j.width,j.height,j.depth),P)if(y.layerUpdates.size>0){let H=uc(j.width,j.height,y.format,y.type);for(let q of y.layerUpdates){let it=j.data.subarray(q*H/j.data.BYTES_PER_ELEMENT,(q+1)*H/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,j.width,j.height,1,dt,wt,it)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,dt,wt,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Tt,j.width,j.height,j.depth,0,dt,wt,j.data);else if(y.isData3DTexture)Ct?(Qt&&e.texStorage3D(i.TEXTURE_3D,rt,Tt,j.width,j.height,j.depth),P&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,dt,wt,j.data)):e.texImage3D(i.TEXTURE_3D,0,Tt,j.width,j.height,j.depth,0,dt,wt,j.data);else if(y.isFramebufferTexture){if(Qt)if(Ct)e.texStorage2D(i.TEXTURE_2D,rt,Tt,j.width,j.height);else{let H=j.width,q=j.height;for(let it=0;it<rt;it++)e.texImage2D(i.TEXTURE_2D,it,Tt,H,q,0,dt,wt,null),H>>=1,q>>=1}}else if(Ut.length>0){if(Ct&&Qt){let H=At(Ut[0]);e.texStorage2D(i.TEXTURE_2D,rt,Tt,H.width,H.height)}for(let H=0,q=Ut.length;H<q;H++)ft=Ut[H],Ct?P&&e.texSubImage2D(i.TEXTURE_2D,H,0,0,dt,wt,ft):e.texImage2D(i.TEXTURE_2D,H,Tt,dt,wt,ft);y.generateMipmaps=!1}else if(Ct){if(Qt){let H=At(j);e.texStorage2D(i.TEXTURE_2D,rt,Tt,H.width,H.height)}P&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,wt,j)}else e.texImage2D(i.TEXTURE_2D,0,Tt,dt,wt,j);u(y)&&f(Y),xt.__version=X.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function W(E,y,N){if(y.image.length!==6)return;let Y=Vt(E,y),K=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+N);let X=n.get(K);if(K.version!==X.__version||Y===!0){e.activeTexture(i.TEXTURE0+N);let xt=Xt.getPrimaries(Xt.workingColorSpace),nt=y.colorSpace===An?null:Xt.getPrimaries(y.colorSpace),ut=y.colorSpace===An||xt===nt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let kt=y.isCompressedTexture||y.image[0].isCompressedTexture,j=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let q=0;q<6;q++)!kt&&!j?dt[q]=_(y.image[q],!0,s.maxCubemapSize):dt[q]=j?y.image[q].image:y.image[q],dt[q]=te(y,dt[q]);let wt=dt[0],Tt=r.convert(y.format,y.colorSpace),ft=r.convert(y.type),Ut=w(y.internalFormat,Tt,ft,y.colorSpace),Ct=y.isVideoTexture!==!0,Qt=X.__version===void 0||Y===!0,P=K.dataReady,rt=b(y,wt);_t(i.TEXTURE_CUBE_MAP,y);let H;if(kt){Ct&&Qt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Ut,wt.width,wt.height);for(let q=0;q<6;q++){H=dt[q].mipmaps;for(let it=0;it<H.length;it++){let at=H[it];y.format!==Xe?Tt!==null?Ct?P&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it,0,0,at.width,at.height,Tt,at.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it,Ut,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ct?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it,0,0,at.width,at.height,Tt,ft,at.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it,Ut,at.width,at.height,0,Tt,ft,at.data)}}}else{if(H=y.mipmaps,Ct&&Qt){H.length>0&&rt++;let q=At(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Ut,q.width,q.height)}for(let q=0;q<6;q++)if(j){Ct?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,dt[q].width,dt[q].height,Tt,ft,dt[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ut,dt[q].width,dt[q].height,0,Tt,ft,dt[q].data);for(let it=0;it<H.length;it++){let Ft=H[it].image[q].image;Ct?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it+1,0,0,Ft.width,Ft.height,Tt,ft,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it+1,Ut,Ft.width,Ft.height,0,Tt,ft,Ft.data)}}else{Ct?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,Tt,ft,dt[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Ut,Tt,ft,dt[q]);for(let it=0;it<H.length;it++){let at=H[it];Ct?P&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it+1,0,0,Tt,ft,at.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,it+1,Ut,Tt,ft,at.image[q])}}}u(y)&&f(i.TEXTURE_CUBE_MAP),X.__version=K.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function $(E,y,N,Y,K,X){let xt=r.convert(N.format,N.colorSpace),nt=r.convert(N.type),ut=w(N.internalFormat,xt,nt,N.colorSpace);if(!n.get(y).__hasExternalTextures){let j=Math.max(1,y.width>>X),dt=Math.max(1,y.height>>X);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,X,ut,j,dt,y.depth,0,xt,nt,null):e.texImage2D(K,X,ut,j,dt,0,xt,nt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),zt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,K,n.get(N).__webglTexture,0,Dt(y)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,K,n.get(N).__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function mt(E,y,N){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){let Y=y.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,X=M(y.stencilBuffer,K),xt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,nt=Dt(y);zt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt,X,y.width,y.height):N?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt,X,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,X,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,xt,i.RENDERBUFFER,E)}else{let Y=y.textures;for(let K=0;K<Y.length;K++){let X=Y[K],xt=r.convert(X.format,X.colorSpace),nt=r.convert(X.type),ut=w(X.internalFormat,xt,nt,X.colorSpace),kt=Dt(y);N&&zt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,ut,y.width,y.height):zt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,kt,ut,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,ut,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V(y.depthTexture,0);let Y=n.get(y.depthTexture).__webglTexture,K=Dt(y);if(y.depthTexture.format===_i)zt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(y.depthTexture.format===Ei)zt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Rt(E){let y=n.get(E),N=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){let Y=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){let K=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),y.__depthDisposeCallback=K}y.__boundDepthTexture=Y}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");ht(y.__webglFramebuffer,E)}else if(N){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=i.createRenderbuffer(),mt(y.__webglDepthbuffer[Y],E,!1);else{let K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,X)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),mt(y.__webglDepthbuffer,E,!1);else{let Y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function St(E,y,N){let Y=n.get(E);y!==void 0&&$(Y.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Rt(E)}function Nt(E){let y=E.texture,N=n.get(E),Y=n.get(y);E.addEventListener("dispose",R);let K=E.textures,X=E.isWebGLCubeRenderTarget===!0,xt=K.length>1;if(xt||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=y.version,a.memory.textures++),X){N.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer[nt]=[];for(let ut=0;ut<y.mipmaps.length;ut++)N.__webglFramebuffer[nt][ut]=i.createFramebuffer()}else N.__webglFramebuffer[nt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){N.__webglFramebuffer=[];for(let nt=0;nt<y.mipmaps.length;nt++)N.__webglFramebuffer[nt]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(xt)for(let nt=0,ut=K.length;nt<ut;nt++){let kt=n.get(K[nt]);kt.__webglTexture===void 0&&(kt.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&zt(E)===!1){N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let nt=0;nt<K.length;nt++){let ut=K[nt];N.__webglColorRenderbuffer[nt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[nt]);let kt=r.convert(ut.format,ut.colorSpace),j=r.convert(ut.type),dt=w(ut.internalFormat,kt,j,ut.colorSpace,E.isXRRenderTarget===!0),wt=Dt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,wt,dt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+nt,i.RENDERBUFFER,N.__webglColorRenderbuffer[nt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),mt(N.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),_t(i.TEXTURE_CUBE_MAP,y);for(let nt=0;nt<6;nt++)if(y.mipmaps&&y.mipmaps.length>0)for(let ut=0;ut<y.mipmaps.length;ut++)$(N.__webglFramebuffer[nt][ut],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,ut);else $(N.__webglFramebuffer[nt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);u(y)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let nt=0,ut=K.length;nt<ut;nt++){let kt=K[nt],j=n.get(kt);e.bindTexture(i.TEXTURE_2D,j.__webglTexture),_t(i.TEXTURE_2D,kt),$(N.__webglFramebuffer,E,kt,i.COLOR_ATTACHMENT0+nt,i.TEXTURE_2D,0),u(kt)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let nt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(nt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(nt,Y.__webglTexture),_t(nt,y),y.mipmaps&&y.mipmaps.length>0)for(let ut=0;ut<y.mipmaps.length;ut++)$(N.__webglFramebuffer[ut],E,y,i.COLOR_ATTACHMENT0,nt,ut);else $(N.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,nt,0);u(y)&&f(nt),e.unbindTexture()}E.depthBuffer&&Rt(E)}function Kt(E){let y=E.textures;for(let N=0,Y=y.length;N<Y;N++){let K=y[N];if(u(K)){let X=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,xt=n.get(K).__webglTexture;e.bindTexture(X,xt),f(X),e.unbindTexture()}}}let Ot=[],C=[];function Re(E){if(E.samples>0){if(zt(E)===!1){let y=E.textures,N=E.width,Y=E.height,K=i.COLOR_BUFFER_BIT,X=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(E),nt=y.length>1;if(nt)for(let ut=0;ut<y.length;ut++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ut=0;ut<y.length;ut++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),nt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);let kt=n.get(y[ut]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,kt,0)}i.blitFramebuffer(0,0,N,Y,0,0,N,Y,K,i.NEAREST),l===!0&&(Ot.length=0,C.length=0,Ot.push(i.COLOR_ATTACHMENT0+ut),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ot.push(X),C.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),nt)for(let ut=0;ut<y.length;ut++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ut]);let kt=n.get(y[ut]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ut,i.TEXTURE_2D,kt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Dt(E){return Math.min(s.maxSamples,E.samples)}function zt(E){let y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Et(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function te(E,y){let N=E.colorSpace,Y=E.format,K=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||N!==Ln&&N!==An&&(Xt.getTransfer(N)===ne?(Y!==Xe||K!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),y}function At(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=S,this.setTexture2D=V,this.setTexture2DArray=J,this.setTexture3D=k,this.setTextureCube=Q,this.rebindTextures=St,this.setupRenderTarget=Nt,this.updateRenderTargetMipmap=Kt,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=zt}function sg(i,t){function e(n,s=An){let r,a=Xt.getTransfer(s);if(n===dn)return i.UNSIGNED_BYTE;if(n===Xo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Yo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ac)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wc)return i.BYTE;if(n===Tc)return i.SHORT;if(n===$i)return i.UNSIGNED_SHORT;if(n===Wo)return i.INT;if(n===qn)return i.UNSIGNED_INT;if(n===hn)return i.FLOAT;if(n===os)return i.HALF_FLOAT;if(n===Rc)return i.ALPHA;if(n===Cc)return i.RGB;if(n===Xe)return i.RGBA;if(n===Pc)return i.LUMINANCE;if(n===Ic)return i.LUMINANCE_ALPHA;if(n===_i)return i.DEPTH_COMPONENT;if(n===Ei)return i.DEPTH_STENCIL;if(n===Lc)return i.RED;if(n===qo)return i.RED_INTEGER;if(n===Dc)return i.RG;if(n===Zo)return i.RG_INTEGER;if(n===Jo)return i.RGBA_INTEGER;if(n===Ns||n===Os||n===Fs||n===Bs)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ns)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ns)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Os)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Bs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ca||n===Pa||n===Ia||n===La)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Da||n===Ua||n===Na)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Da||n===Ua)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Na)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Oa||n===Fa||n===Ba||n===za||n===ka||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===Ya||n===qa||n===Za||n===Ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ba)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ka)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Va)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ha)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ga)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===qa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ja)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zs||n===Ka||n===$a)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===zs)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Uc||n===ja||n===Qa||n===to)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===zs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===to)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var go=class extends ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Rn=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},rg={type:"move"},Zi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let u=e.getJointPose(_,n),f=this._getHandJoint(c,_);u!==null&&(f.matrix.fromArray(u.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=u.radius),f.visible=u!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&p>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Rn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},ag=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,og=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,_o=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new ze,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Qe({vertexShader:ag,fragmentShader:og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Yt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},xo=class extends fn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,p=null,m=null,g=null,_=new _o,u=e.getContextAttributes(),f=null,w=null,M=[],b=[],D=new ot,R=null,T=new ye;T.layers.enable(1),T.viewport=new $t;let U=new ye;U.layers.enable(2),U.viewport=new $t;let Z=[T,U],x=new go;x.layers.enable(1),x.layers.enable(2);let S=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let $=M[W];return $===void 0&&($=new Zi,M[W]=$),$.getTargetRaySpace()},this.getControllerGrip=function(W){let $=M[W];return $===void 0&&($=new Zi,M[W]=$),$.getGripSpace()},this.getHand=function(W){let $=M[W];return $===void 0&&($=new Zi,M[W]=$),$.getHandSpace()};function B(W){let $=b.indexOf(W.inputSource);if($===-1)return;let mt=M[$];mt!==void 0&&(mt.update(W.inputSource,W.frame,c||a),mt.dispatchEvent({type:W.type,data:W.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",J);for(let W=0;W<M.length;W++){let $=b[W];$!==null&&(b[W]=null,M[W].disconnect($))}S=null,z=null,_.reset(),t.setRenderTarget(f),m=null,p=null,d=null,s=null,w=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(D.width,D.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",J),u.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(D),s.renderState.layers===void 0){let $={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new pn(m.framebufferWidth,m.framebufferHeight,{format:Xe,type:dn,colorSpace:t.outputColorSpace,stencilBuffer:u.stencil})}else{let $=null,mt=null,ht=null;u.depth&&(ht=u.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=u.stencil?Ei:_i,mt=u.stencil?bi:qn);let Rt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};d=new XRWebGLBinding(s,e),p=d.createProjectionLayer(Rt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),w=new pn(p.textureWidth,p.textureHeight,{format:Xe,type:dn,depthTexture:new tr(p.textureWidth,p.textureHeight,mt,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:u.stencil,colorSpace:t.outputColorSpace,samples:u.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Zt.setContext(s),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function J(W){for(let $=0;$<W.removed.length;$++){let mt=W.removed[$],ht=b.indexOf(mt);ht>=0&&(b[ht]=null,M[ht].disconnect(mt))}for(let $=0;$<W.added.length;$++){let mt=W.added[$],ht=b.indexOf(mt);if(ht===-1){for(let St=0;St<M.length;St++)if(St>=b.length){b.push(mt),ht=St;break}else if(b[St]===null){b[St]=mt,ht=St;break}if(ht===-1)break}let Rt=M[ht];Rt&&Rt.connect(mt)}}let k=new A,Q=new A;function G(W,$,mt){k.setFromMatrixPosition($.matrixWorld),Q.setFromMatrixPosition(mt.matrixWorld);let ht=k.distanceTo(Q),Rt=$.projectionMatrix.elements,St=mt.projectionMatrix.elements,Nt=Rt[14]/(Rt[10]-1),Kt=Rt[14]/(Rt[10]+1),Ot=(Rt[9]+1)/Rt[5],C=(Rt[9]-1)/Rt[5],Re=(Rt[8]-1)/Rt[0],Dt=(St[8]+1)/St[0],zt=Nt*Re,Et=Nt*Dt,te=ht/(-Re+Dt),At=te*-Re;if($.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(At),W.translateZ(te),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Rt[10]===-1)W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse);else{let E=Nt+te,y=Kt+te,N=zt-At,Y=Et+(ht-At),K=Ot*Kt/y*E,X=C*Kt/y*E;W.projectionMatrix.makePerspective(N,Y,K,X,E,y),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function lt(W,$){$===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices($.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let $=W.near,mt=W.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(mt=_.depthFar)),x.near=U.near=T.near=$,x.far=U.far=T.far=mt,(S!==x.near||z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),S=x.near,z=x.far);let ht=W.parent,Rt=x.cameras;lt(x,ht);for(let St=0;St<Rt.length;St++)lt(Rt[St],ht);Rt.length===2?G(x,T,U):x.projectionMatrix.copy(T.projectionMatrix),ct(W,x,ht)};function ct(W,$,mt){mt===null?W.matrix.copy($.matrixWorld):(W.matrix.copy(mt.matrixWorld),W.matrix.invert(),W.matrix.multiply($.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy($.projectionMatrix),W.projectionMatrixInverse.copy($.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=ji*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(p===null&&m===null))return l},this.setFoveation=function(W){l=W,p!==null&&(p.fixedFoveation=W),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let _t=null;function Vt(W,$){if(h=$.getViewerPose(c||a),g=$,h!==null){let mt=h.views;m!==null&&(t.setRenderTargetFramebuffer(w,m.framebuffer),t.setRenderTarget(w));let ht=!1;mt.length!==x.cameras.length&&(x.cameras.length=0,ht=!0);for(let St=0;St<mt.length;St++){let Nt=mt[St],Kt=null;if(m!==null)Kt=m.getViewport(Nt);else{let C=d.getViewSubImage(p,Nt);Kt=C.viewport,St===0&&(t.setRenderTargetTextures(w,C.colorTexture,p.ignoreDepthValues?void 0:C.depthStencilTexture),t.setRenderTarget(w))}let Ot=Z[St];Ot===void 0&&(Ot=new ye,Ot.layers.enable(St),Ot.viewport=new $t,Z[St]=Ot),Ot.matrix.fromArray(Nt.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(Nt.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),St===0&&(x.matrix.copy(Ot.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ht===!0&&x.cameras.push(Ot)}let Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){let St=d.getDepthInformation(mt[0]);St&&St.isValid&&St.texture&&_.init(t,St,s.renderState)}}for(let mt=0;mt<M.length;mt++){let ht=b[mt],Rt=M[mt];ht!==null&&Rt!==void 0&&Rt.update(ht,$,c||a)}_t&&_t(W,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}let Zt=new Vc;Zt.setAnimationLoop(Vt),this.setAnimationLoop=function(W){_t=W},this.dispose=function(){}}},kn=new je,lg=new ie;function cg(i,t){function e(u,f){u.matrixAutoUpdate===!0&&u.updateMatrix(),f.value.copy(u.matrix)}function n(u,f){f.color.getRGB(u.fogColor.value,kc(i)),f.isFog?(u.fogNear.value=f.near,u.fogFar.value=f.far):f.isFogExp2&&(u.fogDensity.value=f.density)}function s(u,f,w,M,b){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(u,f):f.isMeshToonMaterial?(r(u,f),d(u,f)):f.isMeshPhongMaterial?(r(u,f),h(u,f)):f.isMeshStandardMaterial?(r(u,f),p(u,f),f.isMeshPhysicalMaterial&&m(u,f,b)):f.isMeshMatcapMaterial?(r(u,f),g(u,f)):f.isMeshDepthMaterial?r(u,f):f.isMeshDistanceMaterial?(r(u,f),_(u,f)):f.isMeshNormalMaterial?r(u,f):f.isLineBasicMaterial?(a(u,f),f.isLineDashedMaterial&&o(u,f)):f.isPointsMaterial?l(u,f,w,M):f.isSpriteMaterial?c(u,f):f.isShadowMaterial?(u.color.value.copy(f.color),u.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(u,f){u.opacity.value=f.opacity,f.color&&u.diffuse.value.copy(f.color),f.emissive&&u.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.bumpMap&&(u.bumpMap.value=f.bumpMap,e(f.bumpMap,u.bumpMapTransform),u.bumpScale.value=f.bumpScale,f.side===ve&&(u.bumpScale.value*=-1)),f.normalMap&&(u.normalMap.value=f.normalMap,e(f.normalMap,u.normalMapTransform),u.normalScale.value.copy(f.normalScale),f.side===ve&&u.normalScale.value.negate()),f.displacementMap&&(u.displacementMap.value=f.displacementMap,e(f.displacementMap,u.displacementMapTransform),u.displacementScale.value=f.displacementScale,u.displacementBias.value=f.displacementBias),f.emissiveMap&&(u.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,u.emissiveMapTransform)),f.specularMap&&(u.specularMap.value=f.specularMap,e(f.specularMap,u.specularMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest);let w=t.get(f),M=w.envMap,b=w.envMapRotation;M&&(u.envMap.value=M,kn.copy(b),kn.x*=-1,kn.y*=-1,kn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),u.envMapRotation.value.setFromMatrix4(lg.makeRotationFromEuler(kn)),u.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=f.reflectivity,u.ior.value=f.ior,u.refractionRatio.value=f.refractionRatio),f.lightMap&&(u.lightMap.value=f.lightMap,u.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,u.lightMapTransform)),f.aoMap&&(u.aoMap.value=f.aoMap,u.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,u.aoMapTransform))}function a(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform))}function o(u,f){u.dashSize.value=f.dashSize,u.totalSize.value=f.dashSize+f.gapSize,u.scale.value=f.scale}function l(u,f,w,M){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.size.value=f.size*w,u.scale.value=M*.5,f.map&&(u.map.value=f.map,e(f.map,u.uvTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function c(u,f){u.diffuse.value.copy(f.color),u.opacity.value=f.opacity,u.rotation.value=f.rotation,f.map&&(u.map.value=f.map,e(f.map,u.mapTransform)),f.alphaMap&&(u.alphaMap.value=f.alphaMap,e(f.alphaMap,u.alphaMapTransform)),f.alphaTest>0&&(u.alphaTest.value=f.alphaTest)}function h(u,f){u.specular.value.copy(f.specular),u.shininess.value=Math.max(f.shininess,1e-4)}function d(u,f){f.gradientMap&&(u.gradientMap.value=f.gradientMap)}function p(u,f){u.metalness.value=f.metalness,f.metalnessMap&&(u.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,u.metalnessMapTransform)),u.roughness.value=f.roughness,f.roughnessMap&&(u.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,u.roughnessMapTransform)),f.envMap&&(u.envMapIntensity.value=f.envMapIntensity)}function m(u,f,w){u.ior.value=f.ior,f.sheen>0&&(u.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),u.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(u.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,u.sheenColorMapTransform)),f.sheenRoughnessMap&&(u.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,u.sheenRoughnessMapTransform))),f.clearcoat>0&&(u.clearcoat.value=f.clearcoat,u.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(u.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,u.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(u.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ve&&u.clearcoatNormalScale.value.negate())),f.dispersion>0&&(u.dispersion.value=f.dispersion),f.iridescence>0&&(u.iridescence.value=f.iridescence,u.iridescenceIOR.value=f.iridescenceIOR,u.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(u.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,u.iridescenceMapTransform)),f.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),f.transmission>0&&(u.transmission.value=f.transmission,u.transmissionSamplerMap.value=w.texture,u.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(u.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,u.transmissionMapTransform)),u.thickness.value=f.thickness,f.thicknessMap&&(u.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=f.attenuationDistance,u.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(u.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(u.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=f.specularIntensity,u.specularColor.value.copy(f.specularColor),f.specularColorMap&&(u.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,u.specularColorMapTransform)),f.specularIntensityMap&&(u.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,u.specularIntensityMapTransform))}function g(u,f){f.matcap&&(u.matcap.value=f.matcap)}function _(u,f){let w=t.get(f).light;u.referencePosition.value.setFromMatrixPosition(w.matrixWorld),u.nearDistance.value=w.shadow.camera.near,u.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function hg(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,M){let b=M.program;n.uniformBlockBinding(w,b)}function c(w,M){let b=s[w.id];b===void 0&&(g(w),b=h(w),s[w.id]=b,w.addEventListener("dispose",u));let D=M.program;n.updateUBOMapping(w,D);let R=t.render.frame;r[w.id]!==R&&(p(w),r[w.id]=R)}function h(w){let M=d();w.__bindingPointIndex=M;let b=i.createBuffer(),D=w.__size,R=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,D,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,b),b}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(w){let M=s[w.id],b=w.uniforms,D=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let R=0,T=b.length;R<T;R++){let U=Array.isArray(b[R])?b[R]:[b[R]];for(let Z=0,x=U.length;Z<x;Z++){let S=U[Z];if(m(S,R,Z,D)===!0){let z=S.__offset,B=Array.isArray(S.value)?S.value:[S.value],V=0;for(let J=0;J<B.length;J++){let k=B[J],Q=_(k);typeof k=="number"||typeof k=="boolean"?(S.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,z+V,S.__data)):k.isMatrix3?(S.__data[0]=k.elements[0],S.__data[1]=k.elements[1],S.__data[2]=k.elements[2],S.__data[3]=0,S.__data[4]=k.elements[3],S.__data[5]=k.elements[4],S.__data[6]=k.elements[5],S.__data[7]=0,S.__data[8]=k.elements[6],S.__data[9]=k.elements[7],S.__data[10]=k.elements[8],S.__data[11]=0):(k.toArray(S.__data,V),V+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(w,M,b,D){let R=w.value,T=M+"_"+b;if(D[T]===void 0)return typeof R=="number"||typeof R=="boolean"?D[T]=R:D[T]=R.clone(),!0;{let U=D[T];if(typeof R=="number"||typeof R=="boolean"){if(U!==R)return D[T]=R,!0}else if(U.equals(R)===!1)return U.copy(R),!0}return!1}function g(w){let M=w.uniforms,b=0,D=16;for(let T=0,U=M.length;T<U;T++){let Z=Array.isArray(M[T])?M[T]:[M[T]];for(let x=0,S=Z.length;x<S;x++){let z=Z[x],B=Array.isArray(z.value)?z.value:[z.value];for(let V=0,J=B.length;V<J;V++){let k=B[V],Q=_(k),G=b%D,lt=G%Q.boundary,ct=G+lt;b+=lt,ct!==0&&D-ct<Q.storage&&(b+=D-ct),z.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=b,b+=Q.storage}}}let R=b%D;return R>0&&(b+=D-R),w.__size=b,w.__cache={},this}function _(w){let M={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(M.boundary=4,M.storage=4):w.isVector2?(M.boundary=8,M.storage=8):w.isVector3||w.isColor?(M.boundary=16,M.storage=12):w.isVector4?(M.boundary=16,M.storage=16):w.isMatrix3?(M.boundary=48,M.storage=48):w.isMatrix4?(M.boundary=64,M.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),M}function u(w){let M=w.target;M.removeEventListener("dispose",u);let b=a.indexOf(M.__bindingPointIndex);a.splice(b,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function f(){for(let w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var er=class{constructor(t={}){let{canvas:e=du(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let m=new Uint32Array(4),g=new Int32Array(4),_=null,u=null,f=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this.toneMapping=Pn,this.toneMappingExposure=1;let M=this,b=!1,D=0,R=0,T=null,U=-1,Z=null,x=new $t,S=new $t,z=null,B=new Lt(0),V=0,J=e.width,k=e.height,Q=1,G=null,lt=null,ct=new $t(0,0,J,k),_t=new $t(0,0,J,k),Vt=!1,Zt=new ts,W=!1,$=!1,mt=new ie,ht=new ie,Rt=new A,St=new $t,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Kt=!1;function Ot(){return T===null?Q:1}let C=n;function Re(v,I){return e.getContext(v,I)}try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Vo}`),e.addEventListener("webglcontextlost",q,!1),e.addEventListener("webglcontextrestored",it,!1),e.addEventListener("webglcontextcreationerror",at,!1),C===null){let I="webgl2";if(C=Re(I,v),C===null)throw Re(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Dt,zt,Et,te,At,E,y,N,Y,K,X,xt,nt,ut,kt,j,dt,wt,Tt,ft,Ut,Ct,Qt,P;function rt(){Dt=new Tp(C),Dt.init(),Ct=new sg(C,Dt),zt=new vp(C,Dt,t,Ct),Et=new eg(C),zt.reverseDepthBuffer&&Et.buffers.depth.setReversed(!0),te=new Cp(C),At=new Hm,E=new ig(C,Dt,Et,At,zt,Ct,te),y=new Sp(M),N=new wp(M),Y=new Nu(C),Qt=new xp(C,Y),K=new Ap(C,Y,te,Qt),X=new Ip(C,K,Y,te),Tt=new Pp(C,zt,E),j=new Mp(At),xt=new Vm(M,y,N,Dt,zt,Qt,j),nt=new cg(M,At),ut=new Wm,kt=new Km(Dt),wt=new _p(M,y,N,Et,X,p,l),dt=new Qm(M,X,zt),P=new hg(C,te,zt,Et),ft=new yp(C,Dt,te),Ut=new Rp(C,Dt,te),te.programs=xt.programs,M.capabilities=zt,M.extensions=Dt,M.properties=At,M.renderLists=ut,M.shadowMap=dt,M.state=Et,M.info=te}rt();let H=new xo(M,C);this.xr=H,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){let v=Dt.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=Dt.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(v){v!==void 0&&(Q=v,this.setSize(J,k,!1))},this.getSize=function(v){return v.set(J,k)},this.setSize=function(v,I,O=!0){if(H.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}J=v,k=I,e.width=Math.floor(v*Q),e.height=Math.floor(I*Q),O===!0&&(e.style.width=v+"px",e.style.height=I+"px"),this.setViewport(0,0,v,I)},this.getDrawingBufferSize=function(v){return v.set(J*Q,k*Q).floor()},this.setDrawingBufferSize=function(v,I,O){J=v,k=I,Q=O,e.width=Math.floor(v*O),e.height=Math.floor(I*O),this.setViewport(0,0,v,I)},this.getCurrentViewport=function(v){return v.copy(x)},this.getViewport=function(v){return v.copy(ct)},this.setViewport=function(v,I,O,F){v.isVector4?ct.set(v.x,v.y,v.z,v.w):ct.set(v,I,O,F),Et.viewport(x.copy(ct).multiplyScalar(Q).round())},this.getScissor=function(v){return v.copy(_t)},this.setScissor=function(v,I,O,F){v.isVector4?_t.set(v.x,v.y,v.z,v.w):_t.set(v,I,O,F),Et.scissor(S.copy(_t).multiplyScalar(Q).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(v){Et.setScissorTest(Vt=v)},this.setOpaqueSort=function(v){G=v},this.setTransparentSort=function(v){lt=v},this.getClearColor=function(v){return v.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor.apply(wt,arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha.apply(wt,arguments)},this.clear=function(v=!0,I=!0,O=!0){let F=0;if(v){let L=!1;if(T!==null){let tt=T.texture.format;L=tt===Jo||tt===Zo||tt===qo}if(L){let tt=T.texture.type,st=tt===dn||tt===qn||tt===$i||tt===bi||tt===Xo||tt===Yo,pt=wt.getClearColor(),gt=wt.getClearAlpha(),Mt=pt.r,bt=pt.g,yt=pt.b;st?(m[0]=Mt,m[1]=bt,m[2]=yt,m[3]=gt,C.clearBufferuiv(C.COLOR,0,m)):(g[0]=Mt,g[1]=bt,g[2]=yt,g[3]=gt,C.clearBufferiv(C.COLOR,0,g))}else F|=C.COLOR_BUFFER_BIT}I&&(F|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),O&&(F|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",q,!1),e.removeEventListener("webglcontextrestored",it,!1),e.removeEventListener("webglcontextcreationerror",at,!1),ut.dispose(),kt.dispose(),At.dispose(),y.dispose(),N.dispose(),X.dispose(),Qt.dispose(),P.dispose(),xt.dispose(),H.dispose(),H.removeEventListener("sessionstart",ol),H.removeEventListener("sessionend",ll),Un.stop()};function q(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function it(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let v=te.autoReset,I=dt.enabled,O=dt.autoUpdate,F=dt.needsUpdate,L=dt.type;rt(),te.autoReset=v,dt.enabled=I,dt.autoUpdate=O,dt.needsUpdate=F,dt.type=L}function at(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ft(v){let I=v.target;I.removeEventListener("dispose",Ft),oe(I)}function oe(v){we(v),At.remove(v)}function we(v){let I=At.get(v).programs;I!==void 0&&(I.forEach(function(O){xt.releaseProgram(O)}),v.isShaderMaterial&&xt.releaseShaderCache(v))}this.renderBufferDirect=function(v,I,O,F,L,tt){I===null&&(I=Nt);let st=L.isMesh&&L.matrixWorld.determinant()<0,pt=oh(v,I,O,F,L);Et.setMaterial(F,st);let gt=O.index,Mt=1;if(F.wireframe===!0){if(gt=K.getWireframeAttribute(O),gt===void 0)return;Mt=2}let bt=O.drawRange,yt=O.attributes.position,Jt=bt.start*Mt,ee=(bt.start+bt.count)*Mt;tt!==null&&(Jt=Math.max(Jt,tt.start*Mt),ee=Math.min(ee,(tt.start+tt.count)*Mt)),gt!==null?(Jt=Math.max(Jt,0),ee=Math.min(ee,gt.count)):yt!=null&&(Jt=Math.max(Jt,0),ee=Math.min(ee,yt.count));let re=ee-Jt;if(re<0||re===1/0)return;Qt.setup(L,F,pt,O,gt);let Ce,Gt=ft;if(gt!==null&&(Ce=Y.get(gt),Gt=Ut,Gt.setIndex(Ce)),L.isMesh)F.wireframe===!0?(Et.setLineWidth(F.wireframeLinewidth*Ot()),Gt.setMode(C.LINES)):Gt.setMode(C.TRIANGLES);else if(L.isLine){let vt=F.linewidth;vt===void 0&&(vt=1),Et.setLineWidth(vt*Ot()),L.isLineSegments?Gt.setMode(C.LINES):L.isLineLoop?Gt.setMode(C.LINE_LOOP):Gt.setMode(C.LINE_STRIP)}else L.isPoints?Gt.setMode(C.POINTS):L.isSprite&&Gt.setMode(C.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)Gt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(Dt.get("WEBGL_multi_draw"))Gt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{let vt=L._multiDrawStarts,ge=L._multiDrawCounts,Wt=L._multiDrawCount,ke=gt?Y.get(gt).bytesPerElement:1,Qn=At.get(F).currentProgram.getUniforms();for(let Pe=0;Pe<Wt;Pe++)Qn.setValue(C,"_gl_DrawID",Pe),Gt.render(vt[Pe]/ke,ge[Pe])}else if(L.isInstancedMesh)Gt.renderInstances(Jt,re,L.count);else if(O.isInstancedBufferGeometry){let vt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ge=Math.min(O.instanceCount,vt);Gt.renderInstances(Jt,re,ge)}else Gt.render(Jt,re)};function Ht(v,I,O){v.transparent===!0&&v.side===Ue&&v.forceSinglePass===!1?(v.side=ve,v.needsUpdate=!0,cs(v,I,O),v.side=In,v.needsUpdate=!0,cs(v,I,O),v.side=Ue):cs(v,I,O)}this.compile=function(v,I,O=null){O===null&&(O=v),u=kt.get(O),u.init(I),w.push(u),O.traverseVisible(function(L){L.isLight&&L.layers.test(I.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),v!==O&&v.traverseVisible(function(L){L.isLight&&L.layers.test(I.layers)&&(u.pushLight(L),L.castShadow&&u.pushShadow(L))}),u.setupLights();let F=new Set;return v.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;let tt=L.material;if(tt)if(Array.isArray(tt))for(let st=0;st<tt.length;st++){let pt=tt[st];Ht(pt,O,L),F.add(pt)}else Ht(tt,O,L),F.add(tt)}),w.pop(),u=null,F},this.compileAsync=function(v,I,O=null){let F=this.compile(v,I,O);return new Promise(L=>{function tt(){if(F.forEach(function(st){At.get(st).currentProgram.isReady()&&F.delete(st)}),F.size===0){L(v);return}setTimeout(tt,10)}Dt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let Te=null;function nn(v){Te&&Te(v)}function ol(){Un.stop()}function ll(){Un.start()}let Un=new Vc;Un.setAnimationLoop(nn),typeof self<"u"&&Un.setContext(self),this.setAnimationLoop=function(v){Te=v,H.setAnimationLoop(v),v===null?Un.stop():Un.start()},H.addEventListener("sessionstart",ol),H.addEventListener("sessionend",ll),this.render=function(v,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(H.cameraAutoUpdate===!0&&H.updateCamera(I),I=H.getCamera()),v.isScene===!0&&v.onBeforeRender(M,v,I,T),u=kt.get(v,w.length),u.init(I),w.push(u),ht.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Zt.setFromProjectionMatrix(ht),$=this.localClippingEnabled,W=j.init(this.clippingPlanes,$),_=ut.get(v,f.length),_.init(),f.push(_),H.enabled===!0&&H.isPresenting===!0){let tt=M.xr.getDepthSensingMesh();tt!==null&&Ir(tt,I,-1/0,M.sortObjects)}Ir(v,I,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(G,lt),Kt=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,Kt&&wt.addToRenderList(_,v),this.info.render.frame++,W===!0&&j.beginShadows();let O=u.state.shadowsArray;dt.render(O,v,I),W===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset();let F=_.opaque,L=_.transmissive;if(u.setupLights(),I.isArrayCamera){let tt=I.cameras;if(L.length>0)for(let st=0,pt=tt.length;st<pt;st++){let gt=tt[st];hl(F,L,v,gt)}Kt&&wt.render(v);for(let st=0,pt=tt.length;st<pt;st++){let gt=tt[st];cl(_,v,gt,gt.viewport)}}else L.length>0&&hl(F,L,v,I),Kt&&wt.render(v),cl(_,v,I);T!==null&&(E.updateMultisampleRenderTarget(T),E.updateRenderTargetMipmap(T)),v.isScene===!0&&v.onAfterRender(M,v,I),Qt.resetDefaultState(),U=-1,Z=null,w.pop(),w.length>0?(u=w[w.length-1],W===!0&&j.setGlobalState(M.clippingPlanes,u.state.camera)):u=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Ir(v,I,O,F){if(v.visible===!1)return;if(v.layers.test(I.layers)){if(v.isGroup)O=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(I);else if(v.isLight)u.pushLight(v),v.castShadow&&u.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Zt.intersectsSprite(v)){F&&St.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ht);let st=X.update(v),pt=v.material;pt.visible&&_.push(v,st,pt,O,St.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Zt.intersectsObject(v))){let st=X.update(v),pt=v.material;if(F&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),St.copy(v.boundingSphere.center)):(st.boundingSphere===null&&st.computeBoundingSphere(),St.copy(st.boundingSphere.center)),St.applyMatrix4(v.matrixWorld).applyMatrix4(ht)),Array.isArray(pt)){let gt=st.groups;for(let Mt=0,bt=gt.length;Mt<bt;Mt++){let yt=gt[Mt],Jt=pt[yt.materialIndex];Jt&&Jt.visible&&_.push(v,st,Jt,O,St.z,yt)}}else pt.visible&&_.push(v,st,pt,O,St.z,null)}}let tt=v.children;for(let st=0,pt=tt.length;st<pt;st++)Ir(tt[st],I,O,F)}function cl(v,I,O,F){let L=v.opaque,tt=v.transmissive,st=v.transparent;u.setupLightsView(O),W===!0&&j.setGlobalState(M.clippingPlanes,O),F&&Et.viewport(x.copy(F)),L.length>0&&ls(L,I,O),tt.length>0&&ls(tt,I,O),st.length>0&&ls(st,I,O),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function hl(v,I,O,F){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[F.id]===void 0&&(u.state.transmissionRenderTarget[F.id]=new pn(1,1,{generateMipmaps:!0,type:Dt.has("EXT_color_buffer_half_float")||Dt.has("EXT_color_buffer_float")?os:dn,minFilter:Yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));let tt=u.state.transmissionRenderTarget[F.id],st=F.viewport||x;tt.setSize(st.z,st.w);let pt=M.getRenderTarget();M.setRenderTarget(tt),M.getClearColor(B),V=M.getClearAlpha(),V<1&&M.setClearColor(16777215,.5),M.clear(),Kt&&wt.render(O);let gt=M.toneMapping;M.toneMapping=Pn;let Mt=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),u.setupLightsView(F),W===!0&&j.setGlobalState(M.clippingPlanes,F),ls(v,O,F),E.updateMultisampleRenderTarget(tt),E.updateRenderTargetMipmap(tt),Dt.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let yt=0,Jt=I.length;yt<Jt;yt++){let ee=I[yt],re=ee.object,Ce=ee.geometry,Gt=ee.material,vt=ee.group;if(Gt.side===Ue&&re.layers.test(F.layers)){let ge=Gt.side;Gt.side=ve,Gt.needsUpdate=!0,ul(re,O,F,Ce,Gt,vt),Gt.side=ge,Gt.needsUpdate=!0,bt=!0}}bt===!0&&(E.updateMultisampleRenderTarget(tt),E.updateRenderTargetMipmap(tt))}M.setRenderTarget(pt),M.setClearColor(B,V),Mt!==void 0&&(F.viewport=Mt),M.toneMapping=gt}function ls(v,I,O){let F=I.isScene===!0?I.overrideMaterial:null;for(let L=0,tt=v.length;L<tt;L++){let st=v[L],pt=st.object,gt=st.geometry,Mt=F===null?st.material:F,bt=st.group;pt.layers.test(O.layers)&&ul(pt,I,O,gt,Mt,bt)}}function ul(v,I,O,F,L,tt){v.onBeforeRender(M,I,O,F,L,tt),v.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),L.onBeforeRender(M,I,O,F,v,tt),L.transparent===!0&&L.side===Ue&&L.forceSinglePass===!1?(L.side=ve,L.needsUpdate=!0,M.renderBufferDirect(O,I,F,L,v,tt),L.side=In,L.needsUpdate=!0,M.renderBufferDirect(O,I,F,L,v,tt),L.side=Ue):M.renderBufferDirect(O,I,F,L,v,tt),v.onAfterRender(M,I,O,F,L,tt)}function cs(v,I,O){I.isScene!==!0&&(I=Nt);let F=At.get(v),L=u.state.lights,tt=u.state.shadowsArray,st=L.state.version,pt=xt.getParameters(v,L.state,tt,I,O),gt=xt.getProgramCacheKey(pt),Mt=F.programs;F.environment=v.isMeshStandardMaterial?I.environment:null,F.fog=I.fog,F.envMap=(v.isMeshStandardMaterial?N:y).get(v.envMap||F.environment),F.envMapRotation=F.environment!==null&&v.envMap===null?I.environmentRotation:v.envMapRotation,Mt===void 0&&(v.addEventListener("dispose",Ft),Mt=new Map,F.programs=Mt);let bt=Mt.get(gt);if(bt!==void 0){if(F.currentProgram===bt&&F.lightsStateVersion===st)return fl(v,pt),bt}else pt.uniforms=xt.getUniforms(v),v.onBeforeCompile(pt,M),bt=xt.acquireProgram(pt,gt),Mt.set(gt,bt),F.uniforms=pt.uniforms;let yt=F.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(yt.clippingPlanes=j.uniform),fl(v,pt),F.needsLights=ch(v),F.lightsStateVersion=st,F.needsLights&&(yt.ambientLightColor.value=L.state.ambient,yt.lightProbe.value=L.state.probe,yt.directionalLights.value=L.state.directional,yt.directionalLightShadows.value=L.state.directionalShadow,yt.spotLights.value=L.state.spot,yt.spotLightShadows.value=L.state.spotShadow,yt.rectAreaLights.value=L.state.rectArea,yt.ltc_1.value=L.state.rectAreaLTC1,yt.ltc_2.value=L.state.rectAreaLTC2,yt.pointLights.value=L.state.point,yt.pointLightShadows.value=L.state.pointShadow,yt.hemisphereLights.value=L.state.hemi,yt.directionalShadowMap.value=L.state.directionalShadowMap,yt.directionalShadowMatrix.value=L.state.directionalShadowMatrix,yt.spotShadowMap.value=L.state.spotShadowMap,yt.spotLightMatrix.value=L.state.spotLightMatrix,yt.spotLightMap.value=L.state.spotLightMap,yt.pointShadowMap.value=L.state.pointShadowMap,yt.pointShadowMatrix.value=L.state.pointShadowMatrix),F.currentProgram=bt,F.uniformsList=null,bt}function dl(v){if(v.uniformsList===null){let I=v.currentProgram.getUniforms();v.uniformsList=yi.seqWithValue(I.seq,v.uniforms)}return v.uniformsList}function fl(v,I){let O=At.get(v);O.outputColorSpace=I.outputColorSpace,O.batching=I.batching,O.batchingColor=I.batchingColor,O.instancing=I.instancing,O.instancingColor=I.instancingColor,O.instancingMorph=I.instancingMorph,O.skinning=I.skinning,O.morphTargets=I.morphTargets,O.morphNormals=I.morphNormals,O.morphColors=I.morphColors,O.morphTargetsCount=I.morphTargetsCount,O.numClippingPlanes=I.numClippingPlanes,O.numIntersection=I.numClipIntersection,O.vertexAlphas=I.vertexAlphas,O.vertexTangents=I.vertexTangents,O.toneMapping=I.toneMapping}function oh(v,I,O,F,L){I.isScene!==!0&&(I=Nt),E.resetTextureUnits();let tt=I.fog,st=F.isMeshStandardMaterial?I.environment:null,pt=T===null?M.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ln,gt=(F.isMeshStandardMaterial?N:y).get(F.envMap||st),Mt=F.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,bt=!!O.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),yt=!!O.morphAttributes.position,Jt=!!O.morphAttributes.normal,ee=!!O.morphAttributes.color,re=Pn;F.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(re=M.toneMapping);let Ce=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Gt=Ce!==void 0?Ce.length:0,vt=At.get(F),ge=u.state.lights;if(W===!0&&($===!0||v!==Z)){let Oe=v===Z&&F.id===U;j.setState(F,v,Oe)}let Wt=!1;F.version===vt.__version?(vt.needsLights&&vt.lightsStateVersion!==ge.state.version||vt.outputColorSpace!==pt||L.isBatchedMesh&&vt.batching===!1||!L.isBatchedMesh&&vt.batching===!0||L.isBatchedMesh&&vt.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&vt.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&vt.instancing===!1||!L.isInstancedMesh&&vt.instancing===!0||L.isSkinnedMesh&&vt.skinning===!1||!L.isSkinnedMesh&&vt.skinning===!0||L.isInstancedMesh&&vt.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&vt.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&vt.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&vt.instancingMorph===!1&&L.morphTexture!==null||vt.envMap!==gt||F.fog===!0&&vt.fog!==tt||vt.numClippingPlanes!==void 0&&(vt.numClippingPlanes!==j.numPlanes||vt.numIntersection!==j.numIntersection)||vt.vertexAlphas!==Mt||vt.vertexTangents!==bt||vt.morphTargets!==yt||vt.morphNormals!==Jt||vt.morphColors!==ee||vt.toneMapping!==re||vt.morphTargetsCount!==Gt)&&(Wt=!0):(Wt=!0,vt.__version=F.version);let ke=vt.currentProgram;Wt===!0&&(ke=cs(F,I,L));let Qn=!1,Pe=!1,Lr=!1,ae=ke.getUniforms(),vn=vt.uniforms;if(Et.useProgram(ke.program)&&(Qn=!0,Pe=!0,Lr=!0),F.id!==U&&(U=F.id,Pe=!0),Qn||Z!==v){zt.reverseDepthBuffer?(mt.copy(v.projectionMatrix),pu(mt),mu(mt),ae.setValue(C,"projectionMatrix",mt)):ae.setValue(C,"projectionMatrix",v.projectionMatrix),ae.setValue(C,"viewMatrix",v.matrixWorldInverse);let Oe=ae.map.cameraPosition;Oe!==void 0&&Oe.setValue(C,Rt.setFromMatrixPosition(v.matrixWorld)),zt.logarithmicDepthBuffer&&ae.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&ae.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),Z!==v&&(Z=v,Pe=!0,Lr=!0)}if(L.isSkinnedMesh){ae.setOptional(C,L,"bindMatrix"),ae.setOptional(C,L,"bindMatrixInverse");let Oe=L.skeleton;Oe&&(Oe.boneTexture===null&&Oe.computeBoneTexture(),ae.setValue(C,"boneTexture",Oe.boneTexture,E))}L.isBatchedMesh&&(ae.setOptional(C,L,"batchingTexture"),ae.setValue(C,"batchingTexture",L._matricesTexture,E),ae.setOptional(C,L,"batchingIdTexture"),ae.setValue(C,"batchingIdTexture",L._indirectTexture,E),ae.setOptional(C,L,"batchingColorTexture"),L._colorsTexture!==null&&ae.setValue(C,"batchingColorTexture",L._colorsTexture,E));let Dr=O.morphAttributes;if((Dr.position!==void 0||Dr.normal!==void 0||Dr.color!==void 0)&&Tt.update(L,O,ke),(Pe||vt.receiveShadow!==L.receiveShadow)&&(vt.receiveShadow=L.receiveShadow,ae.setValue(C,"receiveShadow",L.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(vn.envMap.value=gt,vn.flipEnvMap.value=gt.isCubeTexture&&gt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&I.environment!==null&&(vn.envMapIntensity.value=I.environmentIntensity),Pe&&(ae.setValue(C,"toneMappingExposure",M.toneMappingExposure),vt.needsLights&&lh(vn,Lr),tt&&F.fog===!0&&nt.refreshFogUniforms(vn,tt),nt.refreshMaterialUniforms(vn,F,Q,k,u.state.transmissionRenderTarget[v.id]),yi.upload(C,dl(vt),vn,E)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(yi.upload(C,dl(vt),vn,E),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&ae.setValue(C,"center",L.center),ae.setValue(C,"modelViewMatrix",L.modelViewMatrix),ae.setValue(C,"normalMatrix",L.normalMatrix),ae.setValue(C,"modelMatrix",L.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){let Oe=F.uniformsGroups;for(let Ur=0,hh=Oe.length;Ur<hh;Ur++){let pl=Oe[Ur];P.update(pl,ke),P.bind(pl,ke)}}return ke}function lh(v,I){v.ambientLightColor.needsUpdate=I,v.lightProbe.needsUpdate=I,v.directionalLights.needsUpdate=I,v.directionalLightShadows.needsUpdate=I,v.pointLights.needsUpdate=I,v.pointLightShadows.needsUpdate=I,v.spotLights.needsUpdate=I,v.spotLightShadows.needsUpdate=I,v.rectAreaLights.needsUpdate=I,v.hemisphereLights.needsUpdate=I}function ch(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(v,I,O){At.get(v.texture).__webglTexture=I,At.get(v.depthTexture).__webglTexture=O;let F=At.get(v);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=O===void 0,F.__autoAllocateDepthBuffer||Dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,I){let O=At.get(v);O.__webglFramebuffer=I,O.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(v,I=0,O=0){T=v,D=I,R=O;let F=!0,L=null,tt=!1,st=!1;if(v){let gt=At.get(v);if(gt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(C.FRAMEBUFFER,null),F=!1;else if(gt.__webglFramebuffer===void 0)E.setupRenderTarget(v);else if(gt.__hasExternalTextures)E.rebindTextures(v,At.get(v.texture).__webglTexture,At.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let yt=v.depthTexture;if(gt.__boundDepthTexture!==yt){if(yt!==null&&At.has(yt)&&(v.width!==yt.image.width||v.height!==yt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(v)}}let Mt=v.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(st=!0);let bt=At.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(bt[I])?L=bt[I][O]:L=bt[I],tt=!0):v.samples>0&&E.useMultisampledRTT(v)===!1?L=At.get(v).__webglMultisampledFramebuffer:Array.isArray(bt)?L=bt[O]:L=bt,x.copy(v.viewport),S.copy(v.scissor),z=v.scissorTest}else x.copy(ct).multiplyScalar(Q).floor(),S.copy(_t).multiplyScalar(Q).floor(),z=Vt;if(Et.bindFramebuffer(C.FRAMEBUFFER,L)&&F&&Et.drawBuffers(v,L),Et.viewport(x),Et.scissor(S),Et.setScissorTest(z),tt){let gt=At.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+I,gt.__webglTexture,O)}else if(st){let gt=At.get(v.texture),Mt=I||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,gt.__webglTexture,O||0,Mt)}U=-1},this.readRenderTargetPixels=function(v,I,O,F,L,tt,st){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=At.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&st!==void 0&&(pt=pt[st]),pt){Et.bindFramebuffer(C.FRAMEBUFFER,pt);try{let gt=v.texture,Mt=gt.format,bt=gt.type;if(!zt.textureFormatReadable(Mt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=v.width-F&&O>=0&&O<=v.height-L&&C.readPixels(I,O,F,L,Ct.convert(Mt),Ct.convert(bt),tt)}finally{let gt=T!==null?At.get(T).__webglFramebuffer:null;Et.bindFramebuffer(C.FRAMEBUFFER,gt)}}},this.readRenderTargetPixelsAsync=async function(v,I,O,F,L,tt,st){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=At.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&st!==void 0&&(pt=pt[st]),pt){let gt=v.texture,Mt=gt.format,bt=gt.type;if(!zt.textureFormatReadable(Mt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(I>=0&&I<=v.width-F&&O>=0&&O<=v.height-L){Et.bindFramebuffer(C.FRAMEBUFFER,pt);let yt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.bufferData(C.PIXEL_PACK_BUFFER,tt.byteLength,C.STREAM_READ),C.readPixels(I,O,F,L,Ct.convert(Mt),Ct.convert(bt),0);let Jt=T!==null?At.get(T).__webglFramebuffer:null;Et.bindFramebuffer(C.FRAMEBUFFER,Jt);let ee=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await fu(C,ee,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,yt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,tt),C.deleteBuffer(yt),C.deleteSync(ee),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,I=null,O=0){v.isTexture!==!0&&(ks("WebGLRenderer: copyFramebufferToTexture function signature has changed."),I=arguments[0]||null,v=arguments[1]);let F=Math.pow(2,-O),L=Math.floor(v.image.width*F),tt=Math.floor(v.image.height*F),st=I!==null?I.x:0,pt=I!==null?I.y:0;E.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,O,0,0,st,pt,L,tt),Et.unbindTexture()},this.copyTextureToTexture=function(v,I,O=null,F=null,L=0){v.isTexture!==!0&&(ks("WebGLRenderer: copyTextureToTexture function signature has changed."),F=arguments[0]||null,v=arguments[1],I=arguments[2],L=arguments[3]||0,O=null);let tt,st,pt,gt,Mt,bt;O!==null?(tt=O.max.x-O.min.x,st=O.max.y-O.min.y,pt=O.min.x,gt=O.min.y):(tt=v.image.width,st=v.image.height,pt=0,gt=0),F!==null?(Mt=F.x,bt=F.y):(Mt=0,bt=0);let yt=Ct.convert(I.format),Jt=Ct.convert(I.type);E.setTexture2D(I,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);let ee=C.getParameter(C.UNPACK_ROW_LENGTH),re=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Ce=C.getParameter(C.UNPACK_SKIP_PIXELS),Gt=C.getParameter(C.UNPACK_SKIP_ROWS),vt=C.getParameter(C.UNPACK_SKIP_IMAGES),ge=v.isCompressedTexture?v.mipmaps[L]:v.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,ge.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ge.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,pt),C.pixelStorei(C.UNPACK_SKIP_ROWS,gt),v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,L,Mt,bt,tt,st,yt,Jt,ge.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,L,Mt,bt,ge.width,ge.height,yt,ge.data):C.texSubImage2D(C.TEXTURE_2D,L,Mt,bt,tt,st,yt,Jt,ge),C.pixelStorei(C.UNPACK_ROW_LENGTH,ee),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,re),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,Gt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,vt),L===0&&I.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),Et.unbindTexture()},this.copyTextureToTexture3D=function(v,I,O=null,F=null,L=0){v.isTexture!==!0&&(ks("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,F=arguments[1]||null,v=arguments[2],I=arguments[3],L=arguments[4]||0);let tt,st,pt,gt,Mt,bt,yt,Jt,ee,re=v.isCompressedTexture?v.mipmaps[L]:v.image;O!==null?(tt=O.max.x-O.min.x,st=O.max.y-O.min.y,pt=O.max.z-O.min.z,gt=O.min.x,Mt=O.min.y,bt=O.min.z):(tt=re.width,st=re.height,pt=re.depth,gt=0,Mt=0,bt=0),F!==null?(yt=F.x,Jt=F.y,ee=F.z):(yt=0,Jt=0,ee=0);let Ce=Ct.convert(I.format),Gt=Ct.convert(I.type),vt;if(I.isData3DTexture)E.setTexture3D(I,0),vt=C.TEXTURE_3D;else if(I.isDataArrayTexture||I.isCompressedArrayTexture)E.setTexture2DArray(I,0),vt=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,I.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,I.unpackAlignment);let ge=C.getParameter(C.UNPACK_ROW_LENGTH),Wt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ke=C.getParameter(C.UNPACK_SKIP_PIXELS),Qn=C.getParameter(C.UNPACK_SKIP_ROWS),Pe=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,re.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,re.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Mt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,bt),v.isDataTexture||v.isData3DTexture?C.texSubImage3D(vt,L,yt,Jt,ee,tt,st,pt,Ce,Gt,re.data):I.isCompressedArrayTexture?C.compressedTexSubImage3D(vt,L,yt,Jt,ee,tt,st,pt,Ce,re.data):C.texSubImage3D(vt,L,yt,Jt,ee,tt,st,pt,Ce,Gt,re),C.pixelStorei(C.UNPACK_ROW_LENGTH,ge),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Wt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ke),C.pixelStorei(C.UNPACK_SKIP_ROWS,Qn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Pe),L===0&&I.generateMipmaps&&C.generateMipmap(vt),Et.unbindTexture()},this.initRenderTarget=function(v){At.get(v).__webglFramebuffer===void 0&&E.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?E.setTextureCube(v,0):v.isData3DTexture?E.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?E.setTexture2DArray(v,0):E.setTexture2D(v,0),Et.unbindTexture()},this.resetState=function(){D=0,R=0,T=null,Et.reset(),Qt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ko?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===vr?"display-p3":"srgb"}};var Pi=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new je,this.environmentIntensity=1,this.environmentRotation=new je,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var nr=class extends gn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ir=new A,sr=new A,dc=new ie,Gi=new Zn,Is=new wi,ha=new A,fc=new A,yo=class extends Se{constructor(t=new pe,e=new nr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ir.fromBufferAttribute(e,s-1),sr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ir.distanceTo(sr);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(s),Is.radius+=r,t.ray.intersectsSphere(Is)===!1)return;dc.copy(s).invert(),Gi.copy(t.ray).applyMatrix4(dc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,p=n.attributes.position;if(h!==null){let m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=m,u=g-1;_<u;_+=c){let f=h.getX(_),w=h.getX(_+1),M=Ls(this,t,Gi,l,f,w);M&&e.push(M)}if(this.isLineLoop){let _=h.getX(g-1),u=h.getX(m),f=Ls(this,t,Gi,l,_,u);f&&e.push(f)}}else{let m=Math.max(0,a.start),g=Math.min(p.count,a.start+a.count);for(let _=m,u=g-1;_<u;_+=c){let f=Ls(this,t,Gi,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){let _=Ls(this,t,Gi,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ls(i,t,e,n,s,r){let a=i.geometry.attributes.position;if(ir.fromBufferAttribute(a,s),sr.fromBufferAttribute(a,r),e.distanceSqToSegment(ir,sr,ha,fc)>n)return;ha.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ha);if(!(l<t.near||l>t.far))return{distance:l,point:fc.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var pc=new A,mc=new A,vo=class extends yo{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)pc.fromBufferAttribute(e,s),mc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+pc.distanceTo(mc);t.setAttribute("lineDistance",new qt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var qe=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let h=n[s],p=n[s+1]-h,m=(a-h)/p;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new ot:new A);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new A,s=[],r=[],a=[],o=new A,l=new ie;for(let m=0;m<=t;m++){let g=m/t;s[m]=this.getTangentAt(g,new A)}r[0]=new A,a[0]=new A;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),p=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),p<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(fe(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(l.makeRotationAxis(o,g))}a[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(fe(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(m=-m);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],m*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},rr=class extends qe{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ot){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),p=l-this.aX,m=c-this.aY;l=p*h-m*d+this.aX,c=p*d+m*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Mo=class extends rr{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Qo(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let p=(a-r)/c-(o-r)/(c+h)+(o-a)/h,m=(o-a)/h-(l-a)/(h+d)+(l-o)/d;p*=h,m*=h,s(a,o,p,m)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var Ds=new A,ua=new Qo,da=new Qo,fa=new Qo,es=class extends qe{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new A){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Ds.subVectors(s[0],s[1]).add(s[0]),c=Ds);let d=s[o%r],p=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ds.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ds),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),m),_=Math.pow(d.distanceToSquared(p),m),u=Math.pow(p.distanceToSquared(h),m);_<1e-4&&(_=1),g<1e-4&&(g=_),u<1e-4&&(u=_),ua.initNonuniformCatmullRom(c.x,d.x,p.x,h.x,g,_,u),da.initNonuniformCatmullRom(c.y,d.y,p.y,h.y,g,_,u),fa.initNonuniformCatmullRom(c.z,d.z,p.z,h.z,g,_,u)}else this.curveType==="catmullrom"&&(ua.initCatmullRom(c.x,d.x,p.x,h.x,this.tension),da.initCatmullRom(c.y,d.y,p.y,h.y,this.tension),fa.initCatmullRom(c.z,d.z,p.z,h.z,this.tension));return n.set(ua.calc(l),da.calc(l),fa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new A().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function gc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function ug(i,t){let e=1-i;return e*e*t}function dg(i,t){return 2*(1-i)*i*t}function fg(i,t){return i*i*t}function Ji(i,t,e,n){return ug(i,t)+dg(i,e)+fg(i,n)}function pg(i,t){let e=1-i;return e*e*e*t}function mg(i,t){let e=1-i;return 3*e*e*i*t}function gg(i,t){return 3*(1-i)*i*i*t}function _g(i,t){return i*i*i*t}function Ki(i,t,e,n,s){return pg(i,t)+mg(i,e)+gg(i,n)+_g(i,s)}var So=class extends qe{constructor(t=new ot,e=new ot,n=new ot,s=new ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ot){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ki(t,s.x,r.x,a.x,o.x),Ki(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},bo=class extends qe{constructor(t=new A,e=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ki(t,s.x,r.x,a.x,o.x),Ki(t,s.y,r.y,a.y,o.y),Ki(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Eo=class extends qe{constructor(t=new ot,e=new ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ot){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},wo=class extends qe{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},To=class extends qe{constructor(t=new ot,e=new ot,n=new ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ot){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ji(t,s.x,r.x,a.x),Ji(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ar=class extends qe{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Ji(t,s.x,r.x,a.x),Ji(t,s.y,r.y,a.y),Ji(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ao=class extends qe{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ot){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(gc(o,l.x,c.x,h.x,d.x),gc(o,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ot().fromArray(s))}return this}},xg=Object.freeze({__proto__:null,ArcCurve:Mo,CatmullRomCurve3:es,CubicBezierCurve:So,CubicBezierCurve3:bo,EllipseCurve:rr,LineCurve:Eo,LineCurve3:wo,QuadraticBezierCurve:To,QuadraticBezierCurve3:ar,SplineCurve:Ao});var ns=class i extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new A,h=new ot;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=e;d++,p+=3){let m=n+d/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[p]/t+1)/2,h.y=(a[p+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(o,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},is=class i extends pe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],p=[],m=[],g=0,_=[],u=n/2,f=0;w(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new qt(d,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(m,2));function w(){let b=new A,D=new A,R=0,T=(e-t)/n;for(let U=0;U<=r;U++){let Z=[],x=U/r,S=x*(e-t)+t;for(let z=0;z<=s;z++){let B=z/s,V=B*l+o,J=Math.sin(V),k=Math.cos(V);D.x=S*J,D.y=-x*n+u,D.z=S*k,d.push(D.x,D.y,D.z),b.set(J,T,k).normalize(),p.push(b.x,b.y,b.z),m.push(B,1-x),Z.push(g++)}_.push(Z)}for(let U=0;U<s;U++)for(let Z=0;Z<r;Z++){let x=_[Z][U],S=_[Z+1][U],z=_[Z+1][U+1],B=_[Z][U+1];t>0&&(h.push(x,S,B),R+=3),e>0&&(h.push(S,z,B),R+=3)}c.addGroup(f,R,0),f+=R}function M(b){let D=g,R=new ot,T=new A,U=0,Z=b===!0?t:e,x=b===!0?1:-1;for(let z=1;z<=s;z++)d.push(0,u*x,0),p.push(0,x,0),m.push(.5,.5),g++;let S=g;for(let z=0;z<=s;z++){let V=z/s*l+o,J=Math.cos(V),k=Math.sin(V);T.x=Z*k,T.y=u*x,T.z=Z*J,d.push(T.x,T.y,T.z),p.push(0,x,0),R.x=J*.5+.5,R.y=k*.5*x+.5,m.push(R.x,R.y),g++}for(let z=0;z<s;z++){let B=D+z,V=S+z;b===!0?h.push(V,V+1,B):h.push(V+1,V,B),U+=3}c.addGroup(f,U,b===!0?1:2),f+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},or=class i extends is{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var lr=class i extends pe{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);let o=[],l=[],c=[],h=[],d=t,p=(e-t)/s,m=new A,g=new ot;for(let _=0;_<=s;_++){for(let u=0;u<=n;u++){let f=r+u/n*a;m.x=d*Math.cos(f),m.y=d*Math.sin(f),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}d+=p}for(let _=0;_<s;_++){let u=_*(n+1);for(let f=0;f<n;f++){let w=f+u,M=w,b=w+n+1,D=w+n+2,R=w+1;o.push(M,b,R),o.push(b,D,R)}}this.setIndex(o),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var cr=class i extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let a=[],o=[],l=[],c=[],h=new A,d=new A,p=new A;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){let _=g/s*r,u=m/n*Math.PI*2;d.x=(t+e*Math.cos(u))*Math.cos(_),d.y=(t+e*Math.cos(u))*Math.sin(_),d.z=e*Math.sin(u),o.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),p.subVectors(d,h).normalize(),l.push(p.x,p.y,p.z),c.push(g/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){let _=(s+1)*m+g-1,u=(s+1)*(m-1)+g-1,f=(s+1)*(m-1)+g,w=(s+1)*m+g;a.push(_,u,w),a.push(u,f,w)}this.setIndex(a),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var hr=class i extends pe{constructor(t=new ar(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new A,l=new A,c=new ot,h=new A,d=[],p=[],m=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new qt(d,3)),this.setAttribute("normal",new qt(p,3)),this.setAttribute("uv",new qt(m,2));function _(){for(let M=0;M<e;M++)u(M);u(r===!1?e:0),w(),f()}function u(M){h=t.getPointAt(M/e,h);let b=a.normals[M],D=a.binormals[M];for(let R=0;R<=s;R++){let T=R/s*Math.PI*2,U=Math.sin(T),Z=-Math.cos(T);l.x=Z*b.x+U*D.x,l.y=Z*b.y+U*D.y,l.z=Z*b.z+U*D.z,l.normalize(),p.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function f(){for(let M=1;M<=e;M++)for(let b=1;b<=s;b++){let D=(s+1)*(M-1)+(b-1),R=(s+1)*M+(b-1),T=(s+1)*M+b,U=(s+1)*(M-1)+b;g.push(D,R,U),g.push(R,T,U)}}function w(){for(let M=0;M<=e;M++)for(let b=0;b<=s;b++)c.x=M/e,c.y=b/s,m.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new xg[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var ur=class extends gn{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Lt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};var xn=class extends gn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nc,this.normalScale=new ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new je,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Us(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function yg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ii=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ro=class extends Ii{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yl,endingEnd:yl}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vl:r=t,o=2*e-n;break;case Ml:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vl:a=t,l=2*n-e;break;case Ml:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,p=this._weightPrev,m=this._weightNext,g=(n-e)/(s-e),_=g*g,u=_*g,f=-p*u+2*p*_-p*g,w=(1+p)*u+(-1.5-2*p)*_+(-.5+p)*g+1,M=(-1-m)*u+(1.5+m)*_+.5*g,b=m*u-m*_;for(let D=0;D!==o;++D)r[D]=f*a[h+D]+w*a[c+D]+M*a[l+D]+b*a[d+D];return r}},Co=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),d=1-h;for(let p=0;p!==o;++p)r[p]=a[c+p]*d+a[l+p]*h;return r}},Po=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Ze=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Us(e,this.TimeBufferType),this.values=Us(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Us(t.times,Array),values:Us(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Po(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Co(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Ro(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Vs:e=this.InterpolantFactoryMethodDiscrete;break;case eo:e=this.InterpolantFactoryMethodLinear;break;case Or:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return eo;case this.InterpolantFactoryMethodSmooth:return Or}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&yg(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Or,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*n,p=d-n,m=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[p+g]||_!==e[m+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*n,p=a*n;for(let m=0;m!==n;++m)e[p+m]=e[d+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Ze.prototype.TimeBufferType=Float32Array;Ze.prototype.ValueBufferType=Float32Array;Ze.prototype.DefaultInterpolation=eo;var Jn=class extends Ze{constructor(t,e,n){super(t,e,n)}};Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=Vs;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;var Io=class extends Ze{};Io.prototype.ValueTypeName="color";var Lo=class extends Ze{};Lo.prototype.ValueTypeName="number";var Do=class extends Ii{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ye.slerpFlat(r,0,a,c-o,a,c,l);return r}},dr=class extends Ze{InterpolantFactoryMethodLinear(t){return new Do(this.times,this.values,this.getValueSize(),t)}};dr.prototype.ValueTypeName="quaternion";dr.prototype.InterpolantFactoryMethodSmooth=void 0;var Kn=class extends Ze{constructor(t,e,n){super(t,e,n)}};Kn.prototype.ValueTypeName="string";Kn.prototype.ValueBufferType=Array;Kn.prototype.DefaultInterpolation=Vs;Kn.prototype.InterpolantFactoryMethodLinear=void 0;Kn.prototype.InterpolantFactoryMethodSmooth=void 0;var Uo=class extends Ze{};Uo.prototype.ValueTypeName="vector";var No=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,p=c.length;d<p;d+=2){let m=c[d],g=c[d+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}},vg=new No,Oo=class{constructor(t){this.manager=t!==void 0?t:vg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Oo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=class extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},fr=class extends ss{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},pa=new ie,_c=new A,xc=new A,pr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ot(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ts,this._frameExtents=new ot(1,1),this._viewportCount=1,this._viewports=[new $t(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;_c.setFromMatrixPosition(t.matrixWorld),e.position.copy(_c),xc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xc),e.updateMatrixWorld(),pa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var yc=new ie,Wi=new A,ma=new A,Fo=class extends pr{constructor(){super(new ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ot(4,2),this._viewportCount=6,this._viewports=[new $t(2,1,1,1),new $t(0,1,1,1),new $t(3,1,1,1),new $t(1,1,1,1),new $t(3,0,1,1),new $t(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Wi.setFromMatrixPosition(t.matrixWorld),n.position.copy(Wi),ma.copy(n.position),ma.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ma),n.updateMatrixWorld(),s.makeTranslation(-Wi.x,-Wi.y,-Wi.z),yc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yc)}},mr=class extends ss{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Fo}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Bo=class extends pr{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},rs=class extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Bo}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var tl="\\[\\]\\.:\\/",Mg=new RegExp("["+tl+"]","g"),el="[^"+tl+"]",Sg="[^"+tl.replace("\\.","")+"]",bg=/((?:WC+[\/:])*)/.source.replace("WC",el),Eg=/(WCOD+)?/.source.replace("WCOD",Sg),wg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",el),Tg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",el),Ag=new RegExp("^"+bg+Eg+wg+Tg+"$"),Rg=["material","materials","bones","map"],zo=class{constructor(t,e,n){let s=n||se.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},se=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Mg,"")}static parseTrackName(t){let e=Ag.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Rg.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};se.Composite=zo;se.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};se.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};se.prototype.GetterByBindingType=[se.prototype._getValue_direct,se.prototype._getValue_array,se.prototype._getValue_arrayElement,se.prototype._getValue_toArray];se.prototype.SetterByBindingTypeAndVersioning=[[se.prototype._setValue_direct,se.prototype._setValue_direct_setNeedsUpdate,se.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[se.prototype._setValue_array,se.prototype._setValue_array_setNeedsUpdate,se.prototype._setValue_array_setMatrixWorldNeedsUpdate],[se.prototype._setValue_arrayElement,se.prototype._setValue_arrayElement_setNeedsUpdate,se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[se.prototype._setValue_fromArray,se.prototype._setValue_fromArray_setNeedsUpdate,se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var $g=new Float32Array(1);var vc=new ie,gr=class{constructor(t,e,n=0,s=1/0){this.ray=new Zn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Qi,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return vc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(vc),this}intersectObject(t,e=!0,n=[]){return ko(t,this,n,e),n.sort(Mc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ko(t[s],this,n,e);return n.sort(Mc),n}};function Mc(i,t){return i.distance-t.distance}function ko(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)ko(r[a],t,e,!0)}}var as=class{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(fe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var _r=class extends vo{constructor(t=10,e=10,n=4473924,s=8947848){n=new Lt(n),s=new Lt(s);let r=e/2,a=t/e,o=t/2,l=[],c=[];for(let p=0,m=0,g=-o;p<=e;p++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let _=p===r?n:s;_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3,_.toArray(c,m),m+=3}let h=new pe;h.setAttribute("position",new qt(l,3)),h.setAttribute("color",new qt(c,3));let d=new nr({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var xr=class extends fn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vo);var qc={type:"change"},il={type:"start"},Jc={type:"end"},Sr=new Zn,Zc=new De,Cg=Math.cos(70*Fc.DEG2RAD),ue=new A,Ae=2*Math.PI,jt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},nl=1e-6,br=class extends xr{constructor(t,e=null){super(t,e),this.state=jt.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$n.ROTATE,MIDDLE:$n.DOLLY,RIGHT:$n.PAN},this.touches={ONE:jn.ROTATE,TWO:jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new Ye,this._lastTargetPosition=new A,this._quat=new Ye().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new as,this._sphericalDelta=new as,this._scale=1,this._panOffset=new A,this._rotateStart=new ot,this._rotateEnd=new ot,this._rotateDelta=new ot,this._panStart=new ot,this._panEnd=new ot,this._panDelta=new ot,this._dollyStart=new ot,this._dollyEnd=new ot,this._dollyDelta=new ot,this._dollyDirection=new A,this._mouse=new ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ig.bind(this),this._onPointerDown=Pg.bind(this),this._onPointerUp=Lg.bind(this),this._onContextMenu=zg.bind(this),this._onMouseWheel=Ng.bind(this),this._onKeyDown=Og.bind(this),this._onTouchStart=Fg.bind(this),this._onTouchMove=Bg.bind(this),this._onMouseDown=Dg.bind(this),this._onMouseMove=Ug.bind(this),this._interceptControlDown=kg.bind(this),this._interceptControlUp=Vg.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(qc),this.update(),this.state=jt.NONE}update(t=null){let e=this.object.position;ue.copy(e).sub(this.target),ue.applyQuaternion(this._quat),this._spherical.setFromVector3(ue),this.autoRotate&&this.state===jt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Ae:n>Math.PI&&(n-=Ae),s<-Math.PI?s+=Ae:s>Math.PI&&(s-=Ae),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ue.setFromSpherical(this._spherical),ue.applyQuaternion(this._quatInverse),e.copy(this.target).add(ue),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=ue.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new A(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ue.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Sr.origin.copy(this.object.position),Sr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Sr.direction))<Cg?this.object.lookAt(this.target):(Zc.setFromNormalAndCoplanarPoint(this.object.up,this.target),Sr.intersectPlane(Zc,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>nl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>nl||this._lastTargetPosition.distanceToSquared(this.target)>nl?(this.dispatchEvent(qc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ae/60*this.autoRotateSpeed*t:Ae/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ue.setFromMatrixColumn(e,0),ue.multiplyScalar(-t),this._panOffset.add(ue)}_panUp(t,e){this.screenSpacePanning===!0?ue.setFromMatrixColumn(e,1):(ue.setFromMatrixColumn(e,0),ue.crossVectors(this.object.up,ue)),ue.multiplyScalar(t),this._panOffset.add(ue)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;ue.copy(s).sub(this.target);let r=ue.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ae*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ae*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ae*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(Ae*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ae*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Pg(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Ig(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Lg(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jc),this.state=jt.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Dg(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case $n.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=jt.DOLLY;break;case $n.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=jt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=jt.ROTATE}break;case $n.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=jt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=jt.PAN}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(il)}function Ug(i){switch(this.state){case jt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case jt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case jt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ng(i){this.enabled===!1||this.enableZoom===!1||this.state!==jt.NONE||(i.preventDefault(),this.dispatchEvent(il),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Jc))}function Og(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Fg(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=jt.TOUCH_ROTATE;break;case jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=jt.TOUCH_PAN;break;default:this.state=jt.NONE}break;case 2:switch(this.touches.TWO){case jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=jt.TOUCH_DOLLY_PAN;break;case jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=jt.TOUCH_DOLLY_ROTATE;break;default:this.state=jt.NONE}break;default:this.state=jt.NONE}this.state!==jt.NONE&&this.dispatchEvent(il)}function Bg(i){switch(this._trackPointer(i),this.state){case jt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case jt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case jt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case jt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=jt.NONE}}function zg(i){this.enabled!==!1&&i.preventDefault()}function kg(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Vg(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Er=class extends Pi{constructor(){super();let t=new _n;t.deleteAttribute("uv");let e=new xn({side:ve}),n=new xn,s=new mr(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Yt(t,e);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let a=new Yt(t,n);a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),this.add(a);let o=new Yt(t,n);o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),this.add(o);let l=new Yt(t,n);l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),this.add(l);let c=new Yt(t,n);c.position.set(-2.017,.018,6.124),c.rotation.set(0,.333,0),c.scale.set(2.002,4.566,2.064),this.add(c);let h=new Yt(t,n);h.position.set(2.291,-.756,-2.621),h.rotation.set(0,-.286,0),h.scale.set(1.546,1.552,1.496),this.add(h);let d=new Yt(t,n);d.position.set(-2.193,-.369,-5.547),d.rotation.set(0,.516,0),d.scale.set(3.875,3.487,2.986),this.add(d);let p=new Yt(t,Ui(50));p.position.set(-16.116,14.37,8.208),p.scale.set(.1,2.428,2.739),this.add(p);let m=new Yt(t,Ui(50));m.position.set(-16.109,18.021,-8.207),m.scale.set(.1,2.425,2.751),this.add(m);let g=new Yt(t,Ui(17));g.position.set(14.904,12.198,-1.832),g.scale.set(.15,4.265,6.331),this.add(g);let _=new Yt(t,Ui(43));_.position.set(-.462,8.89,14.52),_.scale.set(4.38,5.441,.088),this.add(_);let u=new Yt(t,Ui(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Yt(t,Ui(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(let e of t)e.dispose()}};function Ui(i){let t=new Ti;return t.color.setScalar(i),t}var Hg={revision:"v2",style:"01 \u2014 \u043F\u043E\u043B\u0443\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439, \u0432\u044B\u0431\u0440\u0430\u043D \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C",confirmed:"\u0428\u0414 \u0432 \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u043E\u043C \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u043C \u043A\u043E\u0440\u043F\u0443\u0441\u0435 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0422\u041E; \u0437\u0430\u0442\u0435\u043C \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0442\u0440\u0430\u043A\u0442, \u0428\u041E\u0414 \u043F\u0435\u0440\u0435\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u043E\u043C, \u0434\u0430\u043B\u0435\u0435 \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u044B\u043C\u043E\u0445\u043E\u0434.",assumptions:"\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443 +Z \u043C\u043E\u0434\u0435\u043B\u0438, \u0444\u043E\u0440\u043C\u0430 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430, \u0441\u0435\u0447\u0435\u043D\u0438\u044F, \u0434\u043B\u0438\u043D\u044B, \u0432\u044B\u0441\u043E\u0442\u044B, \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u0432\u043E\u0434\u043E\u0432 \u0438 \u0437\u0430\u0441\u043B\u043E\u043D\u043E\u043A \u0443\u0441\u043B\u043E\u0432\u043D\u044B. \u041E\u043F\u043E\u0440\u044B \u043D\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u0438\u0441\u044C.",terminology:"\u0428\u0414 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0428\u0422 \u0432 docs/02_\u0422\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0447\u0435\u0441\u043A\u0430\u044F_\u0441\u0445\u0435\u043C\u0430.md.",outletCAD:{x:-1.19,y:2.175,z:0},fanCenter:{x:-1.19,y:2.78,z:1.83},chimneyCenter:{x:-3.05,z:1.83},internalGasDirection:"\u041D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E; \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430 \u043D\u043E\u0432\u043E\u0439 \u0432\u043D\u0435\u0448\u043D\u0435\u0439 \u043E\u0431\u0432\u044F\u0437\u043A\u0435."};function Kc(i,t){let e=[];function n(_,u,f,w=[0,0,0],M=null,b=!1){let D=new Yt(_,new xn({side:Ue}));return D.position.set(...w),M&&D.rotation.set(...M),D.userData={category:u,name:f,id:"concept-"+e.length,origin:"concept",skin:b},D.castShadow=!b,D.receiveShadow=!0,i.add(D),t.push(D),e.push(D),D}let s=(_,u,f,w,M,b=!1)=>n(new _n(..._),u,f,w,M,b);function r(_,u,f,w,M,b="y",D=!1,R=!0){return n(new is(_,_,u,48,1,R),f,w,M,b==="x"?[0,0,Math.PI/2]:b==="z"?[Math.PI/2,0,0]:null,D)}function a(_,u,f,w){let M=new es(_.map(b=>new A(...b)),!1,"centripetal");return n(new hr(M,80,u,40,!1),f,w,[0,0,0],null,!0)}function o(_,u,f,w="y"){let M=n(new cr(_,.017,8,48),f,"\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0444\u043B\u0430\u043D\u0435\u0446",u);return w==="y"&&(M.rotation.x=Math.PI/2),w==="x"&&(M.rotation.y=Math.PI/2),M}function l(_,u,f,w){let M=new A(...u).normalize(),b=new A(..._),D=r(.012,f-.12,w,"\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0442\u043E\u043A\u0430 \u2014 \u043F\u043E \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044E",b.clone().addScaledVector(M,(f-.12)/2).toArray(),"y",!1,!1);D.quaternion.setFromUnitVectors(new A(0,1,0),M),n(new or(.05,.12,16),w,"\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u043F\u043E\u0442\u043E\u043A\u0430",b.clone().addScaledVector(M,f-.06).toArray()).quaternion.copy(D.quaternion)}s([.34,.014,.72],"damper","\u0428\u0414 / \u0428\u0422: \u0443\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043F\u043B\u0430\u0441\u0442\u0438\u043D\u0430",[-1.19,2.08,0],[0,0,.65]),r(.018,.91,"damper","\u0423\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043E\u0441\u044C \u0448\u0438\u0431\u0435\u0440\u0430",[-1.19,2.08,0],"z",!1,!1),s([.2,.13,.14],"damper","\u0423\u0441\u043B\u043E\u0432\u043D\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u0432\u043E\u0434\u0430",[-1.19,2.08,.51]);let c=[],h=[];for(let _=0;_<2;_++)for(let u=0;u<=64;u++){let f=2*Math.PI*u/64,w=Math.cos(f),M=Math.sin(f),b=_?.24:Math.min(.2/(Math.abs(w)||1e-8),.414/(Math.abs(M)||1e-8));c.push(-1.19+b*w,_?2.43:2.175,b*M)}for(let _=0;_<64;_++){let u=_,f=_+1,w=_+65,M=_+66;h.push(u,w,f,f,w,M)}let d=new pe;d.setAttribute("position",new qt(c,3)),d.setIndex(h),d.computeVertexNormals(),n(d,"duct","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u043F\u0435\u0440\u0435\u0445\u043E\u0434 \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A \u2192 \u043A\u0440\u0443\u0433",[0,0,0],null,!0);let p=[];for(let _=0;_<=20;_++){let u=Math.PI*.5*_/20;p.push([-1.19,2.43+.35*Math.sin(u),.35-.35*Math.cos(u)])}p.push([-1.19,2.78,1],[-1.19,2.78,1.63]),a(p,.24,"duct","\u0413\u0430\u0437\u043E\u0445\u043E\u0434: \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u0438 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0443\u0447\u0430\u0441\u0442\u043E\u043A"),o(.25,[-1.19,2.43,0],"duct"),o(.25,[-1.19,2.78,1.6],"duct","z"),r(.13,.78,"shod","\u0412\u0440\u0435\u0437\u043A\u0430 \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0433\u043E \u0432\u043E\u0437\u0434\u0443\u0445\u0430 \u043F\u0435\u0440\u0435\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u043E\u043C",[-.8,2.78,.9],"x",!0),o(.14,[-.41,2.78,.9],"shod","x");let m=n(new ns(.119,40),"shod","\u041F\u043B\u0430\u0441\u0442\u0438\u043D\u0430 \u0428\u041E\u0414 \u2014 \u0443\u0441\u043B\u043E\u0432\u043D\u043E\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435",[-.69,2.78,.9]);m.rotation.y=Math.PI/2+.6,r(.013,.34,"shod","\u0423\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043E\u0441\u044C \u0428\u041E\u0414",[-.69,2.78,.9],"y",!1,!1),s([.13,.12,.11],"shod","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u043F\u0440\u0438\u0432\u043E\u0434 \u0428\u041E\u0414",[-.69,3.01,.9]),l([.1,2.78,.9],[-1,0,0],.42,"airflow"),r(.45,.4,"fan","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u043A\u043E\u0440\u043F\u0443\u0441 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430 \u04143,5",[-1.19,2.78,1.83],"z",!0),n(new lr(.24,.45,48),"fan","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0432\u0445\u043E\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430",[-1.19,2.78,1.63],null,!0),o(.45,[-1.19,2.78,1.63],"fan","z"),o(.45,[-1.19,2.78,2.03],"fan","z");let g=n(new ns(.45,48),"fan","\u0423\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u0437\u0430\u0434\u043D\u044F\u044F \u0441\u0442\u0435\u043D\u043A\u0430 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430",[-1.19,2.78,2.03],null,!0);r(.095,.27,"fan","\u0421\u0442\u0443\u043F\u0438\u0446\u0430 \u0443\u0441\u043B\u043E\u0432\u043D\u043E\u0433\u043E \u043A\u043E\u043B\u0435\u0441\u0430",[-1.19,2.78,1.84],"z",!1,!1);for(let _=0;_<16;_++){let u=2*Math.PI*_/16;s([.2,.026,.23],"fan","\u0423\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043B\u043E\u043F\u0430\u0442\u043A\u0430 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u043A\u043E\u043B\u0435\u0441\u0430",[-1.19+.265*Math.cos(u),2.78+.265*Math.sin(u),1.83],[0,0,u+.27])}r(.17,.43,"motor","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044C \u0410\u0418\u0420, \u043F\u0440\u044F\u043C\u043E\u0439 \u043F\u0440\u0438\u0432\u043E\u0434",[-1.19,2.78,2.31],"z",!1,!1);for(let _=0;_<7;_++)o(.18,[-1.19,2.78,2.14+_*.05],"motor","z");return s([.17,.12,.19],"motor","\u0423\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043A\u043B\u0435\u043C\u043C\u043D\u0430\u044F \u043A\u043E\u0440\u043E\u0431\u043A\u0430",[-1.19,3,2.3]),s([.4,.3,.34],"fan","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0432\u044B\u0445\u043E\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430",[-1.52,3.09,1.83],null,!0),s([1.1,.3,.34],"duct","\u0423\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0443\u0447\u0430\u0441\u0442\u043E\u043A \u043F\u043E\u0441\u043B\u0435 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430",[-2.21,3.09,1.83],null,!0),r(.29,4.25,"chimney","\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u044B\u043C\u043E\u0445\u043E\u0434 \u0422\u041E \u2014 \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0439 \u0433\u0430\u0431\u0430\u0440\u0438\u0442",[-3.05,2.125,1.83],"y",!0),o(.29,[-3.05,4.25,1.83],"chimney"),o(.29,[-3.05,.07,1.83],"chimney"),l([-2,3.09,1.83],[-1,0,0],.53,"gasflow"),l([-3.05,3.45,1.83],[0,1,0],.53,"gasflow"),l([-1.19,2.78,.47],[0,0,1],.43,"gasflow"),{count:e.length,notes:Hg}}var Bt=i=>document.getElementById(i),Tr=Bt("canvas-host"),$c=Bt("stage"),Dn=new Pi,me;try{me=new er({antialias:!0,alpha:!0,preserveDrawingBuffer:!0})}catch(i){throw Bt("loading").textContent="WebGL \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0435 PNG \u0438\u0437 \u043F\u0430\u043F\u043A\u0438 previews.",i}me.setPixelRatio(Math.min(devicePixelRatio,2));me.setClearColor(0,0);me.toneMapping=Go;me.toneMappingExposure=1.05;me.localClippingEnabled=!0;me.shadowMap.enabled=!0;me.shadowMap.type=Ho;Tr.appendChild(me.domElement);var ih=new Ci(me),sh=new Er;Dn.environment=ih.fromScene(sh,.04).texture;sh.dispose();ih.dispose();var Ne=new ye(34,1,.02,80),en=new br(Ne,me.domElement);en.target.set(0,1.2,0);en.enableDamping=!0;en.minDistance=3;en.maxDistance=24;en.maxPolarAngle=Math.PI*.88;var Gg=new fr(12641279,2503230,1.2);Dn.add(Gg);var yn=new rs(16771796,2.5);yn.position.set(1,6,4);yn.castShadow=!0;yn.shadow.mapSize.set(2048,2048);yn.shadow.camera.left=-4;yn.shadow.camera.right=4;yn.shadow.camera.top=4;yn.shadow.camera.bottom=-4;yn.shadow.normalBias=.012;Dn.add(yn);var rh=new rs(9157876,2.5);rh.position.set(-4,2,-3);Dn.add(rh);var Ar=new Yt(new Ri(200,200),new ur({opacity:.23}));Ar.rotation.x=-Math.PI/2;Ar.position.y=-.012;Ar.receiveShadow=!0;Dn.add(Ar);var Rr=new _r(8,20,5730435,3887200);Rr.material.transparent=!0;Rr.material.opacity=.12;Rr.position.y=-.01;Dn.add(Rr);var al=new Rn;Dn.add(al);var Oi=[],sl=(i,t)=>{let e=atob(i),n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return new t(n.buffer)};function Wg(i){return i===2||i===7?"shell":i>=27&&i<=162?"tubes":i>=20&&i<=24?"baffles":i>=3&&i<=6||i>=8&&i<=19||i===185||i===186?"water":i>=208&&i<=217||i>=222&&i<=233?"chamber":i>=218&&i<=221?"outlet":i>=171&&i<=172||i>=187&&i<=207?"safety":i>=234&&i<=244?"detached":[0,1,25,26].includes(i)?"plates":"frame"}var rl=new mn;for(let i of window.CAD_PARTS){let t=sl(i.p,Float32Array),e=sl(i.n,Float32Array);for(let a=0;a<t.length;a+=3){let o=t[a],l=t[a+1],c=t[a+2];t[a]=(c+980)/1e3,t[a+1]=(l+575)/1e3,t[a+2]=-o/1e3;let h=e[a],d=e[a+2];e[a]=d,e[a+2]=-h}let n=new pe;n.setAttribute("position",new Me(t,3)),n.setAttribute("normal",new Me(e,3)),n.setIndex(new Me(sl(i.ix,Uint32Array),1)),n.computeBoundingBox();let s=new xn({color:10925762,metalness:.65,roughness:.3,side:Ue}),r=new Yt(n,s);r.userData={id:i.id,name:i.name,category:Wg(i.id)},r.castShadow=!0,r.receiveShadow=!0,al.add(r),Oi.push(r),rl.union(n.boundingBox)}window.CAD_PARTS=null;var jc=Kc(al,Oi),Je=1,tn="all",Ni="unknown",Qc={1:["\u041F\u043E\u043B\u0443\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0440\u043F\u0443\u0441 + \u0433\u0430\u0437\u043E\u0432\u044B\u0439 \u0442\u0440\u0430\u043A\u0442","\u0412\u0430\u0440\u0438\u0430\u043D\u0442 1 \u0432\u044B\u0431\u0440\u0430\u043D \xB7 \u043D\u043E\u0432\u0430\u044F \u043E\u0431\u0432\u044F\u0437\u043A\u0430 \u2014 \u0443\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F"]},th={all:["\u0422\u041E \u0438 \u043D\u043E\u0432\u0430\u044F \u0433\u0430\u0437\u043E\u0432\u0430\u044F \u043E\u0431\u0432\u044F\u0437\u043A\u0430","\u041A\u043E\u0440\u043F\u0443\u0441\u0430 \u0438 \u0432\u0441\u0435 \u0434\u0435\u0442\u0430\u043B\u0438 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E STEP \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B. \u0428\u0414 \u2192 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u2192 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u0430\u0437\u043E\u0445\u043E\u0434 \u0441 \u0432\u0440\u0435\u0437\u043A\u043E\u0439 \u0428\u041E\u0414 \u2192 \u0434\u044B\u043C\u043E\u0441\u043E\u0441 \u2192 \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u044B\u043C\u043E\u0445\u043E\u0434 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u044B \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044E. \u0418\u0445 \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u0438 \u0444\u043E\u0440\u043C\u0430 \u0443\u0441\u043B\u043E\u0432\u043D\u044B."],shell:["\u0414\u0432\u0430 \u043A\u043E\u0440\u043F\u0443\u0441\u0430","\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F \u0438\u0437 STEP; \xD8820 \u0438 \u0434\u043B\u0438\u043D\u0430 2000 \u043C\u043C \u043F\u0440\u0438\u043D\u044F\u0442\u044B D-125. \u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u043D\u044B. \u042D\u0442\u043E \u043D\u0435 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043F\u0443\u0441\u0430."],tubes:["136 \u0436\u0430\u0440\u043E\u0432\u044B\u0445 \u0442\u0440\u0443\u0431","\u0412 STEP 68 \u0442\u0440\u0443\u0431 \u0432 \u043A\u0430\u0436\u0434\u043E\u043C \u043A\u043E\u0440\u043F\u0443\u0441\u0435, \xD857 \xD7 3,5 \u043C\u043C. \u0413\u0430\u0437\u044B \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u0432\u043D\u0443\u0442\u0440\u0438 \u0442\u0440\u0443\u0431; \u0432\u043E\u0434\u0430 \u2014 \u0441\u043D\u0430\u0440\u0443\u0436\u0438. \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u0430 \u043F\u043E \u044F\u0440\u0443\u0441\u0430\u043C \u0437\u0434\u0435\u0441\u044C \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E."],baffles:["\u041F\u044F\u0442\u044C \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043E\u043A","\u0422\u0440\u0438 \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043A\u0438 \u0432 \u043D\u0438\u0436\u043D\u0435\u043C \u043A\u043E\u0440\u043F\u0443\u0441\u0435, \u0434\u0432\u0435 \u0432 \u0432\u0435\u0440\u0445\u043D\u0435\u043C. \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0438\u0437 STEP. \u0412\u043E\u0434\u0430 \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043C\u0435\u0436\u0442\u0440\u0443\u0431\u043D\u0443\u044E \u043F\u043E\u043B\u043E\u0441\u0442\u044C \u0432\u043E\u043A\u0440\u0443\u0433 \u043F\u0435\u0440\u0435\u0433\u043E\u0440\u043E\u0434\u043E\u043A; \u043F\u043E\u043B\u0435 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0435\u0439 \u043D\u0435 \u0432\u044B\u0447\u0438\u0441\u043B\u044F\u0435\u0442\u0441\u044F."],water:["\u0412\u043E\u0434\u044F\u043D\u043E\u0439 \u0442\u0440\u0430\u043A\u0442","\u041F\u0430\u0442\u0440\u0443\u0431\u043A\u0438 \u0438 \u043C\u0435\u0436\u043A\u043E\u0440\u043F\u0443\u0441\u043D\u0430\u044F \u043F\u0435\u0440\u0435\u043C\u044B\u0447\u043A\u0430 \u0432\u0437\u044F\u0442\u044B \u0438\u0437 STEP. \u0428\u0442\u0430\u0442\u043D\u044B\u0439 \u043F\u0443\u0442\u044C: \u0432\u0445\u043E\u0434 \u043D\u0438\u0436\u043D\u0435\u0433\u043E \u043A\u043E\u0440\u043F\u0443\u0441\u0430 \u2192 \u043F\u0435\u0440\u0435\u043C\u044B\u0447\u043A\u0430 \u2192 \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u043A\u043E\u0440\u043F\u0443\u0441 \u2192 \u043F\u043E\u0434\u0430\u0447\u0430. \u0426\u0432\u0435\u0442 \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u0442\u0440\u0430\u043A\u0442, \u043D\u0435 \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0443."],chamber:["\u041A\u0430\u043C\u0435\u0440\u0430 \u043F\u0435\u0440\u0435\u0432\u043E\u0440\u043E\u0442\u0430","\u0421\u0442\u0435\u043D\u043A\u0438, \u0434\u0432\u0435\u0440\u044C \u0438 \u044D\u043A\u0440\u0430\u043D\u044B \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u0432 STEP. \u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0441\u0442\u044C \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0442\u0438 \u043E\u0431\u043E\u043B\u043E\u0447\u043A\u0438 \u2014 \u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0440\u0438\u0451\u043C\u044B. \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u043E\u0432 \u043F\u043E \u044F\u0440\u0443\u0441\u0430\u043C \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438."],outlet:["\u0412\u044B\u0445\u043E\u0434\u043D\u043E\u0439 \u0433\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0430\u043D\u0430\u043B","\u041A\u043E\u0440\u043F\u0443\u0441 \u043A\u0430\u043D\u0430\u043B\u0430 \u0438\u0437 STEP \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D. \u0412\u043D\u0443\u0442\u0440\u0438 \u0435\u0433\u043E \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u043E\u0439 \u0447\u0430\u0441\u0442\u0438 \u0443\u0441\u043B\u043E\u0432\u043D\u043E \u043F\u043E\u043A\u0430\u0437\u0430\u043D \u0428\u0414 (\u0428\u0422 \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443). \u041D\u043E\u0432\u0430\u044F \u043E\u0431\u0432\u044F\u0437\u043A\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u043C \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u043C \u0441\u0435\u0447\u0435\u043D\u0438\u0438 \u043A\u0430\u043D\u0430\u043B\u0430."],safety:["\u041A\u043B\u0430\u043F\u0430\u043D \u0438\u0437 STEP","\u0412 \u0434\u0435\u0440\u0435\u0432\u0435 \u0441\u0431\u043E\u0440\u043A\u0438: \xAB1-\u041A\u043B\u0430\u043F\u0430\u043D 17\u044128\u043D\u0436 \u0432 \u0441\u0431\u043E\u0440\u0435\xBB. \u042D\u0442\u043E \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043E\u0431\u044A\u0435\u043A\u0442 CAD. \u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430, \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u044B; \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435 \u043C\u043E\u0434\u0435\u043B\u0438\u0440\u0443\u0435\u0442\u0441\u044F."],pumps:["\u041D\u0430\u0441\u043E\u0441\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430 \xB7 \u0441\u0445\u0435\u043C\u0430","\u0414\u0432\u0435 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u044B\u0435 \u0432\u0435\u0442\u0432\u0438. \u041F\u043E \u043F\u043E\u0442\u043E\u043A\u0443: \u043A\u0440\u0430\u043D \u2192 \u0444\u0438\u043B\u044C\u0442\u0440 \u2192 \u043D\u0430\u0441\u043E\u0441 \u2192 \u0437\u0430\u0442\u0432\u043E\u0440 \u2192 \u043A\u0440\u0430\u043D (D-124). ROMMER FORCE65-140F380V \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043D \u0444\u043E\u0442\u043E \u043E\u0434\u043D\u043E\u0433\u043E \u043D\u0430\u0441\u043E\u0441\u0430; \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u043E\u0441\u0442\u044C \u0432\u0442\u043E\u0440\u043E\u0433\u043E \u2014 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F. \u0424\u043E\u0440\u043C\u0443 \u0438 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B \u043D\u0435 \u043F\u0440\u0438\u0434\u0443\u043C\u044B\u0432\u0430\u0435\u043C."],fan:["\u0414\u044B\u043C\u043E\u0441\u043E\u0441 \xB7 \u0443\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u043C\u043E\u0434\u0435\u043B\u044C","\u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430 \u0438 \u0435\u0433\u043E \u043C\u0435\u0441\u0442\u043E \u043F\u043E\u0441\u043B\u0435 \u0428\u041E\u0414 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B. \u04143,5 \u0443\u043A\u0430\u0437\u0430\u043D \u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438. \u041A\u043E\u043B\u0435\u0441\u043E, \u043A\u043E\u0440\u043F\u0443\u0441, \u043F\u0430\u0442\u0440\u0443\u0431\u043A\u0438, \u0440\u0430\u0437\u043C\u0435\u0440\u044B \u0438 \u043E\u0440\u0438\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u2014 \u044D\u0441\u043A\u0438\u0437, \u043D\u0435 CAD \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0433\u043E \u0438\u0437\u0434\u0435\u043B\u0438\u044F. \u0412\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043D\u0435 \u0438\u043C\u0438\u0442\u0438\u0440\u0443\u044E\u0442\u0441\u044F."],motor:["\u041F\u0440\u044F\u043C\u043E\u0439 \u043F\u0440\u0438\u0432\u043E\u0434 \xB7 \u0443\u0441\u043B\u043E\u0432\u043D\u043E","\u041F\u043E D-284 \u043A\u043E\u043B\u0435\u0441\u043E \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u043E \u043D\u0430 \u0432\u0430\u043B\u0443 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F \u0410\u0418\u0420. \u0417\u0434\u0435\u0441\u044C \u0444\u043E\u0440\u043C\u0430, \u0434\u043B\u0438\u043D\u0430, \u043A\u043B\u0435\u043C\u043C\u043D\u0430\u044F \u043A\u043E\u0440\u043E\u0431\u043A\u0430 \u0438 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044F \u0443\u0441\u043B\u043E\u0432\u043D\u044B."],damper:["\u0428\u0414 (\u0428\u0422 \u043F\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0443)","\u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D \u0432 \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u043E\u043C \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u043C \u043A\u043E\u0440\u043F\u0443\u0441\u0435 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0422\u041E \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u044E. \u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F \u043F\u043B\u0430\u0441\u0442\u0438\u043D\u044B \u0438 \u043F\u0440\u0438\u0432\u043E\u0434\u0430, \u0442\u0438\u043F \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0443\u0441\u043B\u043E\u0432\u043D\u044B. \u0412 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0428\u0422."],shod:["\u0428\u041E\u0414 \xB7 \u0432\u0440\u0435\u0437\u043A\u0430 \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0433\u043E \u0432\u043E\u0437\u0434\u0443\u0445\u0430","\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043D\u0430 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u0432\u0440\u0435\u0437\u043A\u0435 \u0432 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0433\u0430\u0437\u043E\u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u043E\u043C. \u0428\u041E\u0414 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0441\u043E\u0441\u043E\u043C \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0433\u043E \u0432\u043E\u0437\u0434\u0443\u0445\u0430; \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043B\u0430\u0441\u0442\u0438\u043D\u044B, \u043F\u0440\u0438\u0432\u043E\u0434, \u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u0430 \u0432\u0440\u0435\u0437\u043A\u0438 \u0443\u0441\u043B\u043E\u0432\u043D\u044B."],duct:["\u0413\u0430\u0437\u043E\u0445\u043E\u0434 \xB7 \u0443\u0441\u043B\u043E\u0432\u043D\u0430\u044F \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F","\u041F\u043E\u0441\u043B\u0435 \u0432\u044B\u0445\u043E\u0434\u0430 \u0432\u0435\u0440\u0445\u043D\u0435\u0433\u043E \u0422\u041E \u0442\u0440\u0430\u043A\u0442 \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u0438 \u0438\u0434\u0451\u0442 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u043E \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443, \u043A\u0430\u043A \u0437\u0430\u0434\u0430\u043D\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C. \u0414\u043B\u0438\u043D\u044B, \u0441\u0435\u0447\u0435\u043D\u0438\u044F, \u0444\u043E\u0440\u043C\u0430 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 \u0438 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0432\u043E\u0440\u043E\u0442\u0430 \u0432 \u043F\u043B\u0430\u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u044E\u0442 \u043F\u0440\u0438\u0432\u044F\u0437\u043A\u0438."],chimney:["\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u044B\u043C\u043E\u0445\u043E\u0434 \u0422\u041E","\u041F\u043E\u0441\u043B\u0435 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u0430 \u0442\u0440\u0430\u043A\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0451\u043D \u043A \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u043C\u0443 \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u0434\u044B\u043C\u043E\u0445\u043E\u0434\u0443 \u043F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044E. \u0412\u044B\u0441\u043E\u0442\u0430, \u0434\u0438\u0430\u043C\u0435\u0442\u0440, \u043E\u0442\u043C\u0435\u0442\u043A\u0430 \u0432\u0440\u0435\u0437\u043A\u0438 \u0438 \u043E\u043F\u043E\u0440\u044B \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u044B. \u0414\u044B\u043C\u043E\u0445\u043E\u0434 \u0431\u0430\u0439\u043F\u0430\u0441\u0430 \u0437\u0434\u0435\u0441\u044C \u043D\u0435 \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0451\u043D \u0441 \u043D\u0438\u043C."],gasflow:["\u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0433\u0430\u0437\u0430","\u0421\u0442\u0430\u0442\u0438\u0447\u043D\u044B\u0435 \u0441\u0442\u0440\u0435\u043B\u043A\u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u043C\u0430\u0440\u0448\u0440\u0443\u0442 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F. \u042D\u0442\u043E \u043D\u0435 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0442\u0438\u0446, \u043D\u0435 \u0440\u0430\u0441\u0445\u043E\u0434 \u0438 \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430 \u043E\u0431\u043E\u0440\u0443\u0434\u043E\u0432\u0430\u043D\u0438\u044F. \u041D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u043D\u0443\u0442\u0440\u0438 \u044F\u0440\u0443\u0441\u043E\u0432 \u0422\u041E \u043D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E."],airflow:["\u041F\u043E\u0434\u0441\u043E\u0441 \u043D\u0430\u0440\u0443\u0436\u043D\u043E\u0433\u043E \u0432\u043E\u0437\u0434\u0443\u0445\u0430","\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u043F\u043E\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435 \u0432\u043E\u0437\u0434\u0443\u0445\u0430 \u0447\u0435\u0440\u0435\u0437 \u0428\u041E\u0414 \u0432 \u0433\u0430\u0437\u043E\u0445\u043E\u0434 \u043F\u0435\u0440\u0435\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u043E\u043C. \u0420\u0430\u0441\u0445\u043E\u0434 \u0438 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0437\u0430\u0441\u043B\u043E\u043D\u043A\u0438 \u043D\u0435 \u0437\u0430\u0434\u0430\u044E\u0442\u0441\u044F."],detached:["\u0412\u044B\u043D\u0435\u0441\u0435\u043D\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430 STEP","\u0413\u0440\u0443\u043F\u043F\u0430 \xAB\u041A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0442\u0440\u0443\u0431\u044B\xBB \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0445 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0430\u0445. \u0412 \u0444\u0430\u0439\u043B\u0435 \u043E\u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u0435\u043D\u0430 \u043E\u0442 \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0433\u043E \u0443\u0437\u043B\u0430. \u041D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0437\u0440\u044B\u0432\u0430 \u0438 \u0441\u0432\u044F\u0437\u044C \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B."],plates:["\u0422\u0440\u0443\u0431\u043D\u044B\u0435 \u0434\u043E\u0441\u043A\u0438","\u0427\u0435\u0442\u044B\u0440\u0435 \u0442\u0440\u0443\u0431\u043D\u044B\u0435 \u0434\u043E\u0441\u043A\u0438 \u0438\u0437 STEP. \u0414\u043E\u0441\u043A\u0438 \u043E\u0442\u0434\u0435\u043B\u044F\u044E\u0442 \u0432\u043E\u0434\u044F\u043D\u0443\u044E \u043C\u0435\u0436\u0442\u0440\u0443\u0431\u043D\u0443\u044E \u043F\u043E\u043B\u043E\u0441\u0442\u044C \u043E\u0442 \u0433\u0430\u0437\u043E\u0432\u044B\u0445 \u0442\u043E\u0440\u0446\u043E\u0432."],frame:["\u041E\u043F\u043E\u0440\u044B \u0438 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F","\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F \u043E\u043F\u043E\u0440, \u0443\u0441\u0438\u043B\u0438\u0442\u0435\u043B\u0435\u0439 \u0438 \u043F\u043B\u043E\u0449\u0430\u0434\u043E\u043A \u0438\u0437 STEP. \u0426\u0432\u0435\u0442 \u0438 \u0444\u0430\u043A\u0442\u0443\u0440\u0430 \u0443\u0441\u043B\u043E\u0432\u043D\u044B; \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u043C\u043E\u043D\u0442\u0430\u0436\u0443 \u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043E."]},Xg={unknown:"? \u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",normal:"\u2713 \u041D\u043E\u0440\u043C\u0430 \xB7 \u0414\u0415\u041C\u041E",warn:"\u25B3 \u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \xB7 \u0414\u0415\u041C\u041E",alarm:"! \u0410\u0432\u0430\u0440\u0438\u044F \xB7 \u0414\u0415\u041C\u041E"},eh={unknown:8570588,normal:8114592,warn:16763755,alarm:16737143},Yg=new De(new A(0,0,-1),-.02);function Fi(){for(let t of Oi){let e=t.userData.category,n=t.material;t.visible=(e!=="detached"||Bt("detached").checked)&&(t.userData.origin!=="concept"||Bt("show-concept").checked),n.transparent=!1,n.opacity=1,n.depthWrite=!0,n.clippingPlanes=[],n.emissive.set(0),n.emissiveIntensity=0,n.metalness=Je===3?.8:.4,n.roughness=Je===3?.31:.4;let s={shell:10730187,tubes:14000494,baffles:9423058,water:6080475,chamber:8886953,outlet:10987172,safety:11318719,frame:4742769,plates:11846863,detached:8752792};n.color.setHex(s[e]||10925762),Je===3&&(["shell","chamber","outlet","plates","baffles"].includes(e)&&n.color.setHex(6913421),e==="tubes"&&n.color.setHex(10921893),e==="water"&&n.color.setHex(4424603)),Je===1&&["shell","chamber","outlet"].includes(e)?(n.transparent=!0,n.opacity=e==="shell"?.22:.12,n.depthWrite=!1,n.metalness=.05,n.roughness=.18,t.castShadow=!1,t.renderOrder=2):(t.castShadow=!0,t.renderOrder=0),Je===2&&["shell","chamber","outlet"].includes(e)&&(n.clippingPlanes=[Yg]),t.userData.origin==="concept"&&(n.color.setHex({damper:15117155,duct:14333843,fan:13015922,motor:6255495,shod:12364259,chimney:12167065,gasflow:16757583,airflow:12099822}[e]||13280376),n.metalness=.25,n.roughness=.38,t.userData.skin?(n.transparent=!0,n.opacity=e==="fan"?.23:.34,n.depthWrite=!1,t.renderOrder=2,t.castShadow=!1):(t.renderOrder=0,t.castShadow=!0),["gasflow","airflow"].includes(e)&&(n.emissive.copy(n.color),n.emissiveIntensity=.3)),tn===e||tn==="shell"&&e==="plates"?(n.emissive.setHex(eh[Ni]),n.emissiveIntensity=Ni==="unknown"?.2:.45,n.transparent&&(n.opacity=.3)):Je===3&&tn==="all"&&e==="water"&&(n.emissive.setHex(4628148),n.emissiveIntensity=.18),n.needsUpdate=!0}let i=th[tn]||th.all;Bt("part-title").textContent=i[0],Bt("part-info").textContent=i[1],Bt("source-tag").textContent=tn==="pumps"?"\u0421\u041E\u0421\u0422\u0410\u0412 \u0418\u0417 \u0414\u041E\u041A\u0423\u041C\u0415\u041D\u0422\u041E\u0412 \xB7 \u0411\u0415\u0417 3D":["damper","duct","fan","motor","shod","chimney","gasflow","airflow"].includes(tn)?"\u041D\u041E\u0412\u0410\u042F \u0413\u0415\u041E\u041C\u0415\u0422\u0420\u0418\u042F \xB7 \u0423\u0421\u041B\u041E\u0412\u041D\u041E":tn==="all"?"\u0422\u041E: CAD \xB7 \u041E\u0411\u0412\u042F\u0417\u041A\u0410: \u042D\u0421\u041A\u0418\u0417":"\u0413\u0415\u041E\u041C\u0415\u0422\u0420\u0418\u042F \u0418\u0417 CAD",Bt("state-readout").textContent=Xg[Ni],Bt("state-readout").style.color="#"+eh[Ni].toString(16).padStart(6,"0"),Bt("style-title").textContent=Qc[Je][0],Bt("style-subtitle").textContent=Qc[Je][1],document.querySelectorAll("[data-style]").forEach(t=>{let e=+t.dataset.style===Je;t.classList.toggle("active",e),t.setAttribute("aria-pressed",e)}),document.querySelectorAll("[data-pick]").forEach(t=>t.setAttribute("aria-pressed",t.dataset.pick===tn))}function Cr(i,t=""){tn=i,[...Bt("component").options].some(e=>e.value===i)?Bt("component").value=i:Bt("component").value="all",Bt("picked").textContent=t?(Oi.some(e=>e.userData.name===t&&e.userData.origin==="concept")?"\u042D\u0441\u043A\u0438\u0437: ":"\u0414\u0435\u0442\u0430\u043B\u044C STEP: ")+t:"",Fi()}function Pr(i){en.target.set(-.8,2,.55),i==="side"?Ne.position.set(-.8,2.7,12.6):i==="back"?Ne.position.set(-6,4,-7.8):i==="core"?(en.target.set(0,1.25,0),Ne.position.set(3.8,2.9,5.6)):Ne.position.set(5.8,4.3,8.6),en.update()}Pr("iso");var qg=[{text:"\u0422\u0435\u043F\u043B\u043E\u043E\u0431\u043C\u0435\u043D\u043D\u0438\u043A",sub:"\u0413\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F \u0438\u0437 STEP \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430",p:[.5,1.7,.4],offset:[110,70],cls:"",category:"shell"},{text:"\u0428\u0414 (\u0428\u0422)",sub:"\u0412 \u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u043E\u043C \u043A\u043E\u0440\u043F\u0443\u0441\u0435",p:[-1.19,2.08,.3],offset:[310,20],cls:"gas",category:"damper"},{text:"\u0428\u041E\u0414 \xB7 \u043F\u043E\u0434\u0441\u043E\u0441 \u0432\u043E\u0437\u0434\u0443\u0445\u0430",sub:"\u041F\u0435\u0440\u0435\u0434 \u0434\u044B\u043C\u043E\u0441\u043E\u0441\u043E\u043C \xB7 \u0443\u0441\u043B\u043E\u0432\u043D\u043E",p:[-.65,2.78,.9],offset:[110,-110],cls:"air",category:"shod"},{text:"\u0414\u044B\u043C\u043E\u0441\u043E\u0441",sub:"\u0424\u043E\u0440\u043C\u0430 \u0438 \u0433\u0430\u0431\u0430\u0440\u0438\u0442 \u0443\u0441\u043B\u043E\u0432\u043D\u044B",p:[-1.19,2.78,2.1],offset:[-50,135],cls:"gas",category:"fan"},{text:"\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0434\u044B\u043C\u043E\u0445\u043E\u0434",sub:"\u0412\u044B\u0441\u043E\u0442\u0430 \u0438 \u0434\u0438\u0430\u043C\u0435\u0442\u0440 \u0443\u0441\u043B\u043E\u0432\u043D\u044B",p:[-3.05,3.6,1.83],offset:[-230,-30],cls:"gas",category:"chimney"}],Zg=qg.map(i=>{let t=document.createElement("div");t.className="label "+i.cls,t.innerHTML=i.text+"<small>"+i.sub+"</small>",Bt("labels").appendChild(t);let e=document.createElementNS("http://www.w3.org/2000/svg","line");return e.setAttribute("stroke","#7e9baa"),e.setAttribute("stroke-width","1"),e.setAttribute("opacity",".7"),Bt("leaders").appendChild(e),{...i,el:t,line:e,p:new A(...i.p)}});function Jg(){let i=$c.clientWidth,t=$c.clientHeight;for(let[e,n]of Zg.entries()){let s=n.p.clone().project(Ne),r=(s.x+1)*i/2,a=(1-s.y)*t/2,o=Math.max(14,Math.min(i-n.el.offsetWidth-14,r+n.offset[0])),l=Math.max(100,Math.min(t-120,a+n.offset[1]));i<750&&(o=e%2===0?14:i-n.el.offsetWidth-14,l=[115,185,260,335,380][e]);let c=n.category==="shell"||Bt("show-concept").checked;n.el.hidden=!c,n.line.style.display=c?"":"none",n.el.style.left=o+"px",n.el.style.top=l+"px",n.line.setAttribute("x1",r),n.line.setAttribute("y1",a),n.line.setAttribute("x2",o+(n.offset[0]<0?n.el.offsetWidth:0)),n.line.setAttribute("y2",l+15)}}function ah(){let i=Tr.clientWidth,t=Tr.clientHeight;me.setSize(i,t,!1),Ne.aspect=i/t,Ne.zoom=Math.min(1,i/t),Ne.updateProjectionMatrix()}new ResizeObserver(ah).observe(Tr);ah();document.querySelectorAll("[data-style]").forEach(i=>i.onclick=()=>{Je=+i.dataset.style,Fi()});document.querySelectorAll("[data-view]").forEach(i=>i.onclick=()=>Pr(i.dataset.view));document.querySelectorAll("[data-pick]").forEach(i=>i.onclick=()=>Cr(i.dataset.pick));Bt("component").onchange=()=>Cr(Bt("component").value);Bt("demo-state").onchange=()=>{Ni=Bt("demo-state").value,Fi()};Bt("detached").onchange=()=>{Bt("detached").checked?(en.target.y=1.6,Ne.position.multiplyScalar(1.2)):Pr("iso"),Fi()};Bt("show-labels").onchange=()=>{Bt("labels").hidden=!Bt("show-labels").checked,Bt("leaders").style.display=Bt("show-labels").checked?"":"none"};Bt("show-concept").onchange=()=>Fi();var nh=new gr,wr=null;me.domElement.addEventListener("pointerdown",i=>wr=[i.clientX,i.clientY]);me.domElement.addEventListener("pointerup",i=>{if(!wr||Math.hypot(i.clientX-wr[0],i.clientY-wr[1])>5)return;let t=me.domElement.getBoundingClientRect();nh.setFromCamera(new ot((i.clientX-t.left)/t.width*2-1,1-(i.clientY-t.top)/t.height*2),Ne);let n=nh.intersectObjects(Oi.filter(s=>s.visible)).find(s=>s.object.material.clippingPlanes.every(r=>r.distanceToPoint(s.point)>=0));n&&Cr(n.object.userData.category,n.object.userData.name)});Fi();Bt("loading").hidden=!0;function Kg(){en.update(),Jg(),me.render(Dn,Ne)}me.setAnimationLoop(Kg);window.preview={select:Cr,view:Pr,getInfo(){return{style:Je,selected:tn,state:Ni,cadMeshes:247,conceptMeshes:jc.count,conceptVisible:Bt("show-concept").checked,notes:jc.notes,visible:Oi.filter(i=>i.visible).length,triangles:me.info.render.triangles,camera:Ne.position.toArray(),boundsCAD:{min:rl.min.toArray(),max:rl.max.toArray()}}}};})();
/*! Bundled license information:

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2024 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
