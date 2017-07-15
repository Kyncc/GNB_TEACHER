<template>
  <view-box ref="gaokao" body-padding-top="55px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '组卷中心'}">
        <div slot="right" @click="$router.push({name: 'assemble_options'})">
          筛选
        </div>
      </x-header>
      <tab :animate="false">
        <tab-item :selected="Route.name === 'assemble_sync'" @click.native="$router.replace({name:'assemble_sync'})">同步题型</tab-item>
        <tab-item :selected="Route.name === 'assemble_gaokao'" >中高考题型</tab-item>
      </tab>
    </div>
    <div style="padding-top:46px;">
      <group gutter="0" class="gnb_collapse" v-if="!loading">
        <template v-for="(list, index) in AssembleGaokao.list">
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
  name: 'gaokao',
  components: {
    XHeader, ViewBox, Tab, TabItem, Cell, CellBox, Group, Spinner, Flexbox, FlexboxItem
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(['User', 'AssembleGaokao', 'Route'])
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
      vm.$refs.gaokao.scrollTo(vm.AssembleGaokao.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleGaokaoScroll(this.$refs.gaokao.getScrollTop())
    next()
  }
}
</script>
