<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '邀请好友'}">
      <p slot="right" @click="$router.push({name: 'invite_list'})">受邀好友</p>
    </x-header>
    <div>
      <flexbox justify='center' class='tip'>
        <flexbox-item :span="11">
          <h4>提示:</h4>
          <p>邀请好友安装归纳本APP，并在本界面填写您的邀请码，您和您的好友均可获得50积分。</p>
        </flexbox-item>
      </flexbox>
      <flexbox justify='center'>
        <flexbox-item :span="10"  class='code'> 
          <h4>我的邀请码</h4>
          <p>{{Invite.inviteCode}}</p>
          <x-button type="primary" plain mini>分享邀请码</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox justify='center' style='margin-top:.5rem;' v-if='!Invite.isInvited'>
        <flexbox-item :span="10">
          <x-button type="default" @click.native='_input'>输入好友邀请码</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </view-box>
</template>

<script>

import {XHeader, XButton, ViewBox, Flexbox, FlexboxItem} from 'vux'
import { MessageBox } from 'mint-ui'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, XButton, ViewBox, Flexbox, FlexboxItem, MessageBox
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  methods: {
    ...mapActions(['getInvite', 'setInviteCode']),
    _input () {
      MessageBox.prompt(' ', '输入好友邀请码').then(({ value, action }) => {
        this.setInviteCode({code: value})
      }).catch(() => {

      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'user') {
      next(vm => {
        vm.getInvite()
      })
    } else {
      next()
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
</style>
