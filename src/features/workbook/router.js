export default {
  path: '/workbook',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/workbook'),
  children: [
    {
      path: '/',
      component: r => require.ensure([], () => r(require('./pages/index')), '/workbook/')
    }
  ]
}
