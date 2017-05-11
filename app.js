//app.js
import qcloud from './bower_components/wafer-client-sdk/index';
import config from './config';

App({
  onLaunch() {
    console.log('app version', config.service.version)
    qcloud.setLoginUrl(config.service.loginUrl);
    wx.getSystemInfo({
      success: res => {
        this.globalData.systemInfo = res;
        this.globalData.rpx = res.windowWidth / 750;
      },
      fail: () => { }
    });
    this.doLogin();
  },
  clearSession() {
    // 清除保存在 storage 的会话信息
    qcloud.clearSession();
    console.log('会话已清除', result);
  },
  doLogin() {
    qcloud.login({
      success: result => {
        console.log('登录成功..', result);
        this.globalData.userInfo = result;
      },
      fail: (error) => {
        console.log('登录失败', error);
      }
    });
        //     //获取用户信息
        // wx.getUserInfo({
        //     success: function (res) {
        //         //获取用户敏感数据密文和偏移向量
        //         console.log('res.encryptedData' + res.encryptedData);
        //         // that.setData({encryptedData: res.encryptedData});
        //         // that.setData({iv: res.iv})
        //     }
        // });
  },
  onShow() {
  },
  onHide() {
    // 锁屏触发事件
  },
  globalData: {
    userInfo: {},
    app_version: config.service.version
  }
})