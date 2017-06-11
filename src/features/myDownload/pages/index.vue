<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的下载'}"></x-header>
    <div>
      <group :gutter='0'>
        <cell :title='item.name' v-for='(item, index) in MyDownload' :key='index'>
          <div slot="value">
            <span style='padding:0 10px;line-height:26px;'>
              <i class="icon iconfont icon-download" style="font-size:17px;"></i>下载
            </span> 
            <span style='padding:0 10px;line-height:26px;' @click='$router.push({name: 'myDownload_list', params:{id: item.downloadId}})'>
              <i class="icon iconfont icon-chakan" style="font-size:17px;"></i>查看
            </span> 
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XHeader, ViewBox, Group, Cell } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Group, Cell
  },
  computed: {
    ...mapGetters(['MyDownload'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getMyDownload', 'clearMyDownload']),
    _getData () {
      this.loading = false
      this.getMyDownload().then(() => {
        this.loading = true
      }).catch(() => {
        this.loading = true
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'bag') {
        vm.clearMyDownload()
        vm._getData()
      }
    })
  }
}
</script>
