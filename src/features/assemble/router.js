export default {
  path: '/assemble',
  component: r => require.ensure([], () => r(require('./layout')), '/assemble'),
  redirect: '/assemble/sync',
  children: [
    {
      path: 'gaokao',
      name: 'assemble_gaokao',
      component: r => require.ensure([], () => r(require('./pages/gaokao')), '/assemble/gaokao')
    },
    {
      path: 'sync',
      name: 'assemble_sync',
      component: r => require.ensure([], () => r(require('./pages/sync')), '/assemble/sync')
    },
    {
      path: 'options',
      name: 'assemble_options',
      component: r => require.ensure([], () => r(require('./pages/options')), '/assemble/center/options')
    },
    {
      path: 'example/:type/:id/:name',
      name: 'assemble_example',
      component: r => require.ensure([], () => r(require('./pages/example')), '/assemble/example')
    },
    {
      path: 'choice/:subjectId/:grade/:id',
      name: 'assemble_choice',
      component: r => require.ensure([], () => r(require('./pages/choice')), '/assemble/choice')
    }
  ]
}
