//index.js
//获取应用实例
var util = require('../../utils/util.js')
var app = getApp()
const URL = 'http://127.0.0.1:8080'
Page({
  data: {
    userInfo: {},
    match:{},
    endtime:{},
    matchDateTimeStr:{},
    overdue:false
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    var result_draw="";
    var result_home_win="";
    var result_home_lose="";
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
      })
    }),
    wx.request({
      url: URL+"/nowmatch",
      data: JSON.stringify({}),
      header:{ 'content-type': 'application/json' },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res.data)
        that.setData({
          match: res.data[0],
          matchDateTimeStr:util.formatDateTime(new Date(res.data[0].matchDateTime)),
          overdue:Date.parse(new Date())>res.data[0].matchDateTime
        })
      },
      fail: () => console.error('something is wrong'),
      complete: () => console.log('match loaded')
    })
    ,
    wx.request({
      url:URL+"/guess_preview",
      data:JSON.stringify({}),
      header:{'content-type': 'application/json'},
      method:'GET',
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
          result_draw: res.data[0].draw,
          result_home_lose:res.data[0].home_lose,
          result_home_win:res.data[0].home_win
        })
        console.log("res.data",res.data[0])
        console.log("result_home_lose",result_home_lose)
        console.log("result_draw",result_draw)
        console.log("result_home_win",result_home_win)
      },
      fail: () => console.error('something is wrong'),
      complete: () => console.log('match loaded')
    })
  },

  formSubmit:function(event){
    var homegoal=0;
    var awaygoal=0;
    if(event.detail.value.home.length==0
      || event.detail.value.home < 0){
         homegoal=0
    } else {
        homegoal=event.detail.value.home
    }
    if(event.detail.value.away.length==0
      || event.detail.value.away < 0){
         awaygoal=0
    } else {
        awaygoal=event.detail.value.away
    }
  }
})
