import Canvas from '../projects/canvas/func1';
const routers=[{
  url:'/',
  name:'home',
  icon:'home',
  component:'home',
},{
  url:'/login',
  name:'login',
  component:'login',
  noMenu:true,
  title:'登录',
},{
  url:'/signup',
  name:'signup',
  component:'signup',
  noMenu:true,
  title:'注册',
},{
  url:'/react',
  name:'react',
  // redirect:'/react/es',
  // cache:true,
  children:[{
    name:'es',
    url:'/es',
    component:'es',
  },{
    name:'ts',
    url:'/ts',
    component:'ts',
  }],
},{
  url:'/vue',
  name:'vue',
  component:'components',
},{
  url:'/angular',
  name:'angular',
  component:'serverless',
},{
  url:'/test',
  name:'test',
  component:()=>import('../test'),
},{
  url:'/canvas',
  name:'canvas',
  component:Canvas,
},{
  url:'/animation',
  name:'animation',
  component:'animation',
},{
  url:'/md2html',
  name:'md2html',
  component:'md2html',
},{
  url:'/dnd',
  name:'dnd',
  component:'dnd',
},{
  url:'/404',
  name:'404',
  component:'404',
  noMenu:true,
}];

export default routers;





















