import {
  $post
} from "../../../utils/requestbasic"

import Notify from '../../../components/vant/notify/notify';
// pages/Minfo/addHole/addHole.js
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
    this.setData({
      id: options.id,
      user_id: options.user_id,
      phone: options.phone,
      username: options.username,
      identify: options.identify,
      face_url: decodeURIComponent(options.face_url)
    })
  },

  add() {
    wx.navigateTo({
      url: '../../addpms/addpms'
    })
  },

  inputwifiname(e) {
    console.log(e)
    this.setData({
      wifiname: e.detail.value
    })
  },

  inputpmsname(e) {
    this.setData({
      pmsname: e.detail.value
    })
  },

  inputphone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  async updatepms() {
    let res = await $post(
      '/updPMS', {
        phone: this.data.phone,
        wifiname: this.data.wifiname,
        holename: this.data.holename
      }
    )
    if(res.code == 0){
      Notify({
        message: '修改成功',
        color: '#fff',
        background: '#FAFA46',
      });
      wx.switchTab({
        url: '../../mine/mine',
      })
    }
    this.selpms()
    console.log(res)
  },

  async selpms() {
    let res = await $post(
      '/selpms', {}
    )
    this.setData({
      wifiname:res.pms.wifiname,
      phone:res.pms.phone,
      holename:res.pms.holename
    })
    console.log(res)
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
    this.selpms()
   
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