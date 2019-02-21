<template>
  <div class="page" >
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin"  class="userInfo tC">
       <img class="avatarUrl" :src="userInfo.avatarUrl||'/static/img/unlogin.png'" alt="userInfo.nickName">
       <p class="nickName mt10 mb20">{{userInfo.nickName||'请点击登陆'}}</p>
    </button>
    <YearProgress></YearProgress>  
    <button v-if="userInfo.openId" @click="fnScanCode">添加图书</button> 
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress';
import { mapState,mapActions } from 'vuex';

export default {
  components:{
    YearProgress
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('global', [
      'userInfo'
    ])
  },
  methods: {
    addBook(isbn){
      // async 
      //  const res = await 
     this.$iBox.http('addbook',{
        isbn,
        openid:this.userInfo.openId
      })({
        method:'post'
      }).then(res=>{
        this.$iBox.showModal('添加成功',`${res.data.title} 添加成功`)
      });
    },
    fnScanCode(){
      this.$wx.scanCode().then(res => {
        this.addBook(res.result)
      })
    },
    doLogin: function (e) {
      if(this.userInfo.openId)return;
      var _self = this;
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
         this.$iBox.showLoading('登陆中...');
        this.getGlobalUserInfo(()=>{
              this.$iBox.showToast('登录成功');
        });
      } else {
        //用户按了拒绝按钮
        this.$iBox.showModal('提示','您拒绝了授权，这会影响后续操作,请您设置授权')
      }
    },
    ...mapActions('global', ['getGlobalUserInfo'])
  },

  created () {
  },

  mounted () {
  }
}
</script>

<style scoped lang="stylus">
.page
  padding 30px;
  .userInfo
    background none
    font-size 0
    .avatarUrl
      width 100px
      height 100px
      border-radius 50%
      border 2px solid #409EFF
      box-shadow 2px 2px rgba(0,0,0,.8)
    .nickName
      font-size 18px
      color #333  
</style>
