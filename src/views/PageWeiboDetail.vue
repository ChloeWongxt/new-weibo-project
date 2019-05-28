<template>
  <div>
    <Row class="home-back">
      <Col span="11" offset="4" style="margin-top: 10px">
        <!--微博正文-->
        <div class="fluid">
          <sui-card class="weibo-card">
            <sui-card-content>
              <sui-image class="left floated" size="mini" circular
                         :src="weibo.userAvatar"/>
              <sui-card-header>{{weibo.nickName}}</sui-card-header>
              <sui-card-meta>{{weibo.gmtCreate}}</sui-card-meta>
              <sui-card-meta class="right floated">
                  <!-- 事件绑定是@，不是: -->
                <Dropdown v-if="weibo.userId==$store.state.user.userId" @on-click="handleDetailOperation">
                <!--<Dropdown v-if="weibo.userId==$store.state.user.userId" @on-click="getWeiboDelete">-->
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list" >
                    <DropdownItem name="edit">编辑</DropdownItem>
                    <DropdownItem name="delete">删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </sui-card-meta>
              <sui-card-description>
                {{weibo.weiboContent}}
              </sui-card-description>
              <sui-image-group size="small">
                <sui-image v-for="(fileSrc,index) in JSON.parse(weibo.fileList)" :src="fileSrc" :key="index"/>
              </sui-image-group>
            </sui-card-content>
            <sui-card-content extra>
              <Row>
                <Col span="6">
                  <sui-icon v-if="weibo.collect==true" style="color: orange" name="star" @click="handleUnCollectionClick(weibo.weiboId)"/>
                  <sui-icon v-else name="star" @click="handleCollectionClick(weibo.weiboId)"/>
                  收藏
                </Col>
                <Col span="6">
                  <sui-icon name="like" @click="handleRepostClick"/>转发{{weibo.forwardingAmount}}
                </Col>
                <Col span="6">
                  <sui-icon name="star"/> 评论{{weibo.commentAmount}}
                </Col>
                <Col span="6">
                  <sui-icon v-if="weibo.isLike" name="like" style="color: red" @click="handleUnLikeClick(weibo.weiboId)"/>
                  <sui-icon v-else name="like" @click="handleLikeClick(weibo.weiboId)"/>
                  点赞{{weibo.likeAmount}}
                </Col>
              </Row>
            </sui-card-content>
            <!--添加评论组件-->
            <sui-card-content extra>
              <sui-input
                      @keydown.enter="handleAddCom"
                      placeholder="快来说说你的想法吧"
                      icon="pencil alternate icon"
                      icon-position="right"
                      transparent
                      class="fluid"
                      v-model="comText"
              />
            </sui-card-content>
          </sui-card>
        </div>
        <!--微博正文结束-->
          <sui-card class="fluid" style="padding: 10px;background-color: white;margin-bottom: 10px;margin-top: 10px;text-align: left">
            <sui-card-content>
              <sui-card-header>
                评论详情
              </sui-card-header>
            </sui-card-content>

            <sui-card-content>
              <!--有评论时显示评论-->
              <sui-comment-group style="text-align: left" v-if="isComment">
                <sui-comment v-for="com in this.comment">
                  <sui-comment-avatar :src="com.userAvatar" />
                  <sui-comment-content>
                    <a is="sui-comment-author">{{com.nickName}}</a>
                    <sui-comment-metadata>
                      <div>{{com.gmtCreate}}</div>
                    </sui-comment-metadata>
                    <sui-comment-text>
                      <p>{{com.comContent}}</p>
                    </sui-comment-text>
                    <sui-comment-actions>
                      <sui-comment-action>Reply</sui-comment-action>
                    </sui-comment-actions>
                  </sui-comment-content>

                  <!--<sui-comment-group>-->
                  <!--<sui-comment>-->
                  <!--<sui-comment-avatar :src="this.$store.state.user.userAvatar" />-->
                  <!--<sui-comment-content>-->
                  <!--<a is="sui-comment-author">Jenny Hess</a>-->
                  <!--<sui-comment-metadata>-->
                  <!--<div>Just now</div>-->
                  <!--</sui-comment-metadata>-->
                  <!--<sui-comment-text>-->
                  <!--Elliot you are always so right :)-->
                  <!--</sui-comment-text>-->
                  <!--<sui-comment-actions>-->
                  <!--<sui-comment-action>Reply</sui-comment-action>-->
                  <!--</sui-comment-actions>-->
                  <!--</sui-comment-content>-->
                  <!--</sui-comment>-->
                  <!--</sui-comment-group>-->

                </sui-comment>

              </sui-comment-group>

              <!--没有评论时显示-->
              <sui-card-description v-else>
                还没有人评论，赶快抢个沙发
              </sui-card-description>
            </sui-card-content>
          </sui-card>
        <!--<Comment ></Comment>-->
      </Col>

      <Col span="5" style="margin-left: 10px;">
        <Row>
          <Col span="24" style="margin-top: 10px">
            <!--推荐用户滚动窗口-->
            <sui-card>
              <sui-card-content>
                <sui-card-header style="text-align: left">
                  推荐用户
                </sui-card-header>
              </sui-card-content>
              <sui-card-content v-for="(item,index) in recomUser" :key="index" style="text-align: left">
                <sui-image
                        :src="item.userAvatar"
                        shape="circular"
                        size="mini"
                />
                <span style="margin-left: 10px" @click="handleRecomUserClick(item.userId)">{{item.nickName}}</span>
                <span slot="right">
                    <Icon v-if="item.follow" size="18" type="md-checkmark"
                          color="green" @click="handleUnFollowClick(item.userId)" :key="index"/>
                    <Icon v-else size="18" type="md-add" color="red"
                          @click="handleFollowClick(item.userId)"/>

                </span>
              </sui-card-content>
            </sui-card>
          </Col>
        </Row>
        <Row>
          <Col span="24" style="margin-top: 10px;margin-bottom: 10px">
            <!--热门用户滚动窗口-->
            <hot-user></hot-user>
          </Col>
        </Row>
        <!--<Row>-->
        <!--<Col span="24" style="margin-top: 10px">-->
        <!--&lt;!&ndash;热门话题滚动窗口&ndash;&gt;-->
        <!--<hot-topic></hot-topic>-->
        <!--</Col>-->
        <!--</Row>-->
      </Col>

      <Modal v-model="isEditAvailable" title="编辑微博" @on-ok="ok1" @on-cancel="cancel1">
        <Input v-model="editWeiboText" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
               placeholder="Enter something..."/>
      </Modal>

        <Modal v-model="isRepostAvailable" title="转发微博" @on-ok="ok2" @on-cancel="cancel2">
            <sui-card class="fluid" style="background-color: #EEEEEE">
                <sui-card-content>
                    <sui-card-description>
                        @{{weibo.nickName}}:{{weibo.weiboContent}}
                    </sui-card-description>
                </sui-card-content>
            </sui-card>
            <Input v-model="repostWeiboText" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                   placeholder="说说你的看法吧..."/>
        </Modal>

    </Row>
  </div>
