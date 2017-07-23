export default {
  path: '/homework',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
  children: [
    {
      path: '/',
      name: 'homework',
      component: r => require.ensure([], () => r(require('./pages/index')), '/error/index')
    },
    {
      path: '/image',
      name: 'homework_image',
      component: r => require.ensure([], () => r(require('./pages/image')), '/error/image')
    },
    {
      path: '/content',
      name: 'homework_content',
      component: r => require.ensure([], () => r(require('./pages/content')), '/error/content')
    },
    {
      path: '/audio',
      name: 'homework_audio',
      component: r => require.ensure([], () => r(require('./pages/audio')), '/error/audio')
    }
  ]
}
