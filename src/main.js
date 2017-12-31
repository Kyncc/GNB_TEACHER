import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App'
import './plugin'
import './error'

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
