<template>
  <view-box ref="viewBox" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: $route.params.name}">
      <div slot="right" @click="$router.push({name: 'errorClassOptions', params: {name: $route.params.name, classCode: $route.params.classCode}})">筛选</div>
    </x-header>
    <group gutter="0" v-if="!loading">
      <template v-for="(list, index) in ErrorclassChapter.list">
        <cell :key='index' :title="list.chapterName"
          :link="{name: 'errorClassRemember', params: {classCode: $route.params.classCode, chapterId: list.chapterId, name:list.chapterName}}"
          is-link>
        </cell>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </view-box>
</template>

<script>
import {XHeader, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem, ViewBox} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chapter',
  components: {
    XHeader, Cell, Group, CellBox, Spinner, Flexbox, FlexboxItem, ViewBox
  },
  computed: {
    ...mapGetters(['ErrorclassChapter'])
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['getStatisticsChapter', 'clearStatisticsChapter']),
    _getData () {
      this.loading = true
      this.getStatisticsChapter().then(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'errorClass' || from.name === 'errorClassOptions') {
        vm.clearStatisticsChapter()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  }
}
</script>
