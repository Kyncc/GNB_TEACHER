export default {
  path: '/download',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/download'),
  children: [
    {
      path: '/',
      name: 'download',
      component: r => require.ensure([], () => r(require('./pages/index')), '/download/index')
    },
    {
      path: 'update/:id',
      name: 'download_update',
      component: r => require.ensure([], () => r(require('./pages/update')), '/download/update')
    }
  ]
}
