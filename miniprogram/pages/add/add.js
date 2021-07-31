// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  addNew: function name() {
    console.log("fine")
    wx.navigateTo({
      url: '/pages/newSurvey/newSurvey'
    })
  }
})