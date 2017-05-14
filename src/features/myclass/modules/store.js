import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  classmate: {}
}

const mutations = {
  [types.CLASS_MYCLASSMATE] (state, data) {
    state.classmate = data
  },
  [types.CLASS_MYCLASSMATE_CLEAR] (state, data) {
    state.classmate = []
  },
  [types.CLASS_MYCLASSMATE_DEL] (state, index) {
    state.classmate.classmates.splice(index, 1)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
