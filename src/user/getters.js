/*用户信息*/
export const fetchUserInfo = (state) => state.user.info
/*token*/
export const fetchToken = (state) => state.login.userInfo.token
//获取班级信息
export const fetchHistory = (state) => state.user.adviceList
//受邀好友列表
export const fetchInviteStudentList = (state) => state.user.inviteStudentList
//邀请码
export const fetchInviteCode = (state) => state.user.inviteCode
//我的积分
export const fetchNumericalList = (state) => state.user.numericalList
//我的积分
export const fetchBilllList = (state) => state.user.myBillList
//会员信息
export const fetchMemberInfo = (state) => state.user.memberInfo
//会员信息
export const fetchVersion = (state) => state.user.version
