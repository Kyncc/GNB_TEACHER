import axios from 'config/http'
import * as _ from 'config/whole'
import * as types from '../mutationTypes'

/** 获取申请列表*/
export const getApplyList = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/applyList',
      params: {
        "token":rootState.login.token,
        "classCode":params.classCode
      }
    })
    .then((response) => {
        commit(types.APPLY_LIST,response.data.data);
        resolve(response);
    })
  });
}

/** 操作申请列表*/
export const updateApplyList = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/class/replyApply',
      data: {
        "token":rootState.login.token,
        "status":params.status,
        "studentId":params.studentId,
        "classCode":params.classCode
      }
    })
    .then((response) => {
        commit(types.RESET_APPLY );  //重置申请列表
        commit(types.RESET_CLASSMATE);   //重置同学列表
        resolve(response);
    })
  });
}