const {mysql} = require('../qcloud');

module.exports = async (ctx)=>{
    var {limit,bookid,openId} = ctx.request.query;
   
    var select = mysql('comment').select('comment.*','cSessionInfo.user_info').join('cSessionInfo','comment.openid','cSessionInfo.open_id');
    var select1 =  mysql('comment').select(mysql.raw('count(*) as count')).join('cSessionInfo','comment.openid','cSessionInfo.open_id');
    if(openId){
        var list = await select.where('openid',openId)
        ctx.response.body = {
            code:0,
            data:list.map(v=>{
                    var info = JSON.parse(v.user_info)
                    return Object.assign({},v,{
                        user_info:{
                            nickName:info.nickName,
                            avatarUrl:info.avatarUrl
                        }
                    });
                })
        };
        return;
    }
    if(bookid){
        select = select.where('bookid',bookid)
        select1 = select1.where('bookid',bookid)
    }
    if(limit){
        select = select.limit(limit);
    }  
    var {count} = await select1.first();
    if(count==0){
        ctx.response.body = {
            code:0,
            data:{
                data:[],
                count:0
            }
        };
    }else{
        var list = await select.orderBy('id','desc')
        ctx.response.body = {
            code:0,
            data:{
                data:list.map(v=>{
                    var info = JSON.parse(v.user_info)
                    return Object.assign({},v,{
                        user_info:{
                            nickName:info.nickName,
                            avatarUrl:info.avatarUrl
                        }
                    });
                }),
                count:count
            }
        };
    }
}