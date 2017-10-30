<template>
  <div>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <template v-for="(list, index) in ErrorclassChapter.list">
        <cell :key='index' :title="list.name"
          :link="{name: 'errorClassRemember', params: {classCode: $route.params.classCode, chapterId: list.id, name:list.name}}"
          is-link>
        </cell>
      </template>
    </group>
    <div style="text-align:center">
      <spinner v-if="loading" type="ripple"></spinner>
    </div>
  </div>
</template>

<script>
import {XHeader, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'chapter',
  components: {
    XHeader, Cell, Group, CellBox, Spinner, Flexbox, FlexboxItem
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
      if (from.name === 'errorClassChapter' || from.name === 'errorClassOptions') {
        vm.clearStatisticsChapter()
        vm._getData()
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  mounted () {
    this._getData()
  }
}
</script>
