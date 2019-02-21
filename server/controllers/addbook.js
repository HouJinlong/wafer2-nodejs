var https = require("https");
const {mysql} = require('../qcloud');
// 新增图书
// 1. 获取豆瓣信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 2. 入库

module.exports = async (ctx)=>{
    const {isbn,openid} = ctx.request.body
    console.log('添加图书',isbn,openid)
    if(isbn &&openid){
        const findRes = await mysql('books').select().where('isbn',isbn)
        if(findRes.length){
            ctx.response.body = {
                code:-1,
                error:'图书已存在'
            };
             return; 
        }
        let url = 'https://api.douban.com/v2/book/isbn/'+isbn;
        const bookinfo = await getJSON(url);
        
        const rate = bookinfo.rating.average;
        const { title, image, alt, publisher, summary ,price} = bookinfo;
        const tags = bookinfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',');
        try{
            await mysql('books').insert({
                isbn,openid,rate,title, image, alt, publisher, summary ,price,tags,author
            })
            ctx.response.body = {
                code:0,
                data:{
                    title
                }
            };
        }catch(e){
            ctx.response.body = {
                code:-1,
                error:'新增失败:'+e.sqlMessage
            };
        }
    }   
}

function getJSON(url){
    return new Promise((reslove,reject)=>{
        https.get(url,(res)=>{
            let urlData = ''
            res.on('data', data=>{
                urlData += data
            })
            res.on('end', data=>{
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    reslove(bookinfo)
                }else{
                    reject(bookinfo)
                }
            })
        })
    });
}