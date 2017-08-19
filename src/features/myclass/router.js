export default {
  path: '/class',
  component: r => require.ensure([], () => r(require('./pages/layout')), '/class'),
  children: [
    {
      path: '/',
      name: 'class',
      component: r => require.ensure([], () => r(require('./pages/index')), '/class/')
    },
    {
      path: 'add',
      name: 'class_add',
      component: r => require.ensure([], () => r(require('./pages/add')), '/class/add')
    },
    {
      path: 'message',
      name: 'class_message',
      redirect: '/message/class'
    },
    {
      path: 'detail/:code',
      name: 'class_detal',
      component: r => require.ensure([], () => r(require('./pages/classmate')), '/class/detail')
    },
    {
      path: 'update/name/:code/:name',
      name: 'class_update_name',
      component: r => require.ensure([], () => r(require('./pages/updateName')), '/class/update/name')
    },
    {
      path: 'classmate/update/:code/:name',
      name: 'class_classmate_update',
      component: r => require.ensure([], () => r(require('./pages/classmateUpdate')), '/class/classmateUpdate')
    }
  ]
}
