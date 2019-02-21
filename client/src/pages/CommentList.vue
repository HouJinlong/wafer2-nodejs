<template>
  <div class="box" v-if="commentlist.data.length>0">
      <div class="title tC mb10">共{{commentlist.count}}条</div>
      <CommentCard :commentlist='commentlist.data'></CommentCard> 
  </div>
</template>

<script>
import CommentCard from '@/components/CommentCard';
export default {
  components: {
    CommentCard
  },
  data () {
    return {
      id:'',
      commentlist:{
          data:[],
          count:0
      }
    }
  },
  methods: {
     async getcommentlist(){
          const res = await this.$iBox.http('getcommentlist',{bookid:this.id})();
          Object.assign(this.commentlist,res.data)
      },
  },
  
  created () {
  },

  mounted () {
      //http://mpvue.com/qa/#page-onload-options
      this.id = this.$root.$mp.query.id;
      console.log(this.$root.$mp.query)
      this.getcommentlist();
  },
  onLoad () {
      //解决闪现问题
      Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="stylus" scoped>
.box 
  padding 10px
  .title
    font-size 20px
    font-weight bold
    line-height 30px
    color #000
    border-bottom 5px solid #ddd
</style>

