// api env
const mock = 'http://rap.taobao.org/rap.plugin.js?projectId=6273';
const server = 'http://122.114.55.74:8070';
const version = '';

// http dispatch code
export const OK_CODE = 200;
export const UNAUTHORIZED_CODE = 401;

//change api
export const API_ENV = `${server}`;
export const API_VERSION = `${version}`;

// api path map
export const API_PATHS = {
  //短信
  getCode: `${API_ENV}${API_VERSION}/teacher/getCode`,
  //登陆
  login: `${API_ENV}${API_VERSION}/teacher/login`,
  addPwd: `${API_ENV}${API_VERSION}/teacher/pwd/add`,
  resetPwd: `${API_ENV}${API_VERSION}/teacher/pwd/resetByMobile`,
  //首页
  index: `${API_ENV}${API_VERSION}/teacher/index`,
  //收藏事件
  collectAdd: `${API_ENV}${API_VERSION}/teacher/collect/add`,
  collectRemove: `${API_ENV}${API_VERSION}/teacher/collect/remove`,
  //纠错
  correct: `${API_ENV}${API_VERSION}/teacher/correct`,
  //评注
  comment: `${API_ENV}${API_VERSION}/teacher/comment`,
  //习题获取
  exerciseList: `${API_ENV}${API_VERSION}/teacher/exerciseList`,
  //拍错题获取
  cameraList: `${API_ENV}${API_VERSION}/teacher/cameraList`,
  //收藏本
  collectExampleIds: `${API_ENV}${API_VERSION}/teacher/collect/example`,
  collectCameraIds: `${API_ENV}${API_VERSION}/teacher/collect/camera`,
   /**拍错题模块
   *  camera:拍错题搜索
   *  cameraImportant:拍错题设为例题
   *  cameraSearch:拍错题匹配
   *  cameraHistory:拍错题记录
   *  cameraRemove:例题删除
   */
   camera:`${API_ENV}${API_VERSION}/teacher/camera`,
   cameraImportant:`${API_ENV}${API_VERSION}/teacher/camera/important`,
   cameraMatch:`${API_ENV}${API_VERSION}/teacher/camera/match`,
   cameraHistory:`${API_ENV}${API_VERSION}/teacher/camera/list`,
   cameraRemove:`${API_ENV}${API_VERSION}/teacher/camera/remove`,
   /**归纳本模块
   *  error:归纳本首页获取数据
   *  errorList:归纳本错题列表
   *  errorMore:归纳本首更多习题
   *  errorRecommend:归纳本推荐习题
   */
   error:`${API_ENV}${API_VERSION}/teacher/error`,
   errorList:`${API_ENV}${API_VERSION}/teacher/error/list`,
   errorMore:`${API_ENV}${API_VERSION}/teacher/error/more`,
   errorRecommend:`${API_ENV}${API_VERSION}/teacher/error/recommend`,
   errorRecommendPost:`${API_ENV}${API_VERSION}/teacher/error/recommendPost`,
   /**互动模块
   * msgSystem:系统消息
   * msgClass:班级消息
   * msgCorrect:纠错消息
   */
  msg:`${API_ENV}${API_VERSION}/teacher/message`,
  msgSystem:`${API_ENV}${API_VERSION}/teacher/message/system`,
  msgClass:`${API_ENV}${API_VERSION}/teacher/message/class`,
  msgCorrect:`${API_ENV}${API_VERSION}/teacher/message/correct`,
  //获取用户信息
  getUserInfo: `${API_ENV}${API_VERSION}/teacher/user/getUserInfo`,
  //编辑用户信息
  updateUserInfo: `${API_ENV}${API_VERSION}/teacher/user/updateUserInfo`,
  //获取班级列表
  myClassList: `${API_ENV}${API_VERSION}/teacher/class/myClassList`,
  //创建班级
  createClass: `${API_ENV}${API_VERSION}/teacher/class/createClass`,
  //班级成员名单
  myClassmateList: `${API_ENV}${API_VERSION}/teacher/class/myClassmateList`,
  applyList: `${API_ENV}${API_VERSION}/teacher/class/applyList`,
  //修改密码
  updatePwd: `${API_ENV}${API_VERSION}/teacher/user/updatePwd`,
  //反馈
  advice: `${API_ENV}${API_VERSION}/teacher/user/advice`,
  //反馈历史
  adviceHistory: `${API_ENV}${API_VERSION}/teacher/user/adviceHistory`,
  //受邀同学
  getInviteteacherList: `${API_ENV}${API_VERSION}/teacher/user/invite/getInviteteacherList`,
  //绑定邀请码
  bindInviteCode: `${API_ENV}${API_VERSION}/teacher/user/invite/bindInviteCode`,
  //获取邀请码
  getInviteCode: `${API_ENV}${API_VERSION}/teacher/user/invite/getInviteCode`,
  //积分账单
  numerical: `${API_ENV}${API_VERSION}/teacher/member/numerical/history`,
  //我的账单
  payList: `${API_ENV}${API_VERSION}/teacher/member/payList`,
  //会员信息
  member: `${API_ENV}${API_VERSION}/teacher/member`,
  //退出
  quitToken: `${API_ENV}${API_VERSION}/teacher/quitToken`,
  //检查版本
  updateVersion: `${API_ENV}${API_VERSION}/teacher/updateVersion`,
  //编辑头像
  headImg: `${API_ENV}${API_VERSION}/teacher/user/headImg`,
}
