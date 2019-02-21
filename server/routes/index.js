/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)

//添加图书
router.post('/addbook', controllers.addbook)
//获取热门列表
router.get('/getbooktops', controllers.getbooktops)
//获取图书列表
router.get('/getbooklist', controllers.getbooklist)
//获取图书详情并记录浏览量
router.get('/getbookdetails', controllers.getbookdetails)

//添加评论
router.post('/addcomment', controllers.addcomment)
//获取评论列表
router.get('/getcommentlist', controllers.getcommentlist)
router.get('/demo', async (ctx, next) => {
    await new Promise((reslove,reject)=>{
        var data={
            NavigationBarColor:{
                frontColor:"#ffffff",
                backgroundColor:'#367c2b',
            },
            NavigationBarTitle:'迪尔crm',
            list:[
                { src: 'https://all.img.s105.cn/kfupload/up/201811/02095149_1677.png', name: '我是考官', url: '/pages/IamExaminer/IamExaminerRecord/main' }
            ],
            banner:'https://all.img.s105.cn/kfupload/up/201702/10101816_9603.jpg'
        };
        
        var data1={
            NavigationBarColor:{
                frontColor:"#ffffff",
                backgroundColor:'#c00031',
            },
            NavigationBarTitle:'爱科crm',
            list:[
                { src: 'https://all.img.s105.cn/kfupload/up/201811/26145823_7146.png', name: '全景看车', url: '/pages/IamExaminer/IamExaminerRecord/main' }
            ],
            banner:'https://all.img.s105.cn/kfupload/up/201810/25215153_3708.jpg'
        }
        setTimeout(() => {
            reslove(ctx.response.body = {
                code:0,
                data:data
            })
        }, 2000);
    })
    // ctx.response.body = {
    //     code:0,
    //     data:{
    //         'text': 'hello 小程序',
    //     }
    // };
})
module.exports = router
