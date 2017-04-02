<template>
  <view-box class="workbookStuSelect">
    <div slot="header" class="workbookStuSelectHeader">
      <x-header :left-options="{showBack: true}">
        {{Params.name}}
        <a slot="right" @click="_changeSub"><i class="icon iconfont icon-bianji" style="font-size:22px"></i></a>
      </x-header>
      <tab active-color='#4bb7aa'>
        <tab-item :selected="isExercise" @click="_into(1)">作业统计</tab-item>
        <tab-item :selected="isAnswer" @click="_into(2)">作业详情</tab-item>
      </tab>
    </div>
    <div style="padding-top:90px">
      <router-view keep-alive></router-view>
    </div>
  </view-box>
</template>

<script>
import { XHeader,ViewBox,Tab,TabItem,} from 'vux'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Tab, TabItem
  },
  methods:{
    _changeSub(){
      history.go(-2)
    },
    _into(state){
      if(state == '1'){
        this.$router.replace(`../../../../main/${this.Params.code}/${this.Params.chapterId}/${this.Params.name}/`)
      }else if(state == '2'){
        this.$router.replace(`../../../../answer/${this.Params.code}/${this.Params.chapterId}/${this.Params.name}/`)
      }
    }
  },
  computed:{
    ...mapGetters(['path','Params']),
    isExercise(){
      return this.path.includes('exercise/main')
    },
    isAnswer(){
      return this.path.includes('exercise/answer')
    }
  }
}
</script>
