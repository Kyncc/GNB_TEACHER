export default {
  path: '/statistics',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/statistics'),
  children: [
    {
      path: '/',
      name: 'class',
      component: r => require.ensure([], () => r(require('./pages/index')), '/statistics/')
    },
    {
      path: 'detail',
      name: 'detail',
      component: r => require.ensure([], () => r(require('./pages/detail')), '/statistics/detail')
    }
  ]
}
