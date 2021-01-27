<template>
	<view class="bg">
		<view class="row">
			<view class="red" v-if="allowBlank">*</view>
			<view>{{name}}</view>
		</view>
		<view class="row">
			<input class="w" v-if="showType == 'text'" :value="value" @input="onInput" v-on="tagEvent" v-bind="inputConfig" />
			<view v-else v-on="tagEvent">{{inputConfig.value}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			allowBlank: { // 是否必填
				default: false
			},
			name: { // 显示名称
				type: String,
				required: true,
				default: '这是默认标题'
			},
			showType: { // 显示类别, 如果是text, 则为文本框类型, view为显示类型
				type: String,
				required: true,
				default: 'text'
			},
			inputConfig: {
				type: Object
			},
			tagEvent: {
				type: Object
			}
		},
		methods: {
			onInput(e) {
				this.$emit('input', e.detail.value)
			}
		}
	}
</script>

<style>
	.w {
		width: 100%;
	}

	.red {
		color: red;
	}

	.bg {
		width: 100%;
		background: white;
		padding: 24rpx;
	}
</style>
