import modules from './modules/store'
import store from 'src/store'

export default {
  'workbookByClass': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/workbookByClass'),
    subRoutes: {
      '/': {
        component: r => require.ensure([], () => r(require('./pages/class')), '/workbookByClass/'),
      },
      'workbook/:code': {
        component: r => require.ensure([], () => r(require('./pages/workbook')), '/workbookByClass/workbook'),
      },
      'chapter/:code/:workbookId': {
        component:  r => require.ensure([], () => r(require('./pages/chapter')), '/workbookByClass/chapter'),
      },
      'page/:code/:workbookId': {
        component:  r => require.ensure([], () => r(require('./pages/page')), '/workbookByClass/page'), 
      },
      'exercise/:code/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/exercise')), '/workbookByClass/exercise'), 
      }
    }
  }
}

store.registerModule('rememberClass', {
  ...modules
});
