webpackJsonp([18],{"0dyb":function(t,e,r){e=t.exports=r("FZ+f")(!1),e.push([t.i,"\n.weui-panel[data-v-5ead4234]{\r\n  margin-top:-1px !important;\n}\r\n",""])},"7xrM":function(t,e,r){"use strict";function i(t){r("xW8f")}Object.defineProperty(e,"__esModule",{value:!0});var o=r("Dd8w"),s=r.n(o),a=r("UIMx"),n=r("dgEa"),l=r("rHil"),c=r("1DHf"),d=r("dQSc"),u=r("YxJB"),m=r("3Lt7"),p=r("2sLL"),b=r("2FOq"),v=r("63CM"),f=r.n(v),x=r("NYxO"),h={name:"number",components:{Tabbar:a.a,TabbarItem:n.a,Group:l.a,Cell:c.a,XButton:p.a,Flexbox:u.a,FlexboxItem:m.a,Card:d.a,Previewer:b.a},computed:s()({},Object(x.mapGetters)(["Route","workbookExercise"]),{exercise:function(){return this.workbookExercise.list.a},isRead:function(){return this.workbookExercise.list.isRead}}),data:function(){return{list:[{w:0,h:0,src:""}],options:{preload:[1,1],bgOpacity:1,fullscreenEl:!1,history:!0}}},directives:{TransferDom:f.a},methods:s()({},Object(x.mapActions)(["WorkbookExercisePost","setWorkbookExersciseScroll","setWorkbookExerciseRead"]),{_post:function(){this.setWorkbookExerciseRead()},_goErrorPhoto:function(t){t.number?this.$router.push({name:"workbook_exercise_error",params:{chapterId:this.Route.params.chapterId,wbeid:t.wbeid}}):this.$vux.toast.show({text:"暂无学生错误",type:"text",time:1e3,position:"bottom"})},show:function(t){var e=this;this.list[0].w=t.width,this.list[0].h=t.height,this.list[0].src=t.url,this.$nextTick(function(){e.$refs.previewer.show(0)})}})},_=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t._l(t.exercise,function(e,i){return r("div",{key:i},[e.b[0]&&"1"==e.b[0].type?t._l(e.b,function(e){return r("group",{key:e.id,attrs:{title:e.name}},t._l(e.c,function(e){return r("card",{key:e.id,nativeOn:{click:function(r){t.show(e.img)}}},[r("div",{attrs:{slot:"content"},slot:"content"},[r("div",[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img.url+"-errorList",expression:"itemC.img.url+'-errorList'"}]})])]),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("div",{staticClass:"weui-cell weui-cell_link",staticStyle:{padding:".6rem"}},[r("div",{staticClass:"weui-cell__bd",staticStyle:{color:"#feaa85"}},[t._v("错"+t._s(e.number)+"人")])])])])}))}):e.b[0]&&"2"==e.b[0].type?[r("group",{attrs:{title:e.name}},t._l(e.b,function(e){return r("card",{key:e.id,nativeOn:{click:function(r){t.show(e.img)}}},[r("div",{attrs:{slot:"content"},slot:"content"},[r("div",[r("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.img.url+"-errorList",expression:"itemB.img.url+'-errorList'"}]})])]),t._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("div",{staticClass:"weui-cell weui-cell_link",staticStyle:{padding:".6rem"}},[r("div",{staticClass:"weui-cell__bd",staticStyle:{color:"#feaa85"}},[t._v("错"+t._s(e.number)+"人")])])])])}))]:t._e()],2)}),t._v(" "),t.workbookExercise.notPost.length?r("group",{attrs:{title:"未提交作业学生"}},[r("flexbox",{attrs:{gutter:0,wrap:"wrap"}},t._l(t.workbookExercise.notPost,function(e,i){return r("flexbox-item",{key:i,attrs:{span:.25}},[r("div",{staticStyle:{padding:".5rem"}},[t._v(t._s(e))])])}))],1):t._e(),t._v(" "),r("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[t.exercise?r("tabbar",["workbook_exercise_number"===t.$route.name?r("tabbar-item",{staticStyle:{"line-height":"42px",height:"42px"}},[r("div",{staticStyle:{"line-height":"42px",height:"42px"},attrs:{slot:"label"},slot:"label"},[r("x-button",{staticStyle:{"border-radius":"0"},attrs:{disabled:t.isRead,type:"primary"},nativeOn:{click:function(e){t._post(e)}}},[t._v("已阅")])],1)]):t._e()],1):t._e()],1),t._v(" "),r("div",{directives:[{name:"transfer-dom",rawName:"v-transfer-dom"}]},[r("previewer",{ref:"previewer",attrs:{list:t.list,options:t.options}})],1)],2)},w=[],k={render:_,staticRenderFns:w},y=k,g=r("VU/8"),E=i,S=g(h,y,!1,E,"data-v-5ead4234",null);e.default=S.exports},xW8f:function(t,e,r){var i=r("0dyb");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);r("rjj0")("061346b9",i,!0)}});