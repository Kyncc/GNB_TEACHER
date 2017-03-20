export default {
  '/brushed': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/brushed/'),
    subRoutes: {
      '/:code/:studentId': {
          component: r => require.ensure([], () => r(require('./pages/chapter')), '/brushed/chapter/'),
      },
      '/list/:studentId/:chapterId': {
          component: r => require.ensure([], () => r(require('./pages/list')), '/brushed/list/'),
      }
    }
  }
}