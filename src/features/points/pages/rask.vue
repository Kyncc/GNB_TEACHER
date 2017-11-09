<template>
  <view-box body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '排行榜'}"></x-header>
    <div>
      <template v-if="!loading && Points.rask">
        <group :gutter='0'>
          <template v-for="(item, index) in Points.rask">
            <cell v-if='index < 3' :key='index' :title='item.name' :inline-desc='item.school'>
              <p slot="icon">
                <span style="display:inline-block;font-size:30px;padding:0 .5rem;color:#ff5722;float:left;font-weight:bold">{{index+1}}</span>
                <img width="50" height="50" style="display:inline-block;margin:0 10px;border-radius:50%;background:#ddd" v-lazy="item.headImg"/>
              </p>
              <div style='color:#3a9392;font-size:23px;' slot='value'>
                {{item.points}}
              </div>
            </cell>
            <cell v-else :key='index' :title='item.name' :inline-desc='item.school' >
              <p slot="icon">
                <span style="display:inline-block;font-size:20px;padding:0 .35rem 0 0;float:left;width:30px;text-align:center">{{index+1}}</span>
                <img width="40" height="40" style="display:block;margin:0 10px;border-radius:50%;background:#ddd" v-lazy="item.headImg"/>
              </p>
              <div style='color:#4cc0be;font-size:18px;' slot='value'>
                {{item.points}}
              </div>
            </cell>
          </template>
        </group>
      </template>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
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
