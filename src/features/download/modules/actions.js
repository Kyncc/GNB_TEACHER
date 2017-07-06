import * as types from './mutationTypes'
import axios from '@/components/axios/'
import Vue from 'vue'

/** 获取下载试题列表 */
export const getDownloadList = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/list',
      params: {
        token: rootState.common.user.token,
        ...params
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
export const getDownloadUpdate = ({ rootState, state, commit }, params) => {
  let ids = []
  let array = state.paper.list.block
  for (let pindex = 0; pindex < array.length; pindex++) {
    for (let index = 0; index < array[pindex].list.length; index++) {
      ids.push(array[pindex]['list'][index].exercisesId)
    }
  }
  Vue.$vux.loading.show({text: '请稍候'})
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/update',
      data: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id,
        ids: ids
      }
    }).then((response) => {
      Vue.$vux.loading.hide()
      resolve(response)
    }).catch((e) => {
      Vue.$vux.loading.hide()
      reject(e)
    })
  })
}

/** 下载题目成功 */
export const getDownloadUrl = ({ rootState, state, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/download',
      data: {
        token: rootState.common.user.token,
        downloadId: state.paper.list.downloadId
      }
    }).then((response) => {
      commit(types.DOWNLOAD_URL)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 题目次数 */
export const getDownloadVaild = ({ rootState, state, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'download/validDownload',
      data: {
        token: rootState.common.user.token,
        downloadId: state.paper.list.downloadId
      }
    }).then((response) => {
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 题目上移 */
export const setMyDownloadPaperUp = ({state, commit}, params) => {
  if (params.index === 0) {
    Vue.$vux.toast.show({text: '不能再上移了', type: 'text', time: 1000, position: 'bottom'})
  } else {
    commit(types.DOWNLOAD_PAPER_UP, params)
  }
}

/** 题目下移 */
export const setMyDownloadPaperDown = ({state, commit}, params) => {
  if (params.index === (state.paper.list.block[params.pindex].list.length - 1)) {
    Vue.$vux.toast.show({text: '不能再下移了', type: 'text', time: 1000, position: 'bottom'})
  } else {
    commit(types.DOWNLOAD_PAPER_DOWN, params)
  }
}

/** 题目删除 */
export const setMyDownloadPaperDel = ({commit}, params) => {
  commit(types.DOWNLOAD_PAPER_DEL, params)
}

/** 试卷高度保存 */
export const setMyDownloadPaperScroll = ({commit}, height) => {
  commit(types.DOWNLOAD_PAPER_SCROLL, height)
}

/** 清空试卷 */
export const clearMyDownloadPaper = ({rootState, commit}) => {
  commit(types.DOWNLOAD_PAPER_RESET)
}
