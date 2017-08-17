import Vue from 'vue'
import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取组卷高考列表 */
export const getAssembleGaokao = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/gaokao',
      params: {
        token: rootState.common.user.token,
        options: {
          editionId: state.options.editionId,
          grade: state.options.grade,
          subjectId: state.options.subject
        }
      }
    }).then((response) => {
      commit(types.ASSEMBLE_GAOKAO, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 筛选选择 */
export const setAssembleOptions = ({ rootState, commit }, params) => {
  commit(types.ASSEMBLE_OPTIONS, params)
}

/** 获取筛选教材 */
export const getAssembleOptionsTextbook = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/textbook',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.ASSEMBLE_OPTIONS_TEXTBOOK, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 组卷高考列表高度保存 */
export const setAssembleGaokaoScroll = ({ rootState, commit }, height) => {
  commit(types.ASSEMBLE_GAOKAO_SCROLL, height)
}

/** 获取组卷同步列表 */
export const getAssembleSync = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/sync',
      params: {
        token: rootState.common.user.token,
        textbookId: state.options.textbook
      }
    }).then((response) => {
      commit(types.ASSEMBLE_SYNC, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
/** 同步高度保存 */
export const setAssembleSyncScroll = ({ rootState, commit }, height) => {
  commit(types.ASSEMBLE_SYNC_SCROLL, height)
}

/** 获取例题列表 */
export const getAssembleExample = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/example',
      params: {
        token: rootState.common.user.token,
        offset: state.example.offset,
        options: {
          id: rootState.route.params.id,
          type: rootState.route.params.type
        }
      }
    }).then((response) => {
      commit(types.ASSEMBLE_EXAMPLE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}
/** 组卷精选高度保存 */
export const setAssembleExampleScroll = ({ rootState, commit }, height) => {
  commit(types.ASSEMBLE_EXAMPLE_SCROLL, height)
}
/** 清空精选列表 */
export const clearAssembleExample = ({ rootState, commit }) => {
  commit(types.ASSEMBLE_EXAMPLE_CLEAR)
}

/** 获取精选列表 */
export const getAssembleChoice = ({ rootState, state, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/chioce',
      params: {
        token: rootState.common.user.token,
        offset: state.choice.offset,
        options: {
          exerciseId: rootState.route.params.id,
          grade: rootState.route.params.grade,
          subjectId: rootState.route.params.subjectId
        }
      }
    }).then((response) => {
      commit(types.ASSEMBLE_CHOICE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 设置组卷 */
export const setAssemble = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'assemble/add',
      data: {
        token: rootState.common.user.token,
        options: {
          exercisesId: params.id,
          grade: rootState.route.params.grade,
          subjectId: rootState.route.params.subjectId
        }
      }
    })
      .then((response) => {
        commit(types.ASSEMBLE_INTO, { index: params.index, data: response.data.data })
        if (localStorage.getItem('isAssemble')) {
          Vue.$vux.toast.show({ text: response.data.msg, type: 'text', time: 1000, position: 'bottom' })
        } else {
          localStorage.setItem('isAssemble', true)
          Vue.$vux.alert.show({
            title: '请到下载中心下载~',
            content: '(可以跨章节组卷)',
            dialogTransition: 'vux-fade'
          })
        }
        resolve(response)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

/** 组卷精选高度保存 */
export const setAssembleChoiceScroll = ({ rootState, commit }, height) => {
  commit(types.ASSEMBLE_CHOICE_SCROLL, height)
}
/** 清空精选列表 */
export const clearAssembleChoice = ({ rootState, commit }) => {
  commit(types.ASSEMBLE_CHOICE_CLEAR)
}
