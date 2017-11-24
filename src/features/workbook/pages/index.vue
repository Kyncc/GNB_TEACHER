<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '批改作业',showBack: true}">
    <div slot="right" >
      <i class="icon iconfont icon-6" style="padding:8px;font-size:28px;top:2px;right:-15px;" @click='visible = true'></i>
      <div class="gnb-changeClass">
        <mt-popup v-model="visible" popup-transition="popup-fade" class="gnb-changeClass-popup">
          <p @click="$router.push({name: 'workbook_options'})">筛选</p>
          <p @click="$router.push({name: 'workbook_update'})">管理</p>
        </mt-popup>
      </div>
    </div>
    </x-header>
    <div>
      <group v-for="(textbook, pindex) in workbook.list.textbook" :key='pindex' :title="textbook.textbookName">
        <cell v-for="(workbook, index) in textbook.list" :key="index" is-link @click.native="$router.push({ name: 'workbook_chapter', params: {'workbookId': workbook.workbookId ,'name': workbook.workbookName}})">
          <img v-lazy='workbook.img.url+"?imageMogr2/auto-orient/thumbnail/180x240!/format/jpg/interlace/1/blur/1x0/quality/100|imageslim"' slot="icon" width="60" height="80">
          <div slot="after-title" style="width:90%;">
            <p style="color:#4cc0be;font-size:14px;">&nbsp;&nbsp;&nbsp;{{workbook.year}}版</p>
            <p class="ellipsis" style="font-size:.9rem;padding:.2rem 0">&nbsp;&nbsp;{{workbook.workbookName}}</p>
            <template v-if='workbook.version'>
              <p v-for="(tag, index) in workbook.version.split(',')" :key='index' style="color:#aaa;font-size:14px;">
                &nbsp;&nbsp;&nbsp;{{tag}}
              </p>
            </template>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="dots"></spinner>
        <p v-else-if="User.classes.length === 0" style="font-size:16px;color:#666;padding:0 2rem;text-align:left;" @click="$router.push({name: 'class_add'})">
          没有学生？请点击<span style='color:#4cc0be'>创建班级</span>，并邀请学生加入班级
        </p>
        <p v-else-if="workbook.list.textbook && workbook.list.textbook.length === 0" style="font-size:16px;color:#666;padding:0 2rem;text-align:left;">没有习题册？请让学生到学生端添加习题册</p>
      </div>
    </div>
  </view-box>
</template>
<script>
import { Popup } from 'mint-ui'
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'workbook',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem, 'mt-popup': Popup
  },
  computed: {
    ...mapGetters(['workbook', 'User', 'workbookOptions'])
  },
  data () {
    return {
      visible: false,
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'workbookClear', 'setWorkbookScroll', 'getWorkbookOptions']),
    _getData () {
      this.loading = true
      this.getWorkbook().then(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_options' || from.name === 'workbook_update') {
        vm._getData()
      } else {
        vm.$refs.viewBox.scrollTo(vm.workbook.scroll)
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookScroll(this.$refs.viewBox.getScrollTop())
    this.visible = false
    next()
  },
  created () {
    this.getWorkbookOptions().then(() => {
      if (!Number(this.workbookOptions.textbookId)) {
        this.$router.push({name: 'workbook_options'})
      } else {
        this._getData()
      }
    })
  }
}
</script>
<style lang="less" scoped>
.gnb-changeClass{
  margin-right:8px;
  .gnb-changeClass-popup{
      background: #fff;
      width: 5em;
      border-radius: 8px;
      padding:.5rem ;
      top:2.3rem;
      left:86%;
      -webkit-transform: translate(-50%, 0);
      p{
        font-size:.8rem;text-align: center;line-height:1.8rem; color:#555;width: 4rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .active{
          background: #ccc;
      }
  }
  .gnb-changeClass-popup:before {
      display: inline-block;
      width: 0;
      height: 0;
      border: solid transparent;
      border-width:.5rem;
      border-bottom-color: #fff;
      content: '';
      position: absolute;
      top: -.9rem;
      right: 1rem;
  }
}
</style>