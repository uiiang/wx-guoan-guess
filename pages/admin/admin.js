var util = require('../../utils/util.js')
import { fetchNewMatch, countMatchResult, startNewMatch } from '../../utils/api';
var app = getApp()
Page({
    data: {
        match: {},//待竞猜比赛
        matchDateTimeStr: {},//比赛日期字符串
    },
    onLoad() {
        wx.showLoading({
            title: '加载中',
            icon: 'loading',
            mask: true,
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

            wx.stopPullDownRefresh({
                complete: function (res) {
                    wx.hideToast();
                    wx.hideLoading();
                }
            })
            wx.hideLoading();
        })
    },
    confirmStartNewMatch: function () {
        // util.showModal("1.在赛程列表中结束当前比赛.2. 在赛事管理中计算竞猜结果. 完成以上步骤后才可以开始新比赛"
        //     , "启动一场新的比赛", this.sendStartMatch())
        wx.showModal({
            title: "启动一场新的比赛",
            content: "1.在赛程列表中结束当前比赛.2. 在赛事管理中计算竞猜结果. 完成以上步骤后才可以开始新比赛",
            success: function (click) {
              console.log('confirmStartNewMatch',this)
                if (click.confirm) {
                    console.log('用户点击确定')
                    wx.showLoading({
                        title: '加载中',
                        icon: 'loading',
                        mask: true,
                        // fail: setTimeout
                    })
                    startNewMatch().then(res => {
                        this.setData({
                            match: res.matchInfo,
                            matchDateTimeStr: res.matchDateTimeStr,
                            overdue: res.overdue,
                            userInfo: app.globalData.userInfo
                        })
                        wx.hideLoading();
                    })
                } else if (click.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    sendStartMatch: function () {
        wx.showLoading({
            title: '加载中',
            icon: 'loading',
            mask: true,
            // fail: setTimeout
        })
        startNewMatch().then(res => {
            this.setData({
                match: res.matchInfo,
                matchDateTimeStr: res.matchDateTimeStr,
                overdue: res.overdue,
                userInfo: app.globalData.userInfo
            },
              wx.hideLoading())
        })
    },

    countMatchResult: function (event) {
        var matchid = event.currentTarget.dataset.matchid;
        wx.showLoading({
            title: '加载中',
            icon: 'loading',
            mask: true,
            // fail: setTimeout
        })
        countMatchResult(matchid).then(res => {
            this.setData({
                match: res.matchInfo,
                matchDateTimeStr: res.matchDateTimeStr,
                overdue: res.overdue,
                userInfo: app.globalData.userInfo
            },
              wx.hideLoading())
        })
    },
    gotoSchedule: function () {
        wx.navigateTo({
            url: '/pages/schedule/schedule'
        })
    },
    gotoMatchLevel: function () {
      wx.navigateTo({
        url: '/pages/matchlevel/matchlevel'
      })
    },
})