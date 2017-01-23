import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取章节数据 */
export const getReport = ({ commit }, params, success,wrong) => {
  Api.report({
    data: params,
    ok: response => {
       commit(types.REPORT_CHAPTER, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**获取详细报表 */
export const getReportDetail = ({ commit }, params, success,wrong) => {
  Api.reportDetail({
    data: params,
    ok: response => {
       commit(types.REPORT_DETAIL, response.data);
       success&&success();
    },
    wrong: response => {
        _.toast(response.data.msg);
        wrong&&wrong();
    }
  })
}

/**索引对应手风琴的打开关闭 */
export const changeChapter = ({ commit },index) => {
    commit(types.CHAPTER_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setScoll = ({ commit },height) => {
    commit(types.REPORT_SCOLLER_HEIGHT,height);
}

/**清除章节数据 */
export const clearReport = ({ commit }) => {
    commit(types.CLEAR_REPORT_CHAPTER);
}

/**清除报告单数据 */
export const clearDetail = ({ commit }) => {
    commit(types.CLEAR_REPORT_DETAIL);
}

/**更换科目 */
export const setSubject = ({ commit }, id) => {
    commit(types.REPORT_CHANGE_SUBJECT,id);
    commit(types.CLEAR_REPORT_CHAPTER);
}

