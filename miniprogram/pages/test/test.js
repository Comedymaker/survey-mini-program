// pages/test/test.js
const db = wx.cloud.database()
const survey1 = db.collection("survey").doc('14139e126103c6b40104ac7a1ec76aa9')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
  },

  test:function () {
    console.log(1)
    survey1.get({
      success: function (res) {
        console.log(res.data.deadline)
        wx.showToast({
          title: `${res.data.deadline}`,
        })
      }
    })
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
    // db.collection('survey').doc('14139e126103c6b40104ac7a1ec76aa9').get({
    //   success: function(res) {
    //     // res.data 包含该记录的数据
    //     console.log(res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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

  }
})