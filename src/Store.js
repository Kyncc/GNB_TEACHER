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

import info from './user/modules/info'
import advice from './user/modules/advice.js'
import friend from './user/modules/friend.js'
import member from './user/modules/member.js'
import setting from './user/modules/setting.js'

import myClass from './class/modules/class'


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
    info,
    myClass,
    advice,
    friend,
    member,
    setting
  }
})
