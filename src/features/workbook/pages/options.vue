<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '筛选'}"></x-header>
    </div>
    <div>
      <div style='padding:10px;'>
        <span class='searchtitle'>学段：</span>
        <checker radio-required style='padding-left:.5rem;' v-model="grade" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="789">初中</checker-item>
          <checker-item value="10">高中</checker-item>
        </checker>
        <span class='searchtitle'>学科：</span>
        <checker radio-required style='padding-left:.5rem;' v-model="subject" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="2">数学</checker-item>
          <!-- <checker-item value="7">物理</checker-item> -->
          <!-- <checker-item value="8">化学</checker-item> -->
        </checker>
        <span class='searchtitle'>版本：</span>
        <checker radio-required style='padding-left:.5rem;' v-model="editionId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <template v-if='workbookOptions.textbookList[grade]'>
            <checker-item v-for='(item, index) in workbookOptions.textbookList[grade][subject]' :key='index' :value="item.id.toString()">{{item.name}}</checker-item>
          </template>
        </checker>
        <span class='searchtitle'>教材：</span>
        <checker radio-required style='padding-left:.5rem;' v-model="textbookId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <template v-if='workbookOptions.textbookList[grade]'>
            <checker-item v-for='(item, index) in workbookOptions.textbookList[grade][subject][0].textbook' :key='index' :value="item.id.toString()">{{item.name}}</checker-item>
          </template>
        </checker>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Options',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'workbookOptions'])
  },
  data () {
    return {
      grade: '',
      subject: '',
      editionId: '',
      textbookId: '',
      loading: true
    }
  },
  methods: {
    ...mapActions(['Route', 'setWorkbookOptions', 'getWorkbookOptionsTextbook'])
  },
  watch: {
    grade () {
      if (this.workbookOptions.textbookList[this.grade]) {
        this.editionId = this.workbookOptions.textbookList[this.grade][this.workbookOptions.subject][0]['id'].toString()
        this.textbookId = this.workbookOptions.textbookList[this.grade][this.workbookOptions.subject][0]['textbook'][0].id.toString()
      }
    },
    subject (val) {
      if (this.workbookOptions.textbookList[this.grade]) {
        this.editionId = this.workbookOptions.textbookList[this.grade][val][0]['id'].toString()
        this.textbookId = this.workbookOptions.textbookList[this.grade][val][0]['textbook'][0].id.toString()
      }
    }
  },
  created () {
    this.subject = this.workbookOptions.subject.toString()
    this.grade = this.workbookOptions.grade.toString()
    this.editionId = this.workbookOptions.editionId.toString()
    this.getWorkbookOptionsTextbook().then(() => {
      this.textbookId = Number(this.workbookOptions.textbookId)
        ? this.workbookOptions.textbookId
        : this.workbookOptions.textbookList[this.grade][this.workbookOptions.subject][0]['textbook'][0].id.toString()
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {})
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookOptions({
      textbookId: this.textbookId,
      editionId: this.editionId,
      subject: this.subject,
      grade: this.grade
    }).then(() => {
      next()
    })
  }
}
</script>
<style lang="less" scoped>
.searchtitle{
  font-size:14px;
  color:#333;
}
.demo4-item {
  background-color: #fff;
  color: #333;
  font-size: 14px;
  width:22%;
  border:1px solid #ccc;
  text-align: center;
  padding:7px 0;
  margin:.25rem;
  line-height: 18px;
  border-radius: 5px;
}
.demo4-item-selected {
  border:1px solid #4cc0be;
  background-color: #4cc0be;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
