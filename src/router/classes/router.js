import layout from './pages/layout'
import index from './pages/index'
import select from './pages/select'
import myClasses from '../../features/class/router'
import report from '../../features/report/router'
import pass from '../../features/pass/router'
import Break from '../../features/break/router'

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
      ...report,
      ...pass,
      ...Break,
    }
  }
}
