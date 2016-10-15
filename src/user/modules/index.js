import {
    GET_ADVICE_LIST,
    GET_INVITE_STUDENT_LIST,
    GET_INVITE_CODE,
    GET_USER_INFO,
    GET_NUMERICAL_LIST,
    GET_BILL_LIST,
    GET_MEMBER_INFO,
    GET_VERSION
} from '../mutationTypes'

const state = {
    adviceList: [],
    inviteStudentList: [],
    inviteCode: '',
    info:{
        grade: '',
        name: '',
        school: '',
        subject: '',
        sex: '',
    },
    numericalList: [],
    myBillList: [],
    memberInfo: {},
    version: {}
}

const mutations = {
    [GET_ADVICE_LIST](state, data) {
        state.adviceList = data
    },
    [GET_INVITE_STUDENT_LIST](state, data) {
        state.inviteStudentList = data
    },
    [GET_INVITE_CODE](state, data) {
        state.inviteCode = data
    },
    [GET_USER_INFO](state, data) {
        state.info.grade = data.grade
        state.info.name = data.name
        state.info.school = data.school
        state.info.subject = data.subject
        state.info.sex = data.sex
    },
    [GET_NUMERICAL_LIST](state, data) {
        state.numericalList = data
    },
    [GET_BILL_LIST](state, data) {
        state.myBillList = data
    },
    [GET_MEMBER_INFO](state, data) {
        state.memberInfo = data
    },
    [GET_VERSION](state, data) {
        state.version = data
    }
}

export default {
    state,
    mutations
}
