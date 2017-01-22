import axios from 'config/http'
import * as types from '../mutationTypes'
import * as _ from 'config/whole'

/** 获取同学列表*/
export const getClassmate = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/myClassmateList',
      params: {
        "token":rootState.login.token,
        "classCode":params.classCode
      }
    })
    .then((response) => {
        commit(types.CLASSMATE,response.data.data);
        resolve(response);
    })
  });
}

/** 删除同学*/
export const delClassmate = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/class/delStudent',
      data: {
        "token":rootState.login.token,
        "studentId":params.studentId,
        "classCode":params.classCode
      }
    })
    .then((response) => {
        commit(types.RESET_CLASSMATE);
        resolve(response);
    })
  });
}