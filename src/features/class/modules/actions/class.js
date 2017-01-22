import axios from 'config/http'
import * as types from '../mutationTypes'
import * as _ from 'config/whole'

/** 新增班级*/
export const addClass = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/createClass',
      params: {
        "token":rootState.login.token,
        "name":params.name
      }
    })
    .then((response) => {
        commit(types.RESET_CLASS_LIST);
        resolve(response);
    })
  });
}

/**删除班级 */
export const delClass= ({ rootState,commit }, params) => {
    _.busy();
   return new Promise((resolve, reject)=> { 
      axios({
        method:'post',
        url: 'teacher/class/delClass',
        data: {
          "token":rootState.login.token,
          "classCode":	params.classCode
        }
      })
      .then((response) => {
           _.leave();
          commit(types.RESET_CLASS_LIST);
          resolve(response);
      })
      .catch((error) => {
          _.leave();
      })
  });
}


/** 更改班级*/
export const updateClass = ({ rootState,commit }, params) => {
  _.busy();
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/class/updateClass',
      data: {
        "token":rootState.login.token,
        "name":params.name
      }
    })
    .then((response) => {
        _.leave();
        commit(types.RESET_CLASS_LIST);
        resolve(response);
    })
    .catch((error) => {
        _.leave();
    })
  });
}


/** 获取班级*/
export const getClass = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/myClassList',
      params: {
        "token":rootState.login.token,
      }
    })
    .then((response) => {
        commit(types.CLASS_LIST,response.data.data);
        resolve(response);
    })
  });
}







