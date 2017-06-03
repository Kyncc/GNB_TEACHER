<template>
  <view-box ref="workbook" body-padding-top="90px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: Route.params.name}">
        <div slot="right" style="margin:0">
          <gnbChangeClass :change.sync='selectedClass' :classList='workbookChapter.classList'></gnbChangeClass>
        </div>
      </x-header>
      <tab>
        <tab-item :selected="Route.name === 'workbook_exercise_result'" 
          @click.native="$router.replace({name:'workbook_exercise_result'})">
          作业统计
        </tab-item>
        <tab-item :selected="Route.name === 'workbook_exercise_answer'" 
          @click.native="$router.replace({name:'workbook_exercise_answer'})">
          批改作业
        </tab-item>
      </tab>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </view-box>
</template>

<script>
import {XHeader, ViewBox, Tab, TabItem} from 'vux'
import gnbChangeClass from '@/components/gnb_changeClass'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'exercise',
  components: {
    XHeader, ViewBox, Tab, TabItem, gnbChangeClass
  },
  computed: {
    ...mapGetters(['Route', 'workbookExercise', 'workbookChapter'])
  },
  data () {
    return {
      selectedClass: []
    }
  },
  methods: {
    ...mapActions(['getWorkbookExercise', 'workbookExerciseClear'])
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_chapter' || vm.workbookExercise.isReset) {
        vm.workbookExerciseClear()
        // vm.getWorkbookExercise().then(() => {
        //   next()
        // }).catch(() => {
        //   this.$router.go(-1)
        // })
      }
    })
  }
}
</script>
