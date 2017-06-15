<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '组卷中心'}">
        <div slot="right"  @click="_add">
          <i class="icon iconfont icon-book" style="padding:10px;margin:0 -10px 0 0"></i>
          筛选
        </div>
      </x-header>
      <tab>
        <tab-item :selected="Route.name === 'assemble_sync'" @click.native="$router.replace('assemble_sync')">同步题型</tab-item>
        <template v-if="User.subjectType.length > 1">
          <tab-item :selected="Route.name === 'assemble_gaokao'" @click.native="$router.replace('assemble_gaokao')">高考题型</tab-item>
        </template>
      </tab>
    </div>
    <div style="padding-top:46px;">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'center',
  components: {
    XHeader, ViewBox, Tab, TabItem
  },
  computed: {
    ...mapGetters(['Route'])
  },
  methods: {
    _add () {
    }
  }
}
</script>
