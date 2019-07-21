const app = getApp();
Page({
  data: {
    change: "",
    address: [],
    delBtnWidth: 180
  },

  onLoad: function (options) {
    var change = options.change;
    console.log("change:" + change);
    //获取收货地址 省略
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'address/getAddressInfoList',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          address: res.data.data,
          change: change
        });
        console.log(res.data);
      }
    });
  },

  edit: function (e) {
    //编辑收货地址 省略
    var id = e.currentTarget.dataset.id;
    console.log(id);
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../address/address?addressid=' + id,
    })
  },

  add: function () {
    //增加收货地址 省略
    wx.navigateTo({
      url: '../address/address',
    })
  },

  delItem: function (e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    this.data.address.splice(index, 1);
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'address/delAddressInfo',
      data: {
        addressid: id,
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.success) {
          wx.showToast({

            title: res.data.message,

            icon: 'loading',

            duration: 1500

          })
          that.setData({
            address: res.data.object
          });
        } else {
          wx.showToast({

            title: res.data.message,

            icon: 'loading',

            duration: 1500

          })
        }
        console.log(res.data.object);
      }
    });
    this.setData({
      address: this.data.address
    })
  },

  touchS: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (that.data.change == "1") {
      console.log(that.data.address[0]); parseInt
      console.log("change:" + index + " address:" + that.data.address[parseInt(index)]);
      wx.setStorageSync("address", that.data.address[parseInt(index)])
      wx.navigateBack()
    }
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },

  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        address: list
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.address;
      var del_index = '';
      disX > delBtnWidth / 2 ? del_index = index : del_index = '';
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        address: list,
        del_index: del_index
      });
    }
  },
})
