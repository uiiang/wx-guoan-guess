//index.js
//获取应用实例
var util = require('../../utils/util.js')
import { fetchNewMatch, submitGuessScore, fetchGuessPrev, fetchPlayerGuess } from '../../utils/api';
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
    home_goal: 0,//玩家预测的比分
    away_goal: 0//玩家预测的客队比分
  },
  onLoad() {
    wx.showLoading({
      title: '加载中',
    })
    this.loadData();
  },

  loadData: function () {
    fetchNewMatch().then(res => {
      this.setData({
        match: res.matchInfo,
        matchDateTimeStr: res.matchDateTimeStr,
        overdue: res.overdue,
        userInfo: app.globalData.userInfo
      })

      wx.hideLoading();
      console.log('fetchNewMatch mscheid='
        , res.matchInfo.matchSchedule.id);
      this.loadPlayerGuess(res.matchInfo.matchSchedule.id);
      this.loadPrevData(res.matchInfo.matchSchedule.id);
    })
  },

  loadPlayerGuess: function (mschId) {
    var storageMschId = wx.getStorageSync('matchid');
    console.log('storageMschId', storageMschId);
    if (mschId == storageMschId) {
      var storageHomeGoal = wx.getStorageSync('home_goal');
      var storageAwayGoal = wx.getStorageSync('away_goal');
      if (storageHomeGoal.length == 0 
        || storageHomeGoal < 0 
        || storageHomeGoal == "") {
        storageHomeGoal = 0;
      }
      if (storageAwayGoal.length == 0 
        || storageAwayGoal < 0 
        || storageAwayGoal == "") {
        storageAwayGoal = 0;
      }
      console.log('storage Goal'
        , storageHomeGoal + ':' + storageAwayGoal);
      this.setData({
        home_goal: storageHomeGoal,
        away_goal: storageAwayGoal
      })
    } else {
      this.setData({
        home_goal: 0,
        away_goal: 0
      })
    }

    // fetchPlayerGuess(mschId).then(res => {
    //   this.setData({
    //     home_goal: res.homeResult,
    //     away_goal: res.awayResult,
    //   })
    // })
  },

  loadPrevData: function (mschId) {
    fetchGuessPrev(mschId).then(res => {
      this.setData({
        result_draw: res.draw,
        result_home_lose: res.homeLose,
        result_home_win: res.homeWin
      })
    })
  },
  reload: function (event) {
    this.loadData();
  },

  formSubmit: function (event) {
    console.log('event', event);
    var endtime = event.currentTarget.dataset.endtime;
    var matchid = event.currentTarget.dataset.matchid;
    console.log('event.detail.value.home.length ' , event.detail.value.home.length + ' ' + isNaN(event.detail.value.home))
    console.log('event.detail.value.away.length ' , event.detail.value.away.length + ' ' +isNaN(event.detail.value.away))
    if ((event.detail.value.home.length > 0
      || event.detail.value.home!="")) {
      this.home_goal = event.detail.value.home
    } else {
      this.home_goal = wx.getStorageSync('home_goal');
    }
    if ((event.detail.value.away.length > 0
      || event.detail.value.away!="")) {
      this.away_goal = event.detail.value.away
    } else {
      this.away_goal = wx.getStorageSync('away_goal');
    }

    console.log('submit ' + this.home_goal
      + ':' + this.away_goal
      + ' matchid = ' + matchid
      + "  endtime = " + endtime);

    let params = {
      m: matchid,
      h: this.home_goal,
      a: this.away_goal
    };
    submitGuessScore(matchid, this.home_goal, this.away_goal, params)
      .then(res => {
        console.log('submitGuessScore', res);
        wx.showToast({
          title: "竞猜成功",
          icon: "success",
          duration: 2000
        });
        wx.setStorageSync('home_goal', params.h);
        wx.setStorageSync('away_goal', params.a);
        wx.setStorageSync('matchid', matchid);
      }
      // ,this.loadData()).catch(() => {
      //   wx.showToast({
      //     title: "竞猜失败, 大概是服务器出错了吧",
      //     duration: 2000
      //   });
      // }
      )
  }
})
