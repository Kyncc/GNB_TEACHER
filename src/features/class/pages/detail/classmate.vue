<template>
  <view-box v-ref:view-box class='myClass'>

    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">
        {{className}}
        <a slot="right" v-show="classmateList.length" @click="(delete = !delete)">{{(delete ? "完成":"编辑")}}</a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <group>
        <cell v-for="item in classmateList" :title="item.name" >
          <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
          <div class="weui_cell_ft" v-show="delete" @click="_delete(item.id)">删除</div>
        </cell>
      </group>
    </div>

    <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
      <span slot="no-results" style="color:#4bb7aa;">
        <p style="font-size:1rem;display:inline-block;">快邀请更多学生吧~</p>
      </span>
      <span slot="no-more"></span>
    </infinite-loading>

    <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该学生吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
  </view-box>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import { mapActions,mapGetters } from 'vuex'

export default {
  components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton,Confirm},
  data(){
    return {
      show: false,
      delId:'',
      delete:false
    }
  },
  route: {
    data:function(transition){
        this.delete = false;
    }  
  },
  computed:{
    ...mapGetters(['classmate','ClassCode']),
    className(){
        return this.classmate.name;
    },
    classmateList(){
        return this.classmate.classmate.list;
    }
	},
  methods:{
    ...mapActions(['delClassmate','getClassmate']),
    _onInfinite(){
       this.getClassmate({
          "code":this.ClassCode
       })
      .then(()=>{
        if(this.classmateList.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    },
    _delete(id){
      this.show = true
      this.delId = id
    },
    onAction(type) {
      if(type=='确认'){
        this.delClassmate({
          "studentId":this.delId,
          "classCode":this.ClassCode,
        })
        .then(()=>{
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  }
}
</script>

