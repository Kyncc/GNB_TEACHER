import * as types from './mutationTypes'
import axios from '@/components/axios/'

/** 获取组卷下载列表 */
export const getMyDownloadAssemble = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/myDownload',
      params: {
        token: rootState.common.user.token,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, {data: response.data.data, type: 'assemble'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取组卷详情 */
export const getMyDownloadAssembleDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/myDownload/list',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_DETAIL, {data: response.data.data, type: 'assemble'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取拍错题下载列表 */
export const getMyDownloadCamera = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/camera',
      params: {
        token: rootState.common.user.token,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, {data: response.data.data, type: 'camera'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取拍错题详情 */
export const getMyDownloadCameraDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/camera/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_DETAIL, {data: response.data.data, type: 'camera'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取记错题下载列表 */
export const getMyDownloadRemember = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/remember',
      params: {
        token: rootState.common.user.token,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, {data: response.data.data, type: 'remember'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取记错题详情 */
export const getMyDownloadRememberDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/remember/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_DETAIL, {data: response.data.data, type: 'remember'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取精选题下载列表 */
export const getMyDownloadGood = ({ rootState, commit }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/good',
      params: {
        token: rootState.common.user.token,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, {data: response.data.data, type: 'good'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取试卷搜索列表 */
export const getMyDownloadPaperSearch = ({ rootState, commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'paper/search',
      params: {
        token: rootState.common.user.token,
        offset: state.paper.search.offset,
        ...params
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_PAPER_SEARCH, response.data.data)
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清空试卷下载列表 */
export const clearMyDownloadPaperSearch = ({commit}) => {
  commit(types.MYDOWNLOAD_SEARCH_RESET)
}

/** 试卷下载次数 */
export const getMyDownloadPaperSearchVaild = ({ rootState, state }, params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: 'paper/validDownload',
      data: {
        token: rootState.common.user.token,
        downloadId: params.downloadId
      }
    }).then((response) => {
      // commit(types.MYDOWNLOAD, {data: response.data.data, type: 'paper'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取试卷下载历史 */
export const getMyDownloadPaper = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'paper/myDownload',
      params: {
        token: rootState.common.user.token
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD, {data: response.data.data, type: 'paper'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 获取精选题详情 */
export const getMyDownloadGoodDetail = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'download/good/detail',
      params: {
        token: rootState.common.user.token,
        downloadId: rootState.route.params.id
      }
    }).then((response) => {
      commit(types.MYDOWNLOAD_DETAIL, {data: response.data.data, type: 'good'})
      resolve(response)
    }).catch((e) => {
      reject(e)
    })
  })
}

/** 清空下载列表 */
export const clearMyDownload = ({rootState, commit}, params) => {
  commit(types.MYDOWNLOAD_RESET, params)
}

/** 试卷高度保存 */
export const setMyDownloadDetailScroll = ({commit}, params) => {
  commit(types.MYDOWNLOAD_DETAIL_SCROLL, params)
}

/** 清空试卷 */
export const clearMyDownloadDetail = ({rootState, commit}, params) => {
  commit(types.MYDOWNLOAD_DETAIL_RESET, params)
}
