var util = require('../../utils/util.js')
import { fetchMatchSchedule } from '../../utils/api';
var app = getApp()
Page({
    data: {
        scheduleList: {},//待竞猜比赛
    },
    onLoad() {
        wx.showLoading({
            title: '加载中',
            icon: 'loading',
            mask: true,
            // fail: setTimeout
        })
        this.loadData();
    },

    loadData: function () {
        fetchMatchSchedule().then(res => {
            this.setData({
                scheduleList: res
            })
            wx.hideLoading();
        })
    },

    toEdit: function (event) {
      var mscheid = event.currentTarget.dataset.mscheid;
      wx.navigateTo({
        url: '/pages/schedule/edit/edit?mscheid=' + mscheid
      })
    },
    createNewMatch: function () {
      wx.navigateTo({
        url: '/pages/schedule/edit/edit'
      })
    }
})