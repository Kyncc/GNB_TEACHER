<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}<a slot="right" v-link="{ path: '/index/class/invite/'+ id}">邀请学生</a></x-header>
            <flexbox style="padding:10px 0;background:#edf2f1;" class="vux-center">
                <flexbox-item :span="3/4">
                    <button-tab>
                        <button-tab-item v-touch:tap="_list('student')" :selected="selected">学生列表</button-tab-item>
                        <button-tab-item v-touch:tap="_list('apply')"  :selected="!selected">申请列表</button-tab-item>
                    </button-tab>
                </flexbox-item>
            </flexbox>
        </div>
        <group style="padding-top:98px;" v-show="selected">
            <cell v-for="item in fetchClassMateList" :title="item.name" >
                <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
            </cell>
        </group>
        <group style="padding-top:98px;" v-show="!selected">
            <div v-for="item in fetchApplyList" class="applyList">
                <p class="msg">{{item.studentName}}申请加入{{item.className}} <span class="disable">{{item.applyTime}}</span></p>
                <p v-show="item.status == 1" class="state disable">已同意</p>
                <p v-show="item.status == 0" class="state disable">已拒绝</p>
                <x-button v-show="item.status == 2" v-touch:tap="_apply(0,item,item.classCode,item.studentId)"> class="leftbtn" type='warn' mini>拒绝</x-button>
                <x-button v-show="item.status == 2" v-touch:tap="_apply(1,item,item.classCode,item.studentId)"> class="rightbtn" type='primary' mini>同意</x-button>
            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import InfiniteLoading from 'vue-infinite-loading'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import { myClassmateList,applyList,replyApply} from '../actions.js'
import { fetchClassMateList,fetchApplyList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,InfiniteLoading,XButton},
    vuex:{
        actions:{
            myClassmateList,applyList,replyApply
        },
        getters:{
            fetchClassMateList,token,id,fetchApplyList,fetchClassName
        }
    },
    methods:{
        _apply(status,classCode,studentId){
            let self = this
            self.replyApply({
                classCode: classCode,
                status: status,
                studentId: studentId,
                token: self.token
            },()=>{
                self.applyList({
                    classCode: self.id,
                    token: self.token
                })
            })
        }
    },
    ready(){
        this.myClassmateList({
            classCode:this.id,
            token:this.token
        })
        this.applyList({
            classCode:this.id,
            token:this.token
        })
    },
    data(){
        return {
            selected: true
        }
    },
    methods: {
        _list(val) {
            if(val=='apply'){
                this.selected = false
            }else{
                this.selected = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
.applyList{
    padding:1rem;
    border-bottom:1px solid #999;
    .msg{
        line-height:2rem;
        font-size:1rem;
        span{
            font-size:0.8rem;
            float:right;
        }
    }
    .state{
        text-align:center;
        font-size:0.8rem;
    }
    .leftbtn{
        width:30%;
        margin-top:0;
    }
    .rightbtn{
        width:30%;
        margin-left:37%;
        margin-top:0;
    }
}
</style>
