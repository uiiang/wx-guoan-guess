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
    ret.overdue = Date.parse(new Date()) > (data.matchSchedule.matchDateTime - 30 * 60 * 1000);
    return ret;
  })
}

//获取玩家提交过的竞猜比分
function fetchPlayerGuess(mschid) {
  console.log('fetchPlayerGuess ' + mschid);
  return API.GET(
    `${HOST}/getplresult?m=` + mschid,
    {},
    { cache: true, login: true }
  ).then(res => {
    let ret = {};
    if (res.code == 0) {
      ret = res.data;
    }
    console.log('fetchPlayerGuess', res);
    return ret;
  })
}

//获取竞猜结果预览
function fetchGuessPrev(mschid) {
  console.log('fetchGuessPrev ' + mschid);
  return API.GET(
    `${HOST}/guesspre?id=` + mschid,
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

//提交比分
function submitGuessScore(matchid, homeScore, awayScore, params) {
  return API.POST(
    `${HOST}/submitguess`,
    params, { header: { 'content-Type': 'application/x-www-form-urlencoded' }, cache: false, login: true }
  )
    .then(data => {
      return data
    })
}

//查询个人竞猜历史记录
function fetchGuessHistory() {
  return API.GET(
    `${HOST}/getplresultlist`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchGuessHistory', res);
    let ret = {};
    if (res.code == 0) {
      ret = res.data;
    }
    return ret;
  })
}

function fetchPlayResult(){
  return API.GET(
    `${HOST}/getplayresult`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchPlayResult', res);
    let ret = {};
    if (res.code == 0) {
      ret = res.data;
    }
    return ret;
  })
}

module.exports = {
  fetchNewMatch: fetchNewMatch,
  submitGuessScore: submitGuessScore,
  fetchGuessPrev: fetchGuessPrev,
  fetchRanking: fetchRanking,
  fetchPlayerGuess: fetchPlayerGuess,
  fetchGuessHistory: fetchGuessHistory,
  fetchPlayResult:fetchPlayResult
}
