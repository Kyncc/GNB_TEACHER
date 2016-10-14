import {GET_CLASS_LIST,GET_CLASS_MATE_LIST,GET_APPLY_LIST,SET_CLASS_NAME} from '../mutationTypes'

const state = {
    classList: [],
    classMateList: [],
    applyList: [],
    className:''
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
    }
}

export default {
    state,
    mutations
}
