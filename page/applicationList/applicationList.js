var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    application :null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;   
    wx.request({
      url: app.globalData.requesturl + 'application/findByZero',
      success:function(res){
        console.log(res.data.data)
          that.setData({
            application:res.data.data,
        }) 
      }
    })
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
  /**
   * 通过
   */
  pass:function(e){
    var openid = e.currentTarget.dataset.item;
    console.log(openid);
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'application/pass',
      data:({
        openid: openid,
      }),
      success: function (res) {
        console.log(res.data.data)
        wx.switchTab({
          url: '../../page/mine/mine',
        })
      }
    })
  },

  /**
   * 不通过
   */
  noPassage:function(){
    var openid = e.currentTarget.dataset.item;
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'application/noPassage',
      data:({
            openid:openid,
      }),
      success: function (res) {
        console.log(res.data.data)
       wx.switchTab({
         url: '../../page/mine/mine',
       })
      }
    })
  }
})