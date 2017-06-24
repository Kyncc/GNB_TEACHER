<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '下载中心'}">
      <div slot="right" @click="_showPopup()">筛选</div>
      <popup-picker :show="showPopupPicker" :show-cell="false" :data="[['初中','高中'],['数学','物理']]"  @on-hide="_hidePopup()" v-model="options" @on-change="_change()"></popup-picker>
    </x-header>
    <div>
    </div>
  </view-box>
</template>

<script>

import { XButton, Checker, CheckerItem, PopupPicker, XHeader, ViewBox, Group, Cell, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner, PopupPicker
  },
  computed: {
    ...mapGetters(['Download', 'DownloadPaper', 'DownloadUrl'])
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
    ...mapActions(['getDownload', 'getDownloadList', 'getDownloadUpdate', 'getDownloadUrl', 'setMyDownloadPaperUp', 'setMyDownloadPaperDown', 'setMyDownloadPaperDel', 'setMyDownloadPaperScroll', 'clearMyDownloadPaper']),
    _getData () {
      this.loading = true
      this.getDownloadList({downloadId: {}}).then(() => {
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
        vm.getDownload()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.showPopupPicker = false
    next()
  }
}
</script>
<style lang="less" scoped>
.popup{
  padding:10px;
}
.demo4-item {
  background-color: #ccc;
  color: #fff;
  font-size: 14px;
  padding:8px 25px;
  margin: 5px 8px 8px 0;
  line-height: 18px;
  border-radius: 5px;
}
.demo4-item-selected {
  background-color: #4BB7AA;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
