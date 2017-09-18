import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  options: {
    editionId: '',
    subject: '',
    grade: '10'
  },
  download: [],
  paper: {
    list: [],
    offset: '',
    scroll: 0
  },
  list: {}
}

const mutations = {
  [types.PAPER] (state, data) {
    state.paper.list = state.paper.list ? state.paper.list.concat(data.list) : data.list
    state.paper.offset = data.offset
  },
  [types.PAPER_CLEAR] (state) {
    state.paper = { list: [], offset: '', scroll: 0 }
  },
  [types.PAPER_DOWNLOAD] (state, data) {
    state.download = data
  },
  [types.PAPER_DOWNLOAD_CLEAR] (state) {
    state.download = []
  },
  [types.PAPER_OPTIONS] (state, data) {
    state.options = {subject: data.subject, grade: data.grade, editionId: data.editionId}
    state.paper = { list: [], offset: '', scroll: 0 }
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
