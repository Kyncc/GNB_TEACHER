<template>
  <view-box ref="sync" body-padding-top="95px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '组卷中心'}">
        <div slot="right" @click="$router.push({name: 'paper_options'})">筛选</div>
      </x-header>
      <search @on-submit="_getData" @on-change="_getData" v-model.lazy="name" :auto-fixed="false" placeholder="请输入试卷名称" style="position:fixed;z-index:1;"></search>
    </div>
    <div style="padding-top:46px;">
      <group gutter="0" class="gnb_collapse" v-if="!loading">
        <!-- <template v-for="(list, index) in PaperSync.list">
          <cell :title="list.name" :key='index' is-link :border-intent="false" :arrow-direction="list.check ? 'up' : 'down'" @click.native="list.check = !list.check"></cell>
        </template> -->
      </group>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
      </div>
    </div>
  </view-box>
</template>
<script>
import { XHeader, ViewBox, Cell, Group, Spinner, Search } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    XHeader, ViewBox, Cell, Group, Spinner, Search
  },
  data () {
    return {
      name: '',
      loading: true
    }
  },
  computed: {
    ...mapGetters(['User', 'PaperOptions', 'Paper'])
  },
  methods: {
    ...mapActions(['setPaperOptions', 'getPaperOptionsTextbook', 'getPaper', 'getPaperVaild']),
    // 设置筛选项并选择练习册
    _getTextBook () {
      let subject = (this.User.subjectId ? this.User.subjectId : '2')
      let editionId = this.PaperOptions.textbookList['10'][subject.toString()][0]['id']
      this.setPaperOptions({
        editionId: editionId,
        subject: subject,
        grade: 10
      })
    },
    _getData () {
      this.loading = true
      this.getPaper().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name.length === 'index') {
        vm.name = ''
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  created () {
    return (async () => {
      try {
        await this.getPaperOptionsTextbook()
        this._getTextBook()
      } catch (err) {
        this.$vux.toast.show({ text: '异常错误', type: 'text', time: 1000, position: 'bottom' })
      }
    })()
  }
}
</script>
