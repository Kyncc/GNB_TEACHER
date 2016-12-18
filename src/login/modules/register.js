import {
  GET_REGISTER_MESSAGE_SUCCESS,
} from '../mutationTypes'

const state = {
  mobile:'',
  code:''
}

const mutations = {
  [GET_REGISTER_MESSAGE_SUCCESS](state , data){
    state.mobile = data.data.mobile;
    state.code = data.data.code;
  }
}

export default {
  state,
  mutations
}