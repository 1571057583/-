
var server = require('./utils/server');
App({
	onLaunch: function () {
		console.log('App Launch')
		var self = this;
		var rd_session = wx.getStorageSync('rd_session');
		console.log('rd_session', rd_session)
		if (!rd_session) {
			self.login();
		} else {
			wx.checkSession({
				success: function () {
					// 登录态未过期
					console.log('登录态未过期')
					self.rd_session = rd_session;
					self.getUserInfo();
				},
				fail: function () {
					//登录态过期
					self.login();
				}
			})
		}
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	globalData: {
		hasLogin: false,
    requesturl: "http://localhost:8082/",
    openid: "",
    userInfo: null,
		shops: [
			{
				id: 1,
        img: '../../imgs/index/dinner.jpg',
				distance: 1.8,
				sales: 1475,
        logo: '../../imgs/index/duck.jpg',
				name: '杨国福麻辣烫(东四店)',
				desc: '满25减8；满35减10；满60减15（在线支付专享）'
			},
			{
				id: 2,
        img: '../../imgs/index/dinner.jpg',
				distance: 2.4,
				sales: 1284,
        logo: '../../imgs/index/dinner.jpg',
				name: '忠友麻辣烫(东四店)',
				desc: '满25减8；满35减10；满60减15（在线支付专享）'
			},
			{
				id: 3,
        img: '../../imgs/index/dinner.jpg',
				distance: 2.3,
				sales: 2039,
        logo: '../../imgs/index/dinner.jpg',
				name: '粥面故事(东大桥店)',
				desc: '满25减8；满35减10；满60减15（在线支付专享）'
			},
			{
				id: 4,
        img: '../../imgs/index/dinner.jpg',
				distance: 3.4,
				sales: 400,
        logo: '../../imgs/index/dinner.jpg',
				name: '兄鸡',
				desc: '满25减8；满35减10；满60减15（在线支付专享）'
			}
		]
	},
	rd_session: null,
	login: function() {
		var self = this;
		wx.login({
			success: function (res) {
				console.log('wx.login', res)
				server.getJSON('/WxAppApi/setUserSessionKey', {code: res.code}, function (res) {
					console.log('setUserSessionKey', res)
					self.rd_session = res.data.data.rd_session;
					self.globalData.hasLogin = true;
					wx.setStorageSync('rd_session', self.rd_session);
					self.getUserInfo();
				});
			}
		});
	},
	getUserInfo: function() {
		var self = this;
		wx.getUserInfo({
			success: function(res) {
				console.log('getUserInfo', res)
				self.globalData.userInfo = res.userInfo;
        console.log(res.userInfo);
				server.getJSON('/WxAppApi/checkSignature', {
					rd_session: self.rd_session,
					result: res
				}, function (res) {
					console.log('checkSignature', res)
					if (res.data.errorcode) {
						// TODO:验证有误处理
					}
				});
			}
		});
	},
})
