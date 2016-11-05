<template>
    <view-box v-ref:view-box class="errorIndex">
        <div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:1">
            <x-header :left-options="{showBack: true}">记录题型</x-header>
        </div>
        <div id="scroll" style="padding-top:46px">
            <div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in errorIndexList">
                <div class="weui_panel_hd">{{{item.knowledge}}} <span style="float:right">{{$index+1}}/{{errorIndexList.length}}</span></div>
                <!-- <x-button type='primary' mini>参考例题</x-button> -->
                <div class="weui_panel_bd">
                    <a class="weui_media_box weui_media_appmsg"  v-touch:tap="_into(item.knowledgeId)">
                        <div class="weui_media_bd">
                            <p class="weui_media_desc">
                                {{{item.content}}}
                            </p>
                        </div>
                    </a>
                    <div class="weui_panel_ft">
                        <p class="">
                            <span>难度：{{item.difficult}}</span>
                            <span style="float:right">错误{{item.errorCount}}次</span>
                        </p>
                    </div>
                </div>
            </div>

            <infinite-loading :on-infinite="_onInfinite" spinner="waveDots">
                <span slot="no-results" style="color:#4bb7aa;">
                    <i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
                    <p style="font-size:1rem;display:inline-block;">还没有归纳错题~</p>
                </span>
                <span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
            </infinite-loading>
        </div>
    </view-box>
</template>

<script>
import {XHeader,Panel,XButton,ViewBox,ButtonTab,ButtonTabItem} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import {period_id,subject_id,token,id} from '../../common/getters'
import {errorIndexIds,errorIndexList,errorIndexTotalPage,fetchCurrentPage} from '../getters'
import {getErrorIds,getErrorList,setKnowledgeId,clearList,setCurrentPage} from '../actions'
import moment from 'moment'

export default {
    components: {
        XHeader,XButton,InfiniteLoading,
        Panel,ViewBox,ButtonTab,ButtonTabItem
    },
    vuex: {
        getters: {
            period_id,subject_id,token,errorIndexIds,errorIndexList,errorIndexTotalPage,id,fetchCurrentPage
        },
        actions: {
            getErrorIds,getErrorList,setKnowledgeId,clearList,setCurrentPage
        }
    },
    methods: {
        _into(knowledgeId){
            this.setKnowledgeId(knowledgeId)
            this.$router.go('/index/brush/detail/errorDetail/'+ this.id)
        },        
        _onInfinite(){
            this.getErrorIds({
                studentId: this.id,
                currentPage:this.fetchCurrentPage,
                between:{
                    start:this.startTime,
                    end:this.endTime
                },
                token: this.token,
                options: {
                    period_id: this.period_id,
                    subject_id: this.subject_id
                }
            },()=>{
                this.getErrorList({
                    options: {
                        ids: this.errorIndexIds,
                        period_id: this.period_id,
                        subject_id: this.subject_id
                    },
                    token: this.token,
                    studentId: this.id
                },()=>{
                    setTimeout(()=>{
                        this.$broadcast('$InfiniteLoading:loaded')
                        if(parseInt(this.errorIndexTotalPage) <= parseInt(this.fetchCurrentPage)){
                            this.$broadcast('$InfiniteLoading:complete')
                            return
                        }
                        this.setCurrentPage(parseInt(this.fetchCurrentPage) + 1)
                    },1000)
                })
            })
        }
    },
    data(){
        return{
            endTime:moment().unix(),
            startTime:moment().add(-3, 'M').unix()
        }
    }
}
</script>
