import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import comment from './common/modules/comment'
import correct from './common/modules/correct'
import collectAction from './common/modules/collect'

import register from './login/modules/register'
import login from './login/modules/login'
import setPassword from './login/modules/setPassword'
import forget from './login/modules/forget'
import resetPassword from './login/modules/resetPassword'

import index from './main/modules/index'

import message from './message/modules/index'

import user from './user/modules/index.js'

import myClass from './class/modules/class'
import check from './check/modules/check.js'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    setPassword,
    forget,
    resetPassword,
    index,
    comment,
    correct,
    collectAction,
    message,
    myClass,
    user,
    check
  }
})
