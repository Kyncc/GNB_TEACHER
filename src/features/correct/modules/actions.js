import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取纠错 */
export const getCorrect = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'correct/detail',
      params: {
        token: rootState.common.user.token,
        options: {
          exercisesId: rootState.route.params.id,
          grade: rootState.route.params.grade,
          subjectId: rootState.route.params.subjectId
        }
      }
    }).then((response) => {
      commit(types.CORRECT, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 纠错 */
export const postCorrect = ({ rootState, commit }, params) => {
  Vue.$vux.loading.show({ text: '请稍候' })
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'correct',
      data: {
        token: rootState.common.user.token,
        options: {
          exercisesId: rootState.route.params.id,
          grade: rootState.route.params.grade,
          subjectId: rootState.route.params.subjectId,
          ...params
        }
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      Vue.$vux.toast.show({ text: '纠错成功', type: 'text', time: 1000, position: 'bottom' })
      resolve(response)
    })
      .catch((error) => {
        Vue.$vux.loading.hide()
        reject(error)
      })
  })
}
