import {GET_CLASS_LIST,GET_CLASS_MATE_LIST,GET_APPLY_LIST,SET_CLASS_NAME,SET_CLASS_CODE,SET_STUDENT_ID,CLASS_MYCLASS} from '../mutationTypes'

const state = {
    classList: [],
    classMateList: [],
    applyList: [],
    className:'',
    classCode:'',
    studentId:'',
    myClass:{
        classmate:[],
        name:'',
        code:'',
        grade:''
    }
}

const mutations = {
    [GET_CLASS_LIST](state, data) {
        state.classList = data
    },
    [GET_CLASS_MATE_LIST](state, data) {
        state.classMateList = data
    },
    [GET_APPLY_LIST](state, data) {
        state.applyList = data[0].students
    },
    [SET_CLASS_NAME](state, data) {
        state.className = data
    },
    [SET_CLASS_CODE](state, data) {
        state.classCode = data
    },
    [SET_STUDENT_ID](state, data) {
        state.studentId = data
    },
    [CLASS_MYCLASS](state, data) {
        state.myClass.classmate = data.classmates;
        state.myClass.name = data.classname;
        state.myClass.code = data.classCode;
        state.myClass.grade = data.grade;
    }

}

export default {
    state,
    mutations
}
