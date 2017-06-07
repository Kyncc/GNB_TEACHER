export default {
  path: '/invite',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/invite'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/invite/index')
    }
    // {
    //   path: 'list',
    //   component: r => require.ensure([], () => r(require('./pages/list')), '/invite/list')
    // }
  ]
}
