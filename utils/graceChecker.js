/**
数据验证（表单验证）
来自 grace.hcoder.net 
作者 hcoder 深海
*/
module.exports = {
	error: '',
	check: function(data, rule) {
		for (var i = 0; i < rule.length; i++) {
			if (!rule[i].checkType) {
				return true;
			}
			if (!rule[i].name) {
				return true;
			}
			if (!rule[i].errorMsg) {
				return true;
			}
			if (!data[rule[i].name]) {
				this.error = rule[i].errorMsg;
				return false;
			}
			switch (rule[i].checkType) {
				case 'string': //字符串及长度检查，最小长度,最大长度 如 1,3 或 2, 2,代表只检查最短
					var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'int': //整数及长度检查
					var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
					break;
				case 'between': //数值区间检查
					if (!this.isNumber(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'betweenD': //数值区间检查【整数】
					var reg = /^-?[1-9][0-9]?$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'betweenF':
					var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					var minMax = rule[i].checkRule.split(',');
					minMax[0] = Number(minMax[0]);
					minMax[1] = Number(minMax[1]);
					if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'same': //等值检查
					if (data[rule[i].name] != rule[i].checkRule) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'notsame': //不等值检查
					if (data[rule[i].name] == rule[i].checkRule) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'email': //邮箱检查
					var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'phoneno': //11位手机号检查
					var reg = /^1[0-9]{10,10}$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'zipcode': //6位邮编检查
					var reg = /^[0-9]{6}$/;
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'reg': //正则表达式检查
					var reg = new RegExp(rule[i].checkRule);
					if (!reg.test(data[rule[i].name])) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'in': //包含某个字符串的检查
					if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
				case 'notnull': //不为空检查
					if (data[rule[i].name] == null || data[rule[i].name].length < 1) {
						this.error = rule[i].errorMsg;
						return false;
					}
					break;
			}
		}
		return true;
	},
	isNumber: function(checkVal) {
		var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
		return reg.test(checkVal);
	}
}
