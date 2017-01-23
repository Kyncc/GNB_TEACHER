import * as types from './mutationTypes'
import * as getters from './getters'
import * as actions from './actions'

const state = {
  classList: {
		reset:false,
		list:[]
  },
	student:{
		grade:'',
		headImg:'',
		id:'',
		name:'',
		subjectType:[],
		textbook:[]
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
		state.class.name = data.classname;
		state.class.code = data.classCode;
		state.class.classmate.list = data.classmates;
		state.class.classmate.reset = false;
	},
	[types.RESET_CLASSMATE](state) {
		state.class.name = '';
		state.class.code = '';
		state.class.classmate.list = []
		state.class.classmate.reset = true;
	},
	[types.APPLY_LIST](state,data) {
		state.class.applyList.list = data[0].students;
		state.class.applyList.reset = false;
	},
	[types.RESET_APPLY](state) {
		state.class.applyList.list = []
		state.class.applyList.reset = true;
	},
	[types.CLASSDETAIL](state,data) {
		state.class.name = data.name;
		state.class.code = data.code;
	},
	[types.STUDENT_INFO](state,data){
		state.student.grade = data.grade;
		state.student.id = data.id;
		state.student.name = data.name;
		state.student.headImg = data.headImg;
		state.student.subjectType = data.subjectType;
		state.student.textbook = data.textbook;
	}
}


export default {
	state,
	mutations,
	actions,
	getters
}
