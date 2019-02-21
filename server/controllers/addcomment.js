const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    const {comment,phone,bookid,location,openid} = ctx.request.body;
    try{
       var res =  await mysql('comment').insert({
            openid,bookid,comment,phone,location
        })
        ctx.response.body = {
            code:0,
            data:{
                id:res[0],
                comment,phone,bookid,location,openid,res
            }
        };
    }catch(e){
        ctx.response.body = {
            code:-1,
            error:'新增失败:'+e.sqlMessage
        };
    }
}