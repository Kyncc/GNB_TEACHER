<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '受邀好友'}"></x-header>
    <div>
      <template v-if="!loading && Invite.list.length">
        <group title="邀请列表">
          <template v-for="(item, index) in Invite.list">
            <cell>
              <img slot="icon" width="30" height="30" style="display:block;margin-right:5px;border-radius:50%;background:#ddd" v-lazy="item.headImg">
              <div slot="after-title">{{item.name}}</div>
            </cell>
          </template>
        </group>
      </template>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
        <p v-if="Invite.list.length == 0 && !loading" style="font-size:16px;padding:10px 0;color:#4BB7AA">暂无邀请好友~</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Spinner, Group, Cell, ViewBox} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'list',
  components: {
    XHeader, Spinner, Group, Cell, ViewBox
  },
  computed: {
    ...mapGetters(['Invite'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getInviteList', 'setInviteListClear']),
    _getData () {
      this.loading = true
      this.getInviteList().then((res) => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.setInviteListClear()
      vm._getData()
    })
  }
}
</script>
