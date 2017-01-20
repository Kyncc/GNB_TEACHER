import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/** 修改密码*/
export const updatePwd = ({ dispatch }, params, success,wrong) => {
  Api.updatePwd({
    data: params,
    ok: response => {
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/** 检查版本*/
export const updateVersion = ({ dispatch },params,success,wrong) => {
  Api.updateVersion({
    data: params,
    ok: response => {
      dispatch(types.GET_VERSION, response.data.data)
      success&&success();
    },
    wrong: response => {
       wrong&&wrong();
       _.toast(response.data.msg);
    }
  })
}
