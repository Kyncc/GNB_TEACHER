import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 获取下载列表 */
export const getDownload = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'assemble/exist',
      data: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.DOWNLOAD, response.data.data.list)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取下载试题列表 */
export const getDownloadList = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/list',
      params: {
        token: rootState.common.user.token,
        downloadId: params.downloadId
      }
    }).then((response) => {
      commit(types.DOWNLOAD_PAPER, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 下载题目编辑 */
export const getDownloadUpdate = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/update',
      data: {
        token: rootState.common.user.token,
        downloadId: params.id,
        ids: params.ids
      }
    }).then((response) => {
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 下载题目编辑 */
export const getDownloadUrl = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/update',
      data: {
        token: rootState.common.user.token,
        downloadId: params.id
      }
    }).then((response) => {
      commit(types.DOWNLOAD_URL, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 题目上移 */
export const setMyDownloadPaperUp = ({commit}, index) => {
  commit(types.DOWNLOAD_PAPER_UP, index)
}
/** 题目下移 */
export const setMyDownloadPaperDown = ({commit}, index) => {
  commit(types.DOWNLOAD_PAPER_DOWN, index)
}

/** 题目删除 */
export const setMyDownloadPaperDel = ({commit}, index) => {
  commit(types.DOWNLOAD_PAPER_DEL, index)
}

/** 试卷高度保存 */
export const setMyDownloadPaperScroll = ({commit}, height) => {
  commit(types.DOWNLOAD_PAPER_SCROLL, height)
}

/** 清空试卷 */
export const clearMyDownloadPaper = ({rootState, commit}) => {
  commit(types.DOWNLOAD_PAPER_RESET)
}
