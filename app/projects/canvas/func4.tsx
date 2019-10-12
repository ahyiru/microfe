import * as React from 'react';
import './func.less';
export default class Func4 extends React.Component<any,any> {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var canvas:any=document.getElementById('canvas');
    // canvas.parentNode.style.height='2000px';
    // var cw=canvas.parentNode.offsetWidth;
    // var ch=canvas.parentNode.offsetHeight;
    var cw=750;
    var ch=1061;
    var url=require('./u1.jpg'),url1=require('./u2.jpg');

    var canvasImg:any=document.getElementById('imgCanvas');
    var ctxImg=canvasImg.getContext('2d');
    canvasImg.width=cw;
    canvasImg.height=ch;

    var img=new Image();
    img.src=url;
    img.onload=function(){
      ctxImg.drawImage(img,0,0,cw,ch);
    };

    var ctx=canvas.getContext('2d');
    // var cw=canvas.parentNode.offsetWidth;
    // var ch=canvas.parentNode.offsetHeight;
    canvas.width=100;
    canvas.height=100;
    ctx.clearRect(0,0,100,100);
    var cImage=new Image();
    cImage.src=url1;
    cImage.onload=function(){
      // ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
      ctx.drawImage(cImage,0,0,100,100/*,0,0,100,100*/);
    };

    var dataUrl=canvas.toDataURL();
    console.log(dataUrl);
    // document.location.href=dataUrl;
    this.dl(dataUrl);
  }
  dl=(url)=>{
    document.location.href=url;
  };
  render() {
    return (
      <div className="y-canvas1">
        <div className="c-area">
          <canvas id="imgCanvas" />
          <canvas id="canvas" />
        </div>
      </div>
    );
  }
}
