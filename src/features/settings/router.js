import layout from './pages/layout'
import info from './pages/info'

import modules from './modules/store'
// import store from 'src/store'

export default {
  'settings': {
    component: layout,
    subRoutes: {
      '/info': {
        component: info,
      }
    }
  }
}

// store.registerModule('login', {
//   ...settings
// });