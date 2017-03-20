export default {
  '/example/:studentId/:subjectId/:id': {
    component: r => require.ensure([], () => r(require('./pages/index')), '/example/') 
  }
}
