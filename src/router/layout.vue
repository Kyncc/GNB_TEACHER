<template>
  <router-view keep-alive></router-view>
  <tabbar slot="bottom" class="homepage" v-show="isRoot">
    <tabbar-item link="index" :selected="indexState">
      <i slot="icon" class="icon iconfont icon-home"></i>
      <span slot="label">主页</span>
    </tabbar-item>
    <!--<tabbar-item link="bag" :selected="bagState">
      <i slot="icon" class="icon iconfont icon-bag"></i>
      <span slot="label">题型</span>
    </tabbar-item>-->
    <tabbar-item link="classes" :selected="classesState">
      <i slot="icon" class="icon iconfont icon-yuanxiaobanji"></i>
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
    ...mapActions(['getUserInfo'])
  },
  ready(){
    this.getUserInfo();
  },
  computed:{
     ...mapGetters(['path']),
     isRoot(){
       return (this.indexState || this.classesState || this.userState ? true : false);
     },
     indexState(){
       return (this.path == '/main/index' ? true : false);
     },
     classesState(){
       return (this.path == '/main/classes' ? true : false);
     },
     userState(){
       return (this.path == '/main/user' ? true : false);
     },
     bagState(){
       return (this.path == '/main/bag' ? true : false);
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