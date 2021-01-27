import Vue from 'vue'
import prompt from '../utils/prompt.js'

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
	// bind表示这个自定义指令一绑定到dom上，就开始自动执行
	bind(el, binding) {
		// console.log('bind');
	},
	// 表示dom插入到页面上的时候自动执行
	// 这些函数都有两个参数，一个是el(使用自定义指令的元素), 一个是binding(记录自定义指令信息的对象)
	inserted(el, binding) {
		//此方法仅适用于 uni-app -- 定向封装 -- H5
		// console.log(uni.createSelectorQuery().select(el));
		// uni.createSelectorQuery().select(el)._selector.children[0].children[1][0].focus();
	},
	// 表示自定义指令后面的值更新的时候，自动执行
	update() {
		// console.log('update');
	},
	componentUpdated() {},
	unbind() {}
})

// 注册一个全局自定义指令 `v-error`
Vue.directive('error', {
	// bind表示这个自定义指令一绑定到dom上，就开始自动执行
	bind(el, binding) {
		// console.log('bind');
	},
	// 表示dom插入到页面上的时候自动执行
	// 这些函数都有两个参数，一个是el(使用自定义指令的元素), 一个是binding(记录自定义指令信息的对象)
	inserted(el, binding) {
		//此方法仅适用于 uni-app -- 定向封装 -- H5
		// setTimeout(() => {
		// 	//uni获取元素
		// 	let src = uni.createSelectorQuery().select(el)._selector.children[0].children[0].src;
		// 	console.log(src);
		// 	let index = src.lastIndexOf("."); //（考虑严谨用lastIndexOf(".")得到）得到"."在第几位
		// 	src = src.substring(index + 1); //截断"."之前的，得到后缀
		// 	let arr = 'MP4,AVI,WMV,RM,RMVB,MPEG1,MPEG2,MPEG4(MP4),3GP,ASF,SWF,VOB,DAT,MOV,M4V,FLV,F4V,MKV,MTS,TS';
		// 	if (arr.indexOf(src.toUpperCase()) == -1) { //根据后缀，判断是否符合图片格式 //src != ".bmp" && src != ".png" && src != ".gif" && src != ".jpg" && src != ".jpeg"
		// 		prompt.showDefaultAlert('提示', '视频加载失败!');
		// 	}
		// }, 1000)
	},
	// 表示自定义指令后面的值更新的时候，自动执行
	update(el) {
		// console.log('update');
	},
	componentUpdated() {},
	unbind() {}
})

/**
 * ...
 */
