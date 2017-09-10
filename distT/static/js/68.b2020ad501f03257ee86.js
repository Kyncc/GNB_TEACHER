webpackJsonp([68],{1019:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("keep-alive",[o("router-view")],1)},staticRenderFns:[]}},511:function(e,t,o){var a=o(50)(o(870),o(1019),null,null);e.exports=a.exports},791:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.HOMEWORK="HOMEWORK",t.HOMEWORK_RESET="HOMEWORK_RESET",t.HOMEWORK_SCROLL="HOMEWORK_SCROLL",t.WORKBOOK_IMAGE_UPLOAD="WORKBOOK_IMAGE_UPLOAD",t.WORKBOOK_IMAGE_RESET="WORKBOOK_IMAGE_RESET",t.HOMEWORK_IMAGE_DEL="HOMEWORK_IMAGE_DEL",t.HOMEWORK_IMAGE_ADD="HOMEWORK_IMAGE_ADD"},818:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.resetHomeworkImage=t.delHomeworkImage=t.addHomeworkImage=t.setHomeworkImage=t.clearHomework=t.setHomeworkScroll=t.addHomeworkClass=t.setHomeworkAudio=t.setHomework=t.getHomework=void 0;var u=o(129),n=a(u),r=o(791),d=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}(r),l=o(195),c=a(l),i=o(52),s=a(i);t.getHomework=function(e,t){var o=e.rootState,a=e.commit;return new n.default(function(e,u){(0,c.default)({method:"get",url:"homework/list",params:{token:o.common.user.token,subjectId:t.subjectId}}).then(function(o){a(d.HOMEWORK,{subjectId:t.subjectId,data:o.data.data}),e(o)}).catch(function(e){u(e)})})},t.setHomework=function(e,t){var o=e.rootState,a=e.state;e.dispatch;return s.default.$vux.loading.show({text:"请稍候"}),new n.default(function(e,u){(0,c.default)({method:"post",url:"homework/put",data:{token:o.common.user.token,subjectId:a.subjectId,classCodes:t.classCodes,data:{img:t.img||[],content:t.content||""}}}).then(function(t){s.default.$vux.loading.hide(),e(t)}).catch(function(e){s.default.$vux.loading.hide(),u(e)})})},t.setHomeworkAudio=function(e,t){var o=e.rootState,a=(e.commit,e.state);return s.default.$vux.loading.show({text:"请稍候"}),new n.default(function(e,u){var n=plus.uploader.createUpload("https://www.guinaben.com/teacher/homework/putAudio",{method:"POST"},function(t,o){200===o?(s.default.$vux.loading.hide(),e(t)):(s.default.$vux.loading.hide(),alert("Upload failed: "+o),u(o))});n.addFile(t.audio,{key:"audio"}),n.addData("subjectId",a.subjectId.toString()),n.addData("classCodes",t.classes.toString()),n.addData("token",o.common.user.token),n.start()})},t.addHomeworkClass=function(e,t){var o=e.rootState;e.state,e.dispatch;return s.default.$vux.loading.show({text:"请稍候"}),new n.default(function(e,a){(0,c.default)({method:"post",url:"homework/classAdd",data:{token:o.common.user.token,homeworkId:o.route.params.id,classCodes:t.classCodes}}).then(function(t){s.default.$vux.loading.hide(),e(t)}).catch(function(e){s.default.$vux.loading.hide(),s.default.$vux.toast.show({text:e.data.msg,type:"text",time:1e3,position:"bottom"}),a(e)})})},t.setHomeworkScroll=function(e,t){(0,e.commit)(d.HOMEWORK_SCROLL,t)},t.clearHomework=function(e){e.rootState;(0,e.commit)(d.HOMEWORK_RESET)},t.setHomeworkImage=function(e,t){(0,e.commit)(d.WORKBOOK_IMAGE_UPLOAD,t)},t.addHomeworkImage=function(e,t){(0,e.commit)(d.HOMEWORK_IMAGE_ADD,t)},t.delHomeworkImage=function(e,t){(0,e.commit)(d.HOMEWORK_IMAGE_DEL,t)},t.resetHomeworkImage=function(e){(0,e.commit)(d.WORKBOOK_IMAGE_RESET)}},819:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Homework=function(e){return e}},820:function(e,t,o){"use strict";function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}Object.defineProperty(t,"__esModule",{value:!0});var u,n=o(196),r=function(e){return e&&e.__esModule?e:{default:e}}(n),d=o(791),l=a(d),c=o(819),i=a(c),s=o(818),f=a(s),O={uploader:{list:[],camera:""},subjectId:2,scroll:0,list:[]},m=(u={},(0,r.default)(u,l.HOMEWORK,function(e,t){e.subjectId=t.subjectId,e.list=t.data}),(0,r.default)(u,l.HOMEWORK_SCROLL,function(e,t){e.scroll=t}),(0,r.default)(u,l.HOMEWORK_RESET,function(e,t){e.subjectId=2,e.scroll=0,e.list=[]}),(0,r.default)(u,l.HOMEWORK_IMAGE_DEL,function(e,t){e.uploader.list.splice(t,1)}),(0,r.default)(u,l.HOMEWORK_IMAGE_ADD,function(e,t){e.uploader.list.push(t),e.uploader.camera=""}),(0,r.default)(u,l.WORKBOOK_IMAGE_RESET,function(e){e.uploader.camera="",e.uploader.list=[]}),(0,r.default)(u,l.WORKBOOK_IMAGE_UPLOAD,function(e,t){e.uploader.camera=t}),u);t.default={state:O,getters:i,actions:f,mutations:m}},870:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=o(128),n=a(u),r=o(820),d=a(r),l=o(87),c=a(l);t.default={name:"homework",beforeCreate:function(){c.default.registerModule("homework",(0,n.default)({},d.default))}}}});