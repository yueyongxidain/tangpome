// pages/childrenSong/childrenSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPosition: '00:00', // 当前时间点
    duration: '00:00', // 总时长
    type: 'circle',
    pauseStatus: true,
    audioIndex: 0,
    timer: undefined,
    audioList: [],
    listVisible: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 加载数据
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
            audioList: data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setTimer()
    const that = this
    const manage = wx.getBackgroundAudioManager()
    manage.onEnded(() => {
      if (that.data.type === 'circle') {
        // 循环播放
        wx.seekBackgroundAudio({
          position: 0,
        })
        that.setData({
          currentPosition: '00:00',
          duration: '00:00',
          sliderValue: 0,
        })
      } else {
        // 顺序播放
        that.bindTapNext()
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 上一首
   */
  bindTapPrev: function() {
    let length = this.data.audioList.length
    let audioIndexNow = this.data.audioIndex
    if (audioIndexNow === 0) {
      audioIndexNow = length - 1
    } else {
      audioIndexNow = audioIndexNow - 1
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: '00:00', // 当前时间点
      duration: '00:00', // 总时长
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 500)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },

  /**
   * 下一首
   */
  bindTapNext: function() {
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === length - 1) {
      audioIndexNow = 0
    } else {
      audioIndexNow = audioIndexPrev + 1
    }
    this.setData({
      audioIndex: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 500)
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  bindTapPlay: function() {
    if (this.data.pauseStatus === true) {
      this.play()
      this.setData({
        pauseStatus: false
      })
    } else {
      wx.pauseBackgroundAudio()
      this.setData({
        pauseStatus: true
      })
    }
  },

  /**
   * 滑块拖动
   */
  bindSliderchange: function(e) {
    let value = e.detail.value
    let that = this
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        let {
          status,
          duration
        } = res
        if (status === 1 || status === 0) {
          that.setData({
            sliderValue: value
          })
          wx.seekBackgroundAudio({
            position: value * duration / 100,
          })
        }
      }
    })
  },

  /**
   * 音频播放
   */
  play() {
    let {
      audioList,
      audioIndex
    } = this.data
    wx.playBackgroundAudio({
      dataUrl: audioList[audioIndex].adress,
      title: audioList[audioIndex].name,
      coverImgUrl: audioList[audioIndex].poster
    })
  },

  /**
   * 设置时间戳
   */
  setDuration() {
    let that = this
    const manage = wx.getBackgroundAudioManager()
    that.setData({
      currentPosition: !!manage.currentTime?that.formatTime(Math.ceil(manage.currentTime)):'00:00',
      duration: !!manage.duration?that.formatTime(Math.ceil(manage.duration)): '00:00',
      sliderValue: Math.floor(manage.currentTime * 100 / manage.duration),
    })
  },

  /**
   * 定时器
   */
  setTimer: function() {
    let that = this
    let timer = setInterval(function() {
      that.setDuration()
    }, 1000)
    this.setData({
      timer: timer
    })
  },
  /**
   * 格式化时间
   */
  formatTime: function(s) {
    let t = '';
    if (s > -1) {
      let min = Math.floor(s / 60) % 60;
      let sec = s % 60;
      if (min < 10) {
        t += "0";
      }
      t += min + ":";
      if (sec < 10) {
        t += "0";
      }
      t += sec;
    }
    return t;
  },
  // 列表展开收缩
  listTap: function() {
    this.setData({
      listVisible: true
    })
  },
  // 关闭歌曲列表
  handleCancel: function() {
    this.setData({
      listVisible: false
    })
  },
  choseChildrenSong: function(e) {
    this.setData({
      audioIndex: e.currentTarget.id * 1
    })
    this.play()
    this.setData({
      pauseStatus: false
    })
  },
  // 播放模式点击时间
  bindTapType: function(e) {
    if (e.currentTarget.dataset.type==='circle'){
      this.setData({
        type:''
      })
    }
    else{
      this.setData({
        type: 'circle'
      })
    }
  }
})