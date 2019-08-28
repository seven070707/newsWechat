const typeMessageMap = {
  '0':'gn',
  '1':'gj',
  '2': 'cj',
  '3': 'yl',
  '4': 'js',
  '5': 'ty',
  '6': 'other'
}

Page({
  data: {
    activeIndex: -1,
    typeArray: [{
      type: '国内',
      }, {
      type: '国际',
      }, {
        type: '财经',
      }, {
        type: '娱乐',
      }, {
        type: '军事',
      }, {
        type: '体育',
      }, {
        type: '其他',
      }],

    typeMessage:'gn',
    // 列表数据数组
    dataList: [],

    //设置默认新闻来源
    defaultSource:"网络来源",

    defaultFirstImage:"//inews.gtimg.com/newsapp_bt/0/8148265330/641",

    //设置轮播图片
    //logoPaths:[],
    // 轮播图
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular: true,
  },
  onLoad() {
    this.getNewsList()
  },
  onPullDownRefresh(){
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNewsList(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.typeMessage
      },
      success: res => {
        let result = res.data.result
        console.log(result)
        var logoPaths = [];
        result && result.map((v,k)=>{
          //重新设置日期格式
          var h = new Date(v.date).getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = new Date(v.date).getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          v.date = h + ':' + minute

          //判空新闻来源，如果没有新闻来源，设置为一个默认值
          if (!v.source){
            v.source = this.data.defaultSource
          }

          //判空新闻图片，如果没有新闻图片，设置一个默认值
          if( !v.firstImage ){
            v.firstImage = this.data.defaultFirstImage
          }

          //设置到轮播图变量中
          //logoPaths.push(v.firstImage);
          //console.log(logoPaths);
        })
        this.setData({
          dataList:result,
          //logoPaths: logoPaths

        });
      },
      complete: () =>{
        callback && callback()
      }
    })
  },
  
  //根据点击的标签页，获取得到url的入参
  onTapMessage: function(e){

    let typeMessageIndex = e.currentTarget.dataset['index'];
    this.setData({
      activeIndex: typeMessageIndex
    })
    console.log(this.data.activeIndex)
    console.log(typeMessageIndex);
    this.setData({
      typeMessage: typeMessageMap[typeMessageIndex],
    }),
    console.log(this.data.typeMessage)
    this.getNewsList()
  },

  onTapMessageDetail:function(e){
    let id = e.currentTarget.dataset['id'];
    console.log(id);
    wx.navigateTo({
      url: '/pages/list/list?id=' + id,
    })
  },
  
})