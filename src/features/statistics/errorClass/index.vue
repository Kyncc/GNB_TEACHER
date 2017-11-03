<template>
  <view-box ref="statistics" body-padding-top="46px">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:1;" :left-options="{backText: '查看班级'}"></x-header>
    <group :gutter='0'>
      <cell v-for="(myClass, index) in User.classes" :key='index' :title="myClass.name" @click.native='_intoPage(myClass)'></cell>
    </group>
  </view-box>
</template>

<script>
import {XHeader, Cell, Group, ViewBox} from 'vux'
import {mapGetters, mapActions} from 'vuex'
import errorClass from './modules/store'
import store from '@/store'

export default {
  name: 'class',
  components: {
    XHeader, Cell, Group, ViewBox
  },
  computed: {
    ...mapGetters(['User'])
  },
  methods: {
    ...mapActions(['getStatisticsChapterOptions']),
    _intoPage (value) {
      this.getStatisticsChapterOptions({classCode: value.classCode}).then((res) => {
        if (res.data.data.textbookId.length) {
          this.$router.push({name: 'errorClassChapter', params: {name: value.name, classCode: value.classCode}})
        } else {
          this.$router.push({name: 'errorClassOptions', params: {name: value.name, classCode: value.classCode}})
        }
      })
    }
  },
  beforeCreate () {
    store.registerModule('errorClass', {
      ...errorClass
    })
  }
}
</script>
