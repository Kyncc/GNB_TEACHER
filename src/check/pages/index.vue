<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">查看错题</x-header>
        <group>
            <!-- <cell v-for="item in fetchClassList" :title="item.name" v-touch:tap="_detail(item.classCode,item.name)">
                <span class="demo-icon" slot="icon"></span>
            </cell> -->
            <div  v-for="item in fetchClassList"  class="cell"  v-touch:tap="_detail(item.classCode,item.name)">
                <span>{{item.name}}&nbsp;</span>
            </div>
        </group>
    </view-box>
</template>
<script>
import './myClass.less'
import {XHeader,Group,ViewBox}from 'vux'
import {myClassList,setClassName} from '../../class/actions.js'
import {fetchClassList} from '../../class/getters'
import {token} from '../../common/getters.js'
export default {
    components: {XHeader,Group,ViewBox},
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
            this.$router.go('check/detail/' + code)
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
    }
}
</style>
