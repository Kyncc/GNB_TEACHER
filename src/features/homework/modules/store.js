import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  homework: {
    subjectId: 2,
    classes: []
  },
  uploader: {
    list: [],
    camera: ''
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
  },
  // 图片
  [types.HOMEWORK_IMAGE_DEL] (state, index) {
    state.uploader.list.splice(index, 1)
  },
  [types.HOMEWORK_IMAGE_ADD] (state, data) {
    state.uploader.list.push(data)
    state.uploader.camera = ''
  },
  [types.WORKBOOK_IMAGE_RESET] (state, data) {
    state.uploader.camera = data
  },
  [types.WORKBOOK_IMAGE_UPLOAD] (state, data) {
    state.uploader.camera = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
