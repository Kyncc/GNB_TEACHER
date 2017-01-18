import Api from '../../config/httpdispatch'
import * as _ from '../../config/whole'
import * as types from './mutationTypes'

/*获取短信验证码(注册账号)*/
export const getRegisterCode = ({ commit }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        commit(types.REGISTER_MESSAGE,response.data);
        _.toast("已发送短信");
      },
      wrong:response=>{
         _.toast(response.data.msg);
      }
  })
}
/*设置登陆密码(注册账号)*/
export const addPwd = ({ commit }, params,success,wrong) => {
  Api.addPwd({
      data:params,
      ok:response=>{
        commit(types.SET_PASSWORD);
        success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
        wrong&&wrong();
      }
  })
}

/*设置用户信息*/
export const setUserInfo = ({ commit }, params,success,wrong) => {
  Api.info({
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
export const login = ({ commit }, params,success,wrong) => {
   _.busy();
  Api.login({
      data:params,
      ok:response=>{
        commit(types.LOGIN,response.data);
        _.leave();
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
export const getForgetCode = ({ commit }, params) => {
  Api.getCode({
      data:params,
      ok:response=>{
        commit(types.FORGET_MESSAGE,response.data);
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/*重置登陆密码*/
export const resetPwd = ({ commit }, params,success,wrong) => {
  Api.resetPwd({
      data:params,
      ok:response=>{
        commit(types.RESET_PASSWORD);
        success&&success();
      },
      wrong:response=>{
        wrong&&wrong();
        _.toast(response.data.msg);
      }
  })
}


