import axios from '@/components/axios/'
import * as types from './mutationTypes'

/** 获取例题信息 */
export const getExample = ({ rootState, commit }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'example',
      params: {
        token: rootState.common.user.token,
        options: {
          subjectId: rootState.route.params.subjectId,
          exercisesId: rootState.route.params.id,
          grade: rootState.route.params.grade,
          type: rootState.route.params.type
        }
      }
    }).then((response) => {
      commit(types.EXAMPLE, response.data.data)
      resolve(response)
    }).catch((err) => {
      reject(err)
    })
  })
}

/** 清空例题 */
export const exampleClear = ({ commit }) => {
  commit(types.EXAMPLE_CLEAR)
}
