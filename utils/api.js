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

function fetchPlayResult() {
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

function countMatchResult(mschid) {
  return API.GET(
    `${HOST}/API/countMatchResult?id=` + mschid,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchPlayResult', res);
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

function startNewMatch() {
  return API.GET(
    `${HOST}/API/startnewmatch`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('startNewMatch', res);
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

function fetchMatchSchedule() {
  return API.GET(
    `${HOST}/API/schelist`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchMatchSchedule', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    return res.data;
  })
}

function fetchMatchScheduleInfo(mscheid) {
  return API.GET(
    `${HOST}/API/editsche?id=` + mscheid,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchMatchScheduleInfo', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    let data = res.data;
    let ret = {};
    let matchInfo = {};
    let matchDateTimeStr = {};
    ret.matchInfo = data;
    ret.matchDateStr = util.formatDate(new Date(data.matchDateTime),'-');
    ret.matchTimeStr = util.formatTime(new Date(data.matchDateTime));
    return ret;
  })
}

function fetchTeamList() {
  return API.GET(
    `${HOST}/API/listTeam`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchTeamList', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    return res.data;
  })
}

function fetchStadiumList() {
  return API.GET(
    `${HOST}/API/stadiumlist`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchStadiumList', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    return res.data;
  })
}

function fetchMatchLevelList() {
  return API.GET(
    `${HOST}/API/matchlist`,
    {},
    { cache: false, login: true }
  ).then(res => {
    console.log('fetchMatchLevelList', res);
    if (res.code !== 0) {
      showModel('服务器好像出问题了', res.msg);
      return;
    }
    return res.data;
  })
}

//提交赛程信息
function submitMatchSchedule(params) {
  return API.POST(
    `${HOST}/API/createSche`,
    params, { header: { 'content-Type': 'application/x-www-form-urlencoded' }, cache: false, login: true }
  )
    .then(data => {
      return data
    })
}
module.exports = {
  fetchNewMatch: fetchNewMatch,
  submitGuessScore: submitGuessScore,
  fetchGuessPrev: fetchGuessPrev,
  fetchRanking: fetchRanking,
  fetchPlayerGuess: fetchPlayerGuess,
  fetchGuessHistory: fetchGuessHistory,
  fetchPlayResult: fetchPlayResult,
  countMatchResult: countMatchResult,
  startNewMatch: startNewMatch,
  fetchMatchSchedule:fetchMatchSchedule,
  fetchStadiumList: fetchStadiumList,
  fetchTeamList: fetchTeamList,
  fetchMatchScheduleInfo: fetchMatchScheduleInfo,
  fetchMatchLevelList: fetchMatchLevelList,
  submitMatchSchedule: submitMatchSchedule
}
