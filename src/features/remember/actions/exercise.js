import Api from '../../../config/httpdispatch'
import * as types from '../mutationTypes'
import * as _ from '../../../config/whole'


/**获取章节练习题 */
export const rememberExerciseGet = ({ dispatch }, params,success,wrong) => {
  Api.rememberExercise({
    data: params,
    ok: response => {
      dispatch(types.REMEMBER_EXERCISE, response.data);
      success&&success();
    },
    wrong: response => {
      wrong&&wrong();
      _.toast(response.data.msg);
    }
  })
}

/**章节练习题数据清空 */
export const rememberExerciseClear = ({ dispatch }) => {
  dispatch(types.REMEMBER_EXERCISE_CLEAR);
}


/**设置练习题高度 */
export const setScoll = ({ dispatch }, height) => {
    dispatch(types.REMEMBER_EXERCISE_SCROLL,height);
}