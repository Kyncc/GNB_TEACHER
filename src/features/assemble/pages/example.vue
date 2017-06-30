<template>
 <view-box ref="viewBox" body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: Route.params.name}"></x-header>
    </div>
    <div>
      <card v-for="(item, index) in list" :key="index">
        <div class="weui-panel__hd" slot="header" style="color:#4bb7aa">
          {{Route.params.type === 'chapter' ? item.chapterName : item.typeName}}
        </div>
        <div slot="content" @click="
          $router.push({name:'example',query: {name: Route.params.type === 'chapter' ? item.chapterName : item.typeName},
          params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: 'exercises'}})
        ">
          <div v-html="item.stem"></div>
          <div v-for="(value, key) in item.opt" :key='key' style="padding-top:5px;">
            {{ key }}：<p v-html="value" style="display:inline-block"></p>
          </div>
        </div>
        <div slot="footer">
          <div class="weui-cell weui-cell_link" >
            <div class="weui-cell__bd">
              <flexbox :gutter='0'>
                <flexbox-item :span="2">难度: {{item.degree}}</flexbox-item>
                <flexbox-item :span="7" style='text-align:center'>更新时间: {{item.time | ymd}}</flexbox-item>
                <flexbox-item :span="3" style="color:#4BB7AA" 
                  @click.native="$router.push({name:'assemble_choice', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId}})">
                  <i class="icon iconfont icon-chakan" style="font-size:18px"></i>
                  去组卷
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </card>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <div>
          <p style="font-size:16px;color:#4BB7AA" v-if="loadingNoData">已经加载全部题型~</p>
          <p style="font-size:16px;color:#4BB7AA" v-if="!loadingNoData && !loading" @click="_getData">点我加载更多</p>
        </div>
      </div>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'example',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Route', 'AssembleExample', 'AssembleOptions']),
    list () {
      return this.AssembleExample.list
    }
  },
  data () {
    return {
      loading: true,
      loadingNoData: false
    }
  },
  methods: {
    ...mapActions(['getAssembleExample', 'setAssembleExampleScroll', 'clearAssembleExample']),
    _getData () {
      this.loading = true
      this.getAssembleExample().then((res) => {
        if (res.data.data.list.length < 10) {
          this.loadingNoData = true
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 同步和高考题型清空
      if (from.name === 'assemble_gaokao' || from.name === 'assemble_sync') {
        vm.loadingNoData = false
        vm.clearAssembleExample()
        vm._getData()
      }
      vm.$refs.viewBox.scrollTo(vm.AssembleExample.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleExampleScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
