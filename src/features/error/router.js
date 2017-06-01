export default {
  path: '/error',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
  children: [
    {
      path: '/',
      name: 'error_classmate',
      component: r => require.ensure([], () => r(require('./pages/classmate')), '/error/classmate')
    },
    {
      path: 'list/:name/:studentId',
      name: 'error',
      component: r => require.ensure([], () => r(require('./pages/list')), '/error/list')
    }
  ]
}
