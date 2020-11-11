// pages/childrenSong/childrenSong.js


Page({
  /**
   * 页面的初始数据
   */
  data: {
    childrenSongs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取儿歌数据
    const that = this
    wx.request({
      url: 'http://127.0.0.1:3000/childrenSong',
      method: 'GET',
      success(res) {
        const {
          code,
          data
        } = res.data
        if (code == 0) {
          that.setData({
            childrenSongs: data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})