// guesslist.js
var util = require('../../utils/util.js')
import { fetchGuessResultList, fetchMatchScheduleInfo } from '../../utils/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    matchid:0,
    guessResultList:{},
    scheduleItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log('options', options.match)
    var mscheid = options.match
    this.loadData(mscheid);
  },
  loadData: function (mscheid) {
    if (mscheid > 0) {
      fetchMatchScheduleInfo(mscheid).then(res => {
        this.setData({
          scheduleItem: res.matchInfo
        })
      })
      fetchGuessResultList(mscheid).then(res => {
        this.setData({
          guessResultList: res
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  }
})