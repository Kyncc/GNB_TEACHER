import Vue from 'vue'
import Vuex from 'vuex'

import tools from './features/common/tools/store'
import user from './router/user/modules/store'
import interact from './router/interact/modules/store'

// import user from './user/modules/index'
// import remember from './remember/modules/index'
// import index from './main/modules/index'
// import message from './message/modules/index'
// import report from './report/modules/index'
// import myClass from './class/modules/class'
// import error from './error/modules/index'
// import brush from './brush/modules/index'
// import pass from './pass/modules/index'
// import breakIndex from './break/modules/index'

Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    tools,
    user,
    interact
  }
})
