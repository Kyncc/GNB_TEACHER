<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">班级管理</x-header>
        </div>
        <div style="padding-top:46px;height:100%">
            <div id='wrapper' style="height:100%">
                <group>
                    <div  class="cell" v-show="fetchClassName">
                        <span>{{fetchClassName}}</span>
                    </div>
                    <div  class="cell"   v-link="{ path: '/class/apply/'+ code}">
                        <span :class="{'vux-reddot': reddot }">申请通知&nbsp;</span>
                        <div class="weui_cell_ft with_arrow"></div>
                    </div>
                    <div  class="cell"  v-link="{ path: '/class/classmate/'+ code}">
                        <span >班级成员</span>
                        <div class="weui_cell_ft with_arrow">{{fetchClassMateList.length}}人</div>
                    </div>
                    <div class="cell"  v-link="{ path: '/class/invite/'+ code}">
                        <span >邀请学生</span>
                        <div class="weui_cell_ft with_arrow"></div>
                    </div>
                    <div class="cell"  v-touch:tap="_delete()">
                        <span >删除班级</span>
                        <div class="weui_cell_ft with_arrow"></div>
                    </div>
                </group>
            </div>
        </div>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该班级吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
    </view-box>
</template>

<script>
import './myClass.less'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem,XInput,Confirm} from 'vux'
import { getClassDetail,applyList,myClassList,delClass} from '../actions.js'
import { fetchClassMateList,fetchApplyList,fetchClassName } from '../getters.js'
import { token,code } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,XButton,XInput,Confirm},
    vuex:{
        actions:{
            getClassDetail,applyList,myClassList,delClass
        },
        getters:{
            fetchClassMateList,token,code,fetchApplyList,fetchClassName
        }
    },
    data(){
        return {
            reddot:false,
            show:false,
        }
    },
    methods:{
        _delete(){
            this.show = true
        },
        onAction(type) {
            if(type=='确认'){
                this.delClass({
                    classCode:this.code,
                    token:this.token
                },()=>{
                    this.myClassList({
                        token: this.token
                    })
                })
            }
        },
        _apply(status,classCode,studentId){
            this.replyApply({
                classCode: classCode,
                status: status,
                studentId: studentId,
                token: this.token
            },()=>{
                this.applyList({
                    classCode: this.code,
                    token: this.token
                })
            })
        }
    },
    ready(){
        this.getClassDetail({
            classCode:this.code,
            token:this.token
        });

        this.applyList({
            classCode:this.code,
            token:this.token
        });

        var self = this
        for(var key in this.fetchApplyList){
            if(self.fetchApplyList[key].status == '2'){
                self.reddot = true
            }
        }
        
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.getClassDetail({
                    classCode:self.id,
                    token:self.token
                },()=>{
                    complete()
                })
                self.applyList({
                    classCode:self.id,
                    token:self.token
                },()=>{
                    complete()
                })
                for(var key in self.fetchApplyList){
                    if(self.fetchApplyList[key].status == '2'){
                        self.reddot = true
                    }
                }
            }
        });
    }
}
</script>

