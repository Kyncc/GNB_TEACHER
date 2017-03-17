<template >
  <div>
    <template v-if="Exercise.chaper">
      <template v-for="item in Exercise.a">
        <!--2级别习题册-->
        <template v-if="item.b[0].type == '1'">
          <group v-for="itemB in item.b" :title="itemB.name">
            <cell v-for="itemC in itemB.c" :title="itemC.name">
              <p slot="value">
                  错{{itemC.number}}人
                <!--<x-button mini plain type="primary" @click="_intoExample(itemC.eid)">例题</x-button>-->
              </p>
            </cell>
          </group>
        </template>
        <!--3级别习题册-->
        <template v-if="item.b[0].type == '2'">
          <group :title="item.name">
            <cell v-for="itemB in item.b" :title="itemB.name">
              <div slot="value">
                错{{itemB.number}}人
                <!--<x-button mini plain type="primary" @click="_intoExample(itemB.eid)">例题</x-button>-->
              </div>
            </cell>
          </group>
        </template>
      </template>

      <x-button v-if="!Exercise.isRead" style="width:95%;text-align:center;margin-top:1rem;border-radius:0px;background:#4bb7aa;color:#fff" type="primary" @click="_post">已阅</x-button>
      <x-button v-else style="width:95%;margin-top:1rem;" type="primary" disabled>已阅</x-button>
    </template>

    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
        <p style="font-size:1rem;display:inline-block;">数据发生一点问题~</p>
      </span>
      <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
    </infinite-loading>

  </div>
</template>

<script>
import { Panel,Group,Cell,XButton,Checker, CheckerItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    Panel,Group,Cell,XButton,InfiniteLoading,Checker, CheckerItem
  },
  route: {
    data:function(transition){
      if(this.workbookClassExercise.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods: {
    ...mapActions(['getWorkbookClassExercise','postWorkbookClassRead']),
    _getAnswerList(){
      this.answerListId = [];
      this.answerListAnswer = [];
      if(!this.Exercise.a){
        return;
      }
      if(this.workbookType == '1'){
        //三级习题册嵌套
        let array = this.rememberExercise.a[0].b;
        for(let i = 0; i< array.length ; i++){
          for(let j = 0;j< array[i].c.length;j++){
            this.answerListId.push(array[i].c[j].id);
            this.answerListAnswer.push(array[i].c[j].answer);
          }
        }
      }else{
        //二级习题册嵌套
        let array = this.Exercise.a;
        for(let i = 0; i< array.length ; i++){
          for(let j = 0;j< array[i].b.length;j++){
            this.answerListId.push(array[i].b[j].id);
            this.answerListAnswer.push(array[i].b[j].answer);
          }
        }
      }
    },
    _onInfinite(){
      this.getWorkbookClassExercise()
      .then(()=>{
        this.$broadcast('$InfiniteLoading:loaded');
        this.$broadcast('$InfiniteLoading:complete');
      });
    },
    _post(){
      this.postWorkbookClassRead()
    },
    _intoExample(id){
      if(Number(id) == 0){
        _.toast('暂无例题');
        return;
      }
      // this.setScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop); 
      this.$router.go('/example/'+id);
    }
  },
  data(){
    return {
      answerListId:[],         //答案的列表
      answerListAnswer:[],     //答案的列表
      workbookType:''
    }
  },
  computed:{
    ...mapGetters(['workbookClassExercise']),
    Exercise(){
      return this.workbookClassExercise.list;
    }
	}
}
</script>
