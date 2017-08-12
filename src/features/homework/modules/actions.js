import * as types from './mutationTypes'
import axios from '@/components/axios/'
import Vue from 'vue'

/** 获取消息列表 */
export const getHomework = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'homework/list',
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
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'homework/put',
      data: {
        token: rootState.common.user.token,
        subjectId: state.subjectId,
        classCodes: params.classCodes,
        data: {
          img: params.img || [],
          content: params.content || ''
        }
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      resolve(response)
    }).catch((e) => {
      Vue.$vux.loading.hide()
      reject(e)
    })
  })
}

/** 作业语音布置 */
export const setHomeworkAudio = ({rootState, commit, state}, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    var task = plus.uploader.createUpload('https://www.guinaben.com/teacher/homework/putAudio', {method: 'POST'}, (response, status) => {
      if (status === 200) {
        Vue.$vux.loading.hide()
        resolve(response)
      } else {
        Vue.$vux.loading.hide()
        alert('Upload failed: ' + status)
        reject(status)
      }
    })
    task.addFile(params.audio, {key: 'audio'})
    task.addData('subjectId', state.subjectId.toString())
    task.addData('classCodes', params.classes.toString())
    task.addData('token', rootState.common.user.token)
    task.start()
  })
}

/** 布置作业 */
export const addHomeworkClass = ({ rootState, state, dispatch }, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'homework/classAdd',
      data: {
        token: rootState.common.user.token,
        homeworkId: rootState.route.params.id,
        classCodes: params.classCodes
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      resolve(response)
    }).catch((e) => {
      Vue.$vux.loading.hide()
      reject(e)
    })
  })
}

/** 作业高度保存 */
export const setHomeworkScroll = ({commit}, height) => {
  commit(types.HOMEWORK_SCROLL, height)
}

/** 清空作业 */
export const clearHomework = ({rootState, commit}) => {
  commit(types.HOMEWORK_RESET)
}

/** 拍照 */
export const setHomeworkImage = ({ commit }, data) => {
  commit(types.WORKBOOK_IMAGE_UPLOAD, data)
}

/** 拍照剪裁成功 */
export const addHomeworkImage = ({ commit }, data) => {
  commit(types.HOMEWORK_IMAGE_ADD, data)
}

/** 删除图片 */
export const delHomeworkImage = ({ commit }, index) => {
  commit(types.HOMEWORK_IMAGE_DEL, index)
}

/** 清空图片 */
export const resetHomeworkImage = ({ commit }) => {
  commit(types.WORKBOOK_IMAGE_RESET)
}
