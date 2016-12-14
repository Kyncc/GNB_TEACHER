<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">我的班级<a slot="right" v-link="{ path: '/index/createClass'}">创建班级</a></x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <div v-for="item in fetchClassList"  class="cell"  v-touch:tap="_detail(item.classCode,item.name)">
                    <span :class="{'vux-reddot':item.status=='1'}">{{item.name}}&nbsp;</span>
                </div>
            </group>
        </div> 
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,ViewBox} from 'vux'
import {myClassList,setClassName} from '../actions'
import {fetchClassList} from '../getters'
import {token} from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,ViewBox},
    vuex: {
        getters: {
            fetchClassList,token
        },
        actions: {
            myClassList,setClassName
        }
    },
    methods: {
        _detail(code,name) {
            this.setClassName(name)
            setTimeout(()=>{
                this.$router.go('class/manage/' + code)
            },300)
        },
        createClass() {
            this.$router.go('createClass')
        }
    },
    ready(){
        this.myClassList({
            token: this.token
        })
    }
}
</script>