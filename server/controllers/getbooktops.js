const {mysql} = require('../qcloud');
module.exports = async (ctx)=>{
    var tops = await mysql('books').select('title','image','id','count')
                                            .orderBy('count','desc')
                                            .limit(9);
    ctx.response.body = {
        code:0,
        data:tops
    };
}
