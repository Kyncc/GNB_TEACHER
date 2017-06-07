import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  isInvite: false,
  code: '',
  list: []
}

const mutations = {
  [types.INVITE_LIST] (state, data) {
    state.list = data
  },
  [types.INVITE] (state, data) {
    state.isInvite = data.isInvite
    state.code = data.code
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
