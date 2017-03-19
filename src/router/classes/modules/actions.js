/** 清除所有数据*/
export const clearAll = ({ dispatch}) => {
	dispatch('clearBreak');
	dispatch('clearReport');
	dispatch('clearPass');
	// dispatch('workbookStuClear');
}
