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
          <checker-item v-for='(item, index) in AssembleOptions.textbookList[grade][subjectId]' :key='index' :value="item.id">{{item.name}}</checker-item>
        </checker>
        <template v-if='!isGaokao'>
          <span class='searchtitle'>教材：</span>
          <checker style='padding-left:.5rem;' v-model="textbookId" default-item-class="demo4-item" selected-item-class="demo4-item-selected" disabled-item-class="demo4-item-disabled">
            <checker-item v-for='(item, index) in AssembleOptions.textbookList[grade][subjectId][0].textbook' :key='index' :value="item.id">{{item.name}}</checker-item>
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
      grade: '10',
      subjectId: '',
      editionId: '',
      textbookId: '',
      loading: true,
      isGaokao: false
    }
  },
  methods: {
    ...mapActions(['Route', 'setAssembleOptions', 'getAssembleOptionsTextbook']),
    _finish () {
      this.setAssembleOptions({
        textbook: this.textbookId,
        editionId: this.editionId,
        subject: this.subjectId,
        grade: this.grade
      })
      this.$router.go(-1)
    }
  },
  watch: {
    grade () {
      this.editionId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    },
    subjectId () {
      this.editionId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    }
  },
  created () {
    this.subjectId = this.User.subjectId
    this.getAssembleOptionsTextbook().then(() => {
      this.editionId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['id']
      this.textbookId = this.AssembleOptions.textbookList[this.grade][this.subjectId.toString()][0]['textbook'][0].id
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isGaokao = (from.name === 'assemble_gaokao')
    })
  }
}
</script>
<style lang="less" scoped>
.searchtitle{
  font-size:14px;
  color:#4BB7AA;
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
  background-color: #4BB7AA;
  color: #fff;
}
.demo4-item-disabled {
  color: #999;
}
</style>
