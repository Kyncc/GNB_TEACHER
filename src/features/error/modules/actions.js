import axios from '@/components/axios/'
import * as types from './mutationTypes'
import Vue from 'vue'

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
    }).then((response) => {
      commit(types.ERROR, {subjectId: params.subjectId, data: response.data.data})
      resolve(response)
    }).catch((err) => {
      reject(err)
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
    }).then((response) => {
      commit(types.ERROR_ERROR_TYPE, {index: params.index, type: params.type})
      resolve(response)
    }).catch((err) => {
      reject(err)
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
    }).then((response) => {
      commit(types.ERROR_CLASSMATE, {data: response.data.data})
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 获取评价 */
export const getErrorComment = ({rootState, commit, state}, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'error/getComment',
      params: {
        token: rootState.common.user.token,
        studentId: rootState.route.params.studentId,
        wbeid: rootState.route.params.wbeid,
        chapterId: rootState.route.params.chapterId
      }
    }).then((response) => {
      commit(types.ERROR_COMMENT, {data: response.data.data})
      Vue.$vux.loading.hide()
      resolve(response)
    }).catch((err) => {
      Vue.$vux.loading.hide()
      reject(err)
    })
  })
}

/** 评价错题 */
export const setErrorComment = ({rootState, commit, state}, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    var task = plus.uploader.createUpload('https://www.guinaben.com/teacher/error/comment', {method: 'POST'}, (response, status) => {
      // 上传完成
      if (status === 200) {
        Vue.$vux.loading.hide()
        commit(types.ERROR_COMMENT_POST, {index: rootState.route.query.index})
        resolve(response)
      } else {
        Vue.$vux.loading.hide()
        alert('Upload failed: ' + status)
        reject(status)
      }
    })
    // var path = plus.io.convertLocalFileSystemURL(params.audio)
    task.addFile(params.audio, {key: 'audio'})
    task.addData('studentId', rootState.route.params.studentId)
    task.addData('wbeid', rootState.route.params.wbeid + '')
    task.addData('token', rootState.common.user.token)
    task.addData('content', params.content)
    task.addData('chapterId', rootState.route.params.chapterId)
    task.start()
  })
}

/** 清空错题评价 */
export const clearErrorComment = ({commit}) => {
  commit(types.ERROR_COMMENT_RESET)
}

/** 全部学生高度保存 */
export const setErrorClassmateScroll = ({commit}, height) => {
  commit(types.ERROR_CLASSMATE_SCROLL, {height: height})
}

/** 清空错题详情 */
export const clearErrorClassmate = ({commit}) => {
  commit(types.ERROR_CLASSMATE_RELOAD)
}
