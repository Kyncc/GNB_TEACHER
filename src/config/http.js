import axios from 'axios'
import * as _ from './whole'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = ' http://www.guinaben.com:8070';

//全局钩子
axios.interceptors.response.use((res) =>{
  if(res.data.code != '200'){
    _.toast(res.data.msg);
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  _.toast("网络异常");
  return Promise.reject(error);
});


export default axios;