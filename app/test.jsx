import React from 'react';

import {Link} from '@router';
// import {Link} from '@ivu/router';

const routers=['vue','react','angular'];

const Test=props=>{
  return <div className="test">
    <h1>test page</h1>
    <div>
      {
        routers.map(v=><p key={v}><Link path={`/${v}`} params={{test:v}}>link test {v}</Link></p>)
      }
    </div>
  </div>;
};

export default Test;

















