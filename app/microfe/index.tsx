import * as React from 'react';
import * as ReactDOM from 'react-dom';
const {useState,useEffect,useRef}=React;

import useRouter,{Link} from '@router';
// import useRouter,{Link} from '@ivu/router';
import {loadScript,unloadScript} from '@ivu/utils';

import {browserRouter,conf} from './configs';

import routers from './router';

import './test.less';

const RenderMenu=props=>{
  const [menu,setMenu]=useState(null);
  useEffect(()=>{
    setMenu(props.menu);
  },[props]);
  const toggle=(e,v)=>{
    e.stopPropagation();
    v.open=!v.open;
    setMenu(JSON.parse(JSON.stringify(menu)));
  };

  const render=menu=>{
    return menu.map(v=>{
      const hasChildren=v.children&&v.children.length;
      const active=v.active?'active':'';
      if(hasChildren){
        return <li key={v.name} onClick={e=>toggle(e,v)}>
          <Link path={v.url} className={active} preventDefault><span>{v.name}</span><i className={`ivu-angle ${v.open?'top':'bottom'}`} /></Link>
          <ul className={v.open?'open':''}>{render(v.children)}</ul>
        </li>;
      }
      return <li key={v.name}>
        <Link path={v.url} className={active} stopPropagation><span>{v.name}</span></Link>
      </li>;
    });
  };
  if(menu){
    return <div className="menu">
      <ul>
        {render(menu)}
      </ul>
    </div>;
  }
  return null;
};

const breadcrumb=current=><ul className="breadcrumb">
  <li><Link path="/">home</Link></li>
  {current.map(v=>v.url!=='/'&&<li key={v.url}><Link path={v.url}>{v.name}</Link></li>)}
</ul>;


const loadReact=async ()=>{
  return await loadScript(conf.react.app,'react');
};
const loadVue=async ()=>{
  return await loadScript(conf.vue.app,'vue');
};
const loadAngular=async ()=>{
  return await loadScript(conf.angular.app,'angular');
};
const loaders={
  react:loadReact,
  vue:loadVue,
  angular:loadAngular,
};

const unloadReact=async ()=>{
  await unloadScript(conf.react.app,'react');
};
const unloadVue=async ()=>{
  await unloadScript(conf.vue.app,'vue');
};
const unloadAngular=async ()=>{
  await unloadScript(conf.angular.app,'angular');
};

const unloaders={
  react:unloadReact,
  vue:unloadVue,
  angular:unloadAngular,
};

const nameKeys=['','react','vue','angular'];

const mountScripts=async (prevName,name)=>{
  if(nameKeys.includes(name)){
    if(!name){
      const arr=Object.keys(loaders).filter(v=>v!==prevName);
      arr.map(async v=>{
        await loaders[v]();
      });
    }else{
      if(prevName){
        const MicroApp=await loaders[name]();
      }
    }
  }
};
const distroyScripts=async (prevName,name)=>{
  if(nameKeys.includes(prevName)){
    if(prevName){
      if(name){
        await unloaders[prevName]();
      }
    }else{
      const arr=Object.keys(unloaders).filter(v=>v!==name);
      arr.map(async v=>{
        await unloaders[v]();
      });
    }
  }
};

const handleScripts=async (prevName,name)=>{
  if(prevName!==name){
    await distroyScripts(prevName,name);
  }
  await mountScripts(prevName,name);
};

const App=()=>{
  const data=useRouter({routers,browserRouter});
  if(data){
    return <ReanderApp data={data} />;
  }
  return <h1>Loading...</h1>;
};

const ReanderApp=props=>{
  const {path,menu,components,current}=props.data;
  const name=path.split('/')[1];
  const prevName=useRef(name);
  useEffect(()=>{
    handleScripts(prevName.current,name);
    prevName.current=name;
  },[props]);

  return <div className="microfe">
    {/*<header>
      <h2>microfe</h2>
    </header>*/}
    <RenderMenu menu={menu} />
    <main className="main">
      <div className="container">
        {breadcrumb(current)}
        <div className="content">
          {components}
          {
            ['','react'].includes(name)?<ReactApp />:null
          }
          <div className="content-wrap">
            {
              ['','vue'].includes(name)?<VueApp />:null
            }
            {
              ['','angular'].includes(name)?<AngularApp />:null
            }
          </div>
        </div>
      </div>
    </main>
    <footer style={{textAlign:'center'}}>footer</footer>
  </div>;
};

const ReactApp=()=>{
  /*useEffect(()=>{
    // loadReact();
    // return ()=>unloaders(prevName);
  },[]);*/
  return <div>
    <div id="react-app">
      <div>react not loaded ...</div>
    </div>
  </div>;
};
const VueApp=()=>{
  /*useEffect(()=>{
    // console.log('vue:111-3');
  },[]);*/
  return <div>
    <div id="vue-app">
      <div>vue not loaded ...</div>
    </div>
  </div>;
};
const AngularApp=()=>{
  /*useEffect(()=>{
    // console.log('angular:111-3');
  },[]);*/
  return <div>
    <div id="angular-app">
      <div>angular not loaded ...</div>
    </div>
  </div>;
};


ReactDOM.render(<App />, document.getElementById('microfe-app'));

















