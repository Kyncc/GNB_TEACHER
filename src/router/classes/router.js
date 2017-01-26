import layout from './pages/layout'
import index from './pages/index'
import select from './pages/select'
import myClasses from '../../features/class/router'
import report from '../../features/report/router'
import pass from '../../features/pass/router'
import Break from '../../features/break/router'
import workbookByStudent from '../../features/workbookByStudent/router'
import modules from './modules/store'
import store from 'src/store'

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
      ...workbookByStudent
    }
  }
}


store.registerModule('classes', {
  ...modules
});