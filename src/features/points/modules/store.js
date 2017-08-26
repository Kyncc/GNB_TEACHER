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
  [types.POINTS_RASK_RESET] (state) {
    state.rask = []
  },
  [types.POINTS_RASK] (state, data) {
    state.rask = data
  },
  [types.POINTS_LIST_RESET] (state) {
    state.list.list = []
    state.list.offset = ''
  },
  [types.POINTS_LIST] (state, data) {
    state.list.list = state.list.list ? state.list.list.concat(data.list) : data.list
    state.list.offset = data.offset
  },
  [types.POINTS] (state, data) {
    state.my.points = data.points
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
