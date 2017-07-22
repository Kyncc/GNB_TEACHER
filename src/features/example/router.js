export default {
  path: '/example/:type/:subjectId/:grade/:id',
  name: 'example',
  component: r => require.ensure([], () => r(require('./pages/index')), '/example')
}
