const App={
  data(){
    return{
      name:'Micro-Vue',
      logo:require('@common/images/vue.png'),
    };
  },
  render(h){
    return <div id="vue-app">
      <div style="text-align:center;">
        <h1>{this.name}</h1>
        <div style="padding:20px"><img style="max-width:260px;" src={this.logo} /></div>
      </div>
    </div>;
  },
};

export default App;

