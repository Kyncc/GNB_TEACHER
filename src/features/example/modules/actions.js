import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取例题信息 */
export const getExample = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'exerciseList',
      params: {
        ids: [rootState.route.params.id],
        subject_id: rootState.route.params.subjectId,
        token: rootState.common.user.token
      }
    })
    .then((response) => {
      commit(types.EXAMPLE, response.data.data)
      resolve(response)
    })
  })
}

/** 清空例题 */
export const exampleClear = ({ commit }) => {
  commit(types.EXAMPLE_CLEAR)
}
