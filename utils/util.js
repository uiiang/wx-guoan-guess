function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

function formatDate(date, separator){
    var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return year + separator + month + separator + day
}

function formatDateTime(date){
    var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  return year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isNotANumber(inputData) {
  console.log('isNotANumber',inputData);
  　　var re = /^[0-9]+[0-9]*]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  return !re.test(inputData);
}
function showModal(c,t,fun) {
    if(!t)
        t='提示'
    wx.showModal({
        title: t,
        content: c,
        success: fun
    })
}
module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateTime:formatDateTime,
  isNotANumber:isNotANumber,
  showModal:showModal
}
