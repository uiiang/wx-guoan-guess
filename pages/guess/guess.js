//index.js
//获取应用实例
var util = require('../../utils/util.js')
import { fetchNewMatch } from '../../utils/api';
var app = getApp()
Page({
  data: {
    userInfo: {},
    match:{},
    endtime:{},
    matchDateTimeStr:{},
    refreshing: false,
    overdue:false,
  },
  onLoad(){
    fetchNewMatch().then(res => {
      console.log(app.globalData.userInfo);
      this.setData({
        match: res.matchInfo,
        matchDateTimeStr:res.matchDateTimeStr,
        overdue:res.overdue,
        userInfo: app.globalData.userInfo
      })
    })
  },

  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   var result_draw="";
  //   var result_home_win="";
  //   var result_home_lose="";
  //   //调用应用实例的方法获取全局数据
  //   //1、调用微信登录接口，获取code
  //   wx.login({
  //     success: function (r) {
  //       var code = r.code;//登录凭证
  //           console.log('login code = ' + code)
  //       if (code) {
  //         //2、调用获取用户信息接口
  //         app.getUserInfo(function(userInfo){
  //           console.log({encryptedData: userInfo.encryptedData, iv: userInfo.iv, code: code})
  //           //更新数据
  //           that.setData({
  //             userInfo:userInfo,
  //           })
  //         })
  //       } else {
  //         console.log('获取用户登录态失败！' + r.errMsg)
  //       }},
  //       fail: function () {
  //           callback(false)
  //       }
  //   }),
    
  //   wx.request({
  //     url:URL+"/guess_preview",
  //     data:JSON.stringify({}),
  //     header:{'content-type': 'application/json'},
  //     method:'GET',
  //     // header: {}, // 设置请求的 header
  //     success: function(res){
  //       that.setData({
  //         result_draw: res.data[0].draw,
  //         result_home_lose:res.data[0].home_lose,
  //         result_home_win:res.data[0].home_win
  //       })
  //       console.log("res.data",res.data[0])
  //       console.log("result_home_lose",result_home_lose)
  //       console.log("result_draw",result_draw)
  //       console.log("result_home_win",result_home_win)
  //     },
  //     fail: () => console.error('something is wrong'),
  //     complete: () => console.log('match loaded')
  //   })
  // },


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
