import modules from './modules/store'
import store from 'src/store'

export default {
  '/pass': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/pass'),
    subRoutes: {
      '/:code/:studentId': {
          component: r => require.ensure([], () => r(require('./pages/chapter')), '/pass/chapter/'),
      },
      '/list/:studentId/:chapterId': {
          component: r => require.ensure([], () => r(require('./pages/list')), '/pass/list/'),
      }
    }
  }
}

store.registerModule('pass', {
  ...modules
});