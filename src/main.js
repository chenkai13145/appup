// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'

import Goods from '@/components/goods/Goods'
import Coment from '@/components/coment/Coment'
import Famliy from '@/components/famliy/Famliy'
import Split from '@/components/split/split'

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.component('Split',Split)

 const router=new VueRouter({
  routes:[
    {path:"/goods",name:'goodslink',component:Goods},
    {path:"/coment",name:'comentlink',component:Coment},
    {path:"/famliy",name:'famliylink',component:Famliy},
    {path:"*",redirect:"/goods"}
  ],
  linkActiveClass:"active",
  mode:'history'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
