

/**获取例题信息 */
export const getPassExample = ({ dispatch }, params,success) => {
  Api.exerciseList({
      data:params,
      ok:response=>{
          dispatch(types.PASS_EXAMPLE,response.data);
          success&&success();
      },
      wrong:response=>{
        _.toast(response.data.msg);
      }
  })
}

/**清空例题 */
export const passExampleClear = ({ dispatch }) => {
  dispatch(types.PASS_EXAMPLE_CLEAR);
}



