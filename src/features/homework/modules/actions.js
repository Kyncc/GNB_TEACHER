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
        data: {
          audio: params.audio || '',
          img: params.img || '',
          content: params.content || ''
        }
      }
    }).then((response) => {
      dispatch('clearHomework')
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 布置作业 */
export const addHomeworkClass = ({ rootState, state, dispatch }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'homework/classAdd',
      data: {
        token: rootState.common.user.token,
        homeworkId: rootState.route.params.id,
        classes: params.classes
      }
    }).then((response) => {
      dispatch('clearHomework')
      resolve(response)
    }).catch((e) => {
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
  commit(types.HOMEWORK_RESET)
}
