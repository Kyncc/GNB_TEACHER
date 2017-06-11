export default {
  path: '/myDownload',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/invite'),
  children: [
    {
      path: '/',
      name: 'myDownload',
      component: r => require.ensure([], () => r(require('./pages/index')), '/invite/index')
    }
    // {
    //   path: 'list',
    //   name: 'myDownload_list',
    //   component: r => require.ensure([], () => r(require('./pages/list')), '/invite/list')
    // }
  ]
}
