import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取习题册数据 */
export const getWorkbookClass = ({state,rootState,commit},params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/class',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "subjectId":state.subjectId,
        "textbookId":params.textbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS,response.data.data)
      resolve(response)
    })
  })
}

/**获取课本数据 */
export const getTextbookClass = ({rootState,commit},params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'class/textbook',
      params: {
        "token":rootState.login.token,
        "classCode":params.code
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_TEXTBOOK,response.data.data)
      resolve(response)
    })
  })
}
/**习题册数据清空 */
export const workbookClassClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_CLEAR)
}
/**切换科目 */
export const workbookSetSubject = ({ commit },id) => {
  commit(types.WORKBOOK_CLASS_SUBJECT_CHANGE,id)
  commit(types.WORKBOOK_CLASS_CLEAR)
}

/**获取习题册章节数据 */
export const getWorkbookClassChapter = ({rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/class/chapter',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "workbookId":rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_CHAPTER,response.data.data)
      resolve(response)
    })
  })
}
/**章节数据清空 */
export const workbookClassChapterClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_CHAPTER_CLEAR)
}
/**章节高度设置 */
export const setWorkbookClassChapterScroll = ({ commit },height) => {
  commit(types.WORKBOOK_CLASS_CHAPTER_SCROLL,height)
}

/**获取习题册章节练习题数据 */
export const getWorkbookClassExercise = ({rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/class/exercise',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "chapterId":rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_EXERCISE,response.data.data)
      resolve(response)
    })
  })
}

/**获取习题册章节练习照片 */
export const getWorkbookClassExerciseAnswer = ({rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'workbook/class/camera',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "chapterId":rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_EXERCISE_ANSWER,response.data.data)
      resolve(response)
    })
  })
}

/**习题册章节已阅 */
export const postWorkbookClassRead = ({rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'workbook/class/chapter/read',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "chapterId":rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_EXERCISE_READ,rootState.route.params.chapterId)
      _.toast('已阅成功')
      resolve(response)
    })
  })
}

/** 练习数据清空 */
export const workbookClassExerciseClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_EXERCISE_CLEAR)
}





