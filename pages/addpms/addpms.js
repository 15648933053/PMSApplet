import {
  $post
} from "../../utils/requestbasic"

// pages/addpms/addpms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['单人间', '双人间', '商务间', '标准间', '', '豪华间'],
    idd: 0
  },

  // 图片选择
  image: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          face_url: tempFilePaths,
          message: '图片选择成功'
        })
        console.log(that.data.photos)
      }
    })
  },

  inputprice(e) {
    this.setData({
      price: e.detail.value
    })
  },

  PickerChange(e) {
    this.setData({
      idd: e.detail.value,
    })
  },

  inputtitle(e) {
    this.setData({
      title: e.detail.value
    })
  },

  inputguige(e) {
    this.setData({
      guige: e.detail.value
    })
  },

  inputrenshu(e) {
    this.setData({
      renshu: e.detail.value
    })
  },

  inputwifi(e) {
    this.setData({
      pmswifi: e.detail.value
    })
  },

  inputchaungguige(e) {
    this.setData({
      chuangguige: e.detail.value
    })
  },

  async add() {
    let res = await $post(
      '/addgood', {
        idd: this.data.idd,
        imageURL: this.data.face_url,
        price: this.data.price,
        descc: this.data.picker[idd],
        title: this.data.title,
        guige: this.data.guige,
        renshu: this.data.renshu,
        pmswifi: this.data.pmswifi,
        chuangguige: this.data.chuangguige
      }
    )
    console.log(res)
  }
})