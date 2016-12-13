import  * as types from '../mutationTypes'

const state = {
    student:{
      ids:[],
      list:[],
      currentPage:1,
      totalPage:1,
      scoll:0,
      selected:0,
      subjectId:'2'
    }
}


const mutations = {
   //错题本首页
  [types.GET_ERROR_INDEXIDS](state,data){
    state.student.ids = data.data.ids;
    state.student.totalPage = data.data.totalPage;
  },
  [types.GET_ERROR_INDEXLIST](state , data){
    state.student.list = state.student.list.concat(data.data);
    state.student.currentPage++;
  },
  [types.ERROR_STUD_RELOAD](state){
    state.student.ids = [];
    state.student.list = [];
    state.student.scoll = 0;
    state.student.selected = 0;
    state.student.currentPage = 1;
    state.student.totalPage = 1;
  },
  [types.ERROR_STUD_SUBJECT_CHANGE](state, id){
     state.student.subjectId = id;
  },
  [types.ERROR_STUD_TAB_CHANGE](state, type){
     state.student.selected = type;
  },
  [types.ERROR_STUD_SCOLL](state, height){
     state.student.scoll = height;
  },
  
}

export default {
  state,
  mutations
}
