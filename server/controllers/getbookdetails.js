//increment 累加 https://knexjs.org/#Builder-increment
//  alter table books add column count init default 0;(mysql 新加字段 count 数字类型 默认值为0)

const {mysql} = require('../qcloud');
module.exports = async (ctx)=>{
    var {id} = ctx.request.query;
    await mysql('books').where('id',id).increment('count', 1);
    var bookdetails = await mysql('books').where('id',id).first();
    var res = await mysql('cSessionInfo').where('open_id',bookdetails.openid).first();
    var info = JSON.parse(res.user_info);
    bookdetails.userInfo={
        nickName:info.nickName,
        avatarUrl:info.avatarUrl
    }
    ctx.response.body = {
        code:0,
        data:bookdetails
    };
}
