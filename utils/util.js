function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date){
    var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('/')
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

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateTime:formatDateTime
}
