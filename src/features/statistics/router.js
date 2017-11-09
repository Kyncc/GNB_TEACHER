import errorClass from './errorClass/router'
import errorClassmate from './errorClassmate/router'

export default [
  {
    path: '/statistics',
    component: r => require.ensure([], () => r(require('./layout')), '/statistics'),
    children: [
      {
        path: '/',
        name: 'statistics',
        component: r => require.ensure([], () => r(require('./index')), '/statistics/')
      },
      ...errorClass,
      errorClassmate
    ]
  }
]
