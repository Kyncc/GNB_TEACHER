export const toastMsg = (state) => state.Global.toastMsg
export const toastShow = (state) => state.Global.toastShow
export const isLoading = (state) => state.Global.isLoading
export const period_id = (state) => state.Global.period_id
export const subject_id = (state) => state.Global.subject_id
export const userSubjectList = (state) => state.Global.subjectType
export const userGrade = (state) => state.Global.grade
export const exampleDetail = (state) => state.Global.example


export const system = (state) => state.Global.system
export const token = (state) => state.login.token
export const userHeadImg = (state) => state.login.headImg
export const userName = (state) => state.login.name

export const id = (state) => state.route.params.id
export const code = (state) => state.route.params.code
export const cameraId = (state) => state.route.params.cameraId
export const chapterId = (state) => state.route.params.chapterId
export const subjectId = (state) => state.route.params.subjectId
export const studentId = (state) => state.route.params.studentId