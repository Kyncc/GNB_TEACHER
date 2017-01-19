<template>
  <router-view keep-alive></router-view>
  <tabbar slot="bottom" class="homepage" v-show="isRoot">
    <tabbar-item link="index" :selected="indexState">
      <i slot="icon" class="icon iconfont icon-brush"></i>
      <span slot="label">主页</span>
    </tabbar-item>
    <tabbar-item link="bag" :selected="bagState">
      <i slot="icon" class="icon iconfont icon-bag"></i>
      <span slot="label">题型</span>
    </tabbar-item>
    <tabbar-item link="classes" :selected="interactState">
      <i slot="icon" class="icon iconfont icon-comment2"></i>
      <span slot="label">班级</span>
    </tabbar-item>
    <tabbar-item link="user" :selected="userState">
      <i slot="icon" class="icon iconfont icon-user"></i>
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
</template>
<script>

import { Tabbar, TabbarItem,ViewBox } from 'vux'
import { mapActions,mapGetters} from 'vuex'

export default {
  components: {
    Tabbar,TabbarItem, ViewBox
  },
  methods: {
    ...mapActions(['getUserInfo']),
    _checkMain(){
      this.indexState = this.interactState = this.userState = this.bagState = this.isRoot = false;
      if(this.path == '/index'){
          this.isRoot = this.indexState = true;
      }else if(this.path == '/classes'){
          this.isRoot = this.interactState = true;
      }else if(this.path == '/user'){
          this.isRoot = this.userState = true;
      }else if(this.path == '/bag'){
          this.isRoot = this.bagState = true;
      }
    }
  },
  data(){
     return{
          isRoot:true,
      }
  },
  created(){
      // ( this.userMobile.length ==0 ? this.getUserInfo({token: this.token}) : '' )
  },
  watch:{
    path(){
      this._checkMain();
    }
  },
  computed:{
     ...mapGetters(['path','User','token']),
     indexState(){
       return (this.path.indexOf('index') >= 0 ? true : false);
     },
     interactState(){
       return (this.path.indexOf('interact') >= 0 ? true : false);
     },
     userState(){
       return (this.path.indexOf('user') >= 0 ? true : false);
     },
     bagState(){
       return (this.path.indexOf('bag') >= 0 ? true : false);
     }
  }
}

</script>

<style lang="less" >
.homepage{
   .weui_bar_item_on{
     .iconfont{color:#4bb7aa}
     .weui_tabbar_label{color:#4bb7aa}
   }
   .weui_tabbar_item {padding:3px 0 0;}
   .iconfont{font-size:23px;color:#999;}
   .weui_tabbar_label{font-size:14px;margin-top:2px;}
}
</style>