<template>
  <view-box ref="download" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '下载中心'}">
      <div slot="right" @click="showPopupPicker = true">筛选</div>
      <popup-picker :show="showPopupPicker" :show-cell="false" :data="[['初中','高中'],['数学','物理']]"  
        @on-hide='showPopupPicker = false' v-model="options">
      </popup-picker>
    </x-header>
    <div>
      <div v-for="(list, pindex) in block" :key="pindex" v-show='!loading'>
        <div class="weui-cells__title">{{list.name}}</div>
        <card v-for="(item, index) in list.list" :key="index">
          <div slot="content" @click="$router.push({name:'example', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: 'lxexercises'}})">
            <div v-html="item.stem"></div>
            <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
              {{ key }}： 
              <p v-html="value" style="display:inline-block"></p>
            </div>
          </div>
          <div slot="footer">
            <div class="weui-cell weui-cell_link">
              <div class="weui-cell__bd">
                <flexbox>
                  <flexbox-item :span="2">难度：{{item.degree}}</flexbox-item>
                  <flexbox-item :span="7">更新时间：{{item.time | ymd}}</flexbox-item>
                </flexbox>
              </div>
            </div>
          </div>
        </card>
      </div>
      <div style="text-align:center;padding:10px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <p v-else-if="!block.length" style="font-size:16px;color:#4BB7AA">该科目还未组卷</p>
        <p v-else-if="error" @click='_getData()' style="font-size:16px;color:#4BB7AA">出错了点我重新加载</p>
      </div>
    </div>
    <tabbar style='background-color:#4BB7AA;color:#fff' v-show='block && block.length'>
      <flexbox style='padding:.3rem;'>
        <flexbox-item :span="6" style="font-size:.8rem;text-align:center;" 
          @click.native="$router.push({name: 'download_update', params: {id: downloadId}})">
          <i class="icon iconfont icon-bianji"></i>编辑
        </flexbox-item>
        <flexbox-item :span="6" style="font-size:.8rem;text-align:center;">
          <i class="icon iconfont icon-download"></i>
          下载</flexbox-item>
      </flexbox>
    </tabbar>
  </view-box>
</template>

<script>

import {XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group, PopupPicker, Tabbar, TabbarItem} from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem, Group, PopupPicker, Tabbar, TabbarItem
  },
  computed: {
    ...mapGetters(['DownloadPaper', 'DownloadUrl', 'User']),
    block () {
      return this.DownloadPaper.list.block
    },
    downloadId () {
      return this.DownloadPaper.list.downloadId
    },
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
    ...mapActions(['getDownloadList', 'getDownloadUrl', 'setMyDownloadPaperScroll', 'clearMyDownloadPaper']),
    _getData () {
      this.clearMyDownloadPaper()
      this.loading = true
      this.getDownloadList({options: {grade: this.grade, subjectId: this.subjectId}}).then(() => {
        this.error = false
      }).catch((e) => {
        this.error = true
      }).finally(() => {
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
  created () {
    this.options = (this.User.subjectId === '7' ? ['高中', '物理'] : ['高中', '数学'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'index' || from.name === 'download_update') {
        vm._getData()
      }
      vm.$refs.download.scrollTo(vm.DownloadPaper.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.showPopupPicker = false
    this.setMyDownloadPaperScroll(this.$refs.download.getScrollTop())
    next()
  }
}
</script>
