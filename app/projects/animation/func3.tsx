import * as React from 'react';
const {atan2,sqrt,sin,cos,PI,acos,random}=Math;

/*export default class Func3 extends React.Component<any,any> {
  timer=0;
  t=0;
  A=new AudioContext;
  rgb=(c)=>{
    let r=~~((.5+sin(c)*.5)*16);
    let g=~~((.5+cos(c)*.5)*16);
    let b=~~((.5-sin(c)*.5)*16);
    return '#'+r.toString(16)+g.toString(16)+b.toString(16);
  };
  vol=()=>{
    let s=this.A.createOscillator();
    let w=Math.pow(2,(('EAAAYEEEFFFFnAAAE@A@YEEEF@F@nAAA'.charCodeAt(this.t/2)>>(this.t++%2)*3&7)+16)/12);
    s.connect(this.A.destination);
    s.frequency.value=w*(w>0?440:0);
    this.t%=64;
    s.start();
  };
  resize=()=>{

  };
  rand=(a,b=0,int=false)=>{
    a<b&&(a=[b,b=a][0]);
    if(int){
      return ~~(Math.random()*(a-b+1))+b;
    }
    return Math.random()*(a-b)+b;
  };
  reset=(attr,w,h)=>{
    let rand=this.rand;
    let hue=rand(0,360);
    let sat='100%';
    let light=rand(attr.l_min,attr.l_max)+'%';
    return {
      x:rand(w),
      y:rand(h),
      radius:rand(attr.r_min,attr.r_max),
      opacity:rand(attr.o_min,attr.o_max),
      color:`hsl(${hue},${sat},${light})`,
    };
  };
  draw=()=>{
    let a=document.querySelector('canvas');
    let b=document.querySelector('body');
    let c=a.getContext('2d');
    let can:any=this.refs.canvas;
    // let w=a.width=window.innerWidth;
    // let h=a.height=window.innerHeight;
    let w=a.width=can.offsetWidth;
    let h=a.height=can.parentNode.offsetHeight-50;
    let raf=window.requestAnimationFrame;
    let attr={
      num:100,
      r_min:1,
      r_max:2,
      o_min:.3,
      o_max:.5,
      h_min:0,
      h_max:360,
      l_min:40,
      l_max:70,
    };

    let d=this.reset(attr,w,h);
    let init=()=>{
      // let grd=c.createLinearGradient(0,0,0,h);
      // grd.addColorStop(0,'#3c0');
      // grd.addColorStop(1,'#30c');
      // c.fillStyle=grd;
      // c.fillStyle='#3c0';
      // let d=reset();
      c.fillStyle='#000';
      // c.globalAlpha=1;
      c.fillRect(0,0,w,h);
    };
    let draw=(d,i)=>{
      d.opacity-=.005;
      d.radius+=.5;
      if(d.opacity<0){
        count[i]=this.reset(attr,w,h);
        return false;
      }
      c.fillStyle=d.color;
      c.globalAlpha=d.opacity;
      c.beginPath();
      c.arc(d.x,d.y,d.radius,0,2*PI,true);
      // c.lineTo();
      c.closePath();
      c.fill();
      c.globalAlpha=1;
    };
    
    let count=[];
    let update=()=>{
      init();
      if(count.length<attr.num&&random()<.1){
        count.push(this.reset(attr,w,h));
      }
      count.map((v,k)=>{
        draw(v,k);
      });
      raf(update);
    };
    raf(update);
  };
  componentDidMount(){
    // 1.布局设计
    // 2.功能分析
    // 3.常用方法归类
    // 4.各个击破实现功能
    // 5.测试调优
    // 
    this.draw();
    // window.addEventListener('resize',this.resize,false);
    // this.timer=setInterval(this.vol,150);
  }
  componentWillUnmount(){
    // window.removeEventListener('resize',this.resize,false);
    // clearInterval(this.timer);
  }
  render() {
    return (
      <div ref="canvas">
        <canvas id="canvas" />
      </div>
    );
  }
}*/
