import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  class:[],
  headImg:'',
  name:'',
  school:'',
  sex:'', 
  subjectId:'',
  mobile:'',
  subjectType:[]
}

const mutations = {
  [types.USERINFO](state , data){
    state.class = data.data.classes;
    state.headImg = data.data.headImg;
    state.name = data.data.name;
    state.mobile = data.data.mobile;
    state.school = data.data.school;
    state.sex = data.data.sex;
    state.subjectId = data.data.subjectId;
    state.subjectType = data.data.subjectType;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}