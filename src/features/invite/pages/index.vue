<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '邀请好友'}"></x-header>
    <div>
      asdasd
    </div>
  </view-box>
</template>

<script>

import {XHeader, Cell, Group, ViewBox, Flexbox, FlexboxItem} from 'vux'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, Cell, Group, ViewBox, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.about_footer{
  margin-top:.5rem;
  text-align:center;
  .about_footer__link{
    color:#555;
    font-size:.7rem;
  }
}
</style>
