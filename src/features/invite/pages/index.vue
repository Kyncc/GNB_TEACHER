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
        <flexbox-item :span="10" class='code' @click.native='showAction = true'>
          <h4>我的邀请码</h4>
          <p>{{Invite.inviteCode}}</p>
          <x-button type="primary" plain mini >分享邀请码</x-button>
        </flexbox-item>
      </flexbox>
      <flexbox justify='center' style='margin-top:.5rem;' v-if='!Invite.isInvited'>
        <flexbox-item :span="10">
          <x-button type="default" @click.native='_input'>输入好友邀请码</x-button>
        </flexbox-item>
      </flexbox>
    </div>
    <actionsheet v-model="showAction" :menus="menus" @on-click-menu="_menuClick"></actionsheet>
  </view-box>
</template>

<script>

import { Actionsheet, XHeader, XButton, ViewBox, Flexbox, FlexboxItem } from 'vux'
import { MessageBox } from 'mint-ui'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    Actionsheet, XHeader, XButton, ViewBox, Flexbox, FlexboxItem, MessageBox
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  data () {
    return {
      showAction: false,
      menus: {
        qq: '分享给QQ好友',
        wechat: '分享给微信好友'
      }
    }
  },
  methods: {
    ...mapActions(['getInvite', 'setInviteCode']),
    _menuClick (val) {
      let shares = {}
      // 注册分享服务
      plus.share.getServices((s) => {
        for (var i in s) {
          var t = s[i]
          shares[t.id] = t
        }
      }, (e) => {
        console.log(e)
      })
      // 配置分享
      let msg = {
        content: '分享-详情',
        href: 'http://blog.csdn.net/zhuming3834',
        title: 'HGDQ-分享测试-title',
        thumbs: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
        pictures: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
        extra: {
          scene: val === 'qq' ? '' : 'WXSceneSession'
        }
      }
      if (val === 'qq') {
        shares = shares[1]
      } else {
        shares = shares[0]
      }
      if (shares.authenticated) {
        console.log('---已授权---')
        shares.send(msg, () => {
          console.log('分享成功!')
        }, (e) => {
          console.log('分享失败!')
        })
      } else {
        console.log('---未授权---')
        shares.authorize(() => {
          shares.send(msg, () => {
            console.log('分享成功!')
          }, (e) => {
            console.log('分享失败!')
          })
        })
      }
    },
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
  margin-bottom: 3rem;
  border: 2px dashed #ccc;
}
</style>
