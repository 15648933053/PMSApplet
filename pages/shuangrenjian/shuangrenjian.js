import { $attr } from "../../utils/utils"
import { $post } from "../../utils/requestbasic"

// pages/danrenjian/danrenjian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  detail(e){
    let id = $attr(e , 'id')
    console.log("id：",id)
    wx.navigateTo({
      url: '../detail/detail?id='+id+'&idd='+this.data.list[id].idd,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.idd)
    this.setData({
      idd:options.idd
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
    //绑定接口查询房屋信息
    this.selAllGoods()
  },

  async selAllGoods(){
    let res = await $post(
      '/selgoods',
      {
        idd:this.data.idd
      }
    )
    console.log(res)
    this.setData({
      list:res.goods
    })
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