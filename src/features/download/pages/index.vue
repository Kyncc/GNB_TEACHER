<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '下载中心'}">
      <!--<p slot="right" @click="$router.push({name: 'invite_list'})">受邀好友</p>-->
    </x-header>
    <div>
     
    </div>
  </view-box>
</template>

<script>

import {XHeader, XButton, ViewBox, Flexbox, FlexboxItem} from 'vux'
import { MessageBox } from 'mint-ui'
import {mapGetters} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, XButton, ViewBox, Flexbox, FlexboxItem, MessageBox
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  methods: {
    _input () {
      MessageBox.prompt(' ', '输入好友邀请码').then(({ value, action }) => {
        console.log(action)
      }).catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tip{
  padding:1rem 0;
  font-size:normal;
  h4{font-size:.75rem;color:#4BB7AA}
  p{font-size:.8rem;}
}
.code{
  text-align:center;padding:1.5rem 0;
  line-height: 2rem;
  background: #fff;
  box-sizing: border-box;
  margin-bottom:3rem;
  border: 2px dashed #ccc;
}
.mint-msgbox-confirm{
  color:#4BB7AA !important;
}
.mint-msgbox-input input{
  box-sizing:border-box;
}
</style>
