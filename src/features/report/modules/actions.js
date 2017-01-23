import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/**获取章节数据 */
export const getReport = ({rootState,commit},params) => {
	return new Promise((resolve, reject)=> { 
		axios({
			method:'get',
			url: 'teacher/report',
			params: {
				"token":rootState.login.token,
				"subject_id":rootState.report.subjectId,
				"studentId":rootState.route.params.studentId
			}
		})
		.then((response) => {
			commit(types.REPORT_CHAPTER,response.data.data)
			resolve(response);
		})
	});
}

/**获取详细报表 */
export const getReportDetail = ({rootState,commit}, params) => {
	return new Promise((resolve, reject)=> { 
		axios({
			method:'get',
			url: 'teacher/report',
			params: {
					"token":rootState.login.token,
					"subject_id":rootState.report.subjectId,
					"chapter_id":rootState.route.params.chapterId,
					"studentId":rootState.route.params.studentId
			}
		})
		.then((response) => {
			commit(types.REPORT_CHAPTER,response.data.data)
			resolve(response);
		})
	});
}

/**索引对应手风琴的打开关闭 */
export const changeReportChapter = ({ commit },index) => {
		commit(types.CHAPTER_STATE_CHANGE,index);
}

/**浏览器高度 */
export const setReportScoll = ({ commit },height) => {
		commit(types.REPORT_SCOLLER_HEIGHT,height);
}

/**清除章节数据 */
export const clearReport = ({ commit }) => {
		commit(types.CLEAR_REPORT_CHAPTER);
}

/**更换科目 */
export const setReportSubject = ({ commit }, id) => {
		commit(types.REPORT_CHANGE_SUBJECT,id);
		commit(types.CLEAR_REPORT_CHAPTER); 
}

