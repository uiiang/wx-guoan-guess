
var util = require('../../utils/util.js')
import { fetchGuessHistory, fetchPlayResult } from '../../utils/api';
var app = getApp()
Page({
    data: {
        userInfo: {},//用户信息
        guessList: {},//竞猜历史记录
        playerResult: {}//玩家积分情况
    },

    onLoad() {
        // wx.showLoading({
        //     title: '加载中',
        //     icon: 'loading',
        //     mask: true,
        // })
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
      wx.navigateTo({
        url: '/pages/admin/admin'
      })
    },
})