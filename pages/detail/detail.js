import {
  $post
} from "../../utils/requestbasic"
import Notify from '../../components/vant/notify/notify';
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    good: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      idd: options.idd
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
    this.selAllGoods()
  },

  async selAllGoods() {
    let res = await $post(
      '/selgoods', {
        idd: this.data.idd
      }
    )
    console.log("OnSHOW中的返回值",res)
    this.setData({
      good: res.goods[this.data.id]
    })
    console.log(this.data.good)
  },

  dinggou() {
    this.dinggougou()
  },

  async dinggougou() {
    if(this.data.good.codec == 0){
      console.log(this.data.good.id)
      let res = await $post(
        '/dinggou', {
          id: this.data.good.id
        }
      )
      console.log(res)
  
      if (res.code == 0) {
        Notify({
          message: '订购成功',
          color: '#ad0000',
          background: '#FFFF00',
        });
        let res1 = await $post(
          '/hole', {
            id: this.data.good.id
          }
        )
        wx.switchTab({
          url: '../first/first'
        })
        console.log("热度词：" , res1)
      } else {
        Notify({
          message: '订购失败',
          color: '#ad0000',
          background: '#FFFF00',
        });
      }
    }else{
      Notify({
        message: '当前房间有人 ， 请重新选择',
        color: '#ad0000',
        background: '#FFFF00',
      });
    }
    
  },

  zhifu(){
    this.zhifou();
  },

  async zhifou(){
    if(this.data.good.zhifu == 0){
      let res = await $post(
        '/zhifu',
        {
          id:this.data.good.id
        }
      )
      console.log(res)
      if(res.code == 0){
        Notify({
          message: '支付成功',
          color: '#ad0000',
          background: '#FFFF00',
        });
  
        let res1 = await $post(
          '/hole', {
            id: this.data.good.id
          }
        )
  
        wx.switchTab({
          url: '../first/first'
        })
      }else{
        Notify({
          message: '支付失败',
          color: '#ad0000',
          background: '#FFFF00',
        });
      }
    }else{
      Notify({
        message: '您已支付 ，无需重新支付',
        color: '#ad0000',
        background: '#FFFF00',
      });
    }
  },

  tuifang(){
    this.tuifan();
  },

  async tuifan(){
    if(this.data.good.zhifu == 1){
      let res = await $post(
        '/tuifang',
        {
          id:this.data.good.id
        }
      )
      console.log(res)
      if(res.code == 0){
        Notify({
          message: '退房成功',
          color: '#ad0000',
          background: '#FFFF00',
        });
        wx.switchTab({
          url: '../first/first'
        })
      }else{
        Notify({
          message: '退房失败',
          color: '#ad0000',
          background: '#FFFF00',
        });
      }
    }else{
      Notify({
        message: '您已退房成功 ， 无需再次退房',
        color: '#ad0000',
        background: '#FFFF00',
      });
    }
  },
})