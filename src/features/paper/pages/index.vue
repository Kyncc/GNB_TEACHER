<template>
  <view-box ref="sync" body-padding-top="55px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '组卷中心'}">
        <div slot="right" @click="$router.push({name: 'paper_options'})">
          筛选
        </div>
      </x-header>
    </div>
    <div style="padding-top:46px;">
      <group gutter="0" class="gnb_collapse" v-if="!loading">
        <template v-for="list in PaperSync.list">
          <cell :title="list.name" is-link :border-intent="false" :arrow-direction="list.check ? 'up' : 'down'" @click.native="list.check = !list.check"></cell>
          <div class="slide" :class="list.check ? 'animate':''">
              <cell-box  v-for="chapter in list.sub_chapter_list" :key='chapter'
                @click.native="$router.push({name: 'paper_example', params: {type: 'chapter', id: chapter.id, name: chapter.name}})">
                <div slot="default" style="width:100%;">
                  <flexbox>
                    <flexbox-item :span="10">{{chapter.name}}</flexbox-item>
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
  </view-box>
</template>
<script>
import { XHeader, ViewBox, Tab, TabItem, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem } from 'vux'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'sync',
  components: {
    XHeader, ViewBox, Tab, TabItem, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(['User', 'PaperOptions', 'PaperSync', 'Route'])
  },
  methods: {
    ...mapActions(['setPaperOptions', 'getPaperOptionsTextbook', 'getPaper']),
    // 设置筛选项并选择练习册
    _getTextBook () {
      let subject = (this.User.subjectId ? this.User.subjectId : '2')
      let editionId = this.PaperOptions.textbookList['10'][subject.toString()][0]['id']
      let textbookId = this.PaperOptions.textbookList['10'][subject][0]['textbook'][0].id
      this.setPaperOptions({
        textbook: textbookId,
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
      // 同步题型为空而且教材不为空 则获取章节数据 否之为第一次进入
      if (from.name.length === 'index') {
        vm._getData()
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
        await this._getData()
      } catch (err) {
        this.$vux.toast.show({ text: '异常错误', type: 'text', time: 1000, position: 'bottom' })
      }
    })()
  }
}
</script>
