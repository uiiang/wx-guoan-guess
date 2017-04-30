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

function fetchNewMatch() {
  console.log(HOST);
  return API.GET(
    `${HOST}/nowmatch`,
    {},
    {cache:true},
  ).then(res=>{
      let data = res[0];
      // if (res.code !== 0) {
      //   showModel('好像出问题了', res);
      //   return;
      // }
      let ret = {};
      let matchInfo={};
      let matchDateTimeStr={};
      ret.matchInfo = data;
      ret.matchDateTimeStr = util.formatDateTime(new Date(data.matchDateTime));
      ret.overdue=Date.parse(new Date())>data.matchDateTime;
      return ret;
  })
}

module.exports = {
  fetchNewMatch
}
