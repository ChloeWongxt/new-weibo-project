<template>
    <div class="fluid">
        <sui-card class="weibocard" v-for="item in weibo" :key="item.id">
            <sui-card-content >
                <!--<img v-if="item.file" :src="'/api/avatar/'+ item.file">-->
                <sui-image class="left floated" size="mini" :circular="true" :src="'/api/avatar/'+ item.userAvatar"/>
                <sui-card-header>{{item.nickName}}</sui-card-header>
                <sui-card-meta>{{item.gmtCreate}}</sui-card-meta>
                <sui-card-description>
                    {{item.weiboContent}}
                </sui-card-description>
            </sui-card-content>
            <sui-card-content extra>
                <span>
                  <sui-icon name="star"/> 收藏
                </span>
                <span>
                    <sui-icon name="like"/>转发{{item.forwardingAmount}}
                </span>
                <span>
                  <sui-icon name="star"/> 评论{{item.commentAmount}}
                </span>
                <span>
                    <sui-icon name="like"/>点赞{{item.likeAmount}}
                </span>

            </sui-card-content>
        </sui-card>
    </div>
</template>

<script>
export default {
    name:'HomeCard',
    data:() => ({
      weibo:[]
    }),
    mounted(){
        this.$axios.get('/api/get-all-weibo-of-home-page?userId='+this.$store.state.user.userId+'&pageNum=1').then(
            response =>{
                let result=response.data;
                if (result.success){
                    this.weibo=result.data.list
                }else {
                    this.$Message.error('获取主页微博失败');
                }
            }
        )
    }
}
</script>

<style>
.weibocard{
    text-align: left;
    width: 100% !important;
}
</style>
