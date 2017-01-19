import Api from './api'
import * as _ from 'config/whole'
import * as types from './mutationTypes'

/** 获取用户信息*/
export const getUserInfo = ({ commit }, params) => {
  Api.userInfo({
      data:params,
      ok:response=>{
        commit(types.USERINFO,response.data);
      },
      wrong:response=>{
         _.toast(response.data.msg);
      }
  })
}

/** 设置用户信息*/
export const setUserInfo = ({ commit }, params,success,wrong) => {
  Api.updateInfo({
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

