const state = {
  toastMsg:'',
  toastShow:false,
  isLoading:false,
  system:''
}

const actions = {
  toastMsg : ({ commit }, msg) => {
    commit('TOAST_MESSAGE',msg);
  },
  toastShow : ({ commit }, status) => {
    commit('TOAST_SHOW',status);
  },
  isLoading :({ commit }, status)=> {
    commit('LOADING',status);
  }
} 

const getters = {
  token: (state,getters,rootState) => {
    return rootState.token
  },
  path:(state,getters,rootState) => {
    return rootState.route.path
  },
  User:(state,getters,rootState) => {
    return rootState.user
  }
}

const mutations = {
  'TOAST_MESSAGE'(state, msg) {
    state.toastMsg = msg
  },
  'TOAST_SHOW'(state, status) {
    state.toastShow = status
  },
  'LOADING'(state, status) {
    state.isLoading = status
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}