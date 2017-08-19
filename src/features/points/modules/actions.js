import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 我的积分 */
export const getPoints = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'points',
      params: {
        token: rootState.common.user.token
      }
    }).then(response => {
      commit(types.POINTS, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 积分列表 */
export const getPointsList = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'points/list',
      params: {
        token: rootState.common.user.token
      }
    }).then(response => {
      commit(types.POINTS_LIST, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 积分列表 */
export const getPointsRask = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'points/rask',
      params: {
        token: rootState.common.user.token
      }
    }).then(response => {
      commit(types.POINTS_RASK, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 清空积分列表 */
export const clearPointsList = ({ commit }) => {
  commit(types.POINTS_LIST_RESET)
}

/** 清空排行榜 */
export const clearPointRask = ({ commit }) => {
  commit(types.POINTS_RASK_RESET)
}
