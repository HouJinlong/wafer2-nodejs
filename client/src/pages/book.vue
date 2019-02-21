<template>
  <div>
    <TopSwiper :tops="tops" v-if="tops.length>=9"></TopSwiper>
    <BookCard  v-for="(book,index) in bookList" :key="index" :book="book"></BookCard>
    <div class="tC more" v-if="!more">
      没有更多数据了
    </div>
  </div>
</template>

<script>
import BookCard from '@/components/BookCard';
import TopSwiper from '@/components/TopSwiper';

export default {
  components:{
    BookCard,
    TopSwiper
  },
  data () {
    return {
      bookList:[],
      pageIndex:0,
      pageSize:10,
      more:true,
      tops:[]
    }
  },
  methods: {
    async getBooKTops(){
      const res = await this.$iBox.http('getbooktops')();
      this.tops = res.data;
    },
    async getBooKlist(init){
      if(init){
        this.pageIndex = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const res = await this.$iBox.http('getbooklist',{pageIndex:this.pageIndex,pageSize:this.pageSize})();
      this.pageIndex++;
      if(res.data.length<this.pageSize&&this.pageIndex>0){
        this.more = false;
      }
      if(init){
         this.bookList = res.data;
         wx.stopPullDownRefresh();
      }else{
        this.bookList = this.bookList.concat(res.data);
      }
      wx.hideNavigationBarLoading();
    }
  },
  onPullDownRefresh(){
    this.getBooKlist(true);
  },
  onReachBottom(){
    if(!this.more){

    }else{
      this.getBooKlist();
    }
  },
  mounted () {
    this.getBooKlist(true);
    this.getBooKTops();
  },

  onLoad () {
  }
}
</script>

<style lang="stylus" scoped>
.more
  font-size 12px
  color #cccccc
  padding 10px
</style>

