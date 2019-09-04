import React from 'react';
import ReactDOM from 'react-dom';

// import './test.less';

const ReactTSApp=props=>{
  const name='Micro-React';
  const logo=require('@common/images/react.svg');

  return <div style={{textAlign:'center'}}>
    <h1>{name}</h1>
    <img style={{maxWidth:'300px'}} src={logo} />
  </div>;
};

export default ReactTSApp;

ReactDOM.render(<ReactTSApp />, document.getElementById('react-app'));

















