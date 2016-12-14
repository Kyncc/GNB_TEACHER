import * as types from '../mutationTypes'


const state = {
     index:{
        list:[],
        scoll:0
     },
     list:{
         list:[],
         count:0,
         chapterName:'',
         scoll:0,
         offset:''
     },
     subjectId:'2'
}

const mutations = {
  //刷题型章节
  [types.PASS_ALL](state, data) {
      state.index.list = data.data;
  },
  [types.PASS_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  [types.PASS_CLEAR](state){
      state.index.list = [];
      state.index.scoll = 0;
  },
  [types.PASS_SCOLLER](state,height){
      state.index.scoll = height;
  },
  [types.PASS_STATE_CHANGE](state,index){
      state.index.list[index].checked = !state.index.list[index].checked
  },
  //刷题型列表
  [types.PASS_LIST](state,data){
    if(data.data.length == 0){return;}
    state.list.chapterName = data.data.chapterName;
    state.list.count = data.data.recordSize;
    state.list.offset = data.data.offset;
    state.list.list = state.list.list.concat(data.data.detail);
  },
  [types.PASS_LIST_CLEAR](state){
    state.list.list = [];
    state.list.count=0;
    state.list.chapterName='',
    state.list.scoll=0;
    state.list.offset = '';
  },
  [types.PASS_LIST_SCOLLER](state,height){
      state.list.scoll = height;
  }
}

export default {
  state,
  mutations
}
