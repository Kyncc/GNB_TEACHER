<template>
  <view-box v-ref:view-box class='myClass'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        班级列表
        <a slot="right"  v-link="{path: 'create'}">新建</a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <group>
        <div v-for="item in fetchClassList" class="cell" @click="_detail(item.classCode,item.name)">
          <span :class="(item.status == '1'?'vux-reddot':'')">{{item.name}}</span>
        </div>
      </group>

      <infinite-loading :on-infinite="_onInfinite" spinner="default">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">您还未创建班级~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>

    </div>
  </view-box>
</template>
<script>

import { XHeader,Group,ViewBox }from 'vux'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components: {XHeader,Group,ViewBox,InfiniteLoading},
  methods: {
    _detail(code,name) {
      // this.$router.go('/class/manager/'+code)
    },
    _onInfinite(){
    
    }
  }
}
</script>