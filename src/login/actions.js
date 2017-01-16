import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

/*获取短信验证码(注册账号)*/
export const getRegisterCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.REGISTER_MESSAGE,response.data);
      },
      wrong:response=>{
         _.toast(response.data.msg);
      }
  })
}

/*设置登陆密码(注册账号)*/
export const addPwd = ({ dispatch }, params,success,wrong) => {
  Api.addPwd({
      data:params,
      ok:response=>{
        dispatch(types.SET_PASSWORD);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
        wrong&&wrong();
      }
  })
}

/*设置用户信息*/
export const setUserInfo = ({ dispatch }, params,success,wrong) => {
  Api.addUserInfo({
    data: params,
    ok: response => {
        success&&success()
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/*用户登陆*/
export const login = ({ dispatch }, params,success,wrong) => {
   _.busy();
  Api.login({
      data:params,
      ok:response=>{
        dispatch(types.LOGIN,response.data);
        // _.leave();
        success&&success();
      },
      wrong:response=>{
        wrong&&wrong();
        _.leave();
        _.toast(response.data.msg);
      }
  })
}


/*获取短信验证码(忘记密码)*/
export const getForgetCode = ({ dispatch }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        dispatch(types.FORGET_MESSAGE,response.data);
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/*重置登陆密码*/
export const resetPwd = ({ dispatch }, params,success,wrong) => {
  Api.resetPwd({
      data:params,
      ok:response=>{
        dispatch(types.RESET_PASSWORD);
        success&&success();
      },
      wrong:response=>{
        wrong&&wrong();
        _.toast(response.data.msg);
      }
  })
}


