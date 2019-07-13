var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userInfo:{},
    mode: [ {
      "pagePath": "../../pagesa/addresslist/addresslist",
      "text": "我的地址"
    },  {
      "pagePath": "../../pagesa/about/about",
      "text": "关于我们"
    },{
        "pagePath": "../../page/business/business",
        "text": "商家入驻"
    },{
        "pagePath": "../../page/applicationList/applicationList",
        "text": "申请列表"
      }]
  },
	onLoad: function () {
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

