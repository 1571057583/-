
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
    openid: null,
    userInfo: null,
		shops:null, 
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
        var code = res.code; //返回code
        var appId = 'wx9cce8602ba0d3f30';
        var secret = '79f365c294550deff2de0448c8449d82';
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            data: {},
            header: {
              'content-type': 'json'
            },
            success: res => {

              var openid = res.data.openid //返回openid

              console.log('openid为' + openid);

              if (openid == self.globalData.openid){
                  wx.redirectTo({
                    url: '/page/index/index',
                  })
              }else{
                self.globalData.openid = openid
              }

            }
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
