import Vue from 'vue'
import axios from 'axios'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'http://www.guinaben.com:8070/test/teacher/'
axios.defaults.baseURL = 'https://www.guinaben.com/teacher/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// POST传参序列化
axios.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    VERSION: '3.4.0'
  }
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }
  return config
})

axios.interceptors.response.use((res) => {
  // token失效得判断
  if (res.data.code === 401) {
    localStorage.removeItem('token')
    Vue.$vux.toast.show({text: res.data.msg, type: 'warn', time: 500, isShowMask: true})
    setTimeout(() => {
      try {
        plus.runtime.restart() // 重启应用
      } catch (e) {
        window.location.href = '/login'
      }
    }, 500)
    return Promise.reject(res)
  } else if (res.data.code === 403) {
    // 升级的代码
    Vue.$vux.alert.show({
      title: '发现新版本',
      content: '赚积分有惊喜',
      onHide () {
        // window.location.href = '/login'
        if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
          plus.runtime.openURL('itms-apps://itunes.apple.com/cn/app/gui-na-ben-jiao-shi-duan-zai/id1190013249?l=en&mt=8')
        } else {
          window.location.href = 'market://details?id=com.sanbao.guinaben.teacher'
        }
      }
    })
  } else if (res.data.code !== 200) {
    Vue.$vux.toast.show({text: res.data.msg, type: 'text', time: 1000, position: 'bottom'})
    return Promise.reject(res)
  }
  return res
}, (error) => {
  Vue.$vux.toast.show({text: '网络异常', type: 'text', time: 1000, position: 'bottom'})
  return Promise.reject(error)
})

export default axios
