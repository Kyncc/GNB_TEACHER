import * as types from './mutationTypes'
// import * as _ from 'config/whole'
// import Api from '../config/httpdispatch'

export const getToastMsg = ({ commit }, msg) => {
    commit(types.TOAST_MESSAGE,msg);
}

export const getToastShow = ({ commit }, status) => {
    commit(types.TOAST_SHOW,status);
}

export const getIsLoading = ({ commit }, status)=> {
    commit(types.LOADING,status);
}

// //点评
// export const comment = ({ commit }, params) => {
//   Api.comment({
//       data:params,
//       ok:response=>{
//         commit(types.COMMENT_SUCCESS,response.data);
//         setTimeout(()=>{
//           history.back();
//         },1000);
//          _.toast("点评成功");
//       },
//       wrong:response=>{
//         _.toast(response.data.msg);
//       }
//   })
// }

// //纠错
// export const correct = ({ commit }, params) => {
//   Api.correct({
//       data:params,
//       ok:response=>{
//         commit(types.CORRECT_SUCCESS,response.data);
//         _.toast("纠错成功");
//         setTimeout(()=>{
//           history.back();
//         },1000);
//       },
//       wrong:response=>{
//         _.toast(response.data.msg);
//       }
//   })
// }