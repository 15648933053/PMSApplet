//wx.request工具类

/*
  参数为三个参数：_this传参为this指针   ，   url为接口地址   ，   list为page页面data中定义的集合的名称，形式为字符串

  函数为getListsByGet         getListsByPost   

  引入方法：
        import {
          $getListsByGet
        } from '../../utils/ajax.js';
        
        存在问题接口中的集合名称需要在此工具文档中修改
  
*/

import {
  BasicUrl
} from '../config/index.js';



//封装wx.request
function $ress(url, method, data) {

  wx.showLoading({
    title: '加载中...',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: url.startsWith("http") ? url : BasicUrl + url,
      method,
      header: {
        'content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data,
      success: (res) => {
        getApp().globalData.user = res.data.user
        console.log(res.data)
        if (res && res.header && res.header['Set-Cookie']) {
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']); //保存Cookie到Storage
        }
        console.log("用户信息", getApp().globalData.user)
        resolve(res.data)
      },
      fail(e) {
        reject(e)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}


//封装wx.request
function $res(url, method, data) {

  wx.showLoading({
    title: '加载中...',
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: url.startsWith("http") ? url : BasicUrl + url,
      method,
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookieKey')
      },
      data,
      success: (res => {
        resolve(res.data)
      }),
      fail(e) {
        reject(e)
      },
      complete() {
        wx.hideLoading()
      }
    })
  })
}

//封装的get请求方式的wx.request
export function $get(url, data) {
  return $res(url, 'Get', data)
}

//封装的post请求方式的wx.request
export function $post(url, data) {
  return $res(url, 'POST', data)
}

export function $post_login(url, data) {
  return $ress(url, 'POST', data)
}