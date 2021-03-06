/* canvas test
** 20160119
** yiru
*/
var draw={
  cancelIndex:0,
  cancelList:[],
  sel:'size',
  getCanvas:function(){
    return document.getElementById('canvas');
  },
  init:function(img){

    var toolbar=document.getElementsByClassName('c-toolbar')[0];
    toolbar.addEventListener('click',draw.tools,false);

    var canvas:any=draw.getCanvas();
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    canvas.width=cw;
    canvas.height=ch;

    //  load image
    draw.loadImg(img,cw,ch);

    //鼠标
    canvas.addEventListener('mousedown',draw.onMouseDown,false);
    // canvas.addEventListener('mousemove',onMouseMove,false);
    // canvas.addEventListener('mouseup',onMouseUp,false);
    //触摸
    canvas.addEventListener('touchstart',draw.onMouseDown,false);
    // canvas.addEventListener('touchmove',onMouseMove,false);
    // canvas.addEventListener('touchend',onMouseUp,false);
  },
  tools:function(e){
    var e=e||window.event;
    var ele=e.target||e.srcElement;
    var txt=ele.innerHTML;
    console.log(txt);
    draw.sel=txt;
    var canvas:any=draw.getCanvas();
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    var ctx=canvas.getContext('2d');

    switch(txt){
      case 'color':
        draw.sel='size';
        break;
      case 'size':
        console.log(txt);
        break;
      case 'erase':
        console.log(txt);
        break;
      case 'note':
        console.log(txt);
        break;
      case 'text':
        console.log(txt);
        break;
      case 'clean':
        draw.sel='size';
        ctx.clearRect(0,0,cw,ch);
        break;
      case '撤销':
        draw.sel='size';
        if(draw.cancelList.length-1<draw.cancelIndex){
          return false;
        }
        draw.pre();
        break;
      case '重做':
        draw.sel='size';
        if(draw.cancelIndex<=0){
          return false;
        }
        draw.next();
        break;
      case '保存':
        draw.sel='size';
        draw.downloadImg();
        break;
      default:
    }
  },
  onMouseDown:function(e){
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    ctx.beginPath();
    var p=draw.pos(e);
    ctx.moveTo(p.x,p.y);
    canvas.addEventListener('mousemove',draw.onMouseMove,false);
    canvas.addEventListener('touchmove',draw.onMouseMove,false);
    document.addEventListener('mouseup',draw.onMouseUp,false);
    document.addEventListener('touchend',draw.onMouseUp,false);
  },
  onMouseMove:function(e){
    var e=e||window.event;
    // var ele=e.target||e.srcElement;
    e.preventDefault();
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var p=draw.pos(e);
    var size=1,color='red';
    if(draw.sel=='size'){
      ctx.lineWidth=size;
      ctx.strokeStyle=color;
      ctx.lineTo(p.x,p.y);
      // ctx.shadowColor=color;
      // ctx.shadowBlur=1;
      ctx.stroke();
    }
    else if(draw.sel=='eraser'){
      //ctx.beginPath();
      ctx.lineWidth=1;
      ctx.strokeStyle='#fff';
      ctx.clearRect(p.x-size*10,p.y-size*10,size*20,size*20);
    }
  },
  onMouseUp:function(e){
    var e=e||window.event;
    // var ele=e.target||e.srcElement;
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    if(draw.sel=='text'){
      /*$('#note').show();
      var tArea=$('#txtArea');
      tArea.val('');
      tArea.focus();
      tArea.off('blur').on('blur',function(){
        var txt=$(this).val();
        ctx.font='12px 微软雅黑';
        ctx.fillStyle='red';
        var p=getP;
        ctx.fillText(txt,p.x,p.y);
        $('#note').hide();
        draw.sel='size';
      })*/
    }

    canvas.removeEventListener('mousemove',draw.onMouseMove,false);
    canvas.removeEventListener('touchmove',draw.onMouseMove,false);
    document.removeEventListener('mouseup',draw.onMouseUp,false);
    document.removeEventListener('touchend',draw.onMouseUp,false);

    draw.saveData();
  },
  pos:function(e){
    var canvas:any=draw.getCanvas().parentNode;
    var x,y;
    if(draw.isTouch(e)){
      x=e.touches[0].pageX-canvas.offsetLeft;
      y=e.touches[0].pageY-canvas.offsetTop;
    }
    else{
      // console.log(canvas.offsetLeft);
      // console.log(canvas.offsetParent);
      // console.log(canvas.getBoundingClientRect().left);
      x=e.pageX-canvas.getBoundingClientRect().left;
      y=e.pageY-canvas.getBoundingClientRect().top;
    }
    return {x:x,y:y};
  },
  isTouch:function(e){
    var type=e.type;
    if(type.indexOf('touch')>=0){
      return true;
    }
    return false;
  },
  getWidth:function(){
    var xWidth=null;
    if(window.innerWidth!==null){
      xWidth=window.innerWidth;
    }
    else{
      xWidth=document.body.clientWidth;
    }
    return xWidth;
  },
  saveData:function(){
    var canvas:any=draw.getCanvas();
    draw.cancelIndex=0;
    var dataUrl=canvas.toDataURL();
    draw.cancelList.push(dataUrl);
    // return draw.temp().cancelList;
  },
  /*startDraw:function(){
    var canvas=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var size=1,color='red';

    ctx.lineWidth=size;
    ctx.strokeStyle=color;
    var p=draw.pos(e);
    ctx.lineTo(p.x,p.y);
    // ctx.shadowColor=color;
    // ctx.shadowBlur=1;
  },
  eraser:function(){
    var canvas=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var size=1,color='red';
    //ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#fff';
    var p=draw.pos(e);
    ctx.clearRect(p.x-size*10,p.y-size*10,size*20,size*20);
  },*/
  pre:function(){
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    draw.cancelIndex++;
    ctx.clearRect(0,0,cw,ch);
    var cImage=new Image();
    var index=draw.cancelList.length-1-draw.cancelIndex;
    if(index>=0){
      cImage.src=draw.cancelList[index];
      cImage.onload=function(){
        ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
      };
    }
  },
  next:function(){
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    draw.cancelIndex--;
    ctx.clearRect(0,0,cw,ch);
    var cImage=new Image();
    var index=draw.cancelList.length-1-draw.cancelIndex;
    cImage.src=draw.cancelList[index];
    cImage.onload=function(){
      ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
    };
  },
  loadImg:function(url,cw,ch){
    var canvasImg:any=document.getElementById('imgCanvas');
    var ctxImg=canvasImg.getContext('2d');
    canvasImg.width=cw;
    canvasImg.height=ch;

    var img=new Image();
    img.src=url;
    img.onload=function(){
      ctxImg.drawImage(img,0,0,cw,ch);
    };
  },
  downloadImg:function(){
    console.log(draw.cancelList);
    document.location.href=draw.cancelList[draw.cancelList.length-1];
  },
  // distroy event
  distroy:()=>{
    var toolbar=document.getElementsByClassName('c-toolbar')[0];
    var canvas=draw.getCanvas();

    toolbar.removeEventListener('click',draw.tools,false);
    canvas.removeEventListener('mousedown',draw.onMouseDown,false);
    canvas.removeEventListener('touchstart',draw.onMouseDown,false);
    canvas.removeEventListener('mousemove',draw.onMouseMove,false);
    canvas.removeEventListener('touchmove',draw.onMouseMove,false);
    document.removeEventListener('mouseup',draw.onMouseUp,false);
    document.removeEventListener('touchend',draw.onMouseUp,false);
  },
}
;

