//index.js
//获取应用实例
var util = require('../../utils/util.js')
import { fetchRanking } from '../../utils/api';
var app = getApp()
const URL = 'http://localhost:3000'
Page({
  data: {
    motto: 'Hello World',
    ranking: {},
  },

  onLoad: function () {
    console.log('ranking onLoad')
    fetchRanking().then(res => {
      this.setData({
        ranking: res
      })
    })
  }
})
