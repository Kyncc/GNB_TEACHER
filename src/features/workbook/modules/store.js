import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

const mutations = {
  [types.WORKBOOK] (state, payload) {
    state.workbook.subjectId = payload.subjectId
    state.workbook.list = payload.data
  },
  [types.WORKBOOK_CLEAR] (state) {
    state.workbook.list = []
    state.workbook.scroll = 0
    state.workbook.subjectId = 2
  },
  [types.WORKBOOK_SCROLL] (state, payload) {
    state.workbook.scroll = payload.height
  },
  [types.WORKBOOK_CHAPTER] (state, data) {
    state.chapter.list = data[0].a
    state.chapter.classList = data[0].classList
  },
  [types.WORKBOOK_CHAPTER_CLEAR] (state) {
    state.chapter.list = []
    state.chapter.classList = []
  },
  [types.WORKBOOK_CHAPTER_SCROLL] (state, payload) {
    state.chapter.scroll = payload.height
  },
  [types.WORKBOOK_EXERCISE] (state, payload) {
    state.exercise.classCode = payload.classCode
    state.exercise.list = payload.data
  },
  [types.WORKBOOK_EXERCISE_CLEAR] (state, data) {
    state.exercise.isReset = true
    state.exercise.list = []
    state.exercise.cameraList = []
  },
  [types.WORKBOOK_EXERCISE_PHOTO] (state, payload) {
    state.exercise.classCode = payload.classCode
    state.exercise.cameraList = payload.data
  },
  [types.WORKBOOK_EXERCISE_ERROR_PHOTO] (state, data) {
    state.exercise.errorList = data
  },
  [types.WORKBOOK_EXERCISE_ERROR_PHOTO_CLEAR] (state, data) {
    state.exercise.errorList = []
  },
  [types.WORKBOOK_EXERCISE_READ] (state) {
    state.exercise.list.isRead = true
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
