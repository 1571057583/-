const app = getApp();
Page({
  data: {
    hasaddress: null,  //是否默认地址0为是 1为否
    recipients: null,
    phone: null,
    province: null,
    city: null,
    area: null,
    street: null,
    detail: null,
  },
  
  setFinance: function (e) { //选择默认地址
    var that = this;
    that.setData({
      hasaddress: e.detail.value,
    });
    console.log(e.detail.value);
  },
  applySubmit:function(event){
      console.log(event)
      this.setData({
        recipients:event.detail.value.recipients,
        phone: event.detail.value.phone,
        province: event.detail.value.province,
        city: event.detail.value.city,
        area: event.detail.value.area,
        street: event.detail.value.street,
        detail: event.detail.value.detail,
      });
    wx.request({
      url: app.globalData.requesturl + 'address/saveAddress',
      data:{
            openid:app.globalData.openid,
            phone:this.data.phone,
            recipients:this.data.recipients,
            address: this.data.province + this.data.city + this.data.area + this.data.street + this.data.detail,
            hasaddress:this.data.hasaddress,

      },
      success: function (res) {
          wx.showModal({
            title: '成功',
            content: '添加地址成功',
          })
          wx.redirectTo({
            url: '../../page/mine/mine',
          })
      }
    })
  }
  
})
