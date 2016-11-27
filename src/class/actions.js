import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'

//获取班级列表
export const myClassList = ({dispatch}, params,callback) => {
    Api.myClassList({
        data: params,
        ok: response => {
            dispatch(types.GET_CLASS_LIST, response.data.data)
            callback&&callback()
        },
        wrong: response => {}
    })
}
//设置标题
export const setClassName = ({dispatch}, params) => {
    dispatch(types.SET_CLASS_NAME,params)
}
//设置班级代码
export const setClassCode = ({dispatch}, params) => {
    dispatch(types.SET_CLASS_CODE,params)
}
//设置班级代码
export const setStudentId = ({dispatch}, params) => {
    dispatch(types.SET_STUDENT_ID,params)
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

//删除学生
export const delStudent= ({dispatch}, params, callback) => {
    Api.delStudent({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {}
    })
}


//删除班级
export const delClass= ({dispatch}, params, callback) => {
    Api.delClass({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {}
    })
}
export const myClassmateList = ({dispatch}, params, callback) => {
    Api.myClassmateList({
        data: params,
        ok: response => {
            dispatch(types.GET_CLASS_MATE_LIST, response.data.data)
            callback&&callback()
        },
        wrong: response => {}
    })
}
export const applyList = ({dispatch}, params, callback) => {
    Api.applyList({
        data: params,
        ok: response => {
            dispatch(types.GET_APPLY_LIST, response.data.data)
            callback&&callback()
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
