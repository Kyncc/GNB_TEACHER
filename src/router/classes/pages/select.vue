<template>
  <view-box v-ref:view-box class='classes'>
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" style="position:absolute;left:0;top:0;width:100%;z-index:100">
        <change-class :value.sync="selectCode" :class-list="classList"></change-class>
        <a slot="right" @click="_edit"><i class="icon iconfont icon-bianji" style="font-size:22px"></i></a>
      </x-header>
    </div>

    <div style="padding-top:46px">
      <group>
        <cell v-for="item in classmateList" :title="item.name" @click="_into(item.id)">
          <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
        <cell>
      </group>
      <infinite-loading :on-infinite="_onInfinite" spinner="default">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">快邀请更多学生吧~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>
    </div>
  </view-box>
</template>

<script>
import {XHeader,Cell,Group,ViewBox} from 'vux'
import {changeClass} from 'components'
import { mapActions,mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  components:{
    XHeader,Cell,Group,ViewBox,changeClass,InfiniteLoading
  },
  data(){
    return {
      selectCode:''
    }
  },
  watch: {
    selectCode(){
      this.resetClassmate();
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    }
  },
  created () {
    this.selectCode = this.classCode;
  },
  methods: {
    ...mapActions(['getClassmate','resetClassmate','getStudentInfo','clearAll']),
    _edit(){
        // console.log()
        this.$router.go(`manager/class/${this.classCode}`);
    },
    _into(id){
      this.getStudentInfo({
        id:id
      })
      .then(()=>{
        this.clearAll();    //清除所有数据
        this.$router.go(`${this.pageType}/${this.classCode}/${id}`);
      })
    },
    _onInfinite(){
       this.getClassmate({
         "code": this.selectCode
       })
      .then(()=>{
        if(this.classmateList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    }
  },
  computed: {
    ...mapGetters(['User','classmate','Query']),
    classList(){
        return this.User.class;
    },
    classmateList(){
        return this.classmate.classmate.list;
    },
    pageType(){
        return this.Query.type;
    },
    classCode(){
      return this.User.class[0].classCode;
    }
  }
}