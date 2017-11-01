import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  assemble: {
    list: [],
    detail: [],
    scroll: 0
  },
  camera: {
    list: [],
    detail: [],
    scroll: 0
  },
  good: {
    list: [],
    detail: [],
    scroll: 0
  },
  remember: {
    list: [],
    detail: [],
    scroll: 0
  }
}

const mutations = {
  [types.MYDOWNLOAD] (state, payload) {
    state[payload.type]['list'] = payload.data
  },
  [types.MYDOWNLOAD_RESET] (state, payload) {
    state[payload.type]['list'] = []
  },
  [types.MYDOWNLOAD_DETAIL] (state, payload) {
    state[payload.type]['detail'] = payload.data
  },
  [types.MYDOWNLOAD_DETAIL_SCROLL] (state, payload) {
    state[payload.type]['scroll'] = payload.scroll
  },
  [types.MYDOWNLOAD_DETAIL_RESET] (state, payload) {
    state[payload.type]['detail'] = []
    state[payload.type]['scroll'] = 0
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
