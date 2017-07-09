webpackJsonp([55],{505:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(830),a=r.n(o),n=r(834),u=r(50),c=u(a.a,n.a,null,null,null);e.default=c.exports},748:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.ERROR_CLASSMATE="ERROR_CLASSMATE",e.ERROR_CLASSMATE_SCROLL="ERROR_CLASSMATE_SCROLL",e.ERROR_CLASSMATE_RELOAD="ERROR_CLASSMATE_RELOAD",e.ERROR="ERROR",e.ERROR_SCROLL="ERROR_SCROLL",e.ERROR_RELOAD="ERROR_RELOAD",e.ERROR_ERROR_TYPE="ERROR_ERROR_TYPE",e.ERROR_COMMENT="ERROR_COMMENT",e.ERROR_COMMENT_POST="ERROR_COMMENT_POST",e.ERROR_COMMENT_RESET="ERROR_COMMENT_RESET"},830:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=r(181),n=o(a),u=r(831),c=o(u),R=r(128),d=o(R);e.default={name:"error",beforeCreate:function(){d.default.registerModule("error",(0,n.default)({},c.default))}}},831:function(t,e,r){"use strict";function o(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}Object.defineProperty(e,"__esModule",{value:!0});var a,n=r(186),u=function(t){return t&&t.__esModule?t:{default:t}}(n),c=r(748),R=o(c),d=r(832),l=o(d),s=r(833),i=o(s),f={classmate:{list:[],scroll:0},error:{list:[],subjectId:2,offset:"",scroll:0},comment:{content:"",audio:""}},E=(a={},(0,u.default)(a,R.ERROR_CLASSMATE,function(t,e){t.classmate.list=e.data}),(0,u.default)(a,R.ERROR_CLASSMATE_SCROLL,function(t,e){t.classmate.scroll=e.height}),(0,u.default)(a,R.ERROR_CLASSMATE_RELOAD,function(t){t.classmate.list=[],t.classmate.scroll=0}),(0,u.default)(a,R.ERROR,function(t,e){t.error.offset=e.data.offset,t.error.subjectId=e.subjectId,t.error.list?t.error.list=t.error.list.concat(e.data.list):t.error.list=t.error.list}),(0,u.default)(a,R.ERROR_SCROLL,function(t,e){t.error.scroll=e.height}),(0,u.default)(a,R.ERROR_RELOAD,function(t,e){t.error.list=[],t.error.offset="",t.error.scroll=0,t.error.subjectId=2}),(0,u.default)(a,R.ERROR_ERROR_TYPE,function(t,e){t.error.list[e.index].errorType=Number(e.type)}),(0,u.default)(a,R.ERROR_COMMENT,function(t,e){t.comment.audio=e.data.audioUrl,t.comment.content=e.data.content}),(0,u.default)(a,R.ERROR_COMMENT_RESET,function(t){t.comment.audio="",t.comment.content=""}),(0,u.default)(a,R.ERROR_COMMENT_POST,function(t,e){t.error.list[e.index].comment=!0}),a);e.default={state:f,mutations:E,getters:l,actions:i}},832:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.errorClassmate=function(t){return t.classmate},e.errorList=function(t){return t.error},e.errorComment=function(t){return t.comment}},833:function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.clearErrorClassmate=e.setErrorClassmateScroll=e.clearErrorComment=e.setErrorComment=e.getErrorComment=e.getErrorClassmate=e.clearError=e.setErrorScroll=e.setErrorType=e.getError=void 0;var a=r(127),n=o(a),u=r(185),c=o(u),R=r(748),d=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e}(R),l=r(59),s=o(l);e.getError=function(t,e){var r=t.rootState,o=t.commit;t.state;return new n.default(function(t,a){(0,c.default)({method:"get",url:"error/list",params:{offset:r.error.error.offset,token:r.common.user.token,subject_id:e.subjectId,studentId:r.route.params.studentId}}).then(function(r){o(d.ERROR,{subjectId:e.subjectId,data:r.data.data}),t(r)}).catch(function(t){a(t)})})},e.setErrorType=function(t,e){var r=t.rootState,o=t.commit;t.state;return new n.default(function(t,a){(0,c.default)({method:"post",url:"error/type",data:{token:r.common.user.token,studentId:r.route.params.studentId,wbeid:e.wbeid,chapterId:e.chapterId,type:e.type}}).then(function(r){o(d.ERROR_ERROR_TYPE,{index:e.index,type:e.type}),t(r)}).catch(function(t){a(t)})})},e.setErrorScroll=function(t,e){(0,t.commit)(d.ERROR_SCROLL,{height:e})},e.clearError=function(t){t.rootState;(0,t.commit)(d.ERROR_RELOAD)},e.getErrorClassmate=function(t,e){var r=t.rootState,o=t.commit;t.state;return new n.default(function(t,e){(0,c.default)({method:"get",url:"class/classmate/all",params:{token:r.common.user.token}}).then(function(e){o(d.ERROR_CLASSMATE,{data:e.data.data}),t(e)}).catch(function(t){e(t)})})},e.getErrorComment=function(t,e){var r=t.rootState,o=t.commit;t.state;return s.default.$vux.loading.show({text:"请稍候"}),new n.default(function(t,e){(0,c.default)({method:"get",url:"error/getComment",params:{token:r.common.user.token,studentId:r.route.params.studentId,wbeid:r.route.params.wbeid,chapterId:r.route.params.chapterId}}).then(function(e){o(d.ERROR_COMMENT,{data:e.data.data}),s.default.$vux.loading.hide(),t(e)}).catch(function(t){s.default.$vux.loading.hide(),e(t)})})},e.setErrorComment=function(t,e){var r=t.rootState,o=t.commit;t.state;return s.default.$vux.loading.show({text:"请稍候"}),new n.default(function(t,a){var n=plus.uploader.createUpload("https://www.guinaben.com/teacher/error/comment",{method:"POST"},function(e,n){200===n?(s.default.$vux.loading.hide(),o(d.ERROR_COMMENT_POST,{index:r.route.query.index}),t(e)):(s.default.$vux.loading.hide(),alert("Upload failed: "+n),a(n))}),u=plus.io.convertLocalFileSystemURL(e.audio);n.addFile(u,{key:"audio"}),n.addData("studentId",r.route.params.studentId),n.addData("wbeid",r.route.params.wbeid+""),n.addData("token",r.common.user.token),n.addData("content",e.content),n.addData("chapterId",r.route.params.chapterId),n.start()})},e.clearErrorComment=function(t){(0,t.commit)(d.ERROR_COMMENT_RESET)},e.setErrorClassmateScroll=function(t,e){(0,t.commit)(d.ERROR_CLASSMATE_SCROLL,{height:e})},e.clearErrorClassmate=function(t){(0,t.commit)(d.ERROR_CLASSMATE_RELOAD)}},834:function(t,e,r){"use strict";var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("keep-alive",[r("router-view")],1)},a=[];e.a={render:o,staticRenderFns:a}}});