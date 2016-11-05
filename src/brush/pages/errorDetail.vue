<template>
	<view-box v-ref:view-box class="cameraRecord">
		<div slot="header" style="position:absolute;left:0;top:0;width:100%;z-index:100" >
			<x-header :left-options="{showBack: true}">
				参考例题
			</x-header>
		</div>

		<div style="padding-top:46px;">
			<!--内容-->
			<div class="weui_panel weui_panel_access exerciseExampleList" >
				<div class="weui_panel_hd">
					<flexbox :gutter="0" wrap="wrap">
						<flexbox-item :span="2/4" style="color:#4bb7aa">题干</flexbox-item>
                        <flexbox-item :span="1/4" style="text-align:right;color:#666" ><i class="icon iconfont icon-comment"></i>点评</flexbox-item>
					</flexbox>
				</div>
				<!--题目整体-->
				<div class="weui_panel_bd" >
					<!--题目-->
					<div class="weui_media_bd weui_media_box ">
						<p class="weui_media_desc">
							123
						</p>
					</div>
					<!--选项-->
					<template >
						<div class="weui_media_bd weui_media_box options">
							<p class="weui_media_desc" >
								123
							</p>
						</div>
					</template>
				</div>

				<div class="weui_panel weui_panel_access exerciseDetail">
					<div class="weui_panel_hd">
						<flexbox :gutter="0" wrap="wrap">
							<flexbox-item :span="2/5" style="color:#4bb7aa">解析</flexbox-item>
						</flexbox>
					</div>
					<!--解析主体-->
					<div class="weui_panel_bd">
						<div class="weui_media_bd weui_media_box ">
							<p class="weui_media_desc">
								123
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <infinite-loading :on-infinite="_onInfinite" spinner="default">
			<span slot="no-results" style="color:#4bb7aa;">
				<i class="icon iconfont icon-comiiszanwushuju" style="font-size:1.5rem;margin-right:.2rem"></i>
				<p style="font-size:1rem;display:inline-block;">服务器出差了~</p>
			</span>
			<span slot="no-more" style="color:#4bb7aa;font-size:.8rem;">(●'◡'●)已经到底啦~</span>
		</infinite-loading> -->
	</view-box>
</template>

<script>
import {XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group} from 'vux'
import moment from 'moment'
import store from '../../store'
import './camera.less'

export default {
	components: {
		XHeader,Flexbox,FlexboxItem,XButton,ViewBox,Group
	}
}
</script>
