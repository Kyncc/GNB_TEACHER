import myClasses from '../../features/class/router'
import report from '../../features/report/router'
import pass from '../../features/pass/router'
import Break from '../../features/break/router'
import brush from '../../features/brush/router'
import brushed from '../../features/brushed/router'
import introduction from '../../features/introduction/router'
// import workbookByStudent from '../../features/workbookByStudent/router

export default {
  'classes': {
    component:  r => require.ensure([], () => r(require('./pages/layout')), '/classes'),
    subRoutes: {
      '/': {
        component:  r => require.ensure([], () => r(require('./pages/index')), '/classes/')
      },
      '/select': {
        component:  r => require.ensure([], () => r(require('./pages/select')), '/classes/select') 
      },
      ...myClasses,
      ...introduction,
      ...report,
      ...pass,
      ...brush,
      ...brushed,
      ...Break,
      // ...workbookByStudent
    }
  }
}

