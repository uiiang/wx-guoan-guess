//index.js
//获取应用实例
var util = require('../../utils/util.js')
import { fetchNewMatch,checkUser,submitGuessScore,fetchGuessPrev } from '../../utils/api';
var app = getApp()
Page({
  data: {
    userInfo: {},
    match:{},
    endtime:{},
    matchDateTimeStr:{},
    refreshing: false,
    overdue:false,
    result_draw:{},
    result_home_lose:{},
    result_home_win:{},
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

      console.log('fetchNewMatch ',res.matchInfo.matchSchedule.id);

      fetchGuessPrev(res.matchInfo.matchSchedule.id).then(res=>{
        this.setData({
          result_draw: res.draw,
          result_home_lose:res.homeLose,
          result_home_win:res.homeWin
        })
      })
      // app.clearSession();
    }),
    checkUser().then(res=>{
      console.log('checkUser ', res.openId);
    })
    // fetchGuessPrev(this.match.matchSchedule.id).then(res=>{

    // })
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
    console.log('event',event);
    var homegoal=0;
    var awaygoal=0;
    var endtime = event.currentTarget.dataset.endtime;
    var matchid = event.currentTarget.dataset.matchid;
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

    console.log('submit ' + homegoal + ':' + awaygoal
      + ' matchid = ' + matchid + "  endtime = " + endtime);

      let params = {
        m: matchid,
        h: homegoal,
        a: awaygoal
      };
    submitGuessScore(matchid,homegoal,awaygoal,params).then(res => {
        console.log(res);
        wx.showToast({
          title: "竞猜成功",
          icon: "success",
          duration: 2000
        });
      }).catch(() => {
        wx.showToast({
          title: "竞猜失败, 大概是服务器出错了吧",
          duration: 2000
        });
      })
  }
})
