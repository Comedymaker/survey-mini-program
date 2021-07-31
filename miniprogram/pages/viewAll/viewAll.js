// pages/viewAll/viewAll.js
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSurvey:[],
    nowSurvey:[],
    ptr:0,
    hotColor:'white',
    newColor:'#f6f6f6',
    hotFont:'800',
    newFont:'400',
    condition: 0,
    hotDisplay:"flex",
    newDisplay:"none"
  },

  swToHot:function (params) {
    if (this.data.condition == 0) {
      return;
    }
    this.setData({
      condition:0,
      hotColor:'white',
      newColor:'#f6f6f6',
      hotFont:'800',
      newFont:'400',
      ptr:0
    })
    db.collection('survey')
    .orderBy('likes', 'desc')
    .get()
    .then(res => {
      this.setData({
        allSurvey : res.data.slice(0),
        nowSurvey: res.data.slice(0,4)
      })
      console.log(this.data.nowSurvey)
    })
    .catch(console.error)
  },

  swToNew:function (params) {
    if (this.data.condition == 1) {
      return;
    }
    this.setData({
      condition:1,
      hotColor:'#f6f6f6',
      newColor:'white',
      hotFont:'400',
      newFont:'800',
      ptr:0,
    })
    db.collection('survey')
    .orderBy('createTime', 'desc')
    .get()
    .then(res => {
      this.setData({
        allSurvey : res.data.slice(0),
        nowSurvey: res.data.slice(0,4)
      })
      console.log(this.data.nowSurvey)
    })
    .catch(console.error)
    
  },

  pageUp:function (params) {
    if(this.data.ptr == 0)  return;
    
    this.setData({
      ptr:this.data.ptr - 1,
      nowSurvey:this.data.allSurvey.slice((this.data.ptr-1)*4,(this.data.ptr-1)*4 + 4)
    })
    
  },

  pageDown:function (params) {
    if(this.data.allSurvey.slice((this.data.ptr+1)*4,(this.data.ptr+1)*4 + 4).length == 0) return;
    this.setData({
      ptr:this.data.ptr + 1,
      nowSurvey:this.data.allSurvey.slice((this.data.ptr+1)*4,(this.data.ptr+1)*4 + 4)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('survey')
    .orderBy('likes', 'desc')
    .get()
    .then(res => {
      this.setData({
        allSurvey : res.data.slice(0),
        nowSurvey: res.data.slice(0,4)
      })
      console.log(this.data.nowSurvey)
    })
    .catch(console.error)
    
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