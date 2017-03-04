import * as types from './mutationTypes'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  subjectId:'2',
  workbook:{             //习题册列表
    list:[],
    textbook:[],  
    isReset:false 
  },         
  page:{                //习题册页码
    list:[],
    scroll:0,
    isReset:false 
  },           
  chapter:{            //习题册章节
    list:[],
    scroll:0,
    isReset:false 
  },   
  exercise:{            //练习
    list:[],
    isReset:false 
  }
}

const mutations = {
  //习题册
  [types.WORKBOOK_CLASS_SUBJECT_CHANGE](state,id){
      state.subjectId = id
  },
  [types.WORKBOOK_CLASS](state, data) {
      state.workbook.list = data
      state.workbook.isReset =  false
  },
  [types.WORKBOOK_CLASS_TEXTBOOK](state, data) {
      state.workbook.textbook = data.textbook
  },
  [types.WORKBOOK_CLASS_CLEAR](state){
     state.workbook.list = []
     state.workbook.isReset =  true
  },
  //按章节
  [types.WORKBOOK_CLASS_CHAPTER](state,data){
      state.chapter.list =  data
      state.chapter.isReset =  true
  },
  [types.WORKBOOK_CLASS_CHAPTER_CLEAR](state){
      state.chapter.list =  []
      state.chapter.isReset =  true
      state.chapter.scroll =  0
  }, 
  [types.WORKBOOK_CLASS_CHAPTER_SCROLL](state, height){
     state.chapter.scroll = height
  },
  
  //按页码
  [types.WORKBOOK_CLASS_PAGE](state,data){
      state.page.list =  data
      state.page.isReset =  false
  },
  [types.WORKBOOK_CLASS_PAGE_CLEAR](state){
      state.page.scroll = 0
      state.page.list =  []
      state.page.isReset =  true
  }, 
  [types.WORKBOOK_CLASS_PAGE_SCROLL](state, height){
     state.page.scroll = height
  },
  
  //练习
  [types.WORKBOOK_CLASS_EXERCISE](state,data){
      state.exercise.list = data
      state.exercise.isReset =  false
  },
  [types.WORKBOOK_CLASS_EXERCISE_CLEAR](state){
      state.exercise.list = []
      state.exercise.isReset = true    
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}
