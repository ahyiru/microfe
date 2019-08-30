import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './test.less';

const ReactTSApp=props=>{
  const name='Hello React';
  const logo=require('@common/images/react.svg');

  return <div>
    <h1>{name}</h1>
    <img src={logo} />
  </div>;
};

ReactDOM.render(<ReactTSApp />, document.getElementById('ts-app'));

















