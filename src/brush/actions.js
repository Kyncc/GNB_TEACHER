import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

export const getErrorIds = ({ dispatch }, params, success) => {
    Api.error({
        data: params,
        ok: response => {
            dispatch(types.GET_ERROR_INDEXIDS_SUCCESS, response.data)
            success&&success()
        },
        wrong: response => {
            dispatch(types.GET_ERROR_INDEXIDS_ERROR, response.data)
            _.toast(response.data.msg)
        }
    })
}

export const getErrorList = ({ dispatch }, params, success) => {
    Api.exerciseList({
        data: params,
        ok: response => {
            dispatch(types.GET_ERROR_INDEXLIST_SUCCESS, response.data)
            success&&success(response.data)
        },
        wrong: response => {
            dispatch(types.GET_ERROR_INDEXLIST_ERROR, response.data)
            _.toast(response.data.msg)
        }
    })
}

export const clearList = ({dispatch})=>{
    dispatch(types.CLEAR_LIST)
}

export const setCurrentPage = ({dispatch},data)=>{
    dispatch(types.SET_CURRENTPAGE,data)
}


export const getErrorListIds = ({ dispatch }, params, success,wrong) => {
    Api.errorList({
        data: params,
        ok: response => {
            dispatch(types.GET_ERROR_LISTIDS_SUCCESS, response.data)
            success&&success()
        },
        wrong: response => {
            dispatch(types.GET_ERROR_LISTIDS_ERROR, response.data)
            wrong&&wrong()
            _.toast(response.data.msg)
        }
    })
}


export const getErrorListList = ({ dispatch }, params, success,wrong) => {
    Api.cameraList({
        data: params,
        ok: response => {
            dispatch(types.GET_ERROR_LISTLIST_SUCCESS, response.data)
            success&&success()
        },
        wrong: response => {
            dispatch(types.GET_ERROR_LISTLIST_ERROR, response.data)
            _.toast(response.data.msg)
        }
    })
}


export const setKnowledgeId = ({ dispatch }, params) => {
    dispatch(types.SET_KNOWLEDGE_ID, params)
}


export const getSummary = ({ dispatch }, params, success, wrong) => {
    Api.summary({
        data: params,
        ok: response => {
            console.log(response)
            dispatch(types.SET_SUMMARY, response)
            success&&success()
        },
        wrong: response => {
            wrong&&wrong()
            _.toast(response.data.msg)
        }
    })
}
