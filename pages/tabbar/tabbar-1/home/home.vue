<template>
	<view class="page-padding">
		<u-form :model="subData" :rules="rules" ref="uForm" :errorType="errorType">
			<u-form-item :label-position="'left'" label="姓名" prop="name">
				<u-input placeholder="请输入姓名" v-model="subData.name" type="text"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	import {
		request
	} from '@/utils/request.js';
	import util from '@/utils/util.js';
	import prompt from '@/utils/prompt.js';
	export default {
		components: {},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		data() {
			return {
				subData: {
					name: undefined,
				},
				rules:{
					name:[
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur' ,
					},
					{
						min: 3,
						max: 5,
						message: '姓名长度在3到5个字符',
						trigger: ['change','blur'],
					},
					{
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.chinese(value);
						},
						message: '姓名必须为中文',
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ['change','blur'],
					},
					// 异步验证，用途：比如用户注册时输入完账号，后端检查账号是否已存在
					// {
					// 	trigger: ['blur'],
					// 	// 异步验证需要通过调用callback()，并且在里面抛出new Error()
					// 	// 抛出的内容为需要提示的信息，和其他方式的message属性的提示一样
					// 	asyncValidator: (rule, value, callback) => {
					// 		this.$u.post('/ebapi/public_api/index').then(res => {
					// 			// 如果验证出错，需要在callback()抛出new Error('错误提示信息')
					// 			if(res.error) {
					// 				callback(new Error('姓名重复'));
					// 			} else {
					// 				// 如果没有错误，也要执行callback()回调
					// 				callback();
					// 			}
					// 		})
					// 	},
					// }
				]},
				errorType: ['message'],
			};
		},
		onLoad() {

		},
		methods: {}
	};
</script>

<style>
	.page-padding {
		padding: 30rpx;
	}

	.padding-bottom {
		padding-bottom: calc(var(--window-bottom));
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 100%;
		height: 1400px;
		background-color: #ffffff;
	}

	.charts {
		width: 100%;
		height: 1400px;
		background-color: #ffffff;
	}
</style>
