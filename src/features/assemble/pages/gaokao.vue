<template>
  <div>
    <group gutter="0" class="gnb_collapse" v-if="!loading">
      <div v-for="(list, index) in AssembleGaokao.list" :key='index'>
        <cell :title="list.name" is-link :border-intent="false" :arrow-direction="list.check ? 'up' : 'down'" @click.native="list.check = !list.check"></cell>
        <div class="slide" :class="list.check ? 'animate':''">
          <cell-box v-for="(chapter, index) in list.sub_chapter_list" :key='index' @click.native="$router.push({name: 'assemble_example', params: {type: 'type', id: chapter.id, name: chapter.name}})">
            <div slot="default" style="width:100%;">
              <flexbox>
                <flexbox-item :span="10">{{chapter.name}}</flexbox-item>
                <flexbox-item :span="2" style="text-align:right">{{chapter.num}}</flexbox-item>
              </flexbox>
            </div>
          </cell-box>
        </div>
      </div>
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
    ...mapGetters(['User', 'AssembleGaokao'])
  },
  methods: {
    ...mapActions(['getAssembleGaokao', 'setAssembleGaokaoScroll']),
    _getData () {
      this.loading = true
      this.getAssembleGaokao().then(() => {
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.AssembleGaokao.list.length) {
        vm._getData()
      }
      vm.$parent.$refs.viewBoxBody.scrollTop = vm.AssembleGaokao.scroll
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleGaokaoScroll(this.$parent.$refs.viewBoxBody.scrollTop)
    next()
  }
}
</script>
