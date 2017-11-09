export default {
  path: 'errorClassmate',
  name: 'errorClassmate',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/errorClassmate'),
  redirect: 'errorClassmate/',
  children: [
    {
      path: '/',
      name: 'errorClassmate_index',
      component: r => require.ensure([], () => r(require('./pages/classmate')), '/errorClassmate/classmate')
    },
    {
      path: 'list/:name/:studentId',
      name: 'errorClassmate_list',
      component: r => require.ensure([], () => r(require('./pages/list')), '/errorClassmate/list')
    },
    {
      path: 'comment/:studentId/:wbeid/:chapterId',
      name: 'errorClassmate_comment',
      component: r => require.ensure([], () => r(require('./pages/comment')), '/errorClassmate/comment')
    }
  ]
}
