<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">班级管理</x-header>
        <group>
            <!-- <x-input name="username" style="border-bottom:1px solid #d9d9d9;" :value.sync="fetchClassName" readonly><span>编辑</span></x-input> -->
            <div  class="cell" v-show="fetchClassName">
                <span>{{fetchClassName}}</span>
                <!-- <div class="weui_cell_ft">编辑</div> -->
            </div>
            <div  class="cell"   v-link="{ path: '/index/class/apply/'+ id}">
                <span :class="{'vux-reddot': reddot }">申请通知&nbsp;</span>
                <div class="weui_cell_ft with_arrow"></div>
            </div>
            <div  class="cell"  v-link="{ path: '/index/class/detail/'+ id}">
                <span >班级成员</span>
                <div class="weui_cell_ft with_arrow">{{fetchClassMateList.length}}人</div>
            </div>
            <div  class="cell"  v-link="{ path: '/index/class/invite/'+ id}">
                <span >邀请学生</span>
                <div class="weui_cell_ft with_arrow">    </div>
            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,XButton,ViewBox,ButtonTab,ButtonTabItem,XInput} from 'vux'
import { myClassmateList,applyList,replyApply} from '../actions.js'
import { fetchClassMateList,fetchApplyList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox,ButtonTab,ButtonTabItem,XButton,XInput},
    vuex:{
        actions:{
            myClassmateList,applyList,replyApply
        },
        getters:{
            fetchClassMateList,token,id,fetchApplyList,fetchClassName
        }
    },
    data(){
        return {
            reddot:false
        }
    },
    methods:{
        _apply(status,classCode,studentId){
            console.log(classCode)
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
        var self = this
        for(var key in this.fetchApplyList){
            if(this.fetchApplyList[key].status == '2'){
                self.reddot = true
            }
        }
    }
}
</script>
<style lang="less" scoped>
.myClass{

    .cell{
        padding:1rem;
        span{
            dispaly:inline-block !important;
        }
        border-bottom:1px solid #d9d9d9;
        &:last-child{
            border: none;
        }
    }

    .weui_cell_ft{
        width: 20%;
        float: right;
    }
}

</style>
