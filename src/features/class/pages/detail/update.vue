<template>
	<div class='createClass'>
		<x-header :left-options="{showBack: true}">
			班级编辑
			<a slot="right" @click="_complete">完成</a>
		</x-header>

		<group>
			<x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name"></x-input>
		</group>
	</div>
</template>

<script>
import {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell} from 'vux'
import { mapActions,mapGetters } from 'vuex'
import * as _ from 'config/whole'

export default {
	components: {XHeader,XInput,Group,XButton,Confirm,PopupPicker,Cell},
	data(){
		return {
			name: '',
		}
	},
	route: {
    data:function(transition){
			this.name = this.classmate.name;
    }
  },
	methods: {
		...mapActions(['updateClass']),
		_complete() {
			if (this.name){
				this.updateClass({
					name: this.name,
				})
				.then(() => {
					history.back();
				})
			} else {
				_.toast('请填写班级名称')
			}
		}
	},
	computed:{
    ...mapGetters(['classmate'])
	}
}
</script>
