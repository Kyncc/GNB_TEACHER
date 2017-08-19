<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '排行榜'}"></x-header>
    <div>
      <group :gutter='0'>
        <cell title='周杰伦' inline-desc='芜湖三宝网络科技' value='8888'>
          <p slot="icon">
            <span style="display:inline-block;font-size:30px;padding:0 .5rem;color:#ff5722;float:left">1</span>
            <img width="50" height="50" style="display:inline-block;margin:0 10px;border-radius:50%;background:#ddd"/>
          </p>
        </cell>
        <cell title='周杰伦' inline-desc='芜湖三宝网络科技' value='8888'>
          <p slot="icon">
            <span style="display:inline-block;font-size:25px;padding:0 .35rem 0 0;color:#ff5722;float:left">1</span>
            <img width="40" height="40" style="display:inline-block;margin:0 10px;border-radius:50%;background:#ddd"/>
          </p>
        </cell>
      </group>
      <template v-if="!loading && Points.rask.length">
        <group :gutter='0'>
          <template v-for="(item, index) in Points.rask">
            <cell :key='index' v-if='index <=3'>
              <img slot="icon" width="30" height="30" style="display:block;margin:0 10px;border-radius:50%;background:#ddd" v-lazy="item.headImg">
              <div slot="after-title">{{item.name}}</div>
            </cell>
          </template>
        </group>
      </template>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
        <!-- <p v-if="Points.list.length == 0 && !loading" style="font-size:16px;padding:10px 0;color:#4cc0be">暂无邀请好友~</p> -->
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Spinner, Group, Cell, ViewBox} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'rask',
  components: {
    XHeader, Spinner, Group, Cell, ViewBox
  },
  computed: {
    ...mapGetters(['Points'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getPointsRask', 'clearPointsList']),
    _getData () {
      this.loading = true
      this.getPointsRask().then((res) => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearPointsList()
      vm._getData()
    })
  }
}
</script>
