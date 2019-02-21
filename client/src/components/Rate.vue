<template>
  <div class="Rate">
    <span>☆☆☆☆☆</span>
    <div class="top color" :style="style">
        ★★★★★
    </div>
  </div>
</template>

<script>
export default {
   props:{
      value:{
         type:[Number,String],
         default:'0'
      } 
   },
   computed:{
       style(){
           return `width:${(this.value/2/5*100).toFixed(1)}%`
       }
   }
}
</script>

<style lang="stylus" scoped>
.Rate
    display inline-block
    position relative
    line-height 1
    .top
        position absolute
        top 0
        left 0
        width 0
        overflow hidden
</style>

