
Page({
  date: {
    title:0,
    id:0,
    content:[]
  },
  onLoad(options) {
    this.setData({
      city: options.city,
      id:options.id
    })
    this.getMessageDetail()
  },
  onPullDownRefresh() {
    this.getMessageDetail(()=>{
      wx.stopPullDownRefresh()
    })
  },
  getMessageDetail(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.id
      },
      success: res => {
        let result = res.data.result
        this.setMessageDetail(result)
      },
      complete: ()=>{
        callback && callback()
      }
    })
  },
  setMessageDetail(result){
    console.log(result);
    var h = new Date(result.date).getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = new Date(result.date).getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var date = h + ':' + minute
    this.setData({
      title:result.title,
      source:result.source,
      date: date,
      readCount:'阅读 '+result.readCount,
      content:result.content
    })
  }
})