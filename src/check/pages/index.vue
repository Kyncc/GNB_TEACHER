<template>
    <view-box v-ref:view-box class='myClass'>
        <x-header :left-options="{showBack: true}">查看错题</x-header>
        <group id='wrapper' style="height:100%">
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
import JRoll from 'jroll'
import '../../common/pulldown.js'
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
    ready(){
        let self = this
        self.myClassList({
            token: self.token
        })
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.myClassList({
                    token: self.token
                },()=>{
                    complete()
                })
            }
        });
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
