'use strict';
const COARSE=matchMedia('(pointer:coarse)').matches,GW=COARSE?320:640,GH=COARSE?Math.min(460,Math.max(360,Math.round(GW*(innerHeight-(innerHeight>innerWidth?150:96))/innerWidth))):360,T0=360-GH,FX=GW/640;
const S={lv:0,cp:null,got:{},lev:{}},K={jx:0,j:0,act:0,fl:0},keys={};
const HALLS=[
{n:'HALL I · IBERIAN',p:['Iberian lady bust, inspired by the Dama de Elche. 4th c. BC.','Altar of the forgotten priests. Do not look for them.','Stone guardian. It was not always stone.']},
{n:'HALL II · ANCIENT GREECE',p:['Hoplite panoply, bronze. The helmet is still warm.','Temple of Hades, reconstructed. Cold air rises here.','Labyrinth tablet. Something still walks it.']},
{n:'HALL III · VIKING AGE',p:['Runestone: "Loki laughs last."','Longship prow. You can hear the sea in the wood.','Shield wall. Valkyries choose the slain.']},
{n:'HALL IV · ANCIENT EGYPT',p:['Sarcophagus of a priest. The lid is not quite closed.','Anubis weighs the heart. Yours is heavy.','Osiris, lord of the veil. Narmer\'s scarab was split in four.']}];
/* ---------- audio (WebAudio synth) ---------- */
const A={ac:null,
init(){if(this.ac){this.ac.resume();return}const ac=this.ac=new(window.AudioContext||window.webkitAudioContext)();
 const b=this.nb=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
 this.m=ac.createGain();this.m.gain.value=.5;this.m.connect(ac.destination);
 const w=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain(),l=ac.createOscillator(),lg=ac.createGain();
 w.buffer=b;w.loop=true;f.type='lowpass';f.frequency.value=400;g.gain.value=.12;l.frequency.value=.15;lg.gain.value=.06;l.connect(lg);lg.connect(g.gain);l.start();w.connect(f);f.connect(g);g.connect(this.m);w.start();
 const sc=[110,130.8,164.8,146.8,98,123.5];let i=0;setInterval(()=>{this.t(sc[i++%6]*(Math.random()<.3?2:1),3,'triangle',.07);if(Math.random()<.2)this.t(sc[i%6]*4,2,'sine',.02)},2400)},
t(f,d,ty='sine',v=.2,s=0,dl=0){const a=this.ac;if(!a)return;const o=a.createOscillator(),g=a.createGain(),n=a.currentTime+dl;o.type=ty;o.frequency.setValueAtTime(f,n);if(s)o.frequency.exponentialRampToValueAtTime(Math.max(20,f+s),n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(this.m);o.start(n);o.stop(n+d)},
n(d,v,fr,q=1){const a=this.ac;if(!a)return;const s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain(),n=a.currentTime;s.buffer=this.nb;f.type='bandpass';f.frequency.value=fr;f.Q.value=q;g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);s.connect(f);f.connect(g);g.connect(this.m);s.start(n,Math.random());s.stop(n+d)},
jump(){this.t(300,.15,'square',.08,300)},step(){this.n(.06,.25,500)},crackle(){this.n(.03,.15,3000)},whisper(){this.n(1.4,.35,1800,6);this.n(1.2,.2,2600,8)},
moan(){this.t(110,1.3,'sawtooth',.1,-40);this.t(116,1.3,'sawtooth',.06,-30)},creak(){this.t(90,.7,'sawtooth',.07,60)},
relic(){[660,880,1320].forEach((f,i)=>this.t(f,.4,'triangle',.15,0,i*.09))},chime(){[523,659,784,1047].forEach((f,i)=>this.t(f,.8,'sine',.15,0,i*.12))}};
/* ---------- input ---------- */
addEventListener('keydown',e=>{keys[e.code]=1;if(e.code=='KeyE')K.act=1;if(e.code=='KeyF')K.fl=1;if(e.code.startsWith('Arrow')||e.code=='Space')e.preventDefault();A.init()});
addEventListener('keyup',e=>keys[e.code]=0);
(()=>{const $=i=>document.getElementById(i);
 const bt=(id,dn,up)=>{const b=$(id);b.addEventListener('touchstart',e=>{e.preventDefault();A.init();dn()},{passive:false});['touchend','touchcancel'].forEach(ev=>b.addEventListener(ev,e=>{e.preventDefault();up&&up()},{passive:false}))};
 bt('bLf',()=>K.l=1,()=>K.l=0);bt('bRt',()=>K.r=1,()=>K.r=0);bt('bJ',()=>K.j=1,()=>K.j=0);bt('bA',()=>K.act=1);bt('bL',()=>K.fl=1)})();
