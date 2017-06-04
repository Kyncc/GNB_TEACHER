<template >
  <div>
    <div v-for="(item, pindex) in exercise">
      <!--2级别练习册-->
      <template v-if="item.b[0].type == '1'">
        <group v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id">
          <cell v-for="(itemC, index) in itemB.c" :title="itemC.name" :key="itemC.id">
            <p slot="default" 
              @click.native="$router.push({name:'workbook_exercise_error',params:{chapterId: Route.params.chapterId, wbeid: itemC.wbeid}})">
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
          <cell v-for="(itemB, index) in item.b" :title="itemB.name" :key="itemB.id" 
          @click.native="$router.push({name:'workbook_exercise_error',params:{chapterId: Route.params.chapterId, wbeid: itemB.wbeid}})">
            <div slot="default">
              <section style="display:inline-block;color:#FFC452">
                 错{{itemB.number}}人
              </section>
            </div>
          </cell>
        </group>
      </template>
    </div>
    
    <div style="margin:1rem" v-if="exercise">
      <x-button v-if = "!isRead" type="primary" @click.native="_post">已阅</x-button>
      <x-button v-else type="primary" disabled>已提交</x-button>
    </div>
  </div>
</template>

<script>
import {Group, Cell, XButton} from 'vux'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'number',
  components: {
    Group, Cell, XButton
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
  methods: {
    ...mapActions(['WorkbookExercisePost', 'setWorkbookExersciseScroll', 'setWorkbookExerciseRead']),
    _post () {
      this.setWorkbookExerciseRead()
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
