export default  {
  'report': {
    component: r => require.ensure([], () => r(require('./pages/layout')), '/report'),
    subRoutes: {
      '/:code/:studentId': {
        component: r => require.ensure([], () => r(require('./pages/index')), '/report/'),
      },
      '/detail/:studentId/:chapterId': {
        component:  r => require.ensure([], () => r(require('./pages/detail')), '/report/detail/'),
      }
    }
  }
}

