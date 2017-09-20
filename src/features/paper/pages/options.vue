<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '筛选'}">
        <div slot="right" @click='_finish()'>确定</div>
      </x-header>
    </div>
    <div>
      <div style='padding:10px;'>
        <span class='searchtitle'>学段：</span>
        <checker style='padding-left:.5rem;' v-model="grade" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="789">初中</checker-item>
          <checker-item value="10">高中</checker-item>
        </checker>
        <span class='searchtitle'>学科：</span>
        <checker style='padding-left:.5rem;' v-model="subjectId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item value="2">数学</checker-item>
          <checker-item value="7">物理</checker-item>
        </checker>
        <span class='searchtitle'>版本：</span>
        <checker style='padding-left:.5rem;' v-model="editionId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
          <checker-item v-for='(item, index) in PaperOptions.textbookList[grade][subjectId]' :key='index' :value="item.id">{{item.name}}</checker-item>
        </checker>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner} from 'vux'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'options',
  components: {
    XButton, Checker, CheckerItem, XHeader, ViewBox, Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['User', 'PaperOptions'])
  },
  data () {
    return {
      grade: '10',
      subjectId: '',
      editionId: ''
    }
  },
  methods: {
    ...mapActions(['setPaperOptions', 'getPaperOptionsTextbook']),
    _finish () {
      this.setPaperOptions({
        editionId: this.editionId,
        subject: this.subjectId,
        grade: this.grade
      })
      this.$router.go(-1)
    }
  },
  watch: {
    grade (val) {
      this.editionId = this.PaperOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
    },
    subjectId (val) {
      this.editionId = this.PaperOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
    }
  },
  created () {
    this.subjectId = this.User.subjectId
  }
}
</script>
<style lang="less" scoped>
.searchtitle{
  font-size:14px;
  color:#4cc0be;
}
.demo4-item {
  background-color: #ccc;
  color: #fff;
  font-size: 14px;
  width:22%;
  text-align: center;
  padding:7px 0;
  margin:.25rem;
  line-height: 18px;
  border-radius: 5px;
}
.demo4-item-selected {
  background-color: #4cc0be;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
