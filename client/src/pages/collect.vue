<template>
  <div >
      <block v-if="userInfo.openId">
          <div class="title tC">
            我的评论
          </div>
          <scroll-view scroll-y  >
            <div class="pd"  v-if="commentlist.length>0">
              <CommentCard :commentlist='commentlist'></CommentCard> 
            </div>
            <div class="msg tC" v-else>
              暂无
            </div>
          </scroll-view>
          <div class="title tC">
            我的收藏
          </div>
          <scroll-view scroll-y  @scrolltolower='getBooKlist(false)'>
            <div class="pd"  v-if="bookList.length>0">
              <BookCard  v-for="(book,index) in bookList" :key="index" :book="book"></BookCard>
              <div class="tC more" v-if="!more">
                没有更多数据了
              </div>
            </div>  
             <div class="msg tC" v-else>
              暂无
            </div>
          </scroll-view>
      </block>
      <block v-else>
        <div class="flex flex-align-center">
          <button @click="goMe" class="flex-1">去登陆</button>
        </div>
      </block>
  </div>    
</template>

<script>
import { mapState} from 'vuex';
import CommentCard from '@/components/CommentCard';
import BookCard from '@/components/BookCard';
export default {
   components: {
      BookCard,
      CommentCard
  },
  data () {
    return {
      bookList:[],
      pageIndex:0,
      pageSize:3,
      more:true,
      commentlist:[],
    }
  },
   computed:{
      ...mapState('global', [
        'userInfo'
      ])
  },
  methods: {
    goMe(){
      wx.switchTab({
        url: '/pages/me'
      })
    },
    async getBooKlist(init){
      if(init){
        this.bookList=[];
        this.more = true;
        this.pageIndex = 0;
      }
      const res = await this.$iBox.http('getbooklist',{pageIndex:this.pageIndex,pageSize:this.pageSize})();
      this.pageIndex++;
      if(res.data.length<this.pageSize&&this.pageIndex>0){
        this.more = false;
      }
      if(init){
        this.bookList = res.data
      }else{
        this.bookList = this.bookList.concat(res.data);
      }
   },
    async getcommentlist(){
        const res = await this.$iBox.http('getcommentlist',{openId:this.userInfo.openId})();
        this.commentlist = res.data;
    }
  },

  created () {
  },
  onShow(){
    this.getcommentlist();
    this.getBooKlist(true);
  },
  onLoad () {
  }
}
</script>

<style lang="stylus" scoped>
  .flex
    height 100vh
    padding 0 10px
  scroll-view  
    height calc((100vh - 80px) / 2)
    .pd 
      padding 0 10px
      .more
        font-size 12px
        color #cccccc
        padding 10px
    .msg
      background #cccccc
      padding 10px
      font-size 14px
  .title
    font-size 16px
    color #ffffff
    background #409EFF
    height 40px
    line-height 40px
</style>

