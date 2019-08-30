import Vue from 'vue';
import App from './app.jsx';

new Vue({
  el: '#vue-app',
  replace:false,
  render:h=>{
    return h(App);
  },
});

export default App;





















