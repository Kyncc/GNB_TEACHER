export default [
  // 班级选择
  {
    path: 'errorClass/class',
    name: 'errorClass',
    component: r => require.ensure([], () => r(require('./index')), '/errorClass/class')
  },
  {
    path: 'errorClass/',
    component: r => require.ensure([], () => r(require('./layout')), '/errorClass'),
    children: [
      {
        path: 'camera/:classCode/:subject/:chapterId/:name',
        name: 'errorClassCamera',
        component: r => require.ensure([], () => r(require('./pages/camera')), '/errorClass/camera')
      },
      {
        path: 'remember/:classCode/:subject/:chapterId/:name',
        name: 'errorClassRemember',
        component: r => require.ensure([], () => r(require('./pages/remember')), '/errorClass/remember')
      },
      {
        path: 'good/:classCode/:subject/:chapterId/:name',
        name: 'errorClassGood',
        component: r => require.ensure([], () => r(require('./pages/good')), '/errorClass/good')
      }
    ]
  },
  // 记错题筛选
  {
    path: 'errorClass/remember/assemble/options',
    name: 'errorClassRemember_options',
    component: r => require.ensure([], () => r(require('./pages/rememberOptions')), '/errorClass/remember/options')
  },
  // 精选题筛选
  {
    path: 'errorClass/good/assemble/options',
    name: 'errorClassGood_options',
    component: r => require.ensure([], () => r(require('./pages/goodOptions')), '/errorClass/good/options')
  },
  // 记错题组卷
  {
    path: 'errorClass/remember/assemble/:classCode/:subject',
    name: 'errorClassRemember_assemble',
    component: r => require.ensure([], () => r(require('./pages/rememberAssemble')), '/errorClass/remember/assemble')
  },
  // 精选题组卷
  {
    path: 'errorClass/good/assemble/:classCode/:subject',
    name: 'errorClassGood_assemble',
    component: r => require.ensure([], () => r(require('./pages/goodAssemble')), '/errorClass/good/assemble')
  },
  // 拍错题组卷
  {
    path: 'errorClass/camera/assemble/:classCode/:subject',
    name: 'errorClassCamera_assemble',
    component: r => require.ensure([], () => r(require('./pages/cameraAssemble')), '/errorClass/camera/assemble')
  }
]
