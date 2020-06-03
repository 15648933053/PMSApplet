//index.js

import { $post } from "../../utils/requestbasic"

//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol: 3,
    skin: false
  },

  async selpms() {
    let res = await $post(
      '/selpms', {}
    )
    console.log("我的页面打印的 值res为wifiname等等",res)
    this.setData({
      wifiname:res.pms.wifiname,
      phone:res.pms.phone,
      holename:res.pms.holename
    })
    
  },

  xiugai(){
    console.log("跳转时的值",this.data.userInfo)
    wx.navigateTo({
      url: '../Minfo/my_information/my_information?id='+this.data.userInfo.id
      +'&user_id='+this.data.userInfo.userId
      +'&phone='+this.data.userInfo.phone
      +'&username='+this.data.userInfo.userName
      +'&identify='+this.data.userInfo.identify
      +'&face_url='+encodeURIComponent(this.data.userInfo.faceUrl)
    })
  },

  addhole(){
    if(this.data.userInfo.identify == 0){
      return wx.showModal({
        title: '提示',
        content: '请以管理员身份进入！',
        showCancel: false,
      })
    }
    wx.navigateTo({
      url: '../Minfo/addHole/addHole?id='+this.data.userInfo.id
      +'&user_id='+this.data.userInfo.userId
      +'&phone='+this.data.userInfo.phone
      +'&username='+this.data.userInfo.userName
      +'&identify='+this.data.userInfo.identify
      +'&face_url='+encodeURIComponent(this.data.userInfo.faceUrl)
    })
  },

  onShow(){
    this.selpms()
    this.selUser()
    console.log("userInfo的值为",this.data.userInfo)
  },

  selUser(){
    this.setData({
      userInfo:app.globalData.user
    })
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  call(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    })
  }
})
