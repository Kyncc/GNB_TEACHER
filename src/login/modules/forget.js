import * as types from '../mutationTypes'

const state = {
  code:'',
  mobile:''
}

const mutations = {
  [types.FORGET_MESSAGE](state , data){
    state.code = data.data.code;
    state.mobile = data.data.mobile;
  }
}

export default {
  state,
  mutations
}