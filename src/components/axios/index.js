import Vue from 'vue'
import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = 'https://www.guinaben.com/teacher/'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = JSON.stringify(config.data)
  }
  return config
})

axios.interceptors.response.use((res) => {
  // token失效得判断
  if (res.data.code === 401) {
    // localStorage.removeItem('token')
    // Vue.$vux.toast.show({text: res.data.msg, type: 'warn', time: 500, isShowMask: true})
    // setTimeout(() => {
    //   try {
    //     plus.runtime.restart() // 重启应用
    //   } catch (e) {
    //     window.location.href = '/login'
    //   }
    // }, 500)
    return Promise.reject(res)
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
