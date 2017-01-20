import axios from 'config/http'
import * as _ from 'config/whole'
import * as types from './mutationTypes'

/** 获取用户信息*/
export const getUserInfo = ({ rootState,commit }) => {
   _.busy();
   return new Promise((resolve, reject)=> { 
      axios({
        method: 'get',
        url: 'teacher/user/getUserInfo',
        params: {
          token:rootState.login.token
        }
      })
      .then((response) => {
        commit(types.USERINFO,response.data);
        resolve(response);
        _.leave();
      })
      .catch((error) => {
        _.leave();
      })
  });
}

// /** 设置用户信息*/
// export const setUserInfo = ({ commit }, params,success,wrong) => {
//   Api.updateInfo({
//     data: params,
//     ok: response => {
//         success&&success()
//     },
//     wrong: response => {
//         _.toast(response.data.msg);
//         wrong&&wrong();
//     }
//   })
// }

