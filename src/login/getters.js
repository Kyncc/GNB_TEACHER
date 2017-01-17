/*用户登陆*/
export const userInfo = (state) => state.userInfo
/*手机号注册*/
export const registerCode = (state) => state.login.register.code
export const registerMobile = (state) => state.login.register.mobile
export const registerStudent = (state) => state.login.register.isStudent
/*手机号重置*/
export const forgetCode = (state) => state.login.forget.code
export const forgetMobile = (state) => state.login.forget.mobile



