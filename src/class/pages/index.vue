<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">我的班级<a slot="right" v-link="{ path: '/index/createClass'}">创建班级</a></x-header>
        <group>
            <div  v-for="item in fetchClassList"  class="cell"  v-touch:tap="_detail(item.classCode,item.name)">
                <span :class="{'vux-reddot':item.status=='1'}">{{item.name}}&nbsp;</span>
            </div>
        </group>
    </view-box>
</template>

<script>
import './myClass.less'
import {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox} from 'vux'
import {myClassList,setClassName} from '../actions'
import {fetchClassList} from '../getters'
import {token} from '../../common/getters.js'
export default {
    components: {XHeader,Cell,Group,Flexbox,FlexboxItem,ViewBox},
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
            this.$router.go('class/detail/' + code)
            this.setClassName(name)
        },
        createClass() {
            this.$router.go('createClass')
        }
    },
    ready() {
        this.myClassList({
            token: this.token
        })
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
}
</style>