</template>

<script>
  import Card from '../components/Card'
  import Comment from '../components/Comment'
  import PersonInfoCard from '../components/PersonInfoCard'
  import RecomUser from '../components/RecomUser'
  import HotUser from '../components/HotUser'
  import HotTopic from '../components/HotTopic'

  export default {
    name: "WeiboDetail",
      props:['weiboId'],
    data() {
      return {
        right: null,
        content:'',
          user:{
          },
          weibo:{
              userAvatar:"",
              fileList: "[]",
          },
          recomUser:[],
          comment:[],
          isComment:false,
          comText:'',
          isEditAvailable:false,
          isRepostAvailable:false,
          repostWeiboText:'',
          editWeiboText:''
      }
    },
    methods:{
        getWeiboDetail(){
            this.$axios.get('/api/get-one-weibo?userId='+this.$store.state.user.userId+'&weiboId='+this.weiboId).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.weibo = result.data;
                        this.editWeiboText=this.weibo.weiboContent;
                        // this.repostWeiboText=this.weibo.weiboContent
                        // console.log(result.data)
                    } else {
                        this.$Message.error('获取微博详情失败');
                    }
                })
        },
        getWeiboComment(){
            this.$axios.get(`/api/get-comment?weiboId=${this.weiboId}`).then(
                response => {
                    let result = response.data;
                    console.log(result)
                    if (result.success) {
                        this.comment = result.data;
                        if (this.comment!=null){
                            this.isComment=true;
                        }
                        // this.$Message.info("获取微博评论成功");
                    } else {
                        this.$Message.error('获取该微博评论失败');
                    }
                })
        },
        handleCollectionClick(weiboId){
            this.$axios.post('/api/add-collection',{
                userId:this.$store.state.user.userId,
                weiboId:weiboId
            }).then(response =>{
                let result = response.data;
                if (result.success) {
                    this.$Message.info("收藏成功");
                    this.getWeiboDetail();
                }else {
                    this.$Message.info(result.msg);
                }
            })
        },
        handleUnCollectionClick(weiboId){
            this.$axios.post('/api/delete-collection', {
                userId: this.$store.state.user.userId,
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消收藏成功");
                    this.getWeiboDetail();
                } else {
                    this.$Message.info(result.msg);
                }
            })
        },
        handleLikeClick(weiboId){
            this.$axios.post('/api/add-like',{
                userId:this.$store.state.user.userId,
                weiboId:weiboId
            }).then(response =>{
                let result = response.data;
                if (result.success) {
                    this.$Message.info("点赞成功");
                    this.getWeiboDetail();
                }else {
                    this.$Message.info(result.msg);
                }
            })
        },
        handleRepostClick(){
            this.$axios.get('/api/get-weibo-message',{
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {

                    this.isRepostAvailable=true;
                    this.$Message.info("取消点赞成功")
                    this.getWeiboDetail();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleUnLikeClick(weiboId) {
            this.$axios.post('/api/delete-like', {
                userId: this.$store.state.user.userId,
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消点赞成功")
                    this.getWeiboDetail();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleAddCom(){
            if (this.comText!=''&&this.comText!=null){
                //当评论不为空时，才添加评论
                this.$axios.post('/api/add-comment',{
                    userId:this.$store.state.user.userId,
                    weiboId:this.weiboId,
                    comContent:this.comText
                }).then(response =>{
                    let result = response.data;
                    if (result.success) {
                        this.$Message.info("添加评论成功");
                        this.comText=''
                        this.getWeiboDetail()
                        this.getWeiboComment()
                    }else {
                        this.$Message.info(result.msg);
                    }
                })
            }else {
                this.$Message.info("评论输入框不能为空");
            }
        },
        getRecomUserList() {
            this.$axios.get('/api/get-recommend-userId?userId=' + this.$store.state.user.userId).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        console.log(result.data)
                        if (result.data != null) {
                            this.recomUser = result.data
                            this.isRecomUse = true
                        }
                    } else {
                        this.$Message.error('获取推荐用户失败');
                    }
                }
            )
        },
        handleRecomUserClick(userId) {
            this.$router.push('/personhome/' + userId);
            // console.log(userId);
        },
        handleUnFollowClick(userId) {
            this.$axios.post('/api/delete-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消关注成功")
                    this.getRecomUserList();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },handleFollowClick(userId) {
            this.$axios.post('/api/add-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("关注成功")
                    this.getRecomUserList();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleDetailOperation(name){
            // this.$Message.info(name);
            switch (name) {
                case 'edit':this.isEditAvailable=true;;break;
                case 'delete':this.getWeiboDelete();break;
            }
        },
        getWeiboDelete(){
            this.$Message.info("删除操作")
            this.$axios.post('/api/delete-weibo?weiboId='+this.weiboId).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("删除成功")
                    //跳转回主页
                    this.$router.push('/')
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        ok1() {
            //编辑微博
            // this.$axios.post('/api/update-weibo', {
            //     followUserId: this.$store.state.user.userId,
            //     beFollowedUserId: userId
            // }).then(response => {
            //     let result = response.data;
            //     if (result.success) {
            //         this.$Message.info("关注成功")
            //         this.getRecomUserList();
            //     } else {
            //         this.$Message.info(result.msg)
            //     }
            // })
            // update-weibo
            this.$Message.info('编辑微博成功');
        },
        cancel1() {
            this.$Message.info('取消编辑');
        },
        ok2() {
            //转发微博
            // this.$axios.post('/api/update-weibo', {
            //     followUserId: this.$store.state.user.userId,
            //     beFollowedUserId: userId
            // }).then(response => {
            //     let result = response.data;
            //     if (result.success) {
            //         this.$Message.info("关注成功")
            //         this.getRecomUserList();
            //     } else {
            //         this.$Message.info(result.msg)
            //     }
            // })
            // update-weibo
            this.$Message.info('转发微博成功');
        },
        cancel2() {
            this.$Message.info('取消转发');
        }
    },
    components:{
        Card,
        Comment,
        PersonInfoCard,
        RecomUser,
        HotTopic,
        HotUser
    },
    mounted(){
        this.getWeiboDetail();
        this.getWeiboComment();
        this.getRecomUserList()
          this.user.nickName=this.$store.state.user.nickName;
          this.user.beFollowedAmount=this.$store.state.userdata.beFollowedAmount;
          this.user.followAmount=this.$store.state.userdata.followAmount;
          this.user.weiboAmount=this.$store.state.userdata.weiboAmount;
    }
  }
</script>

<style scoped>
  .home-back {
    background: url("../assets/home-back.jpg") no-repeat center;
    background-size: cover;
    min-height: 600px;
  }
  .weibo-card {
    text-align: left;
    width: 100% !important;
  }

</style>
