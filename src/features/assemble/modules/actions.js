import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取组卷高考列表 */
export const getAssembleGaokao = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect',
      params: {
        token: rootState.common.user.token,
        ...state.search
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_GAOKAO, response.data.data)
      resolve(response)
    })
  })
}
/** 组卷高考列表高度保存 */
export const setAssembleGaokaoScroll = ({rootState, commit}, height) => {
  commit(types.ASSEMBLE_GAOKAO_SCROLL, height)
}
/** 清空高考列表 */
export const clearAssembleGaokao = ({rootState, commit}) => {
  commit(types.ASSEMBLE_GAOKAO_CLEAR)
}

/** 获取组卷同步列表 */
export const getAssembleSync = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect',
      params: {
        token: rootState.common.user.token,
        ...state.search
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_SYNC, response.data.data)
      resolve(response)
    })
  })
}
/** 同步高度保存 */
export const setAssembleSyncScroll = ({rootState, commit}, height) => {
  commit(types.ASSEMBLE_SYNC_SCROLL, height)
}
/** 清空同步表 */
export const clearAssembleSync = ({rootState, commit}) => {
  commit(types.ASSEMBLE_SYNC_CLEAR)
}

/** 获取例题列表 */
export const getAssembleExample = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect',
      params: {
        token: rootState.common.user.token,
        ...state.search
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_EXAMPLE, response.data.data)
      resolve(response)
    })
  })
}
/** 组卷精选高度保存 */
export const setAssembleExampleScroll = ({rootState, commit}, height) => {
  commit(types.ASSEMBLE_EXAMPLE_SCROLL, height)
}
/** 清空精选列表 */
export const clearAssembleExample = ({rootState, commit}) => {
  commit(types.ASSEMBLE_EXAMPLE_CLEAR)
}

/** 获取精选列表 */
export const getAssembleChoice = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'collect',
      params: {
        token: rootState.common.user.token,
        ...state.search
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_CHOICE, response.data.data)
      resolve(response)
    })
  })
}
/** 组卷精选高度保存 */
export const setAssembleChoiceScroll = ({rootState, commit}, height) => {
  commit(types.ASSEMBLE_CHOICE_SCROLL, height)
}
/** 清空精选列表 */
export const clearAssembleChoice = ({rootState, commit}) => {
  commit(types.ASSEMBLE_CHOICE_CLEAR)
}
