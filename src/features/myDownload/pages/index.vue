<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的下载'}">
      <div slot="right" @click="_showPopup()">筛选</div>
      <popup-picker :show="showPopupPicker" :show-cell="false" :data="[['初中','高中'],['数学','物理']]"  @on-hide="_hidePopup()" v-model="options" @on-change="_change()"></popup-picker>
    </x-header>
    <div>
      <group :gutter='0'>
        <cell :title='item.name' v-for='(item, index) in MyDownload' :key='index'>
          <div slot="value">
            <span style='padding:0 10px;line-height:26px;'>
              <i class="icon iconfont icon-download" style="font-size:17px;"></i>下载
            </span>
            <span style='padding:0 10px;line-height:26px;' @click='$router.push({name: ' myDownload_list ', params:{id: item.downloadId}})'>
              <i class="icon iconfont icon-chakan" style="font-size:17px;"></i>查看
            </span>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!MyDownload.length" style="font-size:16px;padding:10px 0;color:#4BB7AA">还没有下载记录</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;padding:10px 0;color:#4BB7AA">出错了点我重新加载</p>
      </div>
    </div>
  </view-box>
</template>

<script>
import { XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner
  },
  computed: {
    ...mapGetters(['MyDownload']),
    grade () {
      switch (this.options[0]) {
        case '初中': return '789'
        case '高中': return '10'
        default : return ''
      }
    },
    subjectId () {
      switch (this.options[1]) {
        case '数学': return '2'
        case '物理': return '7'
        default : return ''
      }
    }
  },
  data () {
    return {
      options: [],
      showPopupPicker: false,
      loading: true,
      error: false
    }
  },
  methods: {
    ...mapActions(['getMyDownload', 'clearMyDownload']),
    _getData () {
      this.loading = true
      this.getMyDownload({options: {grade: this.grade, subjectId: this.subjectId}}).then(() => {
        this.error = false
      }).catch((e) => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    },
    _showPopup () {
      this.showPopupPicker = true
    },
    _change () {
      this.showPopupPicker = false
      this._getData()
    },
    _hidePopup () {
      this.showPopupPicker = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'bag') {
        vm.clearMyDownload()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.showPopupPicker = false
    next()
  }
}
</script>
