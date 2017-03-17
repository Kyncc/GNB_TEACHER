<template>
  <div class="workbookClassAnswer">
    <section class="header">
      <h3>未提交作业名单</h3>
      <article>
        <span v-for="n in 5">田馥甄</span>
      </article>
    </section>

    <div class="weui_cells_title">
      <div class="weui-cells vux-no-group-title">
        <div class="weui-cell" v-for="n in 5">
          <divider>寶同学 2017.08.12</divider>
          <div>
             <img v-for="n in 5" @click="_show" src="http://img.guinaben.com/workbookPic/285-cover-781692.jpg?imageView2/0/format/png/w/90/" />
          </div>
        </div>
      </div>
    </div>

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
  methods:{
    ...mapActions(['getWorkbookClassExerciseAnswer']),
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
    ...mapGetters(['workbookClassExercise','Params'])
  }
}
</script>
