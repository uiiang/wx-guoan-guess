
var util = require('../../utils/util.js')
import { fetchGuessHistory, fetchPlayResult, fetchPlayInfo } from '../../utils/api';
var app = getApp()
Page({
  data: {
    userInfo: {},//用户信息
    guessList: {},//竞猜历史记录
    playerResult: {},//玩家积分情况
    isAdmin: false
  },

  onLoad() {
    this.setData({
      userInfo: app.globalData.userInfo
    });
    this.loadData();
  },

  loadData: function () {
    fetchGuessHistory().then(res => {
      console.log('GuessHistory', res);
      this.setData({
        guessList: res
      })
    }),
      fetchPlayResult().then(res => {
        this.setData({
          playerResult: res
        })
      })
  },

  gotoAdmin: function () {
    fetchPlayInfo().then(res => {
      console.log('fetchPlayInfo', res);
      if (res.code == 0) {
        wx.navigateTo({
          url: '/pages/admin/admin'
        })
      }
    })
  },
})