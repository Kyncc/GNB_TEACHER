<template>
  <view-box  class="workbookClassIndex">
    <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
      <x-header :left-options="{showBack: true}" >
        <a slot="right" @click="_changeSub()" class="changeSub">{{workbookClassSubject | subName}}<span class="with_arrow"></span></a>
        <change-text-book :value.sync="textbookId" :user-textbook="workbookClassWorkbook.textbook" :subject-id="workbookClassSubject"></change-text-book>
      </x-header>
    </div>

    <div style="padding-top:46px;">
      <template v-for="item in classWorkBook">
         <template v-if="item">
          <group :title="item.textbookName">
            <cell v-for="workbook in item.list" link="javascript:;" >
              <div slot="icon"><img v-lazy="workbook.img.url+'?imageView2/0/format/png/w/90/h/120'" width="45" height="60" style="margin-right:.3rem"/></div>
              <div slot="after-title" @click="_toChapter(workbook.workbookId)" style="padding:.8rem 0">{{workbook.workbookName}}</div>
            </cell>
          </group>
        </template>
      </template>
      
      <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
        <span slot="no-results" style="color:#4bb7aa;">
          <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
          <p style="font-size:1rem;display:inline-block;">还未有同学练习~</p>
        </span>
        <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
      </infinite-loading>
    </div>

  </view-box>
  <!--切换课程-->
  <gnb-change-sub :visible.sync="visible" :subject="User.subjectType" :selected="workbookClassSubject" @on-click-back="_changeSubject"><gnb-change-sub>
</template>

<script>
import {XHeader,Panel,ViewBox,Group,Cell,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {gnbChangeSub,changeTextBook} from 'components'
import { mapActions,mapGetters} from 'vuex'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,gnbChangeSub,InfiniteLoading,XButton,changeTextBook
  },
  route: {
    data:function(transition){
      if(this.workbookClassWorkbook.isReset){
        this.$nextTick(() => {
          this.$broadcast('$InfiniteLoading:reset');
        })
      }
    }
  },
  methods: {
    ...mapActions(['workbookClassClear','getWorkbookClass','workbookClassChapterClear','workbookSetSubject']),
    _toChapter(id){
      this.workbookClassChapterClear();      //进去前清除章节数据
      this.$router.go(`../chapter/${this.Params.code}/${id}`);
    },
    _changeSub(){
      this.visible = true;
    },
    /** 切换科目*/
    _changeSubject(item){
      this.subjectName = item.value;
      this.workbookSetSubject(item.id);       //更换科目
      this.visible = false;
      this.$nextTick(() => {
        this.$broadcast('$InfiniteLoading:reset');
      });
    },
    _onInfinite(){
      this.getWorkbookClass({
        "textbookId":this.textbookId
      })
      .then(()=>{
        if(this.classWorkBook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      });
    }
  },
  data(){
    return {
      visible:false,
      textbookId:''
    }
  },
  created(){
    this.textbookId = this.workbookClassWorkbook.textbook['math'][0].id;
  },
  watch: {
    textbookId(){
      this.workbookClassClear();
      this.$broadcast('$InfiniteLoading:reset');
    }
  },
  computed:{
    ...mapGetters(['workbookClassWorkbook','workbookClassSubject','Params','User']),
    classList(){
      return this.User.class;
    },
    classWorkBook(){
      return this.workbookClassWorkbook.list;
    },
    classCode(){
      return this.User.class[0].classCode;
    }
	}
}
</script>


