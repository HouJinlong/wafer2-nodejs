const {mysql} = require('../qcloud');
module.exports = async (ctx)=>{
    var {pageIndex,pageSize} = ctx.request.query;
    var booklist = await mysql('books')
                            .select('books.*','cSessionInfo.user_info')
                            .join('cSessionInfo','books.openid','cSessionInfo.open_id')
                            .limit(Number(pageSize))
                            .offset(Number(pageIndex)*pageSize)
                            .orderBy('books.id', 'desc');
    // await new Promise((reslove,reject)=>{
    //     setTimeout(() => {
    //         reslove(ctx.response.body = {
    //             code:0,
    //             data:booklist.map(v=>{
    //                 var info = JSON.parse(v.user_info)
    //                 return Object.assign({},v,{
    //                     userInfo:{
    //                         nickName:info.nickName
    //                     }
    //                 });
    //             })
    //         })
    //     }, 2000);
    // })
    // return;
    ctx.response.body = {
        code:0,
        data:booklist.map(v=>{
            var info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                userInfo:{
                    nickName:info.nickName
                }
            });
        })
    };
}
