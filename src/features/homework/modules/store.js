import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  homework: {
    subjectId: 2,
    classes: []
  },
  scroll: 0,
  list: []
}

const mutations = {
  [types.HOMEWORK] (state, payload) {
    state.subjectId = payload.subjectId
    state.list = payload.data
  },
  [types.HOMEWORK_CLASS] (state) {
    state.homework.classes = state
  },
  [types.HOMEWORK_SCROLL] (state, data) {
    state.scroll = data
  },
  [types.HOMEWORK_RESET] (state, data) {
    state.homework = { subjectId: 2, classes: [] }
    state.scroll = 0
    state.list = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
