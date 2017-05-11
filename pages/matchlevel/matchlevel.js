// matchlevel.js
var util = require('../../utils/util.js')
import { fetchMatchLevelList, finshMatchLevel, startMatchLevel, countMatchLevel } from '../../utils/api';
var app = getApp()
Page({
  data: {
    matchLevelList: {}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.loadData();
  },

  loadData: function () {
    fetchMatchLevelList().then(res => {
      this.setData({
        matchLevelList: res,
      })
      wx.hideLoading();
    })
  },

  countMatchLevel:function(e){
    var matchid = e.currentTarget.dataset.matchid;
    countMatchLevel(matchid).then(res => {
      this.setData({
      })
      wx.hideLoading();
    })
  },
  finshMatchLevel: function (e) {
    var matchid = e.currentTarget.dataset.matchid;
    finshMatchLevel(matchid).then(res => {
      this.setData({
      })
      wx.hideLoading();
    })
  },
  startMatchLevel: function (e) {
    var matchid = e.currentTarget.dataset.matchid;
    startMatchLevel(matchid).then(res => {
      this.setData({
      })
      wx.hideLoading();
    })
  },
  createNewMatchLevel: function (event) {
    console.log('formSubmitevent', event);
    console.log('formSubmit', this);
  }
})