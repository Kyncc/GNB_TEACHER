<template>
    <view-box v-ref:view-box>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">{{className}}</x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <cell title="编辑班级" :link="{ path: 'update/'+ classCode}"></cell>
                <cell title="申请通知" :link="{ path: 'apply/'+ classCode}"></cell>
                <cell title="班级成员" :link="{ path: 'classmate/'+ classCode}">
                    <span>{{classmateCount}}人</span>
                </cell>
                <cell title="邀请学生" :link="{ path: 'invite/'+ classCode}"></cell>
                <cell title="删除班级" @click="_delete()" ></cell>
            </group>
        </div>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="确定删除该班级吗?" @on-confirm="onAction('确认')" @on-cancel="onAction('取消')"></confirm>
    </view-box>
</template>

<script>
import {XHeader,Cell,Group,XButton,ViewBox,ButtonTab,ButtonTabItem,XInput,Confirm} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import * as _ from 'config/whole'

export default {
    components: {XHeader,Cell,Group,ViewBox,ButtonTab,ButtonTabItem,XButton,XInput,Confirm},
    data(){
        return {
            // reddot:false,
            classCode:'',
            show:false,
        }
    },
    route: {
        data:function(transition){
            this.classCode = transition.to.params.code;
            (this.classmateReset ? this._getData() : '')
        }
    },
    methods:{
        ...mapActions(['getClassmate','delClass']),
        _delete(){
            this.show = true
        },
        onAction(type) {
            if(type=='确认'){
                this.delClass({
                    "classCode":this.classCode,
                })
                .then(()=>{
                    setTimeout(()=>{
                        history.go(-1);
                    },200);
                })
            }
        },
        _getData(){
             _.busy();
            this.getClassmate({
                "code":this.classCode
            })
            .then(()=>{
                _.leave();
            })
            .catch((error)=>{
                _.leave();
            });
        }
    },
    computed:{
        ...mapGetters(['path','classmate','classmateReset']),
        className(){
            return this.classmate.name;
        },
        classmateCount(){
            return this.classmate.classmate.list.length;
        }
	}
}
</script>

