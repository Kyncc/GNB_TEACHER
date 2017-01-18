import {API_ENV,API_VERSION} from 'config/api';
import {http} from 'config/httpdispatch';

export default {
    correct: (params) => {
        return http({ method: 'post', url: `${API_ENV}${API_VERSION}/teacher/correct`, data: params.data, ok: params.ok, wrong: params.wrong });
    }
}