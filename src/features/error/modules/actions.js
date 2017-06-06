import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取错题列表 */
export const getError = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/list',
      params: {
        offset: rootState.error.error.offset,
        token: rootState.common.user.token,
        subject_id: params.subjectId,
        studentId: rootState.route.params.studentId
      }
    })
    .then((response) => {
      commit(types.ERROR, {subjectId: params.subjectId, data: response.data.data})
      resolve(response)
    })
  })
}

/** 设置例题错误类型 */
export const setErrorType = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'error/type',
      data: {
        token: rootState.common.user.token,
        studentId: rootState.route.params.studentId,
        wbeid: params.wbeid,
        chapterId: params.chapterId,
        type: params.type
      }
    })
    .then((response) => {
      commit(types.ERROR_ERROR_TYPE, {index: params.index, type: params.type})
      resolve(response)
    })
  })
}

/** 高度保存 */
export const setErrorScroll = ({commit}, height) => {
  commit(types.ERROR_SCROLL, {height: height})
}

/** 清空错题本 */
export const clearError = ({rootState, commit}) => {
  commit(types.ERROR_RELOAD)
}

/** 获取全部学生 */
export const getErrorClassmate = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/classmate/all',
      params: {
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.ERROR_CLASSMATE, {data: response.data.data})
      resolve(response)
    })
  })
}

/** 全部学生高度保存 */
export const setErrorClassmateScroll = ({commit}, height) => {
  commit(types.ERROR_CLASSMATE_SCROLL, {height: height})
}

/** 清空错题详情 */
export const clearErrorClassmate = ({commit}) => {
  commit(types.ERROR_CLASSMATE_RELOAD)
}
