<template>
	<div class='createClass'>
		<x-header :left-options="{showBack: true}">
			班级编辑
			<a slot="right" @click="_complete">完成</a>
		</x-header>

		<group>
			<x-input type="text" name="name" placeholder="请输入班级名称" keyboard="text" :value.sync="name" :max="6"></x-input>
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
			if(this.name.length == 0 ){
					_.toast('请填写班级名称');
			}else if(this.name.length > 6){
					_.toast('班级名称最大6个字');
			}else{
				this.updateClass({
					name: this.name,
				})
				.then(() => {
					this.name = ""
					history.back();
				})
			}
		}
	},
	computed:{
    ...mapGetters(['classmate'])
	}
}
</script>
