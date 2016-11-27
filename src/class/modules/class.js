import {GET_CLASS_LIST,GET_CLASS_MATE_LIST,GET_APPLY_LIST,SET_CLASS_NAME,SET_CLASS_CODE,SET_STUDENT_ID} from '../mutationTypes'

const state = {
    classList: [],
    classMateList: [],
    applyList: [],
    className:'',
    classCode:'',
    studentId:''
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
    }
}

export default {
    state,
    mutations
}
