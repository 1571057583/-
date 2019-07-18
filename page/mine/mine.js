var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userInfo:{},
    mode: null,
  },
	onLoad: function () {
      var that = this;
    wx.request({
      url: app.globalData.requesturl + 'mine/mine',
      data: {
        userStates: app.globalData.userStates
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
          that.setData({
            mode:res.data.data 
          })
      }
    });

	},
	onShow: function () {
    var that = this;
    wx.login({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
            });
          }
        })
      }
    });
	}
});

