export default {
  path: '/paper',
  component: r => require.ensure([], () => r(require('./layout')), '/paper'),
  redirect: '/paper/index',
  children: [
    {
      path: 'index',
      name: 'paper',
      component: r => require.ensure([], () => r(require('./pages/index')), '/paper/index')
    },
    {
      path: 'options',
      name: 'paper_options',
      component: r => require.ensure([], () => r(require('./pages/options')), '/paper/options')
    },
    {
      path: 'history',
      name: 'paper_history',
      component: r => require.ensure([], () => r(require('./pages/history')), '/paper/history')
    }
  ]
}
