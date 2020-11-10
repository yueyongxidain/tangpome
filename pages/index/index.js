//index.js
//获取应用实例
const app = getApp()
const {
  $Toast
} = require('../../commpent/iview-weapp/base/index');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.loading) {
      $Toast({
        content: '加载中',
        type: 'loading',
        duration: 0
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        $Toast.hide()
        app.globalData.loading = false
        app.globalData.userInfo = res.userInfo
        app.globalData.unAuthorized = false
      }
      app.userInfoFailCallback = res => {
        this.setData({
          userInfo: null,
          hasUserInfo: false
        })
        $Toast.hide()
        app.globalData.loading = false
        app.globalData.userInfo = null
        app.globalData.unAuthorized = true
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.loading = false
          app.globalData.userInfo = res.userInfo
          app.globalData.unAuthorized = false
          $Toast.hide()
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res => {
          $Toast.hide()
          app.globalData.loading = false
          app.globalData.userInfo = null
          app.globalData.unAuthorized = true
        }
      })
    }
  },
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        current: 0
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  tapTo: function (event) {
    console.log(event)
    wx.navigateTo({
      url: '../' + event.currentTarget.dataset.url + '/' + event.currentTarget.dataset.url
    })
  }
})