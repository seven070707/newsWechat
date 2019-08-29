
Page({
  data: {
    title:0,
    id:0,
    content:[],
    //设置默认新闻来源
    defaultSource: "网络来源",
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
      fail: err => {
        // 请求失败的操作
        console.info("url request fail");
      },
      complete: ()=>{
        typeof callback === 'function' && callback()
      }
    })
  },
  setMessageDetail(result){
    // console.log(result);
    //重新设置日期格式
    var h = new Date(result.date).getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = new Date(result.date).getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var date = h + ':' + minute

    //判空新闻来源，如果没有新闻来源，设置为一个默认值
    if (!result.source) {
      result.source = this.data.defaultSource
    }

    this.setData({
      title:result.title,
      source:result.source,
      date: date,
      readCount:'阅读 '+result.readCount,
      content:result.content
    })
  }
})