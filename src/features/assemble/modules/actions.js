import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取组卷高考列表 */
export const getAssembleGaokao = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/gaokao',
      params: {
        token: rootState.common.user.token,
        options: {
          editionId: state.options.editionId,
          grade: state.options.grade,
          subjectId: state.options.subjectId
        }
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

/** 获取组卷同步列表 */
export const getAssembleSync = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/sync',
      params: {
        token: rootState.common.user.token,
        textbookId: state.options.textbookId
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

/** 获取例题列表 */
export const getAssembleExample = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/example',
      params: {
        token: rootState.common.user.token,
        offset: state.example.offset,
        options: {
          id: state.sync.options.textbookId,
          type: state.sync.options.textbookId
        }
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
      url: 'assemble/chioce',
      params: {
        token: rootState.common.user.token,
        offset: state.chioce.offset,
        options: {
          exerciseId: params.exerciseId,
          grade: state.options.grade,
          subjectId: state.options.subjectId
        }
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_CHOICE, response.data.data)
      resolve(response)
    })
  })
}

/** 设置组卷 */
export const setAssemble = ({rootState, commit, state}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'assemble/add',
      data: {
        token: rootState.common.user.token,
        options: {
          exerciseId: params.id,
          grade: state.options.grade,
          subjectId: state.options.subjectId
        }
      }
    })
    .then((response) => {
      commit(types.ASSEMBLE_INTO, {index: params.index, data: response.data.data})
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
