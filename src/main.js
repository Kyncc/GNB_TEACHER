import 'babel-polyfill'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import FastClick from 'fastclick'
import store from './store'
import router from './router'
import { ToastPlugin, LoadingPlugin, ConfirmPlugin, dateFormat, AlertPlugin } from 'vux'
import App from './App'

Vue.use(ToastPlugin) // 使用提醒
// 图片异步加载
Vue.use(VueLazyload, {
  attempt: 3
})
Vue.use(LoadingPlugin) // 使用Loading
Vue.use(ConfirmPlugin) // 使用Confirm
Vue.use(AlertPlugin)
FastClick.attach(document.body) // 使用fastclick
Vue.config.productionTip = false

// 时间戳转换
Vue.filter('ymd', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD')
})

// 时间戳转换分秒
Vue.filter('ymdhms', (value) => {
  return dateFormat(new Date(Number(`${value}000`)), 'YYYY-MM-DD HH:mm:ss')
})

// 学科的转换
Vue.filter('subject', (value) => {
  switch (value) {
    case 2: return '数学'
    case 7: return '物理'
    case 8: return '化学'
  }
})

// 在首页返回键失效其他页面则直接返回上一页
document.addEventListener('plusready', () => {
  let first = null
  plus.navigator.setStatusBarBackground('#4cc0be') // 设置状态栏颜色
  // HACK 解决HTML5+ IOS内扬声器的问题
  setTimeout(() => {
    let audio = plus.audio.createPlayer('233.mp3')
    audio.setRoute(plus.audio.ROUTE_SPEAKER)
    audio.play(() => {}, (e) => {})
  }, 500)
  plus.key.addEventListener('backbutton', () => {
    if (store.state.route.path === '/index' || store.state.route.path === '/bag' || store.state.route.path === '/login' || store.state.route.path === '/user') {
      if (!first) {
        first = new Date().getTime()
        Vue.$vux.toast.show({ text: '再按一次退出', type: 'text', time: 1000, position: 'bottom' })
        setTimeout(() => { first = null }, 1000)
      } else if (new Date().getTime() - first < 1000) {
        plus.runtime.quit()
      }
    } else {
      history.back()
    }
  }, false)
})

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

export default app
