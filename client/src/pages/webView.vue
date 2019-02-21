<template>
  <div class="page flex flex-align-center flex-pack-center">
     <web-view :src="url" v-if="url" ></web-view>
     <div v-else>{{msg}}</div>
  </div>

</template>

<script>

export default {
  data () {
    return {
        url:'',
        msg:'加载中...'
    }
  },
  methods: {
  },

  created () {
  },

  onLoad () {
      this.url = this.$root.$mp.query.url;
      if(!this.url){
          this.msg = '加载失败,缺少url'
          wx.setNavigationBarTitle({
            title:'加载失败,缺少url'
          })
      }
  }
}
</script>

<style scoped>
</style>
