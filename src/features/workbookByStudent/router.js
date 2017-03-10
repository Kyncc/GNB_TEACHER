import modules from './modules/store'
import store from 'src/store'

export default {
  'workbookByStu': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/workbookByStu'),
    subRoutes: {
      '/:code/:studentId': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/workbookByStu/'),
      },
      'chapter/:studentId/:workbookId': {
        component: r => require.ensure([], () => r(require('./pages/chapter')), '/workbookByStu/chapter/')
      },
      'page/:studentId/:workbookId': {
        component: r => require.ensure([], () => r(require('./pages/page')), '/workbookByStu/page/')
      },
      'exercise/:studentId/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/exercise')), '/workbookByStu/exercise/')
      }
    }
  }
}


store.registerModule('rememberStudent', {
  ...modules
});
