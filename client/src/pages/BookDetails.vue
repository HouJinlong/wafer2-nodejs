<template>
  <div v-if="details" class="details" >
     <img :src="details.image" :alt="details.title" mode="widthFix" class="banner css3fix PH" @load="bannerLoad" :style="{opacity:isLoad?1:0}">
     <img :src="details.image" :alt="details.title" mode="widthFix" class="banner PA css3fix" :style="{opacity:isLoad?1:0}">
     <div class="bg_box">
        <p class="title mb10">{{details.title}}</p>
        <p class="author mb10">{{details.author||'未知'}}</p>
        <div class="flex-1">
            <div class="flex mb10">
                <div class="flex-1 color"><img class="avatarUrl" :src="details.userInfo.avatarUrl" :alt="details.userInfo.nickName" mode="widthFix">{{details.userInfo.nickName}}</div>
                <div>{{details.rate}}  <Rate :value="details.rate"></Rate></div>
            </div>
            <div class="flex mb10">
                <div class="flex-1">{{details.publisher}}</div>
                <div class="flex-1 tR">{{details.price}}</div>
            </div>
        </div>
     </div>
     <div class="bg_box" v-if="tags.length>0">
        <div class="tag" v-for="(tag,index) in tags" :key="index">{{tag}}</div>
     </div>
     <div class="bg_box summary" >
        {{details.summary}}
     </div>
    <block v-if="userInfo.openId" >
        <div class="bg_box">
            {{isComment}}
            <textarea placeholder="请输入您的评论" placeholder-style="color:#409EFF;" maxlength="100" v-model="comment" />
            <div class="flex flex-l flex-align-center mb10">
                <div class="flex-1 tL">
                    获取型号 : <switch :checked="phone"  @change="getModel" color="#409EFF"/>
                </div>
                <div class="flex-1 tR color">
                    {{phone}}
                </div>
            </div>
            <div class="flex flex-l flex-align-center mb10">
                <div class="flex-1 tL">
                    获取位置 : <switch :checked="location" @change="getLocation" color="#409EFF"/>
                </div>
                <div class="flex-1 tR color">
                    {{location}}
                </div>
            </div>
            <button  :disabled="!comment" @click="addComment">提交评论</button> 
        </div>
        <div class="bg_box" v-if="commentlist.data.length>0">
            <p class="title mb10 tC">最新评论</p>
            <CommentCard :commentlist='commentlist.data'></CommentCard> 
            <a :href="'/pages/CommentList?id='+id" class="color tC more" v-if="commentlist.count>commentlist.limit">查看全部评论</a>
        </div>    
    </block>
    <block v-else>
        <a href="/pages/me" open-type="switchTab" class="bg_box tC color" >
            暂未登陆无法进行评论,点击进行登陆
       </a>
    </block>
     <div class="btn_box">
         <button @click="goMoreInfo(details.alt)">查看更详细信息</button> 
         <button open-type="share">发送给朋友</button> 
         <button @click="goBack">返回列表页</button> 
     </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate';
import CommentCard from '@/components/CommentCard';
import { mapState } from 'vuex';
export default {
   components: {
        Rate,
        CommentCard
    },
  data () {
    return {
        id:'',
        details:null,
        commentlist:{
            data:[],
            count:0,
            limit:3
        },
        isLoad:false,
        comment:'',
        phone:'',
        location:''
    }
  },
  computed:{
      tags:function(){
          if(!this.details){
              return [];
          }else{
               return this.details.tags.split(',').filter(v=>{
                   if(v){
                       return v;
                   }
               });
          }
      },
      ...mapState('global', [
        'userInfo'
      ])
  },
  methods: {
      bannerLoad(){
          setTimeout(()=>{
              this.isLoad = true;
          },500)
      },
      async getBookDetails(){
         wx.showNavigationBarLoading();
          const res = await this.$iBox.http('getbookdetails',{id:this.id})();
          this.details = res.data;
          wx.setNavigationBarTitle({
            title: this.details.title
          })
         wx.hideNavigationBarLoading();
      },
      async getcommentlist(){
          const res = await this.$iBox.http('getcommentlist',{limit:this.commentlist.limit,bookid:this.id})();
          Object.assign(this.commentlist,res.data)
      },
      addComment(){
        this.$iBox.http('addcomment',{
            comment:this.comment,
            phone:this.phone,
            location:this.location,
            bookid:this.id,
            openid:this.userInfo.openId
        })({
            method:'post'
        }).then(res=>{
            this.comment = '';
            this.$iBox.showToast('评论成功');
            this.getcommentlist();
        });
      },
      getModel(e){
          if (!e.target.value) {
                this.phone = '';
                return;
           }
          var {model} =  wx.getSystemInfoSync();
          this.phone = model;
      },
       getLocation(e){
           if (!e.target.value) {
                this.location = '';
                return;
           }
           var ak = 'GcYp5kgC1CW4t6FaZisM1YIwSxkPQhp9';
           let url = 'http://api.map.baidu.com/geocoder/v2/';
            this.$iBox.checkAuthorize('scope.userLocation',()=>{
               wx.getLocation({
                type: 'wgs84',
                success :  (geo) => {
                    wx.request({
                        url,
                        data: {
                            ak,
                            location: `${geo.latitude},${geo.longitude}`,
                            output: 'json'
                        },
                        success: res => {
                            console.log(res)
                            if (res.data.status === 0) {
                                this.location = res.data.result.addressComponent.city
                            } else {
                             this.location = '未知地点'
                            }
                        }
                    })
                }
              })
            });
      },
      goMoreInfo(url){
           wx.navigateTo({
             url: '/pages/webView?url='+url
           })
      },
      goBack(){
          wx.navigateBack({
                delta: 1
          })
      }
  },
   onShareAppMessage(res){
       wx.pageScrollTo({
            scrollTop:  50,
            duration: 100
       });
       if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            path: '/pages/BookDetails?id='+this.id
        }
   },
  mounted () {
      //http://mpvue.com/qa/#page-onload-options
      this.id = this.$root.$mp.query.id;
      this.getBookDetails();
      this.getcommentlist();
  },

  onLoad () {
      //解决闪现问题
      Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style lang="stylus" scoped>
    .details
        .banner
            width 100%
            // filter blur(15px)
            &.PA
                transition all .35s
                position fixed
                top 0
                left 0
            &.PH
                transition all .5s .2s
                visibility hidden
        .bg_box
            background #ffffff
            border-radius 4px
            margin 10px
            padding 10px 
            box-shadow 0px 0px 4px #000   
            opacity .9
            .title
                font-size 20px
                font-weight bold
                color #000
            .tag   
                border 1px solid #409EFF
                display inline-block
                border-radius 3px
                padding 4px
                font-size 14px
                color #333
                margin 4px
            &.summary
                font-size 16px
                text-indent 2em
                color #333
                line-height 20px
            .avatarUrl
                width 20px
                height 20px
                border-radius 50%
                vertical-align middle
                margin 5px
                border 1px solid #ddd
            textarea
                height 80px
                text-text-indent 2em
            .more
                padding 10px    
        .btn_box
            padding 10px
            button 
                margin-bottom 10px




</style>

