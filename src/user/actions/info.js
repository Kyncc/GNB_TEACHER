import Api from '../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../config/whole'


/** 获取用户信息*/
export const getUserInfo = ({ dispatch }, params, success,wrong) => {
  _.busy();
  Api.getUserInfo({
    data: params,
    ok: response => {
      dispatch(types.GET_USER_INFO, response.data.data);
      _.leave();
      success&&success()
    },
    wrong: response => {
      _.leave();
      _.toast(response.data.msg);
    }
  })
}

/** 编辑用户信息*/
export const updateUserInfo = ({ dispatch }, params, success,wrong) => {
  Api.updateUserInfo({
    data: params,
    ok: response => {
      success&&success();
      _.toast("更新成功");
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}
