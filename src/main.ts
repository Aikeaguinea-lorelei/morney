import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Nav from '@/components/Nav.vue'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/icon.vue'
import tagListModel from './models/tagListModel'
import recordListModel from './models/recordListModel'

Vue.config.productionTip = false

// 全局引入
Vue.component('Nav',Nav)
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)



new Vue({
  router:router,
  store,
  render: h => h(App)
}).$mount('#app')

// 0s之后,设置自动帮用户滚动到底部
window.onload=function(){
  setTimeout(function() {
    window.scrollTo(0,100)
  }, 0);
}