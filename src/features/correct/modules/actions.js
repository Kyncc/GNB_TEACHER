import axios from 'config/http'
import * as _ from 'config/whole'

/** 纠错*/
export const postCorrect = ({ rootState,commit }, params) => {
  return new Promise((resolve, reject)=> { 
    axios({
      method:'post',
      url: 'teacher/correct',
      data: {
        "token":rootState.login.token,
        "options":{
          "id":rootState.route.params.id,
          "subject_id":rootState.route.params.subjectId
        },
        ...params
      }
    })
    .then((response) => {
        _.toast("纠错成功");
        commit('CORRECT');
        resolve(response);
    })
  });
}

