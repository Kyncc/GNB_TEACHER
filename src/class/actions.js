import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

//获取班级列表
export const myClassList = ({dispatch}, params) => {
    Api.myClassList({
        data: params,
        ok: response => {
            dispatch(types.GET_CLASS_LIST, response.data.data)
        },
        wrong: response => {}
    })
}
//设置标题
export const setClassName = ({dispatch}, params) => {
    dispatch(types.SET_CLASS_NAME,params)
}

export const createClass = ({dispatch}, params, callback) => {
    Api.createClass({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {}
    })
}
export const myClassmateList = ({dispatch}, params) => {
    Api.myClassmateList({
        data: params,
        ok: response => {
            dispatch(types.GET_CLASS_MATE_LIST, response.data.data)
        },
        wrong: response => {}
    })
}
export const applyList = ({dispatch}, params) => {
    Api.applyList({
        data: params,
        ok: response => {
            dispatch(types.GET_APPLY_LIST, response.data.data)
        },
        wrong: response => {}
    })
}

export const replyApply = ({dispatch}, params, callback) => {
    Api.replyApply({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {}
    })
}
