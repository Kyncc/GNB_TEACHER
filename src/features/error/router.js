export default {
  path: '/error',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
  children: [
    {
      path: 'index',
      name: 'error_index',
      component: r => require.ensure([], () => r(require('./pages/physics')), '/error/physics')
    },
    {
      path: 'detail/:chapterId/:eid/:id',
      name: 'error_detail',
      component: r => require.ensure([], () => r(require('./pages/detail')), '/error/detail')
    }
  ]
}
