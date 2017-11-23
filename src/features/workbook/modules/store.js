import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'

const mutations = {
  [types.WORKBOOK] (state, payload) {
    state.workbook.list = payload.data
  },
  [types.WORKBOOK_CLEAR] (state) {
    state.workbook.list = []
    state.workbook.scroll = 0
  },
  [types.WORKBOOK_SCROLL] (state, payload) {
    state.workbook.scroll = payload.height
  },
  [types.WORKBOOK_OPTIONS_TEXTBOOK] (state, data) {
    state.options.textbookList = data
  },
  [types.WORKBOOK_OPTIONS] (state, data) {
    state.options = {subject: data.subject, grade: data.grade, textbookId: data.textbookId, editionId: data.editionId, textbookList: state.options.textbookList}
  },
  [types.WORKBOOK_DISPLAY_UPDATE] (state, payload) {
    state.workbook.list[payload.pindex]['textbook']['list'][payload.index]['state'] = payload.data.state
  },
  [types.WORKBOOK_SET_OPTIONS] (state, data) {
    state.options = {subject: data.subject, grade: data.grade, textbookId: data.textbookId, editionId: data.editionId, textbookList: state.options.textbookList}
    state.workbook.list = []
    state.workbook.scroll = 0
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
    state.exercise.notPost = []
  },
  [types.WORKBOOK_EXERCISE_PHOTO] (state, payload) {
    state.exercise.classCode = payload.classCode
    state.exercise.notPost = payload.data.notPost
    state.exercise.cameraList = payload.data.list
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
