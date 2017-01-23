import layout from './pages/layout'
import index from './pages/index'
import select from './pages/select'
import myClasses from '../../features/class/router'
// import Break from '../../featrues/break/router'

export default {
  'classes': {
    component: layout,
    subRoutes: {
      '/': {
        component: index
      },
      '/select': {
        component: select
      },
      ...myClasses,
      // ...pass,
      // ...Break,
    }
  }
}
