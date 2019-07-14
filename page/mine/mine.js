var app = getApp();
var server = require('../../utils/server');
Page({
	data: {
    userInfo:{},
    mode: null,
    //[ {
    //   "pagePath": "../../pageb/addresslist/addresslist",
    //   "text": "我的地址"
    // },  {
    //   "pagePath": "../../pageb/about/about",
    //   "text": "关于我们"
    // },{
    //     "pagePath": "../../page/business/business",
    //     "text": "商家入驻"
    // },{
    //     "pagePath": "../../page/applicationList/applicationList",
    //     "text": "申请列表"
    //   }, {
    //     "pagePath": "../../pageb/carts/carts",
    //     "text": "购物车"
    //   }
    //   ]
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

