<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '积分明细'}"></x-header>
    <div>
      <template v-if="Points.list.list">
        <group :gutter='0'>
          <template v-for="(item, index) in Points.list.list">
            <cell :key='index' :inline-desc='item.time | ymd' :title='item.name'>
              <div style='color:#4cc0be;' slot='value'>
                +{{item.points}}
              </div>
            </cell>
          </template>
        </group>
      </template>
      <infinite-loading @infinite="_onInfinite" ref="infiniteLoading" style='padding:0 0 2rem;'>
        <spinner slot="spinner" type="dots"></spinner>
        <div slot="no-results">
          <p style="font-size:14px;padding:.5rem 0;text-align:center;color:#4cc0be" @click="_reset">出错了点我重试~</p>
        </div>
        <div slot="no-more" style="font-size:14px;padding:.5rem 0;text-align:center;color:#4cc0be">暂无更多数据了~</div>
      </infinite-loading>
    </div>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader, Spinner, Group, Cell, ViewBox} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'list',
  components: {
    XHeader, Spinner, Group, Cell, ViewBox, InfiniteLoading
  },
  computed: {
    ...mapGetters(['Points'])
  },
  methods: {
    ...mapActions(['getPointsList', 'clearPointsList']),
    _onInfinite ($state) {
      this.getPointsList().then((res) => {
        if (res.data.data.list.length < 10) {
          $state.complete()
        }
        $state.loaded()
      }).catch(() => {
        $state.complete()
      })
    },
    _reset () {
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.clearPointsList()
      vm._reset()
    })
  }
}
</script>
