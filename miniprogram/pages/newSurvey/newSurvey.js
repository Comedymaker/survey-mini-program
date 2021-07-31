const app = getApp();
const db = wx.cloud.database()

Page({
  data: {
    time: "2021-7-29",
    openid:'',
    sinOrDou:['单选','多选'],
    order:[0,0],
    num:0,
    description:"",
    title:"",
    questionArray:[{unique:'unique_0'},{unique:'unique_1'}],
    allQuestion:[
      
        //  {id:'id_0'}
        {allAnswer:['',''],allAnswerNum:[0,0],content:'',sin:'单选',must:0},
        {allAnswer:['',''],allAnswerNum:[0,0],content:'',sin:'单选',must:0}
        // [{unique:'unique_0'},{unique:'unique_1'}],
        // [{unique:'unique_0'},{unique:'unique_1'}]
    ],
  },
  addTitle:function (e) {
    this.data.title = e.detail.value
    this.setData({
      title:this.data.title
    })
    console.log(this.data.title)
  },
  addDescription:function (e) {
    this.data.description = e.detail.value
    this.setData({
      description:this.data.description
    })
    
  },
  bindPickerChange:function(e){
    console.log(e.detail.value)
    
    let myPtr = e.currentTarget.dataset.hi
    this.data.allQuestion[myPtr].sin = this.data.sinOrDou[e.detail.value]
    this.data.order[myPtr] = e.detail.value
    this.setData({
      order: this.data.order,
      allQuestion: this.data.allQuestion
    })
    console.log(this.data.allQuestion)
  },
  addToArray:function (e) {
    const length = this.data.allQuestion[e.currentTarget.id].allAnswer.length;
    // console.log(this.data.allQuestion[e.currentTarget.id].allAnswer)
    // this.data.allQuestion[e.currentTarget.id].allAnswer = this.data.allQuestion[e.currentTarget.id].allAnswer.concat([{ unique: 'unique_' + length }])
    this.data.allQuestion[e.currentTarget.id].allAnswer = this.data.allQuestion[e.currentTarget.id].allAnswer.concat([''])
    this.data.allQuestion[e.currentTarget.id].allAnswerNum = this.data.allQuestion[e.currentTarget.id].allAnswerNum.concat([0])
    this.setData({
      
      allQuestion: this.data.allQuestion
    })
    // console.log(this.data.allQuestion[e.currentTarget.id].allAnswer)
  },
  addQuestion:function (e) {
    const length = this.data.allQuestion.length
    this.data.allQuestion = this.data.allQuestion.concat([{allAnswer:['',''],allAnswerNum:[0,0],content:'',sin:'单选',must:0}])
    this.data.order = this.data.order.concat([0])
    this.setData({
      allQuestion: this.data.allQuestion,
      order: this.data.order
    })
    console.log(this.data.allQuestion)
  },
  bindTimeChange:function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value,
      
    })
    console.log(this.data.time)
  },
  delAnswer:function (e) {
    let myPtr = e.currentTarget.dataset.hi;
    console.log(e.currentTarget);
    this.data.allQuestion[myPtr[0]].allAnswer.splice(myPtr[2],1);
    this.setData({
      allQuestion: this.data.allQuestion
    })
  },
  // sinChange:function (e) {
  //   console.log(e.detail.value)
  // }
  addQContent:function (e) {
    let myPtr = e.currentTarget.dataset.hi;
    this.data.allQuestion[myPtr].content = e.detail.value
    this.setData({
      allQuestion:this.data.allQuestion
    })
  },
  addAnswer:function (e) {
    let myPtr = e.currentTarget.dataset.hi;
    console.log(e.detail.value)
    this.data.allQuestion[myPtr[0]].allAnswer[myPtr[2]] = e.detail.value
    this.setData({
      allQuestion: this.data.allQuestion
    })
    console.log(this.data.allQuestion)
  },
  pushData:function (params) {
    wx.cloud.callFunction({
      name: 'add',
      complete: res => {
        console.log('callFunction test result: ', res.result)
        this.setData({
          openid: res.result.openid
        })
      }
    })
    db.collection('survey').add({
    data: 
      {
        openid: this.data.openid,
        allQuestion: this.data.allQuestion,  
        deadline: this.data.time,
        likes : 0,
        title : this.data.title,
        description: this.data.description,
        createTime : '2021-7-31',
        result: 0,
      },
      
    
  })
  wx.showToast({
    title: '问卷上传成功！',
  })
  wx.navigateTo({
    url: '/pages/add/add'
  })

  }
})