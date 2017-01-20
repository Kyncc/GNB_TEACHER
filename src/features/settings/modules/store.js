import * as types from './mutationTypes'
import * as getters from './getters'

const state = {
    adviceList:[],
    version:''
}

const mutations = {
    [types.VERSION](state, data) {
        state.version = data;
    },
    [types.ADVICE_LIST](state, data) {
        state.settings.adviceList = data;
    }
}

export default {
    state,
    getters,
    mutations
}
