import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 获取下载列表 */
export const getMyDownload = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/myDownload',
      params: {
        token: rootState.common.user.token,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清空下载列表 */
export const clearMyDownload = ({rootState, commit}) => {
  commit(types.MYDOWNLOAD_RESET)
}

/** 获取下载试题列表 */
export const getMyDownloadList = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/myDownload/list',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_PAPER, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 试卷高度保存 */
export const setMyDownloadPaperScroll = ({commit}, height) => {
  commit(types.MYDOWNLOAD_PAPER_SCROLL, height)
}

/** 清空试卷 */
export const clearMyDownloadPaper = ({rootState, commit}) => {
  commit(types.MYDOWNLOAD_PAPER_RESET)
}
