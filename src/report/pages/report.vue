<template >
    <view-box v-ref:view-box class="reportIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">
                成绩报告单
            </x-header>
        </div>

        <div style="padding-top:46px;height:100%">
            <!--<infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未做题呢~</p>
                </span>
                <span slot="no-more"></span>
            </infinite-loading>-->
            <div id='wrapper' style="height:100%" >
                <accordion :list="reportChapter" link="/report/detail/" @on-click-back="_openChapter" ></accordion>
            </div>
        </div>

    </view-box>
</template>

<script>
import store from '../../store'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Panel,ViewBox,Flexbox,FlexboxItem,XButton,Group,Cell} from 'vux'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {token,id} from '../../common/getters'
import {reportChapter,reportScoll} from '../getters'
import {getReport,changeChapter,setScoll,clearReport,setStudentId} from '../actions'
import {fetchClassCode} from '../../class/getters.js'
import accordion from '../../components/accordion'
import '../index.less'

export default {
  components: {
    XHeader,ViewBox,Panel,Flexbox,FlexboxItem,XButton,Group,Cell,accordion,InfiniteLoading
  },
  vuex: {
    getters: {
        token,reportChapter,reportScoll,id,fetchClassCode
    },
    actions: {
        changeChapter,getReport,setScoll,setStudentId
    }
  },
  store,
  methods: {
	// _back() {
    //   this.$router.go('/reportClass');
    // },
    _change(){
        this.visible = true;
    },
    _openChapter(index){
        this.changeChapter(index);
        this.jroll.refresh();
        let self = this;
        this.jroll.on("scrollEnd", function() {
            self.setScoll(this.y);
        });
    },
    _onInfinite(){
        if(this.reportChapter.length != 0){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }
        this.getReport({
            token:this.token,
            subject_id:this.reportSubjectId,
            studentId:this.id,
            class_code:this.fetchClassCode
        },()=>{
            if(this.reportChapter.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
            this.jroll.refresh();
        });
    }
  },
  ready(){
        let self = this;
        self.setStudentId(self.id)
        self.getReport({
            token:self.token,
            subject_id:self.reportSubjectId,
            studentId:self.id,
            class_code:self.fetchClassCode
        },()=>{
            complete();
            self.setScoll(0);
        })
        this.jroll = new JRoll("#wrapper");
        this.jroll.scrollTo(0,this.reportScoll,0);      //记录高度并滚动
        this.jroll.pulldown({
            refresh: function(complete) {
                self.getReport({
                    token:self.token,
                    subject_id:self.reportSubjectId,
                    studentId:self.id ,
                    class_code:self.fetchClassCode
                },()=>{
                    complete();
                    self.setScoll(0);
                })
            }
        });
    }
}
</script>
