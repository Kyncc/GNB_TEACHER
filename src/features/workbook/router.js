export default {
  path: '/workbook',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/workbook'),
  children: [
    {
      path: '/',
      name: 'workbook',
      component: r => require.ensure([], () => r(require('./pages/index')), '/workbook/')
    },
    {
      path: 'chapter/:name/:workbookId',
      name: 'workbook_chapter',
      component: r => require.ensure([], () => r(require('./pages/chapter')), '/workbook/chapter')
    },
    {
      path: 'exercise',
      component: r => require.ensure([], () => r(require('./pages/exercise/layout')), '/workbook/exercise'),
      children: [
        {
          path: 'number/:name/:chapterId/',
          name: 'workbook_exercise_number',
          component: r => require.ensure([], () => r(require('./pages/exercise/number')), '/workbook/exercise/number')
        },
        {
          path: 'photo/:name/:chapterId/',
          name: 'workbook_exercise_photo',
          component: r => require.ensure([], () => r(require('./pages/exercise/photo')), '/workbook/exercise/photo')
        }
      ]
    },
    {
      path: 'exercise/error/:chapterId/:wbeid/',
      name: 'workbook_exercise_error',
      component: r => require.ensure([], () => r(require('./pages/exercise/error')), '/workbook/exercise/error')
    }
  ]
}
