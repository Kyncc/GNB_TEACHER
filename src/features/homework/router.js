export default {
  path: '/homework',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/homework'),
  children: [
    {
      path: '/',
      name: 'homework',
      component: r => require.ensure([], () => r(require('./pages/index')), '/homework/index')
    },
    {
      path: 'class',
      name: 'homework_class',
      component: r => require.ensure([], () => r(require('./pages/class')), '/homework/class')
    }
    // {
    //   path: '/image',
    //   name: 'homework_image',
    //   component: r => require.ensure([], () => r(require('./pages/image')), '/homework/image')
    // },
    // {
    //   path: '/content',
    //   name: 'homework_content',
    //   component: r => require.ensure([], () => r(require('./pages/content')), '/homework/content')
    // },
    // {
    //   path: '/audio',
    //   name: 'homework_audio',
    //   component: r => require.ensure([], () => r(require('./pages/audio')), '/homework/audio')
    // }
  ]
}
