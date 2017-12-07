<template>
  <div>
    <div v-for="(item, pindex) in exercise" :key='pindex'>
      <!--2级别练习册-->
      <template v-if="item.b[0].type == '1'">
        <group v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id">
          <cell v-for="(itemC, index) in itemB.c" :title="itemC.name" :key="itemC.id">
            <p slot="default" @click="_goErrorPhoto(itemC)">
              <section style="display:inline-block;color:#FFC452">
                错{{itemC.number}}人
              </section>
            </p>
          </cell>
        </group>
      </template>
      <!--3级别练习册-->
      <template v-else-if="item.b[0].type == '2'">
        <group :title="item.name">
          <cell v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id">
            <div slot="default" @click="_goErrorPhoto(itemB)">
              <section style="display:inline-block;color:#FFC452">
                 错{{itemB.number}}人
              </section>
            </div>
          </cell>
        </group>
      </template>
    </div>
    <div v-transfer-dom>
      <tabbar v-if='exercise'>
        <tabbar-item style='line-height:42px;height:42px;' v-if="$route.name === 'workbook_exercise_number'">
          <div slot="label" style='line-height:42px;height:42px;'>
            <x-button :disabled="isRead" type="primary" @click.native="_post" style='border-radius:0;'>已阅</x-button>
          </div>
        </tabbar-item>
      </tabbar>
    </div>
  </div>
</template>

<script>
import {Tabbar, TabbarItem, Group, Cell, XButton, TransferDomDirective as TransferDom} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'number',
  components: {
    Tabbar, TabbarItem, Group, Cell, XButton
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
