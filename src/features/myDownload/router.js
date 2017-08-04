export default {
  path: '/myDownload',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/myDownload'),
  children: [
    {
      path: '/',
      name: 'myDownload',
      component: r => require.ensure([], () => r(require('./pages/index')), '/myDownload/index')
    },
    {
      path: 'list/:id',
      name: 'myDownload_list',
      component: r => require.ensure([], () => r(require('./pages/list')), '/myDownload/list')
    }
  ]
}
