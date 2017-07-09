<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: Route.params.name}">
    </x-header>
    <div>
      <group v-for="(aitem, index) in chapter" :key="index" style="margin-bottom:.5rem" gutter="0">
        <cell :title="aitem.name" :style=" _getColor(aitem)" @click.native='_toNumberPage(aitem)'></cell>
        <template v-for="b in aitem.b" > 
          <cell :title="b.name" :style="_getColor(b)" @click.native='_toNumberPage(b)'></cell>
        </template>
      </group>
      <div style="text-align:center">
        <spinner v-if="loading" type="dots"></spinner>
      </div>
    </div>
  </view-box>
</template>
<script>
import {XHeader, ViewBox, Group, Cell, Spinner} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chapter',
  components: {
    XHeader, ViewBox, Group, Cell, Spinner
  },
  computed: {
    ...mapGetters(['workbookChapter', 'Route']),
    chapter () {
      return this.workbookChapter.list
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getWorkbookChapter', 'setWorkbookChapterScroll', 'workbookChapterClear']),
    _getData () {
      this.loading = true
      this.getWorkbookChapter().then(() => {
        this.loading = false
      })
    },
    // 进入错题统计页面
    _toNumberPage (item) {
      if (item.isLink) {
        this.$router.push({name: 'workbook_exercise_number', params: {chapterId: item.id, name: item.name}})
      }
    },
    _getColor (item) {
      if (item.isRead) {
        return 'color:#FEAA85' // 是否联系过
      } else if (!item.isLink) {
        return 'color:#4BB7AA' // 是否是标题
      }
    }
  },
  activated () {
    if (this.workbookChapter.isReset) {
      this.loading = true
      this.getWorkbookChapter().then(() => {
        this.loading = false
      }).then(() => {
        this.$nextTick(() => {
          this.$refs.viewBox.scrollTo(this.workbookChapter.scroll)
        })
      })
    } else {
      this.$refs.viewBox.scrollTo(this.workbookChapter.scroll)
    }
  },
  beforeRouteEnter (to, from, next) {
    // 选择练习本进来清空数据
    if (from.name === 'workbook') {
      next(vm => {
        vm.workbookChapterClear()
        vm._getData()
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setWorkbookChapterScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
