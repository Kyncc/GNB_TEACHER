import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 获取下载试题列表 */
export const getHomework = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/list',
      params: {
        token: rootState.common.user.token,
        subjectId: params.subjectId
      }
    }).then((response) => {
      commit(types.HOMEWORK, {subjectId: params.subjectId, data: response.data.data})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 布置作业 */
export const setHomework = ({ rootState, state, dispatch }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/download',
      data: {
        token: rootState.common.user.token,
        subjectId: params.subjectId,
        ...params
      }
    }).then((response) => {
      dispatch('clearHomework')
      dispatch('getHomework')
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 作业选择班级 */
export const setHomeworkClass = ({commit}, params) => {
  commit(types.HOMEWORK_CLASS, params)
}

/** 作业高度保存 */
export const setHomeworkScroll = ({commit}, height) => {
  commit(types.HOMEWORK_SCROLL, height)
}

/** 清空作业 */
export const clearHomework = ({rootState, commit}) => {
  commit(types.HOMEWORK_RESET)
}
