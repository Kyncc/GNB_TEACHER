import {
    GET_ERROR_INDEXIDS_SUCCESS,
    GET_ERROR_INDEXIDS_ERROR,
    GET_ERROR_INDEXLIST_SUCCESS,
    GET_ERROR_INDEXLIST_ERROR,

    GET_ERROR_LISTIDS_SUCCESS,
    GET_ERROR_LISTIDS_ERROR,
    GET_ERROR_LISTLIST_SUCCESS,
    GET_ERROR_LISTLIST_ERROR,

    SET_KNOWLEDGE_ID
}from '../mutationTypes'

const state = {
    knowledgeId:'',
    index:{
        code:'',
        ids:[],
        list:[],
        msg:'',
        totalPage:'1'
    },
    list:{
        code:'',
        ids:[],
        list:[],
        msg:''
    },
}


const mutations = {
    //错题本首页
    [GET_ERROR_INDEXIDS_SUCCESS](state,data){
        console.log(data.data)
        state.index.code = data.data.code;
        state.index.ids = data.data.ids;
        state.index.msg = data.msg;
        state.index.totalPage = data.data.totalPage;
    },
    [GET_ERROR_INDEXIDS_ERROR](state, data){
        state.index.msg = data.msg;
    },
    [GET_ERROR_INDEXLIST_SUCCESS](state , data){
        state.index.code = data.code;
        state.index.list = data.data;
        state.index.msg = data.msg;
    },
    [GET_ERROR_INDEXLIST_ERROR](state, data){
        state.index.msg = data.msg;
    },

    //错题列表
    [GET_ERROR_LISTIDS_SUCCESS](state , data){
        // debugger;
        state.list.code = data.code;
        state.list.ids = data.data.ids;
        state.list.msg = data.msg;
    },
    [GET_ERROR_LISTIDS_ERROR](state, data){
        state.list.msg = data.msg;
    },
    [GET_ERROR_LISTLIST_SUCCESS](state , data){
        state.list.code = data.code;
        state.list.list = data.data;
        state.list.msg = data.msg;
    },
    [GET_ERROR_LISTLIST_ERROR](state, data){
        state.list.msg = data.msg;
    },

    [SET_KNOWLEDGE_ID](state, data){
        state.knowledgeId = data
    }
}


export default {
    state,
    mutations
}
