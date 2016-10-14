<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">查错题</x-header>
        <group>
            <cell v-for="item in fetchClassList" :title="item.name" v-touch:tap="_detail(item.classCode,item.name)">
                <span class="demo-icon" slot="icon"></span>
            </cell>
        </group>
    </view-box>
</template>
<script>
import './myClass.less'
import {XHeader,Cell,Group,ViewBox}from 'vux'
import {myClassList,setClassName} from '../../class/actions.js'
import {fetchClassList} from '../../class/getters'
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
