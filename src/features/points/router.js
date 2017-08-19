export default {
  path: '/points',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/points'),
  children: [
    {
      path: '/',
      name: 'points',
      component: r => require.ensure([], () => r(require('./pages/index')), '/points/')
    },
    {
      path: 'earn',
      name: 'points_earn',
      component: r => require.ensure([], () => r(require('./pages/earn')), '/points/earn')
    },
    {
      path: 'rask',
      name: 'points_rask',
      component: r => require.ensure([], () => r(require('./pages/rask')), '/points/rask')
    },
    {
      path: 'list',
      name: 'points_list',
      component: r => require.ensure([], () => r(require('./pages/list')), '/points/list')
    }
  ]
}
