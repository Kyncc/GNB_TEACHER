<template>
  <div class="workbookClassAnswer" style="-webkit-overflow-scrolling:auto">
    <section class="header" v-if="classmateName">
      <h3>未提交作业同学</h3>
      <article>
        <span v-for="name in classmateName">{{name}}</span>
      </article>
    </section>

    <template v-for="list in cameraList">
      <div class="weui-cell" style="padding:0 0 0 .8rem">
        <divider style="font-size:14px;">{{list.studentName}}&nbsp&nbsp{{list.time}}</divider>
        <div style="">
          <img class="previewer-answer-img" v-for="img in list.camera" @click="_show(list.camera,$index)" v-lazy="img.url+'-answer'" />
        </div>
      </div>
    </template>

    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>

    <div style="z-index:2017;position:relative">
      <photoswiper :list="list" :options="options" v-ref:photoswiper></photoswiper>
    </div>

  </div>
</template>

<script>
import {Group,Cell,Divider } from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {photoswiper} from 'components'
import {mapActions,mapGetters} from 'vuex'

export default {
  components:{
    Group,InfiniteLoading,Cell,Divider,photoswiper 
  },
  route: {
    data:function(transition){
      if(this.workbookClassExercise.isAnswerReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods:{
    ...mapActions(['getWorkbookClassExerciseAnswer']),
    _onInfinite(){
        this.getWorkbookClassExerciseAnswer()
        .then(()=>{
          this.$broadcast('$InfiniteLoading:loaded');
          this.$broadcast('$InfiniteLoading:complete');
        })
    },
    _show(obj,index){
      this.list = []
      for(let i = 0 ; i< obj.length ; i++){
        this.list.push({
          'src':`${obj[i].url}?imageView2|imageslim`,
          'h':obj[i].height,
          'w':obj[i].width,
        })
      }
      setTimeout(()=>{
        this.$refs.photoswiper.show(index)
      },200)
    }
  },
  data(){
    return{
      list: [],
      options: {
        preload:[1,3],
        bgOpacity:1,
        fullscreenEl: false,
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.previewer-answer-img')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  computed:{
    ...mapGetters(['workbookClassExercise','Params']),
    classmateName(){
      return this.workbookClassExercise.answer.notPost
    },
    cameraList(){
      return this.workbookClassExercise.answer.list
    }
  }
}
</script>
