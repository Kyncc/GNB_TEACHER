export default {
  '/brush': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/brush/'),
    subRoutes: {
      '/:classCode/:studentId': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/brush/index')
      },
      '/list/:studentId/:chapterId': {
        component: r => require.ensure([], () => r(require('./pages/list')), '/brush/list')
      }
    }
  }
}

