<template>
    <a :href="'/pages/BookDetails?id='+book.id" class="book_card flex flex-l flex-align-center">
        <img :src="book.image" class="book_img" :alt="book.title" mode="aspectFit" @click.stop="previewImage(book.image)">
        <div class="flex-1">
            <div>
                <div class="flex mb10">
                    <div class="flex-1 color">{{book.title}}</div>
                    <div>{{book.rate}}  <Rate :value="book.rate"></Rate></div>
                </div>
                <div class="flex mb10">
                    <div class="flex-1 tsm">{{book.author||'未知'}}</div>
                    <div class="flex-1 tR tsm">浏览量:{{book.count}}</div>
                </div>
                <div class="flex">
                    <div class="flex-1 tsm"> {{book.publisher}}</div>
                    <div class="flex-1 tR tsm color"> {{book.userInfo.nickName}}</div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
//https://www.zhihu.com/question/46943112/answer/113583615
import Rate from '@/components/Rate';

export default {
    components: {
        Rate
    },
    methods:{
        previewImage(imgUrl){
           wx.previewImage({
                current: imgUrl, // 当前显示图片的http链接
                urls: [imgUrl] // 需要预览的图片http链接列表
           })
        }
    },
    props: ['book']
}
</script>

<style lang="stylus" scoped>
    .book_card
        border-bottom 1px solid #ddd;
        font-size 16px
        padding 10px
        .book_img
            width 90px
            height 90px
            display block
        .tsm
            font-size 12px    

</style>

