import * as types from './mutationTypes'
import * as getters from './getters'

const state = {
    newCorretMsg:'',
    newSystemMsg:'',
    system:[],
    correct:[]
}

const mutations = {
  [MESSAGE_HOME](state , data){
    state.newCorretMsg = data.data.newCorretMsg;
    state.newSystemMsg = data.data.newSystemMsg;
  },
  [MESSAGE_SYSTEM](state , data){
    state.system = data.data;
  },
  [MESSAGE_CORRECT](state , data){
    state.correct = data.data;
  }
}

export default {
  state,
  mutations,
  getters,
}