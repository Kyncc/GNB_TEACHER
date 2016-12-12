import * as types from '../mutationTypes'

const state = {
    subjectId:'2',
    my:[],
    all:[],
    chapter:[],
    exercise:[],
    example:[]
}

const mutations = {
  [types.REMEMBER_WORKBOOK_GET](state, data) {
      state.my = data.data;
      state.chapter =  [];
  },
  [types.REMEMBER_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
      state.my = [];
      state.all = [];
      state.chapter = [];
  },
  [types.REMEMBER_CHAPTER_GET](state,data){
      state.chapter =  data.data;
  },
  [types.REMEMBER_CHAPTER_CLEAR](state,data){
      state.chapter =  [];
  },
  [types.REMEMBER_WORKBOOK_ALL](state,data){
      state.all =  data.data;
  },
  [types.REMEMBER_WORKBOOK_ALL_CLEAR](state){
      state.all = [];
  },
  [types.REMEMBER_EXERCISE](state,data){
      state.exercise = data.data;
  },
  [types.REMEMBER_EXERCISE_CLEAR](state){
      state.exercise = [];
  },
  [types.REMEMBER_EXAMPLE](state,data){
      state.example = data.data;
  },
  [types.REMEMBER_EXAMPLE_CLEAR](state){
      state.example = [];
  }
}

export default {
  state,
  mutations
}
