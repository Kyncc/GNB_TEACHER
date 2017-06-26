<template>
  <view-box ref="workbook" body-padding-top="90px">
    <div slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" >
      <x-header :left-options="{backText: Route.params.name}">
        <div slot="right" style="margin:0">
          <gnbChangeClass :change.sync='selectedClass' :classList='workbookChapter.classList'></gnbChangeClass>
        </div>
      </x-header>
      <tab :animate="false">
        <tab-item :selected="Route.name === 'workbook_exercise_number'" 
          @click.native="$router.replace({name:'workbook_exercise_number'})">
          作业统计
        </tab-item>
        <tab-item :selected="Route.name === 'workbook_exercise_photo'" 
          @click.native="$router.replace({name:'workbook_exercise_photo'})">
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
    ...mapGetters(['Route', 'workbookChapter'])
  },
  data () {
    return {
      selectedClass: []
    }
  },
  methods: {
    ...mapActions(['getWorkbookExerciseNum', 'getWorkbookExercisePhoto', 'workbookExerciseErrorPhotoClear', 'workbookExerciseClear']),
    _getData () {
      this.workbookExerciseClear()
      this.workbookExerciseErrorPhotoClear()
      this.$vux.loading.show()
      return (async () => {
        try {
          await this.getWorkbookExerciseNum({classCode: this.selectedClass.classCode})
          await this.getWorkbookExercisePhoto({classCode: this.selectedClass.classCode})
          this.$vux.loading.hide()
        } catch (err) {
          this.$vux.loading.hide()
        }
      })()
    }
  },
  watch: {
    // 切换班级加载数据
    selectedClass () {
      this._getData()
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'workbook_chapter') {
        vm._getData()
      }
    })
  }
}
</script>
