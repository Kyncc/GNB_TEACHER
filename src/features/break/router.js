export default {
  '/break': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/break'),
    subRoutes: {
      '/:code/:studentId': {
          component: r => require.ensure([], () => r(require('./pages/chapter')), '/break/chapter/'),
      },
      '/list/:studentId/:chapterId': {
          component: r => require.ensure([], () => r(require('./pages/list')), '/break/list/'),
      }
    }
  }
}
