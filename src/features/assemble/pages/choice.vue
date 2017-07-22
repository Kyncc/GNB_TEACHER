<template>
 <view-box ref="viewBox" body-padding-top="46px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;">
      <x-header :left-options="{backText: '精选练习'}"></x-header>
    </div>
    <div>
      <card v-for="(item, index) in list" :key="index">
        <div slot="content" @click="$router.push({name:'example', params: {subjectId: item.subject_id, grade: item.grade, id: item.exercisesId, type: 'lxexercises'}})">
          <div v-html="item.stem"></div>
          <div v-if="item.opt.hasOwnProperty('A')">
            <div v-for="(value, key) in item.opt" :key='value' style="padding-top:5px;">{{ key }}： <p v-html="value" style="display:inline-block"></p></div>
          </div>
        </div>
        <div slot="footer">
          <div class="weui-cell weui-cell_link">
            <div class="weui-cell__bd">
              <flexbox :gutter='0'>
                <flexbox-item :span="3">难度: {{item.degree}}</flexbox-item>
                <flexbox-item :span="7" >更新时间: {{item.time | ymd}}</flexbox-item>
                <flexbox-item :span="2" @click.native='setAssemble({id: item.exercisesId, index: index})' style='text-align:center'>
                  <!--<i class="icon iconfont icon-jinrulianxi" style="font-size:18px"></i>-->
                  <span v-if='item.isAssembly' style='color:#ff5722'>已组卷</span>
                  <span v-else style="color:#4BB7AA">组卷</span>
                </flexbox-item>
              </flexbox>
            </div>
          </div>
        </div>
      </card>
      <div style="text-align:center;padding:20px 0;">
        <spinner v-if="loading" type="lines"></spinner>
        <div>
          <p style="font-size:16px;color:#4BB7AA" v-if="loadingNoData">已经加载全部练习题~</p>
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
  name: 'choice',
  components: {
    XHeader, ViewBox, Card, Spinner, Flexbox, FlexboxItem
  },
  computed: {
    ...mapGetters(['Route', 'AssembleChoice']),
    list () {
      return this.AssembleChoice.list
    }
  },
  data () {
    return {
      loading: true,
      loadingNoData: false
    }
  },
  methods: {
    ...mapActions(['getAssembleChoice', 'setAssembleChoiceScroll', 'setAssemble', 'clearAssembleChoice']),
    _getData () {
      this.loading = true
      this.getAssembleChoice().then((res) => {
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
      // 不来自题目详情全部清除数据
      if (from.name === 'assemble_example') {
        vm.loadingNoData = false
        vm.clearAssembleChoice()
        vm._getData()
      }
      vm.$refs.viewBox.scrollTo(vm.AssembleChoice.scroll)
    })
  },
  beforeRouteLeave (to, from, next) {
    this.setAssembleChoiceScroll(this.$refs.viewBox.getScrollTop())
    next()
  }
}
</script>
