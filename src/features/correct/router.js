export default {
  '/correct/:studentId/:subjectId/:id': {
    component: r => require.ensure([], () => r(require('./pages/correct')), '/correct/')
  }
}


