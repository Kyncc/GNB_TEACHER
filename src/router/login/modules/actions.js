import axios from 'config/http'
import * as _ from 'config/whole'
import * as types from './mutationTypes'

/** 获取短信验证码(注册账号)*/
export const getRegisterCode = ({commit},params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/getCode',
      params: {
        "mobile": params.mobile,
        "cover": params.cover
      }
    })
    .then((response) => {
        commit(types.REGISTER_MESSAGE,response.data);
        _.toast(response.data.msg);
        resolve(response);
    })
  }); 
}

/**设置登陆密码(注册账号)*/
export const addPwd = ({ commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/pwd/add',
      params: {
        ...params
      }
    })
    .then((response) => {
        commit(types.SET_PASSWORD,response.data);
        resolve(response);
    })
  });
}

/**用户登陆*/
export const login = ({ commit },params) => {
  _.busy();
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/login',
      params: {
        ...params
      }
    })
    .then((response) => {
        commit(types.LOGIN,response.data.data);
        _.leave();
        resolve(response);
    })
    .catch((response) => {
      _.leave();
    })
  });
}


/**获取短信验证码(忘记密码)*/
export const getForgetCode = ({ commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/pwd/code',
      params: {
        mobile: params.mobile
      }
    })
    .then((response) => {
        commit(types.FORGET_MESSAGE,response.data);
        _.toast(response.data.msg);
        resolve(response);
    })
  });
}

/**重置登陆密码*/
export const resetPwd = ({ commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/pwd/resetByMobile',
      data: {
       ...params
      }
    })
    .then((response) => {
        _.toast(response.data.msg);
        resolve(response);
    })
  });
}
