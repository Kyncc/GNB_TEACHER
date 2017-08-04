export default {
  path: '/error',
  name: 'error',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/error'),
  redirect: '/error',
  children: [
    {
      path: '/',
      name: 'error_classmate',
      component: r => require.ensure([], () => r(require('./pages/classmate')), '/error/classmate')
    },
    {
      path: 'list/:name/:studentId',
      name: 'error_list',
      component: r => require.ensure([], () => r(require('./pages/list')), '/error/list')
    },
    {
      path: 'comment/:studentId/:wbeid/:chapterId',
      name: 'error_comment',
      component: r => require.ensure([], () => r(require('./pages/comment')), '/error/comment')
    }
  ]
}
