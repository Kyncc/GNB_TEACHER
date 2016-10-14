import {GET_CLASS_LIST, GET_CLASS_MATE_LIST,GET_APPLY_LIST} from '../mutationTypes'

const state = {
  classList: [],
  classMateList: [],
  applyList: []
}

const mutations = {
  [GET_CLASS_LIST](state, data) {
    state.classList = data
  },
  [GET_CLASS_MATE_LIST](state, data) {
    state.classMateList = data
  },
  [GET_APPLY_LIST](state, data) {
    state.applyList = data[0].students
  }
}

export default {
  state,
  mutations
}
