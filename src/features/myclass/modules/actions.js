import axios from '@/components/axios/'
import Vue from 'vue'
import * as types from './mutationTypes'

/** 获取班级同学列表 */
export const getMyClassmateList = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'class/classmate',
      params: {
        classCode: rootState.route.params.code,
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.CLASS_MYCLASSMATE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 删除班级 */
export const delClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/del',
      data: {
        classCode: rootState.route.params.code,
        token: rootState.common.user.token
      }
    }).then((response) => {
      Vue.$vux.toast.show({ text: '删除成功', type: 'text', time: 600, position: 'bottom' })
      resolve(response)
    })
  })
}

/** 删除同学 */
export const delClassmate = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/classmate/del',
      data: {
        studentId: params.id,
        classCode: rootState.route.params.code,
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.CLASS_MYCLASSMATE_DEL, params.index)
      Vue.$vux.toast.show({ text: '删除成功', type: 'text', time: 600, position: 'bottom' })
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 清空班级同学列表 */
export const myClassmateClear = ({ commit }) => {
  commit(types.CLASS_MYCLASSMATE_CLEAR)
}

/** 加入班级 */
export const postMyClassInto = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/add',
      data: {
        name: params.name,
        token: rootState.common.user.token
      }
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 编辑班级名称 */
export const updateClass = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'class/update',
      data: {
        name: params.name,
        classCode: rootState.route.params.code,
        token: rootState.common.user.token
      }
    }).then((response) => {
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
