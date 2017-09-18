import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取组卷高考列表 */
export const getPaper = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'assemble/gaokao',
      params: {
        token: rootState.common.user.token,
        offset: state.paper.offset,
        options: {
          editionId: state.options.editionId,
          grade: state.options.grade,
          subjectId: state.options.subject
        }
      }
    }).then((response) => {
      commit(types.PAPER, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 筛选选择 */
export const setPaperOptions = ({ rootState, commit }, params) => {
  commit(types.PAPER_OPTIONS, params)
}

/** 获取筛选教材 */
export const getPaperOptionsTextbook = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/textbook',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.PAPER_OPTIONS_TEXTBOOK, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取试卷下载历史 */
export const getPaperDownload = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/textbook',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.PAPER_DOWNLOAD, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}
