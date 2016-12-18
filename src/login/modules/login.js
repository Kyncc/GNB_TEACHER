import {
  GET_LOGIN_SUCCESS,
  GET_LOGIN_CLEAR,
  SET_HEAD_IMG
} from '../mutationTypes'

const state = {
    headImg:localStorage.getItem('headImg')?localStorage.getItem('headImg'):' ',
    mobile:localStorage.getItem('mobile')?localStorage.getItem('mobile'):' ',
    name:localStorage.getItem('name')?localStorage.getItem('name'):' ',
    token: localStorage.getItem('token')
}

const mutations = {
  [GET_LOGIN_SUCCESS](state, data){
    state.headImg =data.data.headImg;
    state.mobile = data.data.mobile;
    state.name = data.data.name;
    state.token = data.data.token;
    localStorage.setItem('headImg',data.data.headImg);
    localStorage.setItem('mobile',data.data.mobile);
    localStorage.setItem('name',data.data.name);
    localStorage.setItem('token',data.data.token);
  },
  [SET_HEAD_IMG](state, data) {
    state.headImg = data;
    localStorage.setItem('headImg',data);
  }
}

export default {
  state,
  mutations
}
