import {API_ENV,API_VERSION} from 'config/api';
import {http} from 'config/httpdispatch';

export default {
  userInfo: (params) => {
      return http({ method: 'get', url: `${API_ENV}${API_VERSION}/teacher/user/getUserInfo`, data: params.data, ok: params.ok, wrong: params.wrong });
  },
  updateInfo: (params) => {
      return http({ method: 'post', url: `${API_ENV}${API_VERSION}/teacher/user/updateUserInfo`, data: params.data, ok: params.ok, wrong: params.wrong });
  }
}