<script>
	import Vue from 'vue';
	import config from 'utils/config.js';
	import {
		request
	} from 'utils/request.js';
	import prompt from 'utils/prompt.js';
	import util from 'utils/util.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					}
					// #endif

					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif

					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			});
		},
		onShow: function() {
			let currentVersion = '0.0.1'; //app当前版本号
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (inf) => {
				currentVersion = inf.version;
				uni.getSystemInfo({
					success: (res) => {
						this.checkUpdate(currentVersion, res.platform);
					}
				})
			});
			//#endif
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			checkUpdate(currentVersion, platform) {
				request('/res/latest', {
					type: platform
				}, res => {
					//如果服务器版本号大于本地版本号时需要提示更新
					let flag = this.compoterVersion(res.data.version, currentVersion);
					if (flag) {
						let qiangzhi = util.getData('qiangzhi');
						if (res.data.coerce == 1) {
							this.appUpdate(res.data, platform);
							util.delData('qiangzhi');
						} else if (res.data.coerce == '0' && qiangzhi == 1) {} else {
							this.appUpdate(res.data, platform);
						}
					}
				})
			},

			appUpdate(res, platform) {
				//强制更新
				if (res.coerce == 1) {
					uni.showModal({
						title: "版本更新",
						content: res.remarks,
						showCancel: false,
						confirmText: '立即更新',
						success: (res1) => {
							if (res1.confirm) {
								if (platform == 'android') {
									prompt.showLoading('下载中请稍后...')
									//设置 最新版本apk的下载链接
									var downloadApkUrl = res.apkUrl;
									var dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
										prompt.hideLoading();
										// 下载完成  
										if (status == 200) {
											plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
												uni.showToast({
													title: '安装失败',
													duration: 1500
												});
											})
										} else {
											uni.showToast({
												title: '更新失败',
												duration: 1500
											});
										}
									});
									dtask.start();
								} else if (platform == 'ios') {
									//打开iTunes地址
								}
							}
						}
					});
				} else if (res.coerce == 0) {
					uni.showModal({
						title: "版本更新",
						content: res.remarks,
						confirmText: '立即更新',
						cancelText: '稍后进行',
						success: (res) => {
							if (res.confirm) {
								if (platform == 'android') {
									prompt.showLoading('下载中请稍后...')
									//设置 最新版本apk的下载链接
									var downloadApkUrl = config.RESOURCES + res.apkUrl;
									var dtask = plus.downloader.createDownload(downloadApkUrl, {}, function(d, status) {
										prompt.hideLoading();
										// 下载完成  
										if (status == 200) {
											plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
												uni.showToast({
													title: '安装失败',
													duration: 1500
												});
											})
										} else {
											uni.showToast({
												title: '更新失败',
												duration: 1500
											});
										}
									});
									dtask.start();
								} else if (platform == 'ios') {
									//打开iTunes地址
								}
							} else if (res.cancel) {
								util.setData('qiangzhi', 1);
							}
						}
					});
				}
			},

			/**
			 * @param {Object} curV //服务器版本号
			 * @param {Object} reqV //本地app版本号
			 */
			compoterVersion(curV, reqV) {
				var arr1 = curV.toString().split('.');
				var arr2 = reqV.toString().split('.');
				//将两个版本号拆成数字
				var minL = Math.min(arr1.length, arr2.length);
				var pos = 0; //当前比较位
				var diff = 0; //当前为位比较是否相等
				var flag = false;
				//逐个比较如果当前位相等则继续比较下一位
				while (pos < minL) {
					diff = parseInt(arr1[pos]) - parseInt(arr2[pos]);
					if (diff == 0) {
						pos++;
						continue;
					} else if (diff > 0) {
						flag = true;
						break;
					} else {
						flag = false;
						break;
					}
				}
				return flag;
			}
		}
	};
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	@import url('./static/assets/uni-css/uni.css');

	/* 富文本中图片宽度 */
	.setinnerhtml-img img {
		width: 100% !important;
	}

	body {
		color: #262626;
		background-color: #ffffff;
		height: 100%;
	}

	image {
		vertical-align: middle;
	}

	uni-page-head .uni-page-head-bd {
		left: 50px;
		right: 50px;
		font-size: 32rpx;
	}

	uni-page-body,
	#app {
		height: 100%;
	}

	/* 下边框 */
	.border-bottom {
		position: relative;
	}

	.border-bottom::before {
		content: "";
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		background-color: #DFDFDF;
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	/* 按钮样式修改 */
	uni-button {
		border-radius: 0;
		font-size: 28rpx;
		line-height: 88rpx;
	}

	uni-button[type=primary] {
		background-color: #C7EDCC;
	}

	uni-button:after {
		border: 0;
		border-radius: 0;
	}

	.btn-hv {
		opacity: .8;
	}
</style>
