import Api from '../../../config/httpdispatch'
import * as _ from '../../../config/whole'
import * as types from '../mutationTypes'
import {COLLECT_RELOAD} from '../../collect/mutationTypes'

/**获取例题信息 */
export const getBreakExample = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.BREAK_EXAMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**清空例题 */
export const breakExampleClear = ({ dispatch }) => {
  dispatch(types.BREAK_EXAMPLE_CLEAR);
}



