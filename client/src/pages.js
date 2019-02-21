module.exports = [
//   {
//   path: 'pages/crm', // 页面路径，同时是 vue 文件相对于 src 的路径
//   config: { // 页面配置，即 page.json 的内容
//     navigationBarTitleText: '加载中...'
//   }
// },
{
    path: 'pages/book', // 页面路径，同时是 vue 文件相对于 src 的路径
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '图书',
      enablePullDownRefresh:true
    }
  }, {
    path: 'pages/collect',
    config: {
      navigationBarTitleText: '收藏'
    }
  }, {
    path: 'pages/me',
    config: {
      navigationBarTitleText: '个人中心'
    }
  }, {
    path: 'pages/BookDetails', // 图书详情页
    config: {
      navigationBarTitleText: '加载中...'
    }
  },{
    path: 'pages/CommentList', // 评论列表页
    config: {
      navigationBarTitleText: '全部评论'
    }
  },{
    path: 'pages/webView', // webView容器
    config: {
      navigationBarTitleText: '加载中...'
    }
  },{
    path: 'packageA/logs',
    subPackage: true,
    config: { // 页面配置，即 page.json 的内容
      navigationBarTitleText: '收藏'
    }
  }
]
