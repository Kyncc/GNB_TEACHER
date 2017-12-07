<template>
  <view-box body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '筛选'}">
        <!-- <div slot="right" @click='$router.go(-1)'>确定</div> -->
      </x-header>
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
          <template v-if='AssembleOptions.textbookList[grade]'>
            <checker-item v-for='(item, index) in AssembleOptions.textbookList[grade][subject]' :key='index' :value="item.id.toString()">{{item.name}}</checker-item>
          </template>
        </checker>
        <template v-if='!isGaokao'>
          <span class='searchtitle'>教材：</span>
          <checker radio-required style='padding-left:.5rem;' v-model="textbookId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
            <template v-if='AssembleOptions.textbookList[grade]'>
              <checker-item v-for='(item, index) in AssembleOptions.textbookList[grade][subject][0].textbook' :key='index' :value="item.id.toString()">{{item.name}}</checker-item>
            </template>
          </checker>
        </template>
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
    ...mapGetters(['User', 'AssembleOptions'])
  },
  data () {
    return {
      grade: '',
      subject: '',
      editionId: '',
      textbookId: '',
      loading: true,
      isGaokao: false
    }
  },
  methods: {
    ...mapActions(['Route', 'setAssembleOptions', 'getAssembleOptionsTextbook'])
  },
  watch: {
    grade () {
      if (this.AssembleOptions.textbookList[this.grade]) {
        this.editionId = this.AssembleOptions.textbookList[this.grade][this.AssembleOptions.subject][0]['id'].toString()
        this.textbookId = this.AssembleOptions.textbookList[this.grade][this.AssembleOptions.subject][0]['textbook'][0].id.toString()
      }
    },
    subject (val) {
      if (this.AssembleOptions.textbookList[this.grade]) {
        this.editionId = this.AssembleOptions.textbookList[this.grade][val][0]['id'].toString()
        this.textbookId = this.AssembleOptions.textbookList[this.grade][val][0]['textbook'][0].id.toString()
      }
    }
  },
  created () {
    this.subject = this.AssembleOptions.subject.toString()
    this.grade = this.AssembleOptions.grade.toString()
    this.editionId = this.AssembleOptions.editionId.toString()
    this.getAssembleOptionsTextbook().then(() => {
      this.textbookId = Number(this.AssembleOptions.textbookId)
        ? this.AssembleOptions.textbookId
        : this.AssembleOptions.textbookList[this.grade][this.AssembleOptions.subject][0]['textbook'][0].id.toString()
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isGaokao = (from.name === 'assemble_gaokao')
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleOptions({
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
