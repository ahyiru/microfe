import * as React from 'react';

const {useEffect}=React;

import '@styles';

import './func.less';

import draw from './draw';

const Canvas=props=>{

  useEffect(()=>{
    const img=require('./1.jpg');
    draw.init(img);
    return ()=>draw.distroy();
  },[]);
  return <div className="y-canvas">
    <h2>canvas draw picture</h2>
    <div className="c-toolbar">
      <button className="ybtn ybtn-info" id="color">color</button>
      <button className="ybtn ybtn-success" id="size">size</button>
      <button className="ybtn ybtn-danger" id="eraser">eraser</button>
      <button className="ybtn ybtn-warning" id="text">text</button>

      <button className="ybtn ybtn-info" id="clean">clean</button>
      <button className="ybtn ybtn-success" id="pre">撤销</button>
      <button className="ybtn ybtn-danger" id="next">重做</button>
      <button className="ybtn ybtn-warning" id="save">保存</button>
    </div>
    <div id="note" className="y-hide">
      <textarea id="txtArea" />
    </div>

    <div className="c-area">
      <canvas id="imgCanvas" />
      <canvas id="canvas" />
    </div>
  </div>;
};

export default Canvas;
