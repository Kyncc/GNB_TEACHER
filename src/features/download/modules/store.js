import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  paper: {
    list: [],
    scroll: 0
  },
  downloadUrl: ''
}

const mutations = {
  [types.DOWNLOAD_PAPER] (state, data) {
    state.paper.list = data
  },
  [types.DOWNLOAD_URL] (state) {
    // state.downloadUrl = data
  },
  [types.DOWNLOAD_PAPER_UP] (state, payload) {
    let arr = state.paper.list.block[payload.pindex].list
    arr[payload.index] = arr.splice((payload.index - 1), 1, arr[payload.index])[0]
  },
  [types.DOWNLOAD_PAPER_DOWN] (state, payload) {
    let arr = state.paper.list.block[payload.pindex].list
    arr[payload.index] = arr.splice((payload.index + 1), 1, arr[payload.index])[0]
  },
  [types.DOWNLOAD_PAPER_DEL] (state, payload) {
    state.paper.list.block[payload.pindex].list.splice(payload.index, 1)
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
