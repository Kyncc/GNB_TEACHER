<template>
    <view-box v-ref:view-box class='myClassApply'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        </div>
        <div style="padding-top:46px;height:100%">
            <div id='wrapper' style="height:100%">
                <group>
                    <div  v-for="item in fetchApplyList"  class="cell" >
                        <img style="display:block;margin-right:5px;width:25px;height:25px;float:left;" :src="item.headImg">
                        <span>{{item.studentName}}</span>
                        <p v-show="item.status == 1" class="state disable">已同意</p>
                        <p v-show="item.status == 0" class="state disable">已拒绝</p>
                        <x-button v-show="item.status == 2" v-touch:tap="_apply('1',item.classCode,item.studentId)" class="btn" type='primary' mini>同意</x-button>
                        <x-button v-show="item.status == 2" v-touch:tap="_apply('0',item.classCode,item.studentId)" class="btn" type='warn' mini>拒绝</x-button>
                    </div>
                </group>
            </div>
        </div>
    </view-box>
</template>

<script>
import './myClass.less'
import JRoll from 'jroll'
import '../../common/pulldown.js'
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import { replyApply,applyList} from '../actions.js'
import { fetchApplyList,fetchClassName } from '../getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,XButton},
    vuex:{
        actions:{
            replyApply,applyList
        },
        getters:{
            token,id,fetchApplyList,fetchClassName
        }
    },
    created(){
        this.applyList({
            classCode:this.id,
            token:this.token
        });     
    },
    methods:{
        _apply(status,classCode,studentId){
            this.replyApply({
                classCode: classCode,
                status: status,
                studentId: studentId,
                token: this.token
            },()=>{
                this.applyList({
                    classCode: this.id,
                    token: this.token
                })
            })
        }
    },
    ready(){
        var self = this
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.applyList({
                    classCode:self.id,
                    token:self.token
                },()=>{
                    complete()
                })
            }
        })
    }
}
</script>

