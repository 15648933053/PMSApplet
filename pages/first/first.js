import { $attr } from "../../utils/util"

// pages/first/first.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel: [{
        id: 0,
        text: "单人间",
        icon: "../../imgs/danrenjian.png",
        url: "../../pages/danrenjian/danrenjian"
      },
      {
        id: 1,
        text: "双人间",
        icon: "../../imgs/shuangrenjian.png",
        url: "../../pages/shuangrenjian/shuangrenjian"
      },
      {
        id: 2,
        text: "商务间",
        icon: "../../imgs/shangwujian.png",
        url: "../../pages/shangwujian/shangwujian"
      },
      {
        id: 3,
        text: "标准间",
        icon: "../../imgs/biaozhunjian.png",
        url: "../../pages/biaozhunjian/biaozhunjian"
      },
      {
        id: 4,
        text: "WiFi",
        icon: "../../imgs/wifi.png",
        url: "../../pages/wifi/wifi"
      },
      {
        id: 5,
        text: "豪华间",
        icon: "../../imgs/haohuajian.png",
        url: "../../pages/haohuajian/haohuajian"
      },
      {
        id: 6,
        text: "餐厅",
        icon: "../../imgs/canting.png",
        url: "../../pages/canting/canting"
      },
      {
        id: 7,
        text: "酒店介绍",
        icon: "../../imgs/jiudianjieshao.png",
        url: "../../pages/jiudianxinxi/jiudianxinxi"
      },
    ]
  },

  Todetial(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: this.data.hotel[id].url+'?idd='+id,
    })
  },

  selPSM(){
    wx.navigateTo({
      url: '../shoppms/shoppms',
    })
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

  }
})