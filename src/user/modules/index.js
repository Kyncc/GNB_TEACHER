import * as types from '../mutationTypes'

const state = {
    userinfo:{
        name: '',
        school: '',
        sex: ''
    },
    settings:{
        adviceList:[],
        version:''
    }
}

const mutations = {
    [types.USERINFO_GET](state, data) {
        state.userinfo = data;
    },
    [types.GET_VERSION](state, data) {
        state.version = data;
    },
    [types.GET_ADVICE_LIST](state, data) {
        state.settings.adviceList = data;
    }
}

export default {
    state,
    mutations
}
