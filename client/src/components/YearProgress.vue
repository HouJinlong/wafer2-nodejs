<template>
  <div class="YearProgress tC mb20">
    <progress :percent="percent" color="#409EFF" class="mb10" active="true" />
    {{year}}年已经过去{{days}}天了,{{percent}}%
  </div>
</template>

<script>
export default {
    methods:{
        isLeapYear(year){
            if(this.year%400===0){
                return true;
            }else if(this.year%4===0&&this.year%100!==0){
                return true;
            }else{
                return false;
            }
        },
        getDayOfYear(){
            return this.isLeapYear()?366:365;
        }
    },
    computed:{
        year(){
            return new Date().getFullYear();
        },
        days(){
            var start = new Date();
            start.setMonth(0);
            start.setDate(1);
            let time = new Date().getTime() - start.getTime();
            return parseInt(time/1000/60/60/24)+1;
        },
        percent(){
            return (this.days*100/this.getDayOfYear()).toFixed(1)
        }
    }
}
</script>

<style>
</style>
