<template>
    <view-box v-ref:view-box class='myClass'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">查看错题</x-header>
        </div>

        <div style="padding-top:46px">
            <group>
                <div v-for="item in fetchClassList" class="cell" v-touch:tap="_detail(item.classCode,item.name)">
                    <span>{{item.name}}&nbsp;</span>
                </div>
            </group>
        </div>
    </view-box>
</template>
<script>

import './myClass.less'
import store from '../../store'
import { XHeader,Group,ViewBox }from 'vux'
import { myClassList,setClassName,setClassCode } from '../../class/actions.js'
import { fetchClassList } from '../../class/getters'
import { token } from '../../common/getters.js'
export default {
    components: {XHeader,Group,ViewBox},
    vuex: {
        getters: {
            fetchClassList,token
        },
        actions: {
            myClassList,setClassName,setClassCode
        }
    },
    store,
    methods: {
        _detail(code,name) {
            this.setClassName(name)
            this.setClassCode(code)
            this.$router.go('/report/class/'+code)
        }
    },
    created(){
        this.myClassList({
            token: this.token
        })
    }
}
</script>