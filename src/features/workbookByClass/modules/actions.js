import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'


/**获取练习册数据 */
export const getWorkbookClass = ({state,rootState,commit},params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/workbook/class',
      params: {
        "token":rootState.login.token,
        "classCode":params.code,
        "subjectId":state.subjectId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS,response.data.data)
      resolve(response);
    })
  });
}
/**练习册数据清空 */
export const workbookClassClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_CLEAR);
}
/**切换科目 */
export const workbookSetSubject = ({ commit },id) => {
  commit(types.WORKBOOK_CLASS_SUBJECT_CHANGE,id);
  commit(types.WORKBOOK_CLASS_CLEAR);
}


/**获取练习册数据 */
export const getWorkbookClassPage = ({state,rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/workbook/class/page',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "workbookId":rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_PAGE,response.data.data)
      resolve(response);
    })
  });
}
/**页码数据清空 */
export const workbookClassPageClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_PAGE_CLEAR);
}
/**页码高度设置 */
export const workbookClassPageScoll = ({ commit },height) => {
  commit(types.WORKBOOK_CLASS_PAGE_SCROLL,height);
}


/**获取练习册章节数据 */
export const getWorkbookClassChapter = ({state,rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/workbook/class/chapter',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "workbookId":rootState.route.params.workbookId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_CHAPTER,response.data.data)
      resolve(response);
    })
  });
}
/**章节数据清空 */
export const workbookClassChapterClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_CHAPTER_CLEAR);
}
/**章节高度设置 */
export const setWorkbookClassChapterScoll = ({ commit },height) => {
  commit(types.WORKBOOK_CLASS_CHAPTER_SCROLL,height);
}


/**获取练习册章节数据 */
export const getWorkbookClassExercise = ({state,rootState,commit}) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/workbook/class/exercise',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code,
        "chapterId":rootState.route.params.chapterId
      }
    })
    .then((response) => {
      commit(types.WORKBOOK_CLASS_EXERCISE,response.data.data)
      resolve(response);
    })
  });
}
/** 练习数据清空 */
export const workbookClassExerciseClear = ({ commit }) => {
  commit(types.WORKBOOK_CLASS_EXERCISE_CLEAR);
}


