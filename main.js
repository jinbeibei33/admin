import Vue from 'vue';
import App from './App';
import config from 'utils/config.js';

import cuCustom from './components/cu-custom.vue';
import prompt from 'utils/prompt.js';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

//引入 全局指令
import './directives/directive.js';

//引入全局管道
import './filters/filter.js';


Vue.component('cu-custom', cuCustom);

// 在main.js注册全局组件
import MescrollBody from '@/components/mescroll-uni/mescroll-body.vue';
import MescrollUni from '@/components/mescroll-uni/mescroll-uni.vue';
Vue.component('mescroll-body', MescrollBody);
Vue.component('mescroll-uni', MescrollUni);


Vue.config.productionTip = false;

//指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
Vue.config.errorHandler = function(err, vm, info) {
	// handle error
	// `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
	// 只在 2.2.0+ 可用
	console.error('报错路由:--' + vm.route, ' 已全局拦截, 不影响用户使用');
	console.log(err);
	prompt.showDefaultAlert('异常', '前端解析出错, 请核查代码或联系管理员');
};

//为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略。
Vue.config.warnHandler = function(msg, vm, trace) {
	// `trace` 是组件的继承关系追踪
	// console.warn('警告路由:--' + vm._componentTag, ' 已全局拦截, 不影响用户使用');
	console.warn(msg);
	// console.log(trace);
};


App.mpType = 'app';

//配置开发或生产环境，"dev"/"prod";
config.setEnvironment('prod');

const app = new Vue({
	...App
});
app.$mount();
