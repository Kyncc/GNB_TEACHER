import axios from '@/components/axios/'
import * as types from './mutationTypes'
import Vue from 'vue'

/** 获取练习册数据 */
export const getWorkbook = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook',
      params: {
        token: rootState.common.user.token,
        subjectId: params.subjectId
      }
    }).then((response) => {
      commit(types.WORKBOOK, {subjectId: params.subjectId, data: response.data.data})
      resolve(response)
    }).catch((err) => {
      reject(err)
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
        token: rootState.common.user.token,
        workbookId: rootState.route.params.workbookId
      }
    }).then((response) => {
      commit(types.WORKBOOK_CHAPTER, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
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
export const getWorkbookExerciseNum = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/chapter/detail/number',
      params: {
        token: rootState.common.user.token,
        classCode: params.classCode,
        chapterId: rootState.route.params.chapterId
      }
    }).then((response) => {
      commit(types.WORKBOOK_EXERCISE, {data: response.data.data, classCode: params.classCode})
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 获取练习数据--作业图片 */
export const getWorkbookExercisePhoto = ({state, rootState, commit}, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/chapter/detail/photo',
      params: {
        token: rootState.common.user.token,
        classCode: params.classCode,
        chapterId: rootState.route.params.chapterId
      }
    }).then((response) => {
      commit(types.WORKBOOK_EXERCISE_PHOTO, {data: response.data.data, classCode: params.classCode})
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 提交练习数据已阅 */
export const setWorkbookExerciseRead = ({state, rootState, commit}) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/chapter/isRead',
      data: {
        token: rootState.common.user.token,
        chapterId: rootState.route.params.chapterId,
        classCode: state.exercise.classCode
      }
    }).then((response) => {
      Vue.$vux.toast.show({text: '已阅成功', type: 'text', time: 1000, position: 'bottom'})
      commit(types.WORKBOOK_EXERCISE_READ)
      resolve(response)
    }).catch((err) => {
      reject(err)
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
      url: 'workbook/chapter/detail/error',
      params: {
        token: rootState.common.user.token,
        classCode: rootState.workbook.exercise.classCode,
        wbeid: rootState.route.params.wbeid,
        chapterId: rootState.route.params.chapterId
      }
    }).then((response) => {
      commit(types.WORKBOOK_EXERCISE_ERROR_PHOTO, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 练习错题详情照片清空 */
export const workbookExerciseErrorPhotoClear = ({commit}) => {
  commit(types.WORKBOOK_EXERCISE_ERROR_PHOTO_CLEAR)
}
