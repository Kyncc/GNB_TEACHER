import Vue from 'vue'
import Vuex from 'vuex'

import tools from './features/common/tools/store'
import user from './router/user/modules/store'
import interact from './router/interact/modules/store'

Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    tools,
    user,
    interact
  }
})
