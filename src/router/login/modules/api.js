import {API_ENV,API_VERSION} from 'config/api';
import {http} from 'config/httpdispatch';

export default {
  registerCode: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/getCode`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  forgetCode: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/getCode`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  login: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/login`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  info: (params) => {
      return http({ method: 'post', url:`${API_ENV}${API_VERSION}/teacher/user/updateUserInfo`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  addPwd: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/user/getToken`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  resetPwd: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/pwd/resetByMobile`, data: params.data, ok: params.ok, wrong: params.wrong });
  }
}