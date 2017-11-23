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
        options: {
          editionId: params.editionId,
          grade: params.grade,
          subject: params.subject,
          textbookId: params.textbookId
        }
      }
    }).then((response) => {
      commit(types.WORKBOOK, {data: response.data.data})
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

/** 筛选选择 */
export const getWorkbookOptions = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'workbook/options',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.WORKBOOK_OPTIONS, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 筛选选择 */
export const setWorkbookOptions = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'workbook/addOptions',
      params: {
        options: {
          editionId: params.editionId,
          grade: params.grade,
          subject: params.subject,
          textbookId: params.textbookId
        },
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.WORKBOOK_SET_OPTIONS, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取筛选教材 */
export const getWorkbookOptionsTextbook = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/textbook',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.WORKBOOK_OPTIONS_TEXTBOOK, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 提交练习侧隐藏显示 */
export const setWorkbookUpdate = ({state, rootState, commit}, params) => {
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'teacher/workbook/update',
      data: {
        token: rootState.common.user.token,
        workbookId: params.workbookId
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      Vue.$vux.toast.show({text: '更新成功', type: 'text', time: 1000, position: 'bottom'})
      commit(types.WORKBOOK_DISPLAY_UPDATE, {pindex: params.pindex, index: params.index, data: response.data.data})
      resolve(response)
    }).catch((err) => {
      Vue.$vux.loading.hide()
      reject(err)
    })
  })
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
