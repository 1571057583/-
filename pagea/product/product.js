import util from './../../utils/util.js';

var WxAutoImage = require('../../js/wxAutoImageCal.js');
var app = getApp()
Page({
  data: {
    Height: "", //图片高度
    filterdata: {},  //筛选条件数据
    showfilter: false, //是否显示下拉筛选
    showfilterindex: null, //显示哪个筛选类目
    sortindex: 0,  //排序索引
    sortid: null,  //排序id
    filter: {},
    productlist: [], //会议室列表列表
    scrolltop: null, //滚动位置
    page: 0  //分页
  },
  onLoad: function () { //加载数据渲染页面
    this.fetchFilterData();
    this.bindProductData();
  },
  fetchFilterData: function () { //获取筛选条件
    this.setData({
      filterdata: {
        "sort": [
          {
            "id": 0,
            "title": "价格"
          },
          {
            "id": 1,
            "title": "庫存"
          },
          {
            "id": 2,
            "title": "月銷售量"
          },
          {
            "id": 3,
            "title": "无限制"
          },
        ],
        "contain": [
          {
            "id": 0,
            "title": "0-100"
          },
          {
            "id": 1,
            "title": "100-1000"
          },
          {
            "id": 2,
            "title": "1000-2000"
          },
          {
            "id": 3,
            "title": "2000-3000"
          },
          {
            "id": 4,
            "title": "3000-4000"
          },
          {
            "id": 5,
            "title": "无限制"
          },
        ],
        "equipments": [
          {
            "id": 0,
            "title": "手机"
          },
          {
            "id": 1,
            "title": "手机配件"
          },
          {
            "id": 2,
            "title": "屏幕"
          },
          {
            "id": 3,
            "title": "其他"
          }
        ],
      }
    })
  },

  bindProductData: function () {
    var that = this;
    wx.request({
      url: app.globalData.requesturl + 'product/selectProductInfo',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          productlist: res.data
        });
        console.log(res.data);
      }
    });
  },
  setFilterPanel: function (e) { //展开筛选面板
    const d = this.data;
    const i = e.currentTarget.dataset.findex;
    if (d.showfilterindex == i) {
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    } else {
      this.setData({
        showfilter: true,
        showfilterindex: i,
      })
    }
  },
  hideFilter: function () { //关闭筛选面板
    this.setData({
      showfilter: false,
      showfilterindex: null
    })
  },
  setSort: function (e) { //选择排序方式
    const d = this.data;
    const dataset = e.currentTarget.dataset;
    this.setData({
      sortindex: dataset.sortindex,
      sortid: dataset.sortid
    })
    console.log('排序方式id：' + this.data.sortid);
  },
  inputStartTime: function (e) {
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        starttime: e.detail.value
      })
    })  //输入合作开始时间
  },
  inputEndTime: function (e) {
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        endtime: e.detail.value
      })
    })  //输入合作结束时间
  },
  chooseContain: function (e) {  //选择公司人数
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        containid: e.currentTarget.dataset.id
      })
    })
    console.log('选择的客户id：' + this.data.filter.containid);
  },
  chooseEquipment: function (e) {  //选择会议室设备
    const equipments = this.data.filter.equipments || [];
    const eid = e.currentTarget.dataset.id;
    this.setData({
      filter: Object.assign({}, this.data.filter, {
        equipments: eid
        //equipments.indexOf(eid) > -1 ? equipments.filter(i => i != eid) : equipments.concat([eid])
      })
    })
    console.log('选择的会议室设备id：' + this.data.filter.equipments);
  },
  setClass: function (e) { //设置选中设备样式
    return this.data.filter.equipments.indexOf(e.currentTarget.dataset.id) > -1 ? 'active' : ''
  },
  cleanFilter: function () { //清空筛选条件
    this.setData({
      filter: {}
    })
  },


  submitFilter: function () { //提交筛选条件
    console.log(this.data.filter);
  },
  scrollHandle: function (e) { //滚动事件
    this.setData({
      scrolltop: e.detail.scrollTop
    })
  },
  goToTop: function () { //回到顶部
    this.setData({
      scrolltop: 0
    })
  },
  scrollLoading: function () { //滚动加载
    this.fetchClicentData();
  },
  onPullDownRefresh: function () { //下拉刷新
    this.setData({
      page: 0,
      proudctlist: []
    })
    this.fetchClicentData();
    this.fetchFilterData();
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },
  cusImageLoad: function (e) {
    var that = this;
    that.setData(WxAutoImage.wxAutoImageCal(e));
  }
})