/* ---------- procedural pixel art ---------- */
function mk(s){const T=s.textures;if(T.exists('px'))return;const g=s.make.graphics({add:false}),
 gt=(k,w,h,f)=>{g.clear();f();g.generateTexture(k,w,h)},F=(c,a=1)=>g.fillStyle(c,a),R=(x,y,w,h)=>g.fillRect(x,y,w,h);
 gt('px',2,2,()=>{F(0xffffff);R(0,0,2,2)});
 gt('candle',6,12,()=>{F(0xe8e0c8);R(1,4,4,8);F(0x3a3020);R(0,10,6,2)});
 gt('flame',4,6,()=>{F(0xffb030);g.fillEllipse(2,3,3,6);F(0xfff0a0);g.fillEllipse(2,4,1.5,3)});
 gt('relic',10,10,()=>{F(0xffd860);g.fillTriangle(5,0,10,5,5,10);g.fillTriangle(5,0,0,5,5,10);F(0xfff4b0);R(4,3,2,3)});
 gt('door',40,64,()=>{F(0x2a1f2e);R(0,16,40,48);g.fillCircle(20,20,20);F(0x5a4a6a);R(4,20,32,44);g.fillCircle(20,22,16);F(0x9fd8ff);R(19,26,2,30)});
 gt('lever',8,16,()=>{F(0x5a6a8a);R(0,12,8,4);F(0xc0c8d8);R(3,2,2,12);F(0xff6060);g.fillCircle(4,3,3)});
 gt('altar',26,22,()=>{F(0x5a6a8a);R(0,8,26,14);R(3,2,20,6);F(0x9fe8ff);R(11,0,4,3)});
 gt('plaque',10,8,()=>{F(0xc8b060);R(0,0,10,8);F(0x3a3020);R(2,2,6,1);R(2,5,6,1)});
 const st=0x56688c,sh=0x3a4a6a;
 gt('p0',32,64,()=>{F(sh);R(4,52,24,12);F(st);R(10,24,12,28);g.fillCircle(16,18,9);F(sh);g.fillCircle(6,18,5);g.fillCircle(26,18,5);F(0x9fb4d8);R(12,15,2,2);R(18,15,2,2)});
 gt('p1',32,64,()=>{F(sh);R(2,58,28,6);R(2,0,28,6);F(0xaab8d0);R(6,6,20,52);F(0x6a7a9a);for(let i=0;i<4;i++)R(9+i*5,6,1,52)});
 gt('p2',32,64,()=>{F(st);g.fillTriangle(4,64,10,8,28,64);g.fillTriangle(10,8,28,64,26,16);F(0x9fd8ff);R(14,28,2,12);R(18,34,6,2);R(14,46,8,2)});
 gt('p3',32,64,()=>{F(0x8a7a50);g.fillTriangle(16,0,6,64,26,64);F(0xffd860);g.fillTriangle(16,0,13,10,19,10);F(0x3a3020);R(14,22,2,2);R(18,30,2,2);R(14,38,2,2);R(17,46,2,2)});
 const cl=[0x9fd8ff,0xb8c8ff,0xa0f0ff,0xe8e0c0];
 for(let i=0;i<4;i++)gt('e'+i,16,24,()=>{F(cl[i],.75);g.fillCircle(8,7,6);R(2,8,12,12);g.fillTriangle(2,20,5,24,8,20);g.fillTriangle(8,20,11,24,14,20);F(0x101828);R(5,6,2,3);R(9,6,2,3);
  if(i==0){F(cl[0],.9);g.fillTriangle(8,0,3,5,13,5)}if(i==1){F(0xc04040);R(6,0,4,3)}if(i==2){F(0xffffff);R(0,2,2,4);R(14,2,2,4)}if(i==3){F(0x303040,.6);R(2,12,12,1);R(2,16,12,1);R(4,3,8,1)}});
 const c=T.createCanvas('guard',128,24),x=c.getContext('2d'),r=(col,a,b,w,h)=>{x.fillStyle=col;x.fillRect(a,b,w,h)};
 for(let f=0;f<8;f++){const o=f*16,w=f>1&&f<6,sw=w?[-2,0,2,0][f-2]:0,jp=f==6,by=f==1?1:0;
  r('#1a2338',o+5+sw,16,3,6);r('#1a2338',o+8-sw,16,3,6);r('#080a10',o+5+sw,22,3,2);r('#080a10',o+8-sw,22,3,2);
  r('#2a3b66',o+4,7+by,8,9);r('#c0c8d8',o+9,9+by,2,2);r('#e0b090',o+5,3+by,6,5);r('#1a2338',o+4,1+by,8,3);r('#1a2338',o+4,3+by,9,1);
  r('#2a3b66',o+3,jp?3:8+by,2,6);if(f==7)r('#2a3b66',o+11,9,4,2);else r('#2a3b66',o+11,jp?3:8+by,2,6);
  r('#ffe9a0',o+(f==7?14:12),f==7?9:13,2,2)}
 c.refresh();for(let f=0;f<8;f++)c.add(f,0,f*16,0,16,24);
 const an=(k,a,fr,rp)=>s.anims.create({key:k,frames:a.map(f=>({key:'guard',frame:f})),frameRate:fr,repeat:rp});
 an('idle',[0,1],2,-1);an('walk',[2,3,4,5],9,-1);an('jump',[6],1,0);an('act',[7],1,0)}
