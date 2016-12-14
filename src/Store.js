import Vue from 'vue'
import Vuex from 'vuex'
import Global from './common/global'
import register from './login/modules/register'
import login from './login/modules/login'
import forget from './login/modules/forget'
import user from './user/modules/index.js'

import remember from './remember/modules/index'
import index from './main/modules/index'
import message from './message/modules/index'
import report from './report/modules/index'
import myClass from './class/modules/class'
import error from './error/modules/index.js'
import brush from './brush/modules/index.js'
import pass from './pass/modules/index.js'
import breakIndex from './break/modules/index.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Global,
    login,
    register,
    forget,
    index,
    remember,
    message,
    myClass,
    user,
    error,
    report,
    brush,
    pass,
    breakIndex
  }
})
