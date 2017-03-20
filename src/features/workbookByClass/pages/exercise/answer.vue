<template>
  <div class="workbookClassAnswer">
    <section class="header">
      <h3>未提交作业同学</h3>
      <article>
        <span v-for="name in classmateName">{{name}}</span>
      </article>
    </section>

    <template v-for="list in cameraList">
      <div class="weui-cell">
        <divider>{{studentName}} {{time|ymd}}</divider>
        <div>
          <img v-for="img in list.camera" @click="_show(item)" :src="img.url.'?imageView2/0/format/png/w/90/'" />
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

    <photoswiper :list="list" :options="options" v-ref:previewer></photoswiper>
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
    _show(){
      // this.list[0].src = `http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim`
      // this.list[0].w = item.img.width
      // this.list[0].h = item.img.height
      // this.$refs.previewer.items.pop()
      // this.$refs.previewer.items.push(this.list)
      this.$refs.previewer.show()
    }
  },
  data(){
    return{
      list: [{
        src: 'http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 750,
        h: 1040
      },
      {
        src: 'http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 750,
        h: 1040
      },
      {
        src: 'http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 750,
        h: 1040
      },
      {
        src: 'http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 750,
        h: 1040
      },
      {
        src: 'http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/2/w/700/h/1050/q|imageslim',
        w: 750,
        h: 1040
      }],
        options: {
          bgOpacity:0.7,
          showAnimationDuration :0,
          fullscreenEl: false,
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
