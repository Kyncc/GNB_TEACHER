export default {
  path: '/paper',
  component: r => require.ensure([], () => r(require('./layout')), '/paper'),
  redirect: '/paper/sync',
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
      path: 'exercise',
      name: 'paper_exercise',
      component: r => require.ensure([], () => r(require('./pages/exercise')), '/paper/exercise')
    }
  ]
}
