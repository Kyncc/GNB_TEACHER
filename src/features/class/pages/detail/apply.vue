<template>
	<view-box  class='myClassApply'>
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">申请通知
				<a slot="right" @click="_refresh">刷新</a>
			</x-header>
		</div>
		<div style="padding-top:46px;">
			<group>
				<div v-for="item in classApply" class="cell">
					<img style="display:block;margin-right:5px;width:25px;height:25px;float:left;" :src="item.headImg">
					<span>{{item.studentName}}</span>
					<p v-show="item.status == 1" class="state disable">已同意</p>
					<p v-show="item.status == 0" class="state disable">已拒绝</p>
					<x-button v-show="item.status == 2" @click="_apply('1',item.classCode,item.studentId)" class="btn" type='primary' mini>同意</x-button>
					<x-button v-show="item.status == 2" @click="_apply('0',item.classCode,item.studentId)" class="btn" type='warn' mini>拒绝</x-button>
				</div>
			</group>
			<infinite-loading :on-infinite="_onInfinite" spinner="spiral">
				<span slot="no-results" style="color:#4bb7aa;">
					<p style="font-size:1rem;display:inline-block;">快邀请更多学生吧~</p>
				</span>
				<span slot="no-more"></span>
			</infinite-loading>
		</div>
	</view-box>
</template>


<script>
import {XHeader,Cell,Group,XButton,ViewBox} from 'vux'
import InfiniteLoading from 'vue-infinite-loading'
import { mapActions,mapGetters } from 'vuex'


export default {
	components: {XHeader,Cell,Group,ViewBox,XButton,InfiniteLoading},
	route: {
    data:function(transition){
			if(this.applyListReset){
				this.$nextTick(() => {
					this.$broadcast('$InfiniteLoading:reset');
				})
			}
    }
  },
	methods:{
		...mapActions(['getApplyList','updateApplyList','resetClassApply']),
		_refresh(){
			this.resetClassApply();
			this.$nextTick(() => {
				this.$broadcast('$InfiniteLoading:reset');
			})
		},
		_onInfinite(){
       this.getApplyList()
      .then(()=>{
        if(this.classApply.length != 0) {this.$broadcast('$InfiniteLoading:loaded');}
        this.$broadcast('$InfiniteLoading:complete');
      })
    },
		_apply(status,classCode,studentId){
			this.updateApplyList({
				classCode: classCode,
				status: status,
				studentId: studentId,
			})
			.then(()=>{
				this.getApplyList()
			})
		}
	},
	computed:{
    ...mapGetters(['classmate','applyListReset','ClassCode']),
    className(){
      return this.classmate.name;
	 	},
		classApply(){
			return this.classmate.applyList.list;
		}
	}
}
</script>

