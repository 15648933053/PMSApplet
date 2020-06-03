//app.js
import {
  $post_login
} from '/utils/requestbasic.js'

App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                //用户名storage
                wx.setStorageSync('username', res.userInfo.nickName)
              }

              console.log("namee=========:", res.userInfo.nickName)
              this.globalData.name = res.userInfo.nickName

              //用户信息后台登录注册并设置cookie
              this.loginn()
            }
          })
        }
      }
    })
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },

  async loginn() {
    let res = await $post_login(
      '/login', {
        code: this.globalData.code,
        username: this.globalData.name,
        face_url: this.globalData.userInfo.avatarUrl,
        identify:0//是用户
      }
    );
    console.log("app.js",res)
  },
  globalData: {
    userInfo: null,
    code:'',
    name:'',
    active:0
  }
})