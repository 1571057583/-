var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  
  formSubmit:function(event){
    var that = this
      console.log(event.detail.value)
    wx.request({
      url: app.globalData.requesturl + 'application/insertInfo',
      data: {
        name:e.detail.value.name,
        phone:e.detail.value.phone,
        businessesName: e.detail.value.businessesName,
        businessesAddress: e.detail.value.businessesAddress,
        businessesCode: e.detail.value.businessesCode,
        openid:app.globalData.openid,
        userInfo: app.globalData.userInfo
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        wx.redirectTo({
          url: '../../page/mine/mine',
        })
      }
    });
  }
})