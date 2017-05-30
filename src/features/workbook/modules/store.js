import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

let state = {
  workbook: {
    subjectId: 2,
    scroll: 0,
    list: []
  },
  chapter: {
    list: [],
    classList: [],
    scroll: 0
  },
  exercise: {
    list: [],
    classCode: '',
    isReset: false,
    errorList: [],
    cameraList: []
  }
}

const mutations = {
  [types.WORKBOOK] (state, payload) {
    state.workbook.subjectId = payload.subjectId
    state.workbook.list = payload.data
  },
  [types.WORKBOOK_SCROLL] (state, payload) {
    state.workbook.scroll = payload.height
  },
  [types.WORKBOOK_CHAPTER] (state, data) {
    state.chapter.list = data.list
    state.chapter.classList = data.classList
  },
  [types.WORKBOOK_CHAPTER_CLEAR] (state) {
    state.chapter.list = []
    state.chapter.classList = []
  },
  [types.WORKBOOK_CHAPTER_SCROLL] (state, payload) {
    state.chapter.scroll = payload.height
  },
  [types.WORKBOOK_EXERCISE] (state, data) {
    state.exercise.list = data
  },
  [types.WORKBOOK_EXERCISE_CLEAR] (state, data) {
    state.exercise.isReset = true
    state.exercise.list = []
    state.exercise.cameraList = []
  },
  [types.WORKBOOK_EXERCISE_PHOTO] (state, data) {
    state.exercise.cameraList = data
  },
  [types.WORKBOOK_EXERCISE_ERROR_PHOTO] (state, data) {
    state.exercise.errorList = data
  },
  [types.WORKBOOK_EXERCISE_ERROR_PHOTO_CLEAR] (state, data) {
    state.exercise.errorList = []
  },
  [types.WORKBOOK_EXERCISE_READ] (state) {
    state.exercise.list.isRead = true
  },
  [types.WORKBOOK_EXERCISE_CHANGECLASS] (state, data) {
    state.exercise.list.isRead = true
    state.exercise.classCode = data
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
