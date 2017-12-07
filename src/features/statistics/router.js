import errorClass from './errorClass/router'
import errorClassmate from './errorClassmate/router'

export default [
  {
    path: '/statistics',
    component: r => require.ensure([], () => r(require('./layout')), 'statistics/layout'),
    children: [
      {
        path: '/',
        name: 'statistics',
        component: r => require.ensure([], () => r(require('./index')), 'statistics/index')
      },
      ...errorClass,
      errorClassmate
    ]
  }
]
