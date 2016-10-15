<template>
	<view-box v-ref:view-box class="errorList">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100">
			<x-header :left-options="{showBack: true}">错题列表</x-header>
			<group class="knowledge">
				<p><span>知识点：</span>{{{knowledge}}}</p>
				<p><span>难度：{{difficult}}</span> <span style="float:right;"  v-touch:tap="_correct" ><i class="icon iconfont icon-error-login"></i> 纠错</span></p>
			</group>
		</div>
		<div style="padding-top:120px;">
			<div class="weui_panel weui_panel_access exerciseExampleList" v-for="item in list">
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="3/4" style="color:#4bb7aa">{{item.cameraTime | ymd}}</flexbox-item>
						<flexbox-item :span="1/4" style="text-align:right;color:#666" v-touch:tap="_comment(item.id)" >
							<i class="icon iconfont icon-comment"></i>点评
						</flexbox-item>
					</flexbox>
				</div>
				<div class="weui_panel_bd">
					<div class="weui_media_bd weui_media_box ">
						<p class="weui_media_desc">
							<img class="previewer-demo-img" v-lazy="item.compressPic"  height="200"  @click="_show($index)"/>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<infinite-loading :on-infinite="_onInfinite" spinner="default">
		<span slot="no-results" style="color:#4bb7aa;">
			<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
			<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
		</span>
		<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
	</infinite-loading>
	<previewer :list="imgList" v-ref:previewer ></previewer>
</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,ViewBox,Group,Previewer} from 'vux'
import './error.less'
import InfiniteLoading from 'vue-infinite-loading'
import {period_id,subject_id,token,id} from '../../common/getters'
import {errorListIds,errorListList,fetchKnowledgeId} from '../getters'
import {collectAdd,collectRemove} from '../../common/actions'
import {getErrorListIds,getErrorListList} from '../actions'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,ViewBox,Group,Previewer,InfiniteLoading
	},
	vuex: {
		actions: {
			getErrorListIds,getErrorListList,collectAdd,collectRemove
		},
		getters: {
			errorListIds,errorListList,period_id,subject_id,token,id,fetchKnowledgeId
		}
	},
	data() {
		return {
			ashow: false,
			list: [],
			imgList: [{
				src: '',
				w: '',
				h: ''
			}],
			currentPage: 1,
			knowledge: '',
			difficult: ''
		}
	},
	methods: {
		_show(index) {
			this.imgList[0].src = this.list[index].pic;
			this.imgList[0].w = this.list[index].width;
			this.imgList[0].h = this.list[index].height;
			this.$refs.previewer.show();
		},
		_comment(id) {
			this.$router.go(`/error/comment/${id}`)
		},
		_correct(){
			this.$router.go('/error/correct/'+this.list[0].id);
		},
		_onInfinite() {
			let self = this
			self.getErrorListIds({
				options: {
					period_id: self.period_id,
					subject_id: self.subject_id
				},
				token: self.token,
				studentId: self.id,
				knowledgeId:self.fetchKnowledgeId
			},()=>{
				self.getErrorListList({
					options: {
						ids: self.errorListIds,
						period_id: self.period_id,
						subject_id: self.subject_id
					},
					token: self.token
				}, () => {
					setTimeout(() => {
						self.list = self.errorListList;
						if (self.list.length != 0) {
							self.$broadcast('$InfiniteLoading:loaded');
						}
						self.$broadcast('$InfiniteLoading:complete');
					}, 300);

					// this.list = this.errorListList
				});
			})
		}
	},
	watch: {
		list() {
			this.knowledge = this.list[0].knowledge;
			this.difficult = this.list[0].difficult;
		}
	}
}
</script>
