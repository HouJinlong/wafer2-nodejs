<template>
  <div class="top_swiper">
    <swiper 
        indicator-dots="true"
        indicator-color="#409EFF"
        indicator-active-color='#000000'
        autoplay="true" 
        interval="6000" 
        duration="1000"
        circular="true">
    <block v-for="(imgs,index) in imgUrl" :key="index">
        <swiper-item>
            <img v-for="(img,i) in imgs" :key="i"
                 :src="img.image" 
                 @click="goBookDetails(img.id)"
                 alt="img.title" mode="aspectFit" class="swiper_img">
        </swiper-item>
    </block>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  computed:{
      imgUrl(){
          return [this.tops.slice(0,3),this.tops.slice(3,6),this.tops.slice(6)];
      }
  },
  methods:{
      goBookDetails(id){
          wx.navigateTo({
             url: '/pages/BookDetails?id='+id
        })
      }
  }
}
</script>
<style lang="stylus" scoped>
swiper
    height 150px
    padding 10px
    border-bottom 1px solid #ddd;
    .swiper_img
        width 33%
        height 100%
</style>

