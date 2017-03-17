<template>
  <view-box  class="workbookStuIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        习题册
        <a slot="right" @click="_changeSub()" class="changeSub">{{workbookStuSubject | subName}}<span class="with_arrow"></span></a>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-for="item in stuWorkBook">
         <template v-if="item">
          <group :title="item.textbookName">
            <cell v-for="workbook in item.list" link="javascript:;" >
              <div slot="icon"><img v-lazy="workbook.img.url+'?imageView2/0/format/webp/w/90/h/120'" width="45" height="60" style="margin-right:.3rem"/></div>
              <div slot="after-title" @click="_toChapter(workbook.workbookId)" style="padding:.8rem 0">{{workbook.workbookName}}</div>
            </cell>
          </group>
        </template>
      </template>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">该同学尚未练习~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>
    </div>

  </view-box>
  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="Student.subjectType" :selected="workbookStuSubject" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Group,Cell,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub} from 'components'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,gnbChangeSub,InfiniteLoading,XButton
  },
  route: {
    data:function(transition){
      if(this.workbookStu.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods: {
    _open(){
      alert(1)
    },
    ...mapActions(['workbookStuClear','getWorkbookStu','workbookStuChapterClear','workbookStuSetSubject']),
    _toChapter(id){
      this.workbookStuChapterClear();      //进去前清除章节数据
      this.$router.go(`../chapter/${this.Params.studentId}/${id}`);
    }, 
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.workbookStuSetSubject(item.id);       //更换科目
      this.visible = false;
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    },
    _onInfinite(){
      this.getWorkbookStu()
      .then(()=>{
        if(this.stuWorkBook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  data(){
    return {
      visible:false,
    }
  },
  computed:{
    ...mapGetters(['workbookStu','workbookStuSubject','Params','Student']),
    stuWorkBook(){
      return this.workbookStu.list;
    }
	}
}
</script>


