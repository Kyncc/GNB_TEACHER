export default {
  path: '/download',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/invite'),
  children: [
    {
      path: '/',
      name: 'download',
      component: r => require.ensure([], () => r(require('./pages/index')), '/invite/index')
    }
    // {
    //   path: 'list',
    //   name: 'invite_list',
    //   component: r => require.ensure([], () => r(require('./pages/list')), '/invite/list')
    // }
  ]
}
