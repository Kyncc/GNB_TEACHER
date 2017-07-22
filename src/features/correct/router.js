export default {
  path: '/correct/:grade/:subjectId/:id',
  name: 'correct',
  component: r => require.ensure([], () => r(require('./pages/index')), '/correct')
}
