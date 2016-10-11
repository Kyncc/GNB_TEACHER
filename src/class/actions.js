import Api from '../config/httpdispatch'
import * as types from './mutationTypes'
import * as _ from '../config/whole'


//获取班级列表
export const myClassList = ({ dispatch }, params) => {
    Api.myClassList({
      data: params,
      ok: response => {
        dispatch(types.GET_CLASS_LIST, response.data.data)
      },
      wrong: response => {
        dispatch(types.GET_CLASS_LIST, response.data.data)
      }
    })
  }
