import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 邀请信息获取 */
export const getInvite = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'invite',
      data: {
        token: rootState.common.user.token
      }
    }).then(response => {
      commit(types.INVITE, response.data.data)
      resolve(response)
    })
  })
}

/** 邀请列表 */
export const getInviteList = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'invite/list',
      data: {
        token: rootState.common.user.token
      }
    }).then(response => {
      commit(types.INVITE_LIST, response.data.data)
      resolve(response)
    })
  })
}

/** 填写邀请码 */
export const setInviteCode = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'invite/code',
      params: {
        code: params.code,
        token: rootState.common.user.token
      }
    }).then(response => {
      resolve(response)
    })
  })
}
