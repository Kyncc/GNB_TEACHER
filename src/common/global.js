import {
  GET_TOAST_MESSAGE,
  GET_TOAST_SHOW,
  GET_LOADING,
  SET_SUBJECTYPE
} from './mutationTypes'

const state = {
    toastMsg:'',
    toastShow:false,
    isLoading:false,
    system:'',
    subjectType:['2']
}

const mutations = {
    GET_TOAST_MESSAGE (state, msg) {
      state.toastMsg = msg
    },
    GET_TOAST_SHOW (state, status) {
      state.toastShow = status
    },
    GET_LOADING (state, status) {
      state.isLoading = status
    },
    SET_SYSTEM (state, type) {
      state.system = type
    },
    SET_SUBJECTYPE(state, data) {
      state.subjectType = data;
    }
}

export default {
  state,
  mutations
}