import Vue from 'vue'
import config from '../utils/config.js'
import util from '../utils/util.js'

/**
 * 将显示值首字母转换为大写
 * @param {Object} value
 */
Vue.filter('capitalize', function(value) {
	if (!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})

/**
 * 后台返回静态资源后拼接前缀, 如图片,视频返回/insfile/***, 直接加此过滤器即可
 * @param {Object} value
 */
Vue.filter('addprefix', function(value) {
	// if (!value) return ''
	return config.domain.OPTION.RESOURCES + value;
})

/**
 * 格式化毫秒日期
 * @param {Object} value
 */
Vue.filter('formatdatetime', function(value) {
	if (!value) return ''
	return util.formatDate(value);
})

/**
 * 去除html标签, 列表页显示 html 使用
 * @param {Object} value
 */
Vue.filter('removehtmltag', function(str) {
	if (!str) return ''
	str = str.replace(/<[^>]+>/g, ""); //去掉 
	return str;
})

/**
 * ...
 */
