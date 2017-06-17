<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的下载'}">
      <div slot="right" @click="popupShow = true">
        筛选
      </div>
    </x-header>
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
    <div v-transfer-dom>
      <popup v-model="popupShow" position="bottom" :show-mask="true">
        <div class='popup'>
          <span style='font-size:14px'>学段：</span>
          <div style='padding-left:20px;'>
            <checker v-model="grade" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
              <checker-item value="789">初中</checker-item>
              <checker-item value="10">高中</checker-item>
            </checker>
          </div>
          <span style='font-size:14px'>学科：</span>
          <div style='padding-left:20px;'>
            <checker v-model="subjectId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
              <checker-item value="2">数学</checker-item>
              <checker-item value="7">物理</checker-item>
            </checker>
          </div>
        </div>
      </popup>
    </div>
  </view-box>
</template>

<script>
import { XButton, Checker, CheckerItem, TransferDom, XHeader, ViewBox, Group, Cell, Popup, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Popup, Spinner
  },
  computed: {
    ...mapGetters(['MyDownload'])
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      grade: '10',
      subjectId: '2',
      popupShow: false,
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
