import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取练习册数据 */
export const getWorkbook = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook',
      params: {
        'token': rootState.common.user.token,
        'subject_id': params.subjectId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK, {'subject': params.subjectId, 'data': response.data.data})
      resolve(response)
    })
  })
}

/** 练习册数据清空 */
export const workbookClear = ({commit}) => {
  commit(types.WORKBOOK_CLEAR)
}

/** 练习册高度设置 */
export const setWorkbookScroll = ({ rootState, commit }, height) => {
  commit(types.WORKBOOK_SCROLL, {height: height})
}

/** 获取练习册章节数据 */
export const getWorkbookChapter = ({state, rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/chapter',
      params: {
        'token': rootState.common.user.token,
        'workbookId': rootState.route.params.id
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CHAPTER, response.data.data)
      resolve(response)
    })
  })
}

/** 练习册章节数据清空 */
export const workbookChapterClear = ({commit}) => {
  commit(types.WORKBOOK_CHAPTER_CLEAR)
}

/** 练习册章节高度设置 */
export const setWorkbookChapterScroll = ({ rootState, commit }, height) => {
  commit(types.WORKBOOK_CHAPTER_SCROLL, {height: height})
}

/** 获取练习数据--人数统计 */
export const getWorkbookExerciseNum = ({state, rootState, commit}, id) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/charpter/detail/number',
      params: {
        'token': rootState.common.user.token,
        'code': rootState.workbook.exercise.classCode,
        'chapterId': rootState.route.params.id
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_EXERCISE, response.data.data)
      resolve(response)
    })
  })
}

/** 获取练习数据--作业图片 */
export const getWorkbookExercisePhoto = ({state, rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/charpter/detail/photo',
      params: {
        'token': rootState.common.user.token,
        'code': rootState.workbook.exercise.classCode,
        'chapterId': rootState.route.params.id
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_EXERCISE_PHOTO, response.data.data)
      resolve(response)
    })
  })
}

/** 提交练习数据已阅 */
export const setWorkbookExerciseRead = ({state, rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/charpter/isRead',
      data: {
        'token': rootState.common.user.token,
        'chapterId': rootState.route.params.id
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_EXERCISE_READ)
      resolve(response)
    })
  })
}

/** 练习数据清空 */
export const workbookExerciseClear = ({commit}) => {
  commit(types.WORKBOOK_EXERCISE_CLEAR)
}

/** 获取练习错题详情照片 */
export const getWorkbookExerciseErrorPhoto = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/charpter/detail/error',
      params: {
        'token': rootState.common.user.token,
        'code': rootState.workbook.exercise.classCode,
        'wbeid': params.wbeid,
        'chapterId': rootState.route.params.id
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_EXERCISE_ERROR_PHOTO, response.data.data)
      resolve(response)
    })
  })
}

/** 练习错题详情照片清空 */
export const workbookExerciseErrorPhotoClear = ({commit}) => {
  commit(types.WORKBOOK_EXERCISE_ERROR_PHOTO_CLEAR)
}