/* ---------- main scene ---------- */
class Main extends Phaser.Scene{
constructor(){super('m')}
create(){mk(this);const s=this,lv=S.lv,hall=lv<4;
 Object.assign(s,{lock:false,dead:false,tm:0,cd:0,ft:0,wh:9000,ia:0,on:true,dir:1,sanity:100,msgT:0,W:hall?1800:GW,cs:[],rel:[],en:[],pl:[],beams:[]});
 s.cameras.main.fadeIn(700);s.physics.world.setBounds(0,T0,s.W,GH);s.cameras.main.setBounds(0,T0,s.W,GH);
 s.sol=s.physics.add.staticGroup();
 s.plat=(x,y,w,h,ow,tn)=>{const o=s.sol.create(x,y,'px').setDisplaySize(w,h).refreshBody();if(tn)o.setTint(tn);else o.setVisible(false);if(ow)o.body.checkCollision.down=o.body.checkCollision.left=o.body.checkCollision.right=false;return o};
 s.plat(s.W/2,345,s.W,30);
 s.cameras.main.setBackgroundColor(hall?0x16223d:0);
 [s.hallBuild,s.giza,s.office][hall?0:lv-3].call(s);
 const sp=S.cp&&S.cp.lv==lv?S.cp:{x:40};
 s.p=s.physics.add.sprite(lv==5?90*FX:sp.x,300,'guard',0).setDepth(10).setCollideWorldBounds(true);s.p.body.setSize(10,22).setOffset(3,2);
 s.physics.add.collider(s.p,s.sol);s.cameras.main.startFollow(s.p,true,.1,.1);
 s.dust=[...Array(30)].map(()=>s.add.image(Math.random()*GW,T0+Math.random()*(345-T0),'px').setAlpha(.35).setScale(.5).setDepth(8).setData('v',[Math.random()*8-4,Math.random()*4-1]));
 s.hud=s.add.graphics().setScrollFactor(0).setDepth(100);
 const ts={fontFamily:'monospace',fontSize:'10px',color:'#cfe3ff'};
 s.tx=s.add.text(8,4,'',ts).setScrollFactor(0).setDepth(101).setResolution(2);
 s.rt_=s.add.text(GW-8,4,'',ts).setOrigin(1,0).setScrollFactor(0).setDepth(101).setResolution(2);
 s.msg=s.add.text(GW/2,GH-30,'',{...ts,align:'center',wordWrap:{width:GW-20},backgroundColor:'#000a'}).setOrigin(.5,1).setScrollFactor(0).setDepth(101).setResolution(2);
 if(lv==5){s.time.delayedCall(1500,()=>s.say('"It was all a dream..." *laughs nervously*',4000));s.time.delayedCall(5500,()=>s.say('Maybe I should wash my face... (restroom →)',5000))}
 if(hall)s.say(lv==0?'Touch relics to collect them · E: read plaques · F: flashlight':'Find 3 relic fragments',5000)}
say(m,ms=4000){this.msg.setText(m);this.msgT=this.tm+ms}
count(){return[0,1,2].filter(i=>S.got[S.lv+'-'+i]).length}
hallBuild(){const s=this,lv=S.lv,h=HALLS[lv],W=1800,g=s.add.graphics().setDepth(0);
 g.fillStyle(0x101a33).fillRect(0,290,W,40);g.fillStyle(0x0c1428).fillRect(0,330,W,30);g.fillStyle(0x24304e).fillRect(0,330,W,2);
 for(let x=120;x<W;x+=300){g.fillStyle(0x0a1020).fillRect(x,40,60,110);g.fillStyle(0xc8dcff).fillRect(x+4,44,52,102);g.fillStyle(0x0a1020).fillRect(x+28,44,4,102).fillRect(x+4,92,52,4);
  g.fillStyle(0xcfe3ff,.1).fillPoints([{x:x+4,y:146},{x:x+56,y:146},{x:x+170,y:330},{x:x+80,y:330}],true);s.beams.push([x+80,x+170])}
 for(let x=180;x<W;x+=240)s.add.image(x,330,'p'+lv).setOrigin(.5,1).setDepth(1);
 [[320,285,120],[470,245,110],[620,285,110],[770,245,110],[920,205,110],[1070,245,110],[1220,285,110],[1370,245,110],[1520,205,110]].forEach(a=>s.plat(a[0],a[1],a[2],8,true,0x5a6a8a));
 [[90,1],[420,0],[900,1],[1380,1],[1700,0]].forEach(([x,cp])=>{s.add.image(x,330,'candle').setOrigin(.5,1).setDepth(2);
  s.cs.push({x,cp,f:s.add.image(x,316,'flame').setDepth(3),r:70})});
 s.altar={x:1150};s.add.image(1150,330,'altar').setOrigin(.5,1).setDepth(2);
 h.p.forEach((t,i)=>{const x=[250,700,1250][i];s.add.image(x,328,'plaque').setOrigin(.5,1).setDepth(2);s.pl.push({x,t})});
 [[470,223],[920,183],[1520,183]].forEach(([x,y],i)=>{if(S.got[lv+'-'+i])return;s.rel.push({i,x,y,o:s.add.image(x,y,'relic').setDepth(5)})});
 s.door=s.add.image(W-50,330,'door').setOrigin(.5,1).setDepth(2);
 [500,850,1150,1450].forEach((x,i)=>s.en.push(Object.assign(s.add.image(x,300,'e'+lv).setDepth(9).setScale(1.3),{bx:x,sp:.6+i*.15,st:0})));
 s.rt=s.add.renderTexture(0,0,GW,GH).setOrigin(0,0).setScrollFactor(0).setDepth(50);s.lg=s.make.graphics({add:false})}
giza(){const s=this,g=s.add.graphics().setScale(FX,1);s.cameras.main.setBackgroundColor(0x050a1c);
 for(let i=0;i<130;i++)g.fillStyle(0xffffff,Math.random()).fillRect(Math.random()*640,T0+Math.random()*(230-T0),1,1);
 g.fillStyle(0xe8f0ff).fillCircle(540,60,26);g.fillStyle(0xaab8d8).fillCircle(532,54,6).fillCircle(548,68,4);
 g.fillStyle(0x1c2a4a).fillTriangle(60,330,260,80,460,330);g.fillStyle(0x16223e).fillTriangle(260,80,460,330,330,330);
 g.fillStyle(0x2a3550).fillRect(0,330,640,30);
 g.fillStyle(0x3a4668).fillRect(470,305,110,25).fillRect(560,300,20,30).fillRect(480,262,26,45).fillRect(466,322,40,8);
 s.eyes=s.add.graphics().setScale(FX,1);s.lock=true;
 s.time.delayedCall(100,()=>s.msg.setOrigin(.5,0).setY(16));
 s.time.delayedCall(1500,()=>{s.eyes.fillStyle(0xffd860).fillRect(494,272,4,3);s.cameras.main.shake(900,.006);A.moan();A.chime();
  s.say('SPHINX: "Congratulations, Guardian.\nYou have restored the Fragments of Narmer\'s Sacred Scarab.\nThe ancient king shall continue protecting the world from beyond the veil."',10000)});
 s.time.delayedCall(10500,()=>s.cameras.main.fade(2500,255,255,255));
 s.time.delayedCall(13200,()=>{S.lv=5;s.scene.restart()})}
office(){const s=this,g=s.add.graphics().setScale(FX,1);s.cameras.main.setBackgroundColor(0x1b2238);
 g.fillStyle(0x141a2c).fillRect(0,300,640,60).fillStyle(0xc8dcff,.5).fillRect(250,50,80,100).fillStyle(0x141a2c).fillRect(288,50,4,100);
 g.fillStyle(0x4a3a2a).fillRect(60,298,60,6).fillRect(66,304,4,26).fillRect(110,304,4,26).fillStyle(0x7ab0ff).fillRect(76,278,24,20);
 g.fillStyle(0x3a4a6a).fillRect(520,230,90,100).fillStyle(0xc0c8d8).fillRect(555,258,20,8);
 s.add.text(565*FX,236,'WC',{fontFamily:'monospace',fontSize:'10px',color:'#fff'}).setOrigin(.5);
 s.sand=s.add.graphics().setDepth(11)}
tick(t,dt){const s=this,p=s.p,n=s.count();let near=0,lit=false;
 const cam=s.cameras.main,sx=cam.scrollX,sy=cam.scrollY;
 s.lg.clear();const px=p.x-sx,py=p.y-4-sy,d=s.dir;
 s.lg.fillStyle(0xffffff,.5).fillCircle(px,py,24);
 if(s.on)[[200,64],[165,46],[125,30]].forEach(([L,w])=>{s.lg.fillStyle(0xffffff,.4).fillTriangle(px,py,px+d*L,py-w,px+d*L,py+w)});
 s.cs.forEach(c=>{const fl=.8+Math.random()*.4;c.f.setScale(fl).setAlpha(fl);
  [[c.r,.4],[c.r*.7,.4],[c.r*.4,.4]].forEach(([r,a])=>s.lg.fillStyle(0xffffff,a).fillCircle(c.x-sx,316-sy,r*fl));
  if(Math.abs(p.x-c.x)<c.r){near=1;if(Math.random()<.01)A.crackle();if(c.cp&&!(S.cp&&S.cp.x==c.x&&S.cp.lv==S.lv)){S.cp={lv:S.lv,x:c.x};s.say('Checkpoint saved',2000)}}});
 if(Math.abs(p.x-s.altar.x)<60)near=1;
 if(s.beams.some(b=>p.x>b[0]&&p.x<b[1]))lit=true;
 s.rt.clear();s.rt.fill(0x03050c,.82);s.rt.erase(s.lg);
 if(near)s.sanity=Math.min(100,s.sanity+6*dt);else if(!s.on&&!lit)s.sanity-=2*dt;
 s.wh-=dt*1000;if(s.wh<0){s.wh=8000+Math.random()*5000;A.whisper();if(!near){s.sanity-=5;s.say('...they whisper your name...',2500)}}
 s.en.forEach((e,i)=>{const dx=e.x-p.x;
  if(s.on&&Math.sign(dx)==d&&Math.abs(dx)<170&&Math.abs(e.y-p.y)<45)e.st=t+400;
  const stun=e.st>t;e.setTint(stun?0x888888:0xffffff).setAlpha(stun?.4:.8);
  if(!stun){if(Math.abs(dx)<150)e.bx-=Math.sign(dx)*35*dt;e.x=e.bx+Math.sin(t/700*e.sp)*50;e.y=290+Math.sin(t/500+i)*8;e.setFlipX(dx>0)}
  if(!stun&&Math.abs(dx)<16&&Math.abs(e.y-p.y)<24&&t>s.cd){s.sanity-=20;s.cd=t+1200;A.moan();cam.shake(150,.006);p.setVelocityX(-Math.sign(dx)*200)}
  if(Math.random()<.0006)A.moan()});
 s.rel.slice().forEach(r=>{if(Math.abs(r.x-p.x)<22&&Math.abs(r.y-p.y)<30)s.collect(r)});
 s.door.setTint(n==3?0xffffff:0x555566);
 if(n==3&&Math.abs(p.x-s.door.x)<20&&!s.lock){s.lock=true;S.lv++;S.cp=null;A.creak();cam.fade(800,0,0,0);s.time.delayedCall(850,()=>s.scene.restart())}
 if(s.sanity<=0)s.die();
 s.tx.setText(HALLS[Math.min(S.lv,3)].n);s.rt_.setText('RELICS '+n+'/3');
 s.hud.clear().fillStyle(0x000000,.7).fillRect(7,17,102,9).fillStyle(s.sanity>35?0x7ab0ff:0xff5a5a).fillRect(9,19,Math.max(0,s.sanity),5)}
interact(){const s=this,p=s.p;s.ia=s.tm+250;const pl=s.pl.find(q=>Math.abs(q.x-p.x)<30);if(pl)s.say(pl.t,5000)}
collect(r){const s=this,n=s.count();S.got[S.lv+'-'+r.i]=1;r.o.destroy();s.rel.splice(s.rel.indexOf(r),1);A.relic();s.say('Relic fragment collected ('+(n+1)+'/3)');if(n+1==3){A.creak();s.say('The magical door at the end of the hall opens!',5000)}}
die(){const s=this;if(s.dead)return;s.dead=true;s.lock=true;A.moan();
 s.add.text(GW/2,GH/2,'The Museum Claims Another Soul',{fontFamily:'monospace',fontSize:COARSE?'14px':'18px',color:'#ff8a8a'}).setOrigin(.5).setScrollFactor(0).setDepth(200).setResolution(2);
 s.cameras.main.fade(2500,0,0,0);s.time.delayedCall(2600,()=>s.scene.restart())}
update(t,d){const s=this,p=s.p,dt=d/1000;s.tm=t;const act=K.act,fl=K.fl;K.act=K.fl=0;
 const L=keys.ArrowLeft||keys.KeyA||K.l,R=keys.ArrowRight||keys.KeyD||K.r,run=keys.ShiftLeft||keys.ShiftRight,J=keys.Space||keys.ArrowUp||keys.KeyW||K.j;
 const gr=p.body.blocked.down;let mv=0;
 if(!s.lock&&!s.dead){mv=R?1:L?-1:0;p.setVelocityX(mv*(COARSE?125:run?150:90));if(mv){s.dir=mv;p.setFlipX(mv<0)}
  if(J&&gr){p.setVelocityY(-430);A.jump()}if(fl){s.on=!s.on;A.t(900,.05,'square',.05)}if(act){if(S.lv<4)s.interact();else if(S.lv==5&&p.x>530*FX)s.exitWC()}
  if(mv&&gr&&t>s.ft){A.step();s.ft=t+(run?200:320)}}else p.setVelocityX(0);
 p.anims.play(t<s.ia?'act':!gr?'jump':mv?'walk':'idle',true);
 const cam=s.cameras.main;s.dust.forEach(q=>{const v=q.getData('v');q.x+=v[0]*dt;q.y+=v[1]*dt;if(q.x<cam.scrollX)q.x+=GW;if(q.x>cam.scrollX+GW)q.x-=GW;if(q.y<T0)q.y=345;if(q.y>345)q.y=T0});
 if(s.msgT<t)s.msg.setText('');
 if(S.lv<4)s.tick(t,dt);else s.hud.clear()}
exitWC(){const s=this;s.lock=true;s.sand.fillStyle(0xe0b060);for(let i=0;i<14;i++)s.sand.fillRect(s.p.x-8+Math.random()*16,s.p.y+10+Math.random()*4,1,1);
 s.say('...there is desert sand inside my shoes.',6000);A.whisper();
 s.time.delayedCall(3500,()=>s.cameras.main.fade(2500,0,0,0));
 s.time.delayedCall(6200,()=>{s.cameras.main.resetFX();s.children.each(c=>c.setVisible(false));s.cameras.main.setBackgroundColor(0);
  s.add.text(GW/2,GH/2-10,'THE END',{fontFamily:'monospace',fontSize:'28px',color:'#cfe3ff'}).setOrigin(.5).setScrollFactor(0).setResolution(2);
  s.add.text(GW/2,GH/2+30,'tap / press any key to play again',{fontFamily:'monospace',fontSize:'10px',color:'#7a8ab0'}).setOrigin(.5).setScrollFactor(0);
  const go=()=>location.reload();s.input.once('pointerdown',go);s.input.keyboard.once('keydown',go)})}}
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:GW,height:GH,backgroundColor:'#000',pixelArt:true,
 scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:'arcade',arcade:{gravity:{y:800}}},scene:Main});
