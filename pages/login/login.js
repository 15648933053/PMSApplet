const app = getApp()
import {
  $post_login
} from '../../utils/requestbasic'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    code: '',
    name: "",
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.setData({
          code: res.code
        })
        console.log('login中的code的值为++++++', res.code)
      }
    })

    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log(res)
          wx.switchTab({
            url: '../first/first',
          })
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
  },

  bindGetUserInfo: function (res) {
    if (res.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(res.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来

      that.setData({
        isHide: false,
        userInfo: res.detail.userInfo
      });
      app.globalData.userInfo = res.detail.userInfo

      console.log("点击授权后打印的name的值", this.data.userInfo.nickName)
      this.setData({
        name: this.data.userInfo.nickName
      })
      //用户信息后台登录注册并设置cookie
      let name = this.data.name;
      console.log("name的值=======：", name)
      decodeURI()
      this.loginn()
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  async loginn() {
    let res = await $post_login(
      '/login', {
        code: this.data.code,
        username: this.data.name,
        face_url: getApp().globalData.userInfo.avatarUrl,
        identify:0//是用户
      }
    );
    console.log("打印出login调用接口的返回值", res)
    if (res) {
      wx.switchTab({
        url: '../first/first',
      })
    }
  },
})