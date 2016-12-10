import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import comment from './common/modules/comment'
import correct from './common/modules/correct'
import collectAction from './common/modules/collect'

import register from './login/modules/register'
import login from './login/modules/login'
import forget from './login/modules/forget'

import remember from './remember/modules/index'
import index from './main/modules/index'

import message from './message/modules/index'

import user from './user/modules/index.js'
import report from './report/modules/index'
import myClass from './class/modules/class'
import check from './check/modules/check.js'
import brush from './brush/modules/index.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    forget,
    index,
    comment,
    remember,
    correct,
    collectAction,
    message,
    myClass,
    user,
    check,
    report,
    brush
  }
})
