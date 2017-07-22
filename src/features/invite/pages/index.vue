<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '邀请好友'}">
      <p slot="right" @click="$router.push({name: 'invite_list'})">受邀好友</p>
    </x-header>
    <div>
      <flexbox justify='center' class='tip'>
        <flexbox-item :span="11">
          <h4>提示:</h4>
          <p>邀请好友安装归纳本APP，并在本界面填写您的邀请码。</p>
        </flexbox-item>
      </flexbox>
      <flexbox justify='center'>
        <flexbox-item :span="10" class='code' @click.native='showAction = true'>
          <h4>我的邀请码</h4>
          <p>{{Invite.inviteCode}}</p>
          <x-button type="primary" plain mini @click='showAction = true'>分享邀请码</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox justify='center' style='margin-top:.5rem;'>
        <flexbox-item :span="10">
          <x-button type="default" @click.native='_input' :disabled='Invite.isInvited'>输入好友邀请码</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href="share.href+Invite.inviteCode"></share>
  </view-box>
</template>

<script>
import { XHeader, XButton, ViewBox, Flexbox, FlexboxItem } from 'vux'
import { MessageBox } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'
import Share from '@/components/share'

export default {
  name: 'index',
  components: {
    XHeader, XButton, ViewBox, Flexbox, FlexboxItem, MessageBox, Share
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  data () {
    return {
      showAction: false,
      share: {
        content: '好东西，自然与朋友共分享',
        title: '帮老师批改作业，替学生归纳错题',
        href: `http://share.guinaben.com/#/invite?code=`
      }
    }
  },
  methods: {
    ...mapActions(['getInvite', 'setInviteCode']),
    _input () {
      MessageBox.prompt(' ', '输入好友邀请码').then(({ value, action }) => {
        this.setInviteCode({ code: value })
      }).catch(() => {})
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
  },
  beforeRouteLeave (to, from, next) {
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style lang="less" scoped>
.tip {
  padding: 1rem 0;
  font-size: normal;
  h4 {
    font-size: .75rem;
    color: #4BB7AA
  }
  p {
    font-size: .8rem;
  }
}
.code {
  text-align: center;
  padding: 1.5rem 0;
  line-height: 2rem;
  background: #fff;
  box-sizing: border-box;
  margin: 2rem 0;
  border: 2px dashed #ccc;
}
.weui-btn_disabled.weui-btn_default{
  color:#fff;
  background:#ccc;
}
</style>
