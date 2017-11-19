<template>
  <div style="height:100%">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="50px">
      <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
        <x-header :left-options="{backText: this.$route.params.name}">
          <div slot="right" v-if="$route.name  === 'errorClassGood'">
            <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0" @click="$router.push({name:'errorClassGood_options'})"></i>
          </div>
          <div slot="right" v-if="$route.name  === 'errorClassRemember'">
            <i class="icon iconfont icon-filter" style="padding:10px;margin:0 -10px 0 0" @click="$router.push({name:'errorClassRemember_options'})"></i>
          </div>
        </x-header>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <tabbar slot="bottom" class="homepage" style="z-index:2;">
        <tabbar-item :selected="$route.name === 'errorClassRemember'" @click.native="_toPage('errorClassRemember')">
          <i slot="icon" :class="'icon iconfont icon-jinrulianxi '+($route.name  === 'errorClassRemember' ? 'icon-active' : '')"></i>
          <span slot="label">记错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name === 'errorClassCamera'" @click.native="_toPage('errorClassCamera')">
          <i slot="icon" :class="'icon iconfont icon-camera '+($route.name  === 'errorClassCamera' ? 'icon-active' : '')"></i>
          <span slot="label">拍错题</span>
        </tabbar-item>
        <tabbar-item :selected="$route.name  === 'errorClassGood'" @click.native="_toPage('errorClassGood')">
          <i slot="icon" :class="'icon iconfont icon-bag1 '+($route.name  === 'errorClassGood' ? 'icon-active' : '')"></i>
          <span slot="label">精选练习</span>
        </tabbar-item>
      </tabbar>
    </view-box>
    <!--组卷个数 -->
    <template v-if="$route.name  === 'errorClassRemember'">
      <div class='assembleCount'
        @click="$router.push({name: 'errorClassRemember_assemble', params: {classCode: $route.params.classCode}})">
        已选<br/>{{ErrorclassRemember.count}}
      </div>
    </template>
     <template v-else-if="$route.name  === 'errorClassCamera'">
      <div class='assembleCount'
        @click="$router.push({name: 'errorClassCamera_assemble', params: {classCode: $route.params.classCode}})">
        已选<br/>{{ErrorclassCamera.count}}
      </div>
    </template>
    <template v-else-if="$route.name  === 'errorClassGood'">
      <div class='assembleCount'
        @click="$router.push({name: 'errorClassGood_assemble', params: {classCode: $route.params.classCode}})">
        已选<br/>{{ErrorclassGood.count}}
      </div>
    </template>
  </div>
</template>

<script>
import {XHeader, Tabbar, TabbarItem, ViewBox} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'error',
  components: {
    XHeader, Tabbar, TabbarItem, ViewBox
  },
  computed: {
    ...mapGetters(['Route', 'ErrorclassCamera', 'ErrorclassGood', 'ErrorclassRemember'])
  },
  methods: {
    _toPage (name) {
      this.$router.replace({name: name, params: {name: this.Route.params.name, chapterId: this.Route.params.chapterId, subject: this.Route.params.subject}})
    }
  }
}
</script>

<style lang="less" scoped>
.homepage{
   .weui_tabbar_label{font-size:14px;margin-top:2px;}
   .weui-tabbar__icon .iconfont{
    position: relative;
    left: 1px;
    top: -2px;
   }
   .icon-active {
     color:#4cc0be;
   }
}
.assembleCount{
  position: fixed;
  background:#4cc0be;
  color:#fff;
  font-size: .9rem;
  height: 3.5rem;
  width: 3.5rem;
  box-sizing: border-box;
  padding:.5rem .75rem;
  border-radius: 50%;
  bottom: 10%;
  right: 5%;
  box-shadow: 2px 2px 7px #4cc0be;
  text-align: center;
}
</style>
