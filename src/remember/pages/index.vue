<template>
    <view-box v-ref:view-box class="rememberIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}" >
                {{fetchClassName}}
                <a slot="right" @click="_changeSub()" class="changeSub">查看<span class="with_arrow"></span></a>
            </x-header>
        </div>

        <div style="padding-top:46px;">
            <template v-for="item in rememberWorkbook">
                 <template v-if="item">
                    <group :title="item.textbookName">
                        <cell v-for="workbook in item.list" :title="workbook.workbookName" @click="_toChapter(workbook.workbookId)"></cell>
                    </group>
                </template>
            </template>

            <infinite-loading :on-infinite="_onInfinite" spinner="spiral">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">你还未添加习题册呢~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;"></span>
            </infinite-loading>
        </div>

    </view-box>
    <!--切换课程-->
        <mt-popup :visible.sync="visible"  popup-transition="popup-fade" class="gnb-changeSub" >
            <p @click="toStudent()">按学生</p>
            <p @click="toError()">按错误程度</p>
        </mt-popup>
</template>

<script>
import store from '../../store'
import { Popup } from 'mint-ui'
import {XHeader,Panel,ViewBox,Group,Cell,Search,Tabbar,XButton} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {token,id} from '../../common/getters'
import { fetchClassMateList,fetchClassName } from '../../class/getters.js'
import {rememberWorkbook,rememberSubjectId} from '../getters'
import {getWorkbook,setSubject} from '../actions/remember'
import {delChapter} from '../actions/workbook'
import '../../components/changesub/index.less'
import '../index.less'

export default {
  components:{
    XHeader,ViewBox,Panel,Group,Cell,Search,InfiniteLoading,Tabbar,XButton,
    'mt-popup': Popup
  },
  methods: {
    _toChapter(str){
        this.delChapter();      //进去前清除章节数据
        this.$router.go('/remember/workbook/'+str);
    },
    toStudent(){
        this.$router.go('/index/check/detail/'+this.id)
    },
    toError(){
        this.$router.go('/index/check/error/level/'+this.id)
    },
    _changeSub(){
        this.visible = true;
    },
    _onInfinite(){
        //若没有数据则重新提交
        if(this.rememberWorkbook.length != 0 ){
            this.$broadcast('$InfiniteLoading:loaded');
            this.$broadcast('$InfiniteLoading:complete');
            return;
        }

        this.getWorkbook({
            token:this.token,
            //subjectId:this.rememberSubjectId
            classCode:this.id
        },()=>{
            if(this.rememberWorkbook.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
            this.$broadcast('$InfiniteLoading:complete');
        });
    }
  },
  vuex: {
    getters:{
        token,rememberWorkbook,rememberSubjectId,fetchClassName,id
    },
    actions:{
        getWorkbook,setSubject,delChapter,WorkbookAllDel
    }
  },
  store,
  data(){
    return {
        searchName:'',
        visible:false,
        subjectList:['math','physics']
    }
  }
}
</script>
