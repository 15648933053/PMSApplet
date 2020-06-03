import {
  $attr
} from "../../utils/utils"
import {
  $post
} from "../../utils/requestbasic"

// pages/danrenjian/danrenjian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    active: 0
  },

  detail(e) {
    let id = $attr(e, 'id')
    console.log("id：", this.data.list[id])
    wx.navigateTo({
      url: '../searchdetail/searchdetail?idd=' + this.data.list[id].idd +
        '&codec=' + this.data.list[id].codec +
        '&chuangguige=' + this.data.list[id].chuangguige +
        '&id=' + this.data.list[id].id +
        '&descc=' + this.data.list[id].descc +
        '&guige=' + this.data.list[id].guige +
        '&pmswifi=' + this.data.list[id].pmswifi +
        '&price=' + this.data.list[id].price +
        '&renshu=' + this.data.list[id].renshu +
        '&title=' + this.data.list[id].title +
        '&userid=' + this.data.list[id].userid +
        '&zhifu=' + this.data.list[id].zhifu +
        '&imageURL=' + encodeURIComponent(this.data.list[id].imageURL),
    })
  },

  async selGoodsweifu() {
    let res = await $post(
      '/seldaizhifu',
    )
    console.log(res)
    this.setData({
      list: res.goods
    })
  },

  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    if (event.detail.name == 0) {
      getApp().globalData.active = 0
      this.selAllGoods()
    } else {
      getApp().globalData.active = 1
      this.selGoodsweifu()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.idd)
    this.setData({
      idd: options.idd
    })
    this.selAllGoods()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //绑定接口查询房屋信
    if(getApp().globalData.active == 0){
      this.selAllGoods()
    }else{
      this.selGoodsweifu()
    }
  },

  async selAllGoods() {
    let res = await $post(
      '/selallgoodsbyuser',
    )
    console.log(res)
    this.setData({
      list: res.goods
    })
  },
})