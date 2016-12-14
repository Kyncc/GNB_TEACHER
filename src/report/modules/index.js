import {
    GET_REPORT_DETAIL_SUCCESS,
    GET_REPORT_CHAPTER_SUCCESS,
    REPORT_CHANGE_SUBJECT,
    CHAPTER_STATE_CHANGE,
    REPORT_SCOLLER_HEIGHT,
    CLEAR_REPORT_CHAPTER,
    CLEAR_REPORT_DETAIL
} from '../mutationTypes'

const state = {
     chapter:[],
     detail:[],
     subjectId:'2',
     scoll:0
}

const mutations = {
  [GET_REPORT_CHAPTER_SUCCESS](state, data) {
      state.chapter = data.data;
  },
  [REPORT_CHANGE_SUBJECT](state,id){
      state.subjectId = id;
  },
  [CLEAR_REPORT_CHAPTER](state){
      state.chapter = [];
  },
  [REPORT_SCOLLER_HEIGHT](state,height){
      state.scoll = height;
  },
  [CLEAR_REPORT_DETAIL](state, data) {
      state.detail = [];
  },
  [GET_REPORT_DETAIL_SUCCESS](state, data) {
      state.detail = data.data;
  },
  [CHAPTER_STATE_CHANGE](state,index){
      state.chapter[index].checked = !state.chapter[index].checked
  }
}

export default {
  state,
  mutations
}
