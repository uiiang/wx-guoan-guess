//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const URL = 'http://10.73.138.112:3000/newmatch'
Page({
  data: {
    motto: 'Hello World',
    nowtime:{},
    userInfo: {},
    match:{}
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        nowtime:util.formatTime(new Date())
      })
    }),
    wx.request({
      url: URL,
      data: JSON.stringify({}),
      header:{ 'content-type': 'application/json' },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)
        that.setData({
          match: res.data[0]
        })
      },
      fail: () => console.error('something is wrong'),
      complete: () => console.log('match loaded')
    })
  }
})
