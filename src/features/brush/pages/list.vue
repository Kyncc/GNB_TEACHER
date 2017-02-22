<template>
  <view-box  class="brushList">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}">刷题列表
        <a slot="right" @click="_intoBan"><i class="icon iconfont icon-ban" style="font-size:22px"></i></a>
      </x-header>
      <header v-if="brushList" class="sectionHeader">
        <p class="ellipsis">{{brushList.chapterName}}</p>
        <font class="ellipsis"><b>{{brushList.count}}/{{brushList.total}}</b></font>
      </header>
    </div>
    <!--空白间隔-->
    <div style="padding-top:80px;">
      <template v-if="brushList">
      <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in brushList.list">
        <div class="weui_panel_hd">
          {{{item.chapter_name}}}
        </div>
        <div class="weui_panel_bd ">
          <a class="weui_media_box weui_media_appmsg" @click="_intoDetail(item.exercises_id)">
            <div class="weui_media_bd">
              <p class="example_title">参考例题<b>难度：{{item.degree}}</b></p>
              <p class="weui_media_desc">
                {{{item.stem}}}
              </p>
            </div>
          </a>
        </div>
        <div class="abandon">
          <span @click="_abandon('1',item.exercises_id,$index)">斩题</span>
          <span @click="_abandon('2',item.exercises_id,$index)">弃题</span>
          <span @click="_abandon('3',item.exercises_id,$index)">刷题</span>
        </div>
      </div>
      </template>
      <infinite-loading :on-infinite="_onInfinite" spinner="waveDots" style="height:60px">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未刷题~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">已加载全部</span>
      </infinite-loading>
    </div>
  </view-box>

  <confirm :show.sync="confirmShow" confirm-text="确定" cancel-text="取消" title="" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')">
    <p>   <color-picker :colors="['#dddddd']" :value.sync="remBrush"></color-picker>111122233<p>
  </confirm>

</template>

<script>
import {ColorPicker,XHeader,Panel,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,Confirm} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters  } from 'vuex'

export default {
  components: {
    XHeader,XButton,InfiniteLoading,Confirm,ColorPicker,
    Panel,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem
  },
  route: {
    data:function(transition){
      /**
      * 标志为reset则重置，否则加载上次高度
      */
      if(this.brushListIsReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }else{
        this.$nextTick(() => {
          document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop = this.brushListScroll;
        })
      }
    }
  },
  methods: {
    ...mapActions(['getBrushList','setBrushListScroll','brushAction']),
    _intoBan(){
      history.go(-2);
    },
    _intoDetail(id){
      this.setBrushListScroll(document.getElementsByClassName("vux-fix-safari-overflow-scrolling")[0].scrollTop);
      this.$router.go(`/example/${this.Params.studentId}/${this.brushSubjectId}/${id}`);
    },
    _abandon(status,id,index){
        let parm = {
          'id':id,
          'status': status,
          'index':index
        }
        if(localStorage.getItem("brushFirst")){
          this.brushAction(parm)
        }else{
          this.confirmShow = true
          // localstorage.setitem("brushFirst","true")
        }


    },
    // onAction
    _onInfinite(){
      this.getBrushList()
      .then((res)=>{
        this.$broadcast('$InfiniteLoading:loaded');
        let length = Number(res.data.data.list.length);
        if(length  < 5){
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
      })
    }
  },
  computed:{
    ...mapGetters(['brushList','brushListIsReset','brushSubjectId','brushListScroll','Params'])
  },
  data(){
    return {
      confirmShow:false,
      remBrush:''
    }
  }
}
</script>
