import * as register from '../mutationTypes'

const state = {
  mobile:'',
  code:'',
  isTeacher:''
}

const mutations = {
  [register.REGISTER_MESSAGE](state , data){
    state.mobile = data.data.mobile;
    state.code = data.data.code;
    state.isStudent = data.data.isStudent;
  }
}

export default {
  state,
  mutations
}