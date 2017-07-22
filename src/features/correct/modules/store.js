import * as actions from './actions'
import * as types from './mutationTypes'

const state = {
  correct: []
}

const getters = {
  Correct: state => {
    return state.correct
  }
}

const mutations = {
  [types.CORRECT] (state, data) {
    state.correct = data
  }
}

export default {
  mutations,
  getters,
  actions,
  state
}
