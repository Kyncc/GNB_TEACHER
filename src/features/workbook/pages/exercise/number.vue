<template>
  <div>
    <div v-for="(item, pindex) in exercise" :key='pindex'>
      <!--2级别练习册-->
      <template v-if="item.b[0] && item.b[0].type == '1' ">
        <group v-for="itemB in item.b" :title="itemB.name" :key="itemB.id">
          <card v-for="itemC in itemB.c" :key="itemC.id" @click.native="show(itemC.img)">
            <div slot="content">
              <div><img v-lazy="itemC.img.url+'-errorList'"/></div>
            </div>
            <div slot="footer">
              <div class="weui-cell weui-cell_link" style='padding:.6rem'>
                <div class="weui-cell__bd">错{{itemC.number}}人</div>
              </div>
            </div>
          </card>
        </group>
      </template>
      <!--3级别练习册-->
      <template v-else-if="item.b[0] && item.b[0].type == '2'">
        <group :title="item.name">
          <card v-for="itemB in item.b" :key="itemB.id" @click.native="show(itemB.img)">
            <div slot="content">
              <div>
                <img v-lazy="itemB.img.url+'-errorList'"/>
              </div>
            </div>
            <div slot="footer">
              <div class="weui-cell weui-cell_link" style='padding:.6rem'>
                <div class="weui-cell__bd">错{{itemB.number}}人</div>
              </div>
            </div>
          </card>
        </group>
      </template>
    </div>
    <group title="未提交作业学生" v-if='workbookExercise.notPost.length'>
      <flexbox :gutter="0" wrap="wrap">
        <flexbox-item v-for="(name, index) in workbookExercise.notPost" :key='index' :span="1/4">
          <div style='padding:.5rem;'>{{name}}</div>
        </flexbox-item>
      </flexbox>
    </group>
    <div v-transfer-dom>
      <tabbar v-if='exercise'>
        <tabbar-item style='line-height:42px;height:42px;' v-if="$route.name === 'workbook_exercise_number'">
          <div slot="label" style='line-height:42px;height:42px;'>
            <x-button :disabled="isRead" type="primary" @click.native="_post" style='border-radius:0;'>已阅</x-button>
          </div>
        </tabbar-item>
      </tabbar>
    </div>
    <!--照片放大 -->
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options"></previewer>
    </div>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, Group, Cell, Card, Flexbox, FlexboxItem, XButton, Previewer, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'number',
  components: {
    Tabbar, TabbarItem, Group, Cell, XButton, Flexbox, FlexboxItem, Card, Previewer
  },
  computed: {
    ...mapGetters(['Route', 'workbookExercise']),
    exercise () {
      return this.workbookExercise.list.a
    },
    isRead () {
      return this.workbookExercise.list.isRead
    }
  },
  data () {
    return {
      list: [{
        w: 0,
        h: 0,
        src: ``
      }],
      options: {
        preload: [1, 1],
        bgOpacity: 1,
        fullscreenEl: false,
        history: true
      }
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    ...mapActions(['WorkbookExercisePost', 'setWorkbookExersciseScroll', 'setWorkbookExerciseRead']),
    _post () {
      this.setWorkbookExerciseRead()
    },
    _goErrorPhoto (item) {
      if (item.number) {
        this.$router.push({name: 'workbook_exercise_error', params: {chapterId: this.Route.params.chapterId, wbeid: item.wbeid}})
      } else {
        this.$vux.toast.show({text: '暂无学生错误', type: 'text', time: 1000, position: 'bottom'})
      }
    },
    show (img) {
      this.list[0].w = img.width
      this.list[0].h = img.height
      this.list[0].src = img.url
      this.$nextTick(() => {
        this.$refs.previewer.show(0)
      })
    }
  }
  // activated () {
  //   this.$parent.$refs.viewBoxBody.scrollTop = this.workbookExercise.scroll
  // },
  // beforeRouteLeave (to, from, next) {
  //   this.setWorkbookExersciseScroll(this.$parent.$refs.viewBoxBody.scrollTop)
  //   next()
  // }
}
</script>
<style scoped>
.weui-panel{
  margin-top:-1px !important;
}
</style>
