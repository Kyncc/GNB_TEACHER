<template>
  <view-box ref="about" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '我的下载'}">
      <div slot="right" @click="showPopupPicker = true">筛选</div>
      <div class='popup'>
        <popup-picker :show="showPopupPicker" @on-hide='showPopupPicker = false' :show-cell="false" :data="[['初中','高中'],['数学','物理']]" v-model="options"></popup-picker>
      </div>
    </x-header>
    <div>
      <group :gutter='0' title='只展示最近一个月的试卷' v-show='MyDownload.length'>
        <cell :title='item.name' v-for='(item, index) in MyDownload' :key='index'>
          <div slot="value" style='color:#4BB7AA'>
            <span style='padding:0 5px;line-height:24px;' @click="_download(item)">
              <i class="icon iconfont icon-download" style="font-size:16px;" ></i>下载
            </span>
            <span style='padding:0 5px;line-height:24px;' @click="$router.push({name:'myDownload_list', params:{id: item.downloadId}})">
              <i class="icon iconfont icon-chakan" style="font-size:16px;"></i>查看
            </span>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!MyDownload.length" style="font-size:16px;color:#4BB7AA">近一月还未有下载记录</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4BB7AA">出错了点我重新加载</p>
      </div>
    </div>
    <share :change.sync='showAction' :showAction='showAction' :content='share.content' :title='share.title' :href='share.href'></share>
  </view-box>
</template>

<script>
import { XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import Share from '@/components/share'

export default {
  name: 'index',
  components: {
    XButton, XHeader, ViewBox, Group, Cell, PopupPicker, Spinner, Share
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
      error: false,
      showAction: false,
      share: {
        content: '',
        title: '我的组卷',
        href: ''
      }
    }
  },
  methods: {
    ...mapActions(['getMyDownload', 'clearMyDownload']),
    _download (item) {
      this.share.href = item.url
      this.share.content = item.name
      this.showAction = true
    },
    _getData () {
      this.clearMyDownload()
      this.loading = true
      this.getMyDownload({options: {grade: this.grade, subjectId: this.subjectId}}).then(() => {
        this.error = false
        this.loading = false
      }).catch((e) => {
        this.error = true
        this.loading = false
      })
    }
  },
  watch: {
    options () {
      this.showPopupPicker = false
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'bag') {
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    // 弹窗的返回键处理
    if (this.showAction) {
      this.showAction = false
      next(false)
    } else if (this.showPopupPicker) {
      this.showPopupPicker = false
      next(false)
    } else {
      next()
    }
  }
}
</script>
<style scoped>
.popup .vux-cell-box:before{
  border-top:0px !important;
}
</style>
