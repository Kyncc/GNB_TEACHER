import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  subjectId: 2,
  scroll: 0,
  list: []
}

const mutations = {
  [types.DOWNLOAD_PAPER] (state, data) {
    state.paper.list = data
  },
  [types.DOWNLOAD_PAPER_RESET] (state) {
    state.paper.list = []
    state.paper.scroll = 0
  },
  [types.DOWNLOAD_PAPER_SCROLL] (state, data) {
    state.paper.scroll = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
