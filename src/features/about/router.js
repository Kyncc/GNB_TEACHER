export default {
  path: '/about',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/about'),
  children: [
    {
      path: '/',
      name: 'about',
      component: r => require.ensure([], () => r(require('./pages/index')), '/about/index')
    },
    {
      path: 'my',
      component: r => require.ensure([], () => r(require('./pages/my')), '/about/my')
    },
    {
      path: 'advice',
      name: 'about_advice',
      component: r => require.ensure([], () => r(require('./pages/advice')), '/about/advice')
    },
    {
      path: 'adviceHistory',
      component: r => require.ensure([], () => r(require('./pages/adviceHistory')), '/about/adviceHistory')
    }
  ]
}
