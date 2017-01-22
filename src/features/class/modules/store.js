import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions/index'

const state = {
  classList: {
		reset:false,
		list:[]
  },
  class:{
		classmate:{
			reset:false,
			list:[]
		},
		applyList:{
			reset:false,
			list:[]
		},
		name:'',
		code:''
	}
}

const mutations = {
	[types.CLASS_LIST](state,data) {
		state.classList.list = data;
		state.classList.reset = false;
	},
	[types.RESET_CLASS_LIST](state) {
		state.classList.list = [];
		state.classList.reset = true;
	},
	[types.CLASSMATE](state,data) {
		state.class.classmate.list = data;
		state.class.classmate.reset = false;
	},
	[types.RESET_CLASSMATE](state) {
		state.class.classmate.list = []
		state.class.classmate.reset = true;
	},
	[types.APPLY_LIST](state,data) {
		state.class.applyList.list = data;
		state.class.applyList.reset = false;
	},
	[types.RESET_APPLY](state) {
		state.class.applyList.list = []
		state.class.applyList.reset = true;
	},
	[types.CLASSDETAIL](state,index) {
		state.class.name = data.classList.list[index].name;
		state.class.code = data.classList.list[index].code;
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}
