// edit.js
var util = require('../../../utils/util.js')
import { fetchMatchScheduleInfo, fetchStadiumList, fetchTeamList, fetchMatchLevelList, submitMatchSchedule } from '../../../utils/api';
var app = getApp()
Page({
  data: {
    homeEmblems: '',
    awayEmblems: '',
    homeTeam: '',
    awayTeam: '',
    matchLevel: '',
    roundNum: 0,
    stadiumName: '',
    matchDateStr: '',//比赛日期字符串
    matchTimeStr: '',//比赛时间字符串
    statusindex: 0,

    //========数据集合==========
    match: {},//待竞猜比赛
    teamList: {},
    stadiumList: {},
    matchLevelList: {},
    statusarray: ['未开始', '进行中', '已结束', '已计算'],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('option', options)
    var mscheid = options.mscheid
    this.loadData(mscheid);
  },

  loadData: function (mscheid) {
    if (mscheid > 0) {
      fetchMatchScheduleInfo(mscheid).then(res => {
        this.setData({
          match: res.matchInfo,
          matchDateStr: res.matchDateStr,
          matchTimeStr: res.matchTimeStr,
          homeEmblems: res.matchInfo.homeEmblems,
          awayEmblems: res.matchInfo.awayEmblems,
          homeTeam: res.matchInfo.homeTeam,
          awayTeam: res.matchInfo.awayTeam,
          matchLevel: res.matchInfo.matchLevel,
          roundNum: res.matchInfo.roundNum,
          stadiumName: res.matchInfo.stadiumName,
          statusindex: res.matchInfo.status
        })
        wx.hideLoading();
      })
    }
    fetchTeamList().then(res => {
      this.setData({
        teamList: res,
      })
      wx.hideLoading();
    })
    fetchStadiumList().then(res => {
      this.setData({
        stadiumList: res,
      })
      wx.hideLoading();
    })
    fetchMatchLevelList().then(res => {
      this.setData({
        matchLevelList: res,
      })
      wx.hideLoading();
    })
  },
  bindHomeTeamChange: function (e) {
    console.log('bindHomeTeamChange', e.detail.value + ' ' + this.data.teamList[e.detail.value])
    this.setData({
      homeEmblems: this.data.teamList[e.detail.value].emblems,
      homeTeam: this.data.teamList[e.detail.value].chineseName,
      stadiumName: this.data.teamList[e.detail.value].stadiumName
    })
  },
  bindAwayTeamChange: function (e) {
    console.log('bindAwayTeamChange', e.detail.value + ' ' + this.data.teamList[e.detail.value])
    this.setData({
      awayEmblems: this.data.teamList[e.detail.value].emblems,
      awayTeam: this.data.teamList[e.detail.value].chineseName
    })
  },
  bindMLevelChange: function (e) {
    console.log('bindMLevelChange', e.detail.value + ' ' + this.data.matchLevelList[e.detail.value])
    this.setData({
      matchLevel: this.data.matchLevelList[e.detail.value].chineseName
    })
  },
  bindDateChange: function (e) {
    console.log('bindDateChange', e.detail.value)
    this.setData({
      matchDateStr: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('bindTimeChange', e.detail.value)
    this.setData({
      matchTimeStr: e.detail.value
    })
  },
  bindStatusChange: function (e) {
    this.setData({
      statusindex: e.detail.value
    })
  },
  bindStadiumChange: function (e) {
    console.log('bindStadiumChange', e.detail.value + ' ' + this.data.stadiumList[e.detail.value])
    this.setData({
      stadiumName: this.data.stadiumList[e.detail.value].chineseName
    })
  },

  formSubmit: function (event) {
    console.log('formSubmitevent', event);
    console.log('formSubmit', this);
    if (util.isNotANumber(event.detail.value.roundNum)) {
      wx.showToast({
        title: '请输入轮次',
        duration: 2000
      })
      return;
    }
    if (event.detail.value.roundNum < 1) {
      wx.showToast({
        title: '轮次数字错误',
        duration: 2000
      })
      return;
    }
    if ((event.detail.value.roundNum > 0
      || event.detail.value.roundNum !== "")) {
      this.round_num = event.detail.value.roundNum
    }
    if ((event.detail.value.home.length > 0
      || event.detail.value.home !== "")) {
      this.home_goal = event.detail.value.home
    } else {
      this.home_goal = 0
    }
    if ((event.detail.value.away.length > 0
      || event.detail.value.away !== "")) {
      this.away_goal = event.detail.value.away
    } else {
      this.away_goal = 0
    }

    if (this.data.statusindex > 1) {
      if (util.isNotANumber(this.home_goal) || util.isNotANumber(this.away_goal)) {
        wx.showToast({
          title: '比赛结束状态必须输入比分',
          duration: 2000
        })
        return;
      }

      if (util.isNotANumber(this.home_goal)
        || util.isNotANumber(this.away_goal)) {
        wx.showToast({
          title: '请输入数字',
          duration: 2000
        })
      }
    }
    if (this.data.homeTeam.length < 1
      || this.data.awayTeam.length < 1
      || this.data.matchLevel.length < 1
      || this.data.stadiumName.length < 1
      || this.data.matchDateStr.length < 1
      || this.data.matchTimeStr.length < 1) {
      wx.showToast({
        title: '请确认填写完整',
        duration: 2000
      })
    }
    let params = {
      id: this.data.match.id > 0 ? this.data.match.id : -1,
      homeResult: this.home_goal,
      awayResult: this.away_goal,
      homeEmblems: this.data.homeEmblems,
      awayEmblems: this.data.awayEmblems,
      homeTeam: this.data.homeTeam,
      awayTeam: this.data.awayTeam,
      matchLevel: this.data.matchLevel,
      roundNum: this.round_num,
      stadiumName: this.data.stadiumName,
      matchDateTime: this.data.matchDateStr + ' ' + this.data.matchTimeStr,
      status: this.data.statusindex
    };

    submitMatchSchedule(params)
      .then(res => {
        if (res.code != 0) {
          wx.showToast({
            title: res.msg,
            duration: 2000
          });
        } else {
          console.log('submitMatchSchedule', res);
        }
      })
  }
})