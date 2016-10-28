<template>
    <div style="height:100%">
        <x-header :left-options="{showBack: true}">{{fetchClassName}}</x-header>
        <group id='wrapper' style="height:100%">
            <cell v-for="item in fetchClassMateList" :title="item.name" v-touch:tap="_check(item.id)">
                <img slot="icon" width="30" style="display:block;margin-right:5px;" :src="item.headImg">
            </cell>
        </group>
    </div>
</template>

<script>
import JRoll from 'jroll'
import '../../common/pulldown.js'
import { XHeader,Cell,Group } from 'vux'
import { myClassmateList,applyList} from '../../class/actions.js'
import { fetchClassMateList,fetchClassName } from '../../class/getters.js'
import { token,id } from '../../common/getters.js'
export default {
    components: {
        XHeader,
        Cell,
        Group
    },
    vuex:{
        actions:{
            myClassmateList,applyList
        },
        getters:{
            fetchClassMateList,token,id,fetchClassName
        }
    },
    ready(){
        let self = this
        self.myClassmateList({
            classCode:self.id,
            token: self.token
        })
        var jroll = new JRoll("#wrapper");
        jroll.pulldown({
            refresh: function(complete) {
                self.myClassmateList({
                    classCode:self.id,
                    token: self.token
                },()=>{
                    complete()
                })
            }
        });
    },
    methods:{
        _check(id){
            this.$router.go('error/'+ id)
        }
    },
    data(){
        return {
        }
    }
}
</script>
<style lang="less" scoped>
.weui_cell{
    padding: 1rem;
    &:last-child{
        border: none;
    }
}
</style>
