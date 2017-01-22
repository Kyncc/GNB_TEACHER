import Api from './api'
import * as _ from 'config/whole'

/** 纠错*/
export const correct = ({ commit }, params) => {
  Api.correct({
    data:params,
    ok:response=>{
      commit('CORRECT',response.data);
      _.toast("纠错成功");
      setTimeout(()=>{
        history.back();
      },1000);
    },
    wrong:response=>{
      _.toast(response.data.msg);
    }
  })
}