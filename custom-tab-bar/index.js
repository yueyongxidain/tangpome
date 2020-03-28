Component({
  data: {
    current:0,
    list: [{
      "text": "首页",
      "iconPath": "/icon/home.png",
      "selectedIconPath": "/icon/homeSelect.png",
      "path":"/pages/index/index"
    },
    {
      "text": "我的",
      "iconPath": "/icon/user.png",
      "selectedIconPath": "/icon/userSelect.png",
      "path": "/pages/user/user",
      badge: 'New'
    }]
  },
  methods: {
    switchTab(e) {
      console.log(e)
      const data = e.detail.item
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        current: data.index
      })
    }
  }
})