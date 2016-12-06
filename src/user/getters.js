/** 用户信息*/
export const fetchUserInfo = (state) => state.info
/** token*/
export const fetchToken = (state) => state.login.token
/** 获取反馈信息列表*/
export const historyList = (state) => state.user.settings.adviceList
/** 获取用户信息*/
export const Userinfo = (state) => state.user.userinfo
/** 获取APP版本*/
export const versionCurrent = (state) => state.user.settings.version