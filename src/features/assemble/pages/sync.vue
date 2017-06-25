<template>
  <div>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="list in AssembleSync.list">
        <cell :title="list.name" is-link :border-intent="false" :arrow-direction="list.check ? 'up' : 'down'" @click.native="list.check = !list.check"></cell>
        <div class="slide" :class="list.check ? 'animate':''">
            <cell-box  v-for="chapter in list.sub_chapter_list" :key='chapter'
              @click.native="$router.push({name: 'assemble_example', params: {type: 'chapter', id: chapter.id, name: chapter.name}})">
              <div slot="default" style="width:100%;">
                <flexbox>
                  <flexbox-item :span="10">{{chapter.name}}</flexbox-item>
                  <flexbox-item :span="2" style="text-align:right">{{chapter.num}}</flexbox-item>
                </flexbox>
              </div>
            </cell-box>
        </div>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="dots"></spinner>
    </div>
  </div>
</template>
<script>
import { Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sync',
  components: {
    Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(['User', 'AssembleOptions', 'AssembleSync'])
  },
  methods: {
    ...mapActions(['setAssembleOptions', 'getAssembleOptionsTextbook', 'getAssembleSync', 'setAssembleSyncScroll']),
    // 设置筛选项并选择练习册
    _getTextBook () {
      let subject = (this.User.subjectId ? this.User.subjectId : '2')
      let editionId = this.AssembleOptions.textbookList['10'][subject.toString()][0]['id']
      let textbookId = this.AssembleOptions.textbookList['10'][subject][0]['textbook'][0].id
      this.setAssembleOptions({
        textbook: textbookId,
        editionId: editionId,
        subject: subject,
        grade: 10
      })
    },
    _getData () {
      this.loading = true
      this.getAssembleSync().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 同步题型为空而且教材不为空 则获取章节数据 否之为第一次进入
      if (vm.AssembleSync.list.length === 0 && vm.AssembleOptions.textbook) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleSync.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleSyncScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  },
  created () {
    return (async () => {
      try {
        await this.getAssembleOptionsTextbook()
        this._getTextBook()
        await this._getData()
      } catch (err) {
        this.$vux.toast.show({ text: '异常错误', type: 'text', time: 1000, position: 'bottom' })
      }
    })()
  }
}
</script>
