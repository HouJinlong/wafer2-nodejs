<template>
  <div class="comment_list">
    <div class="comment_item" v-for="item in commentlist" :key="item.id">
        <div class="flex flex-align-center">
            <div class="flex-1 color"><img class="avatarUrl" :src="item.user_info.avatarUrl" :alt="item.user_info.nickName" mode="widthFix">{{item.user_info.nickName}}</div>
            <div class="color">
                {{item.phone||''}} {{item.location||''}}
            </div>
        </div>
        <div class="comment">{{item.comment}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentlist']
}
</script>
<style lang="stylus" scoped>
    .comment_list
        font-size 14px
        .comment_item
            border-bottom 1px solid #ddd
            .comment
                padding 10px
            .avatarUrl
                width 20px
                height 20px
                border-radius 50%
                vertical-align middle
                margin 5px
                border 1px solid #ddd
</style>

