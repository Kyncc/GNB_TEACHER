import * as types from '../mutationTypes'

const state = {
    classList: [],
    applyList: [],
    class:{
        classmate:[],
        name:'',
        code:'',
        grade:0
    }
}

const mutations = {
    [types.GET_CLASS_LIST](state, data) {
        state.classList = data
    },
    [types.GET_CLASS_MATE_LIST](state, data) {
        state.classMateList = data
    },
    [types.GET_APPLY_LIST](state, data) {
        state.applyList = data[0].students
    },
    [types.SET_CLASS_NAME](state, data) {
        state.className = data
    },
    [types.SET_CLASS_CODE](state, data) {
        state.classCode = data
    },
    [types.SET_STUDENT_ID](state, data) {
        state.studentId = data
    },
    [types.CLASS_MYCLASS](state, data) {
        state.class.classmate = data.classmates;
        state.class.name = data.classname;
        state.class.code = data.classCode;
        state.class.grade = data.grade;
    },
    [types.CLASS_CLEAR](state, data){
        state.classList = [];
    },
    [types.CLASS_MYCLASS_CLEAR](state, data){
        state.class.classmate = [];
        state.class.name = '';
        state.class.code = '';
        state.class.grade = 0;
    }

}

export default {
    state,
    mutations
}
