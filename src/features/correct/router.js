export default {
  path: '/correct/:grade/:subjectId/:exerciseId',
  name: 'correct',
  component: r => require.ensure([], () => r(require('./pages/index')), '/correct')
}
