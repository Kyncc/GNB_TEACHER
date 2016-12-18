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
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}

//获取创建班级信息
export const getMaterial = ({dispatch}, params,callback) => {
    Api.material({
        data: params,
        ok: response => {
            callback&&callback(response.data.data.list)
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}


/**删除班级 */
export const delClass= ({dispatch}, params, callback) => {
    Api.delClass({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
        
    })
}


/**创建新班级 */
export const createClass = ({dispatch}, params, callback) => {
    _.busy();
    Api.createClass({
        data: params,
        ok: response => {
            _.leave();
            callback && callback()
        },
        wrong: response => {
            _.leave();
            _.toast(response.data.msg);
        }
    })
}

/**删除学生 */
export const delStudent= ({dispatch}, params, callback) => {
    _.busy();
    Api.delStudent({
        data: params,
        ok: response => {
            _.leave();
            callback && callback()
        },
        wrong: response => {
            _.leave();
            _.toast(response.data.msg);
        }
    })
}


export const myClassmateList = ({dispatch}, params, callback) => {
    Api.myClassmateList({
        data: params,
        ok: response => {
            dispatch(types.GET_CLASS_MATE_LIST, response.data.data)
            callback&&callback()
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}

export const applyList = ({dispatch}, params, callback) => {
    Api.applyList({
        data: params,
        ok: response => {
            dispatch(types.GET_APPLY_LIST, response.data.data)
            callback&&callback()
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}

export const replyApply = ({dispatch}, params, callback) => {
    Api.replyApply({
        data: params,
        ok: response => {
            callback && callback()
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}

/**获取班级数据 */
export const getClassDetail = ({dispatch}, params, success,wrong) => {
    Api.myClassmateList({
        data: params,
        ok: response => {
            dispatch(types.CLASS_MYCLASS, response.data.data)
            success&&success()
        },
        wrong: response => {
            _.toast(response.data.msg);
        }
    })
}

/**清空班级列表 */
export const clearClassList= ({dispatch}) => {
    dispatch(types.CLASS_CLEAR);
}


/**清空班级数据 */
export const clearClassDetail = ({dispatch}) => {
    dispatch(types.CLASS_MYCLASS_CLEAR)
}
