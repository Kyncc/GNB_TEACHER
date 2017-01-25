import * as types from './mutationTypes'
import * as actions from './actions'
import * as gettes from './gettes'

const state = {
  subjectId:'2',
  workbook:{             //练习册列表
    list:[],
    isReset:false 
  },         
  page:{                //练习册页码
    list:[],
    scoll:0,
    isReset:false 
  },           
  chapter:{            //练习册章节
    list:[],
    scoll:0,
    isReset:false 
  },   
  exercise:{            //练习
    list:[],
    isReset:false 
  }
}

const mutations = {
  //练习册
  [types.REMEMBER_CLASS_SUBJECT_CHANGE](state,id){
      state.subjectId = id;
  },
  [types.REMEMBER_CLASS](state, data) {
      state.workbook.list = data;
      state.isReset =  false;
  },
  [types.REMEMBER_CLASS_CLEAR](state){
     state.workbook.list = [];
     state.isReset =  true;
  },

  //按章节
  [types.REMEMBER_CLASS_CHAPTER](state,data){
      state.chapter.list =  data;
      state.chapter.isReset =  true;
  },
  [types.REMEMBER_CLASS_CHAPTER_CLEAR](state,data){
      state.chapter.list =  data.data;
      state.chapter.isReset =  true;
      state.chapter.scoll =  0;
  }, 
  [types.REMEMBER_CLASS_CHAPTER_SCROLL](state, height){
     state.chapter.scoll = height;
  },
  
  //按页码
  [types.REMEMBER_CLASS_PAGE](state,data){
      state.page.list =  data;
      state.page.isReset =  false;
  },
  [types.REMEMBER_CLASS_PAGE_CLEAR](state,data){
      state.page.scroll = 0;
      state.page.list =  [];
      state.page.isReset =  true;
  }, 
  [types.REMEMBER_CLASS_PAGE_SCROLL](state, height){
     state.page.scroll = height;
  },
  
  //练习
  [types.REMEMBER_CLASS_EXERCISE](state,data){
      state.exercise.list = data;
      state.exercise.isReset =  false;
  },
  [types.REMEMBER_CLASS_EXERCISE_CLEAR](state){
      state.exercise.list = [];
      state.exercise.isReset = true;    
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
