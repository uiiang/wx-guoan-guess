//index.js
//获取应用实例
var util = require('../../utils/util.js')
import { fetchNewMatch, submitGuessScore, fetchGuessPrev } from '../../utils/api';
var app = getApp()
Page({
  data: {
    userInfo: {},//用户信息
    match: {},//待竞猜比赛
    endtime: {},//结束时间
    matchDateTimeStr: {},//比赛日期字符串
    refreshing: false,//
    overdue: false,//竞猜是否过期
    result_draw: {},//竞猜结果预览 平
    result_home_lose: {},//竞猜结果预览 输
    result_home_win: {},//竞猜结果预览 赢
  },
  onLoad() {
    fetchNewMatch().then(res => {
      this.setData({
        match: res.matchInfo,
        matchDateTimeStr: res.matchDateTimeStr,
        overdue: res.overdue,
        userInfo: app.globalData.userInfo
      })

      console.log('fetchNewMatch ', res.matchInfo.matchSchedule.id);

      fetchGuessPrev(res.matchInfo.matchSchedule.id).then(res => {
        this.setData({
          result_draw: res.draw,
          result_home_lose: res.homeLose,
          result_home_win: res.homeWin
        })
      })
    })
  },

  formSubmit: function (event) {
    console.log('event', event);
    var homegoal = 0;
    var awaygoal = 0;
    var endtime = event.currentTarget.dataset.endtime;
    var matchid = event.currentTarget.dataset.matchid;
    if (event.detail.value.home.length == 0
      || event.detail.value.home < 0) {
      homegoal = 0
    } else {
      homegoal = event.detail.value.home
    }
    if (event.detail.value.away.length == 0
      || event.detail.value.away < 0) {
      awaygoal = 0
    } else {
      awaygoal = event.detail.value.away
    }

    console.log('submit ' + homegoal + ':' + awaygoal
      + ' matchid = ' + matchid + "  endtime = " + endtime);

    let params = {
      m: matchid,
      h: homegoal,
      a: awaygoal
    };
    submitGuessScore(matchid, homegoal, awaygoal, params).then(res => {
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
