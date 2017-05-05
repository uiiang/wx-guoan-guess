import * as API from './request';
import config from '../config';
var util = require('./util.js')

const HOST = `${config.service.host}`;

// 显示失败提示
let showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

//获取最新的竞猜比赛
function fetchNewMatch() {
  console.log(HOST);
  return API.GET(
    `${HOST}/nowmatch`,
    {},
    { cache: false, login: true },
  ).then(res => {
    console.log('fetchNewMatch', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    let data = res.data[0];
    let ret = {};
    let matchInfo = {};
    let matchDateTimeStr = {};
    ret.matchInfo = data;
    ret.matchDateTimeStr = util.formatDateTime(new Date(data.matchSchedule.matchDateTime));
    ret.overdue = Date.parse(new Date()) > data.matchSchedule.matchDateTime;
    return ret;
  })
}

//获取竞猜结果预览
function fetchGuessPrev(matchid) {
  console.log('fetchGuessPrev ' + matchid);
  return API.GET(
    `${HOST}/guesspre?id=` + matchid,
    {},
    { cache: true, login: true }
  ).then(res => {
    console.log('fetchGuessPrev', res);
    return res;
  })
}

//获取排行榜数据
function fetchRanking() {
  return API.GET(
    `${HOST}/rankinglist`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchRanking', res);
    return res;
  })
}

function checkUser() {
  return API.GET(
    `${HOST}/checkuser`,
    {},
    { cache: false, login: true },
  ).then(res => {
    console.log('check user = ', res);
    let data = res.data.userInfo;
    // if (res.code !== 0) {
    //   showModel('好像出问题了', res);
    //   return;
    // }
    let ret = {};
    let openId = {};
    ret.openId = data.openId;
    // let matchInfo={};
    // let matchDateTimeStr={};
    // ret.matchInfo = data;
    // ret.matchDateTimeStr = util.formatDateTime(new Date(data.matchDateTime));
    // ret.overdue=Date.parse(new Date())>data.matchDateTime;
    return ret;
  })
}

//提交比分
function submitGuessScore(matchid, homeScore, awayScore, params) {
  return API.POST(
    `${HOST}/submitguess`,
    params, { header: { 'content-Type': 'application/x-www-form-urlencoded' },cache: false, login: true  }
  )
    .then(data => {
      return data
    })
}

module.exports = {
  fetchNewMatch: fetchNewMatch,
  checkUser: checkUser,
  submitGuessScore: submitGuessScore,
  fetchGuessPrev: fetchGuessPrev,
  fetchRanking: fetchRanking
}
