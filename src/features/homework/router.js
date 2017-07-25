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
    },
    {
      path: 'publish/content',
      name: 'homework_publish_content',
      component: r => require.ensure([], () => r(require('./pages/publish/content')), '/homework/content')
    },
    {
      path: 'publish/audio',
      name: 'homework_publish_audio',
      component: r => require.ensure([], () => r(require('./pages/publish/audio')), '/homework/audio')
    },
    {
      path: 'publish/image',
      name: 'homework_publish_image',
      component: r => require.ensure([], () => r(require('./pages/publish/image')), '/homework/image')
    }
  ]
}
