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
      shares: {},
      sharesList: [{
        id: 'weixin',
        ex: 'WXSceneSession'
      }, {
        id: 'weixin',
        ex: 'WXSceneTimeline'
      }, {
        id: 'qq'
      }],
      menus: {
        qq: '分享给QQ好友',
        wechat: '分享给微信好友',
        wechatTimeLine: '分享到朋友圈'
      }
    }
  },
  methods: {
    ...mapActions(['getInvite', 'setInviteCode']),
    shareAction (id, ex) {
      var s = null
      if (!id || !(s = this.shares[id])) {
        this.$vux.toast.show({text: '无效的分享服务！', type: 'text', time: 1000, position: 'bottom'})
        return
      }
      if (s.authenticated) {
        this.$vux.toast.show({text: '已授权', type: 'text', time: 1000, position: 'bottom'})
        this.shareMessage(s, ex)
      } else {
        this.$vux.toast.show({text: '未授权', type: 'text', time: 1000, position: 'bottom'})
        s.authorize(() => {
          this.shareMessage(s, ex)
        }, (e) => {
          this.$vux.toast.show({text: '认证授权失败', type: 'text', time: 1000, position: 'bottom'})
        })
      }
    },
    /**
     * 发送分享消息
     */
    shareMessage (s, ex) {
      var msg = {
        href: 'http://blog.csdn.net/zhuming3834',
        title: 'HGDQ-分享测试-title',
        content: 'HGDQ-分享测试-content',
        thumbs: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
        pictures: ['http://img3.3lian.com/2013/v10/4/87.jpg'],
        extra: {
          scene: ex
        }
      }
      s.send(msg, () => {
        this.$vux.toast.show({text: '分享成功', type: 'text', time: 1000, position: 'bottom'})
      }, (e) => {
        this.$vux.toast.show({text: '取消分享', type: 'text', time: 1000, position: 'bottom'})
      })
    },
    _menuClick (val) {
      let index
      if (val === 'qq') {
        index = 2
      } else if (val === 'wechat') {
        index = 0
      } else {
        index = 1
      }
      this.shareAction(this.sharesList[index].id, this.sharesList[index].ex)
    },
    _input () {
      MessageBox.prompt(' ', '输入好友邀请码').then(({ value, action }) => {
        this.setInviteCode({ code: value })
      }).catch(() => {})
    }
  },
  created () {
    try {
      plus.share.getServices((s) => {
        this.shares = {}
        for (var i in s) {
          let t = s[i]
          this.shares[t.id] = t
        }
        this.$vux.toast.show({text: '获取分享服务列表成功', type: 'text', time: 1000, position: 'bottom'})
      }, (e) => {
        this.$vux.toast.show({text: '获取分享服务列表失败：' + e.message, type: 'text', time: 1000, position: 'bottom'})
      })
    } catch (e) {
      console.log(e)
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