export default draw;


const draw1=(canvas1,toolbar1)=>{
  const cancelIndex=0;
  const cancelList=[];
  const sel='size';

  const canvas:any=document.getElementById('canvas');
  const ctx=canvas.getContext('2d');
  const cw=canvas.parentNode.offsetWidth;
  const ch=canvas.parentNode.offsetHeight;
  const toolbar=document.getElementsByClassName('c-toolbar')[0];

  const init=(img)=>{
    toolbar.addEventListener('click',draw.tools,false);
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    canvas.width=cw;
    canvas.height=ch;

    //  load image
    draw.loadImg(img,cw,ch);

    //鼠标
    canvas.addEventListener('mousedown',onMouseDown,false);
    // canvas.addEventListener('mousemove',onMouseMove,false);
    // canvas.addEventListener('mouseup',onMouseUp,false);
    //触摸
    canvas.addEventListener('touchstart',onMouseDown,false);
    // canvas.addEventListener('touchmove',onMouseMove,false);
    // canvas.addEventListener('touchend',onMouseUp,false);
  }
  const tools=(e)=>{
    var e=e||window.event;
    var ele=e.target||e.srcElement;
    var txt=ele.innerHTML;
    console.log(txt);
    draw.sel=txt;
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    var ctx=canvas.getContext('2d');

    switch(txt){
      case 'color':
        draw.sel='size';
        break;
      case 'size':
        console.log(txt);
        break;
      case 'erase':
        console.log(txt);
        break;
      case 'note':
        console.log(txt);
        break;
      case 'text':
        console.log(txt);
        break;
      case 'clean':
        draw.sel='size';
        ctx.clearRect(0,0,cw,ch);
        break;
      case '撤销':
        draw.sel='size';
        if(draw.cancelList.length-1<draw.cancelIndex){
          return false;
        }
        draw.pre();
        break;
      case '重做':
        draw.sel='size';
        if(draw.cancelIndex<=0){
          return false;
        }
        draw.next();
        break;
      case '保存':
        draw.sel='size';
        draw.downloadImg();
        break;
      default:
    }
  };
  const onMouseDown=(e)=>{
    var ctx=canvas.getContext('2d');
    ctx.beginPath();
    var p=draw.pos(e);
    ctx.moveTo(p.x,p.y);
    canvas.addEventListener('mousemove',onMouseMove,false);
    canvas.addEventListener('touchmove',onMouseMove,false);
    document.addEventListener('mouseup',onMouseUp,false);
    document.addEventListener('touchend',onMouseUp,false);
  };
  const onMouseMove=(e)=>{
    var e=e||window.event;
    // var ele=e.target||e.srcElement;
    e.preventDefault();
    var ctx=canvas.getContext('2d');
    var p=draw.pos(e);
    var size=1,color='red';
    if(draw.sel=='size'){
      ctx.lineWidth=size;
      ctx.strokeStyle=color;
      ctx.lineTo(p.x,p.y);
      // ctx.shadowColor=color;
      // ctx.shadowBlur=1;
      ctx.stroke();
    }
    else if(draw.sel=='eraser'){
      //ctx.beginPath();
      ctx.lineWidth=1;
      ctx.strokeStyle='#fff';
      ctx.clearRect(p.x-size*10,p.y-size*10,size*20,size*20);
    }
  };
  const onMouseUp=(e)=>{
    var e=e||window.event;
    // var ele=e.target||e.srcElement;
    var ctx=canvas.getContext('2d');
    if(draw.sel=='text'){
      /*$('#note').show();
      var tArea=$('#txtArea');
      tArea.val('');
      tArea.focus();
      tArea.off('blur').on('blur',function(){
        var txt=$(this).val();
        ctx.font='12px 微软雅黑';
        ctx.fillStyle='red';
        var p=getP;
        ctx.fillText(txt,p.x,p.y);
        $('#note').hide();
        draw.sel='size';
      })*/
    }

    canvas.removeEventListener('mousemove',onMouseMove,false);
    canvas.removeEventListener('touchmove',onMouseMove,false);
    document.removeEventListener('mouseup',onMouseUp,false);
    document.removeEventListener('touchend',onMouseUp,false);

    draw.saveData();
  };
  const pos=(e)=>{
    var canvas:any=draw.getCanvas().parentNode;
    var x,y;
    if(draw.isTouch(e)){
      x=e.touches[0].pageX-canvas.offsetLeft;
      y=e.touches[0].pageY-canvas.offsetTop;
    }
    else{
      // console.log(canvas.offsetLeft);
      // console.log(canvas.offsetParent);
      // console.log(canvas.getBoundingClientRect().left);
      x=e.pageX-canvas.getBoundingClientRect().left;
      y=e.pageY-canvas.getBoundingClientRect().top;
    }
    return {x:x,y:y};
  };
  const isTouch=(e)=>{
    var type=e.type;
    if(type.indexOf('touch')>=0){
      return true;
    }
    return false;
  };
  const getWidth=()=>{
    var xWidth=null;
    if(window.innerWidth!==null){
      xWidth=window.innerWidth;
    }
    else{
      xWidth=document.body.clientWidth;
    }
    return xWidth;
  };
  const saveData=()=>{
    draw.cancelIndex=0;
    var dataUrl=canvas.toDataURL();
    draw.cancelList.push(dataUrl);
    // return draw.temp().cancelList;
  };
  /*startDraw:function(){
    var canvas=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var size=1,color='red';

    ctx.lineWidth=size;
    ctx.strokeStyle=color;
    var p=draw.pos(e);
    ctx.lineTo(p.x,p.y);
    // ctx.shadowColor=color;
    // ctx.shadowBlur=1;
  },
  eraser:function(){
    var canvas=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var size=1,color='red';
    //ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#fff';
    var p=draw.pos(e);
    ctx.clearRect(p.x-size*10,p.y-size*10,size*20,size*20);
  },*/
  const pre=()=>{
    var ctx=canvas.getContext('2d');
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    draw.cancelIndex++;
    ctx.clearRect(0,0,cw,ch);
    var cImage=new Image();
    var index=draw.cancelList.length-1-draw.cancelIndex;
    if(index>=0){
      cImage.src=draw.cancelList[index];
      cImage.onload=function(){
        ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
      };
    }
  };
  const next=()=>{
    var canvas:any=draw.getCanvas();
    var ctx=canvas.getContext('2d');
    var cw=canvas.parentNode.offsetWidth;
    var ch=canvas.parentNode.offsetHeight;
    draw.cancelIndex--;
    ctx.clearRect(0,0,cw,ch);
    var cImage=new Image();
    var index=draw.cancelList.length-1-draw.cancelIndex;
    cImage.src=draw.cancelList[index];
    cImage.onload=function(){
      ctx.drawImage(cImage,0,0,cImage.width,cImage.height,0,0,cw,ch);
    };
  };
  const loadImg=(url,cw,ch)=>{
    const canvasImg:any=document.getElementById('imgCanvas');
    const ctxImg=canvasImg.getContext('2d');
    canvasImg.width=cw;
    canvasImg.height=ch;

    const img=new Image();
    img.src=url;
    img.onload=function(){
      ctxImg.drawImage(img,0,0,cw,ch);
    };
  };
  const downloadImg=()=>{
    console.log(draw.cancelList);
    document.location.href=draw.cancelList[draw.cancelList.length-1];
  };
  // distroy event
  const distroy=()=>{
    toolbar.removeEventListener('click',draw.tools,false);
    canvas.removeEventListener('mousedown',draw.onMouseDown,false);
    canvas.removeEventListener('touchstart',draw.onMouseDown,false);
    canvas.removeEventListener('mousemove',draw.onMouseMove,false);
    canvas.removeEventListener('touchmove',draw.onMouseMove,false);
    document.removeEventListener('mouseup',draw.onMouseUp,false);
    document.removeEventListener('touchend',draw.onMouseUp,false);
  };
};

export const dlFile=(url,name)=>{
  if(typeof url==='string'){
    fetch(url).then(res=>res.blob()).then(blob=>{
      const dataUrl=window.URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=dataUrl;
      a.download=name;
      a.style.display='none';
      document.body.appendChild(a);
      a.click();
      a.parentNode.removeChild(a);
      window.URL.revokeObjectURL(dataUrl);
    });
  }else{
    const blob=new Blob([url]);
    const dataUrl=window.URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=dataUrl;
    a.download=name;
    a.style.display='none';
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
    window.URL.revokeObjectURL(dataUrl);
  }
};

















