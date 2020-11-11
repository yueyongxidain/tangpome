// pages/user/user.js
const {
  $Toast
} = require('../../commpent/iview-weapp/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.loading) {
      $Toast({
        content: '加载中',
        type: 'loading'
      });
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        current: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  },
  getUserInfo: function (e) {
    if(e.detail.userInfo){
      app.globalData.userInfo = !!e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
})