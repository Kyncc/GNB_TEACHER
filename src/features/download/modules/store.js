import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  paper: {
    list: [],
    scroll: 0
  },
  download: []
}

const mutations = {
  [types.DOWNLOAD] (state, data) {
    state.index = data
  },
  [types.DOWNLOAD_PAPER] (state, data) {
    state.paper.list = data
  },
  [types.DOWNLOAD_PAPER_UP] (state, index) {
    let up = state.paper.list.splice(index, 1)
    state.paper.list.splice(index - 1, 0, up)
  },
  [types.DOWNLOAD_PAPER_DOWN] (state, index) {
    let down = state.paper.list.splice(index, 1)
    state.paper.list.splice(index + 1, 0, down)
  },
  [types.DOWNLOAD_PAPER_DEL] (state, index) {
    state.paper.list.splice(index, 1)
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
