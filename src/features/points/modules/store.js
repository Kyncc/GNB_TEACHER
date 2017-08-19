import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  my: {
    points: 0
  },
  list: {
    offset: '',
    list: []
  },
  rask: []
}

const mutations = {
  [types.INVITE_RASK_RESET] (state) {
    state.rask = []
  },
  [types.INVITE_RASK] (state, data) {
    state.rask = data
  },
  [types.INVITE_LIST_RESET] (state) {
    state.list = []
  },
  [types.INVITE_LIST] (state, data) {
    state.list = data
  },
  [types.INVITE] (state, data) {
    state.my.points = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
