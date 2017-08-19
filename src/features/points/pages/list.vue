<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '积分明细'}"></x-header>
    <div>
      <template v-if="!loading && Points.list.list.length">
        <group :gutter='0'>
          <template v-for="(item, index) in Points.list.list ">
            <cell :key='index' :inline-desc='item.time | ymd' :value='item.points'></cell>
          </template>
        </group>
      </template>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
        <p v-if="Points.list.list.length == 0 && !loading" style="font-size:16px;padding:10px 0;color:#4cc0be">暂无更多数据了~</p>
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
    ...mapGetters(['Points'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getPointsList', 'clearPointsList']),
    _getData () {
      this.loading = true
      this.getPointsList().then((res) => {
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
