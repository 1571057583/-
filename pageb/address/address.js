const app = getApp();
Page({
  data: {
    isedit: false,
    editid: '',
    addressdetail: '',
    recipients: '',
    phone: '',
    countryarr: [],
    countryindex: 0,
    provincearr: [],
    provinceindex: 0,
    cityarr: [],
    cityindex: 0,
    districtarr: [],
    districtindex: 0,
    labelarr: [],
    labelindex: 0,
    hasaddress: false,  //是否默认地址
  },
  onLoad: function (options) {
    var that = this;
    var id = options.addressid;
    console.log(id);
    this.fetchData();
    this.binCountryPicker();
    this.bindProvincePicker(null);
    if (id != undefined) {
      wx.request({
        url: app.globalData.requesturl + 'address/getSingleAddressInfo',
        data: {
          id: id
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            countryindex: (res.data[0].addressCountryindex == "" || res.data[0].addressCountryindex == null) ? 0 : parseInt(res.data[0].addressCountryindex),
            provinceindex: (res.data[0].addressProvinceindex == "" || res.data[0].addressProvinceindex == null) ? 0 : parseInt(res.data[0].addressProvinceindex),
            cityindex: (res.data[0].addressCityindex == "" || res.data[0].addressCityindex == null) ? 0 : parseInt(res.data[0].addressCityindex),
            districtindex: (res.data[0].addressDistrictindex == "" || res.data[0].addressDistrictindex == null) ? 0 : parseInt(res.data[0].addressDistrictindex),
            addressdetail: res.data[0].addressDetail,
            recipients: res.data[0].addressRecipients,
            phone: res.data[0].addressPhone,
            hasaddress: res.data[0].addressDefault == "否" ? true : false,
            labelindex: that.typeIndex(res.data[0].addressType),
            isedit: true,
            editid: id
          });
          console.log(res.data);
        }
      });
    }
  },

  typeIndex: function (val) {
    var index = 0;
    switch (val) {
      case '家':
        index = 0;
        break
      case '公司':
        index = 1;
        break;
      case '学校':
        index = 2;
        break;
      default:
        break;
    }
    return index;
  },

  fetchData: function () {
    this.setData({
      countryarr: ["请选择"],
      provincearr: ["请选择",],
      cityarr: ["请选择",],
      districtarr: ["请选择",],
      labelarr: ["家", "公司", "学校"]
    })
  },
  binCountryPicker: function () {
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'dictionary/getDictionaryCountryInfo',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          countryarr: res.data
        });
        console.log(res.data);
      }
    });
  },

  bindProvincePicker: function (pid) {
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'dictionary/getDictionaryProvinceInfo',
      data: {
        dictionaryItemId: pid == null ? "942d8440ae204584b9edd250a6bb3fd3" : pid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          provincearr: res.data
        });
        console.log(res.data);
        console.log("test");
        console.log(res.data[0]);
        console.log(res.data[0].dictionaryitemId);
        that.bindCityPicker(res.data[0].dictionaryitemId);
        console.log("test2");
      }
    });
  },

  bindCityPicker: function (pid) {
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'dictionary/getDictionaryProvinceInfo',
      data: {
        dictionaryItemId: pid == null ? "8664e58fe20e4423bb6ec2265d5fec40" : pid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          cityarr: res.data
        });
        console.log(res.data);
        that.bindDistrictPicker(res.data[0].dictionaryitemId);
      }
    });
  },

  bindDistrictPicker: function (pid) {
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'dictionary/getDictionaryProvinceInfo',
      data: {
        dictionaryItemId: pid == null ? "fd2e4dffc4ca4c6a8f9520a89c9e1615" : pid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          districtarr: res.data
        });
        console.log(res.data);
      }
    });
  },

  bindPickerChange: function (e) { //下拉选择
    var that = this;
    const eindex = e.detail.value;
    const name = e.currentTarget.dataset.pickername;

    // this.setData(Object.assign({},this.data,{name:eindex}))
    switch (name) {
      case 'country':
        var arr;
        this.setData({
          countryindex: eindex,
          //  arr: that.countryarr.dictionaryItemId
        })
        var id = that.data.countryarr[that.data.countryindex].dictionaryitemId
        console.log(that.data.countryarr[0]);
        console.log(id);
        that.bindProvincePicker(id);
        break;
      case 'province':
        this.setData({
          provinceindex: eindex
        })
        var id = that.data.provincearr[that.data.provinceindex].dictionaryitemId
        that.bindCityPicker(id);
        break;
      case 'city':
        this.setData({
          cityindex: eindex
        })
        var id = that.data.cityarr[that.data.cityindex].dictionaryitemId
        that.bindDistrictPicker(id);
        break;
      case 'district':

        this.setData({
          districtindex: eindex
        })
        break;
      case 'label':
        this.setData({
          labelindex: eindex
        })
        break;
      default:
        return
    }
  },
  setFinance: function (e) { //选择默认地址
    var that = this;
    that.setData({
      hasaddress: e.detail.value == "否" ? true : false
    });
    console.log(e.detail.value);
  },

  applyValidate: function (val) {
    if (val.recipients.length == 0) {

      wx.showToast({

        title: '收件人不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    if (val.phone.length == 0) {

      wx.showToast({

        title: '电话不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    if (val.detail.length == 0) {

      wx.showToast({

        title: '详细地址不得为空!',

        icon: 'loading',

        duration: 1500

      })

      setTimeout(function () {

        wx.hideToast()

      }, 2000)
      return false;
    }

    return true;




  },
  applySubmit: function (e) {
    var that = this;
    let formdata = e.detail.value;
    if (this.applyValidate(formdata)) {
      let country = that.data.countryarr[parseInt(formdata.country)].dictionaryitemName;
      let province = that.data.provincearr[parseInt(formdata.province)].dictionaryitemName;
      let city = that.data.cityarr[parseInt(formdata.city)].dictionaryitemName;
      let district = that.data.districtarr[parseInt(formdata.district)].dictionaryitemName;
      let labelname = that.data.labelarr[parseInt(formdata.addresslable)];

      console.log(formdata);
      wx.request({
        url: app.globalData.requesturl + 'address/insertAddressInfo',
        data: {
          listdata: formdata,
          country: country,
          province: province,
          city: city,
          district: district,
          label: labelname,
          openid: app.globalData.openid,
          editid: that.data.isedit == true ? that.data.editid : ''
        },
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data);
          const pages = getCurrentPages()
          const perpage = pages[pages.length - 2]
          perpage.onLoad()
          if (res.data.isSuccess) {
            wx.redirectTo({
              url: '../../pagesa/addresslist/addresslist',
            })
          } else {
            wx.showToast({

              title: res.data.message,

              icon: 'loading',

              duration: 1500

            })
          }
        }
      });
    }
  }
})
