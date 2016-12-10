<template>
    <view-box v-ref:view-box class='brushIndex'>
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
            <x-header :left-options="{showBack: true}">刷题型</x-header>
        </div>
        <div style="padding-top:46px;">
            <group>
                <div v-for="item in fetchClassList" class="cell" v-touch:tap="_detail(item.classCode,item.name)">
                    <span>{{item.name}}&nbsp;</span>
                </div>
            </group>
        </div>
    </view-box>
</template>

<script>
import '../index.less'
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
    methods: {
        _detail(code,name) {
            this.setClassName(name)
            this.setClassCode(code)
            this.$router.go('brush/class/' + code)
        }
    },
    created(){
        this.myClassList({
            token: this.token
        })
    }
}
</script>

