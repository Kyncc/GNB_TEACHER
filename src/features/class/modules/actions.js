import axios from 'config/http'
import * as types from './mutationTypes'
import * as _ from 'config/whole'

/** 新增班级*/
export const addClass = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/class/createClass',
      data: {
        "token":rootState.login.token,
        "name":params.name
      }
    })
    .then((response) => {
        commit(types.RESET_CLASS_LIST);
         _.toast('创建班级成功');
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

/** 获取申请列表*/
export const getApplyList = ({ rootState,commit }) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/applyList',
      params: {
        "token":rootState.login.token,
        "classCode":rootState.route.params.code
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
        commit(types.RESET_CLASS_LIST);   //刷新班级列表
        commit(types.RESET_CLASSMATE);   //重置同学列表
        resolve(response);
    })
  });
}

/**清空数据 */
export const resetClassmate = ({ commit }, params) => {
    commit(types.RESET_APPLY );  //重置申请列表
    commit(types.RESET_CLASSMATE);   //重置同学列表
}

/** 获取同学列表*/
export const getClassmate = ({ rootState,commit },params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/myClassmateList',
      params: {
        "token":rootState.login.token,
        "classCode":params.code
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
        commit(types.RESET_CLASS_LIST);
        resolve(response);
    })
  });
}

/** 获取同学信息*/
export const getStudentInfo = ({ rootState,commit },params) => {
  _.busy();
  return new Promise((resolve, reject)=> { 
    axios({
      method:'get',
      url: 'teacher/class/student',
      params: {
        "token":rootState.login.token,
        "id":params.id
      }
    })
    .then((response) => {
        _.leave();
        commit(types.STUDENT_INFO,response.data.data);
        resolve(response);
    })
    .catch((error) => {
        _.leave();
        _.toast("获取同学信息失败");
    })
  });
}

