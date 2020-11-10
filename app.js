//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.unAuthorized = false
              this.globalData.loading = false
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.globalData.loading = false
          this.globalData.unAuthorized = true
          if (this.userInfoFailCallback) {
            this.userInfoFailCallback(res)
          }
        }
      },
      fail: res => {
        this.globalData.loading = false
        this.globalData.unAuthorized = true
        if (this.userInfoFailCallback) {
          this.userInfoFailCallback(res)
        }
      }
    })
    // 加载数据
    wx.request({
      url: 'http://localhost:3000/childrenSong',
    })
  },
  globalData: {
    userInfo: null,
    unAuthorized: true,
    loading: true
  },
})