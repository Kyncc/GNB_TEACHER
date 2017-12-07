<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '管理',showBack: true}"></x-header>
    <div>
      <group v-for="(textbook, pindex) in workbook.list.textbook" :key='pindex' :title="textbook.textbookName">
        <cell v-for="(workbook, index) in textbook.list" :key="index">
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
          <div slot="default">
            <x-button v-if="workbook.state" mini plain type="primary" slot="default" @click.native="_changeBook(pindex, index, workbook.workbookId)">隐藏</x-button>
            <x-button v-else type="primary" mini  @click.native="_changeBook(pindex, index, workbook.workbookId)">显示</x-button>
          </div>
        </cell>
      </group>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="dots"></spinner>
        <p v-else-if="User.classes.length === 0" style="font-size:16px;color:#666;padding:0 2rem;text-align:left;" @click="$router.push({name: 'class_add'})">
          没有学生？请点击<span style='color:#4cc0be'>创建班级</span>，并邀请学生加入班级
        </p>
        <p v-else-if="workbook.list.textbook.length === 0" style="font-size:16px;color:#666;padding:0 2rem;text-align:left;">没有习题册？请让学生到学生端添加习题册</p>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XHeader, Cell, Group, ViewBox, Spinner, Tabbar, TabbarItem, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Update',
  components: {
    XHeader, Cell, Group, ViewBox, Spinner, XButton, Tabbar, TabbarItem
  },
  computed: {
    ...mapGetters(['workbook', 'User'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbook', 'setWorkbookUpdate']),
    _getData () {
      this.loading = true
      this.getWorkbook().then(() => {
        this.loading = false
      })
    },
    _changeBook (pindex, index, workbookId) {
      this.setWorkbookUpdate({pindex: pindex, index: index, workbookId: workbookId})
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getData()
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
