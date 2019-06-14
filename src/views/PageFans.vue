<template>
  <div>
    <Row class="home-back">
        <Col span="14" offset="5" class="header-container">
          <Row class="header-info">
            <Col span="24">
              <div class="text-xs-center">
                <!--头像签名-->
                <v-avatar size="72" color="accent" style="margin-top: 30px">
                  <img :src="thisUser.userAvatar" alt="avatar">
                </v-avatar>
              </div>
              <div class="pf_username">
                <h1 class="username">{{thisUser.nickName}}</h1>
                <p style="max-width: 777px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis ">{{thisUser.userPerSignature}}</p>
                  <div v-if="thisUser.userId!=$store.state.user.userId">
                      <Button type="warning" v-if="!thisUser.follow" @click="handleFollowClick(thisUser.userId)">未关注</Button>
                      <Button type="success" v-if="thisUser.follow" @click="handleUnFollowClick(thisUser.userId)">已关注</Button>
                  </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col span="24" style="text-align:center">
              <!--头像下面导航-->
              <Menu mode="horizontal" theme="light" class="menusize">
                <Row>
                  <Col span="4" offset="6">
                    <MenuItem name="my-home" class="menusize menuitem">
                      主页
                    </MenuItem>
                  </Col>
                  <Col span="4">
                    <MenuItem name="my-album" class="menusize menuitem">
                      相册
                    </MenuItem>
                  </Col>
                  <Col>
                    <MenuItem name="my-setting" class="menusize menuitem">
                      管理中心
                    </MenuItem>
                  </Col>
                </Row>
              </Menu>
            </Col>
          </Row>

          <Row class="person-body">
            <Col span="8" class="left-box">
              <Row class="left-box-item">
                <div>
                  <Menu theme="light" active-name="fans" @on-select="handleRightMenu">
                    <MenuGroup title="互动信息">
                      <MenuItem name="follow">
                        <Icon type="md-document" />
                        他的关注
                      </MenuItem>
                      <MenuItem name="fans">
                        <Icon type="md-chatbubbles" />
                        他的粉丝
                      </MenuItem>
                    </MenuGroup>
                  </Menu>
                </div>
              </Row>
            </Col>

            <Col span="16" v-if="bodyName==='fans'">
              <!--右侧边栏-->
              <Row class="right-box-item">
                <div class="fluid">
                  <sui-card style="width: 100%;text-align: left">
                    <sui-card-content >
                      <sui-card-header>
                        她的粉丝
                      </sui-card-header>
                    </sui-card-content>
                    <!--关注用户卡片开始-->
                    <sui-card-content >
                      <sui-feed v-for="(item,index) in fansUser" :key="item.userId">
                        <sui-feed-event>
                          <sui-feed-label>
                            <sui-image :src="item.userAvatar" style="height: 40px;width: 40px;"/>
                          </sui-feed-label>
                          <sui-feed-content>
                            {{item.nickName}}
                            <span style="float: right" v-if="item.follow">已关注</span>
                            <span style="float: right" v-if="!item.follow">未关注</span>
                            <Icon style="float: right" v-if="item.follow" size="18" type="md-checkmark"
                                  color="green" @click="handleUnFollowClick(item.userId)" :key="index"/>
                            <Icon v-else style="float: right" size="18" type="md-add" color="red"
                                  @click="handleFollowClick(item.userId)"/>
                          </sui-feed-content>
                        </sui-feed-event>
                      </sui-feed>
                    </sui-card-content>
                    <!--关注用户卡片结束-->
                  </sui-card>
                </div>
              </Row>
              <Row class="page right-box-item" style="margin-top: 10px;margin-bottom: 10px">
                <sui-card class="fluid" style="margin-bottom: 10px;">
                  <sui-card-content>
                    <sui-card-description>
                      <!--分页-->
                      <Page
                            :current="fanspage.currentPage"
                            :total="fanspage.totalRecord"
                            :page-size="5"
                            simple @on-change="handlefansPageChange" />
                    </sui-card-description>
                  </sui-card-content>
                </sui-card>
              </Row>
            </Col>
            <Col span="16" v-if="bodyName=='follow'">
              <!--右侧边栏-->
              <Row class="right-box-item">
                <div class="fluid">
                  <sui-card style="width: 100%;text-align: left">
                    <sui-card-content >
                      <sui-card-header>
                        她的关注
                      </sui-card-header>
                    </sui-card-content>
                    <!--关注用户卡片开始-->
                    <sui-card-content >
                      <sui-feed v-for="(item,index) in followUser" :key="item.userId">
                        <sui-feed-event>
                          <sui-feed-label>
                            <sui-image :src="item.userAvatar" style="height: 40px;width: 40px;" />
                          </sui-feed-label>
                          <sui-feed-content>
                            {{item.nickName}}
                            <span style="float: right" v-if="item.follow">已关注</span>
                            <span style="float: right" v-if="!item.follow">未关注</span>

                            <Icon v-if="item.follow" style="float: right" size="18" type="md-checkmark"
                                  color="green" @click="handleUnFollowClick(item.userId)" :key="index"/>
                            <Icon v-if="!item.follow" style="float: right" size="18" type="md-add" color="red"
                                  @click="handleFollowClick(item.userId)"/>
                          </sui-feed-content>
                        </sui-feed-event>
                      </sui-feed>
                    </sui-card-content>
                    <!--关注用户卡片结束-->
                  </sui-card>
                </div>
              </Row>
              <Row class="page right-box-item" style="margin-top: 10px;margin-bottom: 10px">
                <sui-card class="fluid" style="margin-bottom: 10px;">
                  <sui-card-content>
                    <sui-card-description>
                      <!--分页-->
                      <Page
                            :current="followPage.currentPage"
                            :total="followPage.totalRecord"
                            :page-size="5"
                            simple @on-change="handlefollowPageChange" />
                    </sui-card-description>
                  </sui-card-content>
                </sui-card>
              </Row>
            </Col>
          </Row>
        </Col>

      </Row>
  </div>
</template>

<script>

  export default {
    name: "PageFans",
      props: ['userId'],
    data() {
      return {
        right: null,
        content:'',
          thisUser:{},
          fansUser:[],
          followUser:[],
          bodyName:'fans',
          fanspage: {
              currentPage: 1,
              totalPage: 0,
              totalRecord: 0,
              pageSize: 5
          },
          followPage: {
              currentPage: 1,
              totalPage: 0,
              totalRecord: 0,
              pageSize: 5
          }
      }
    },
    methods:{
        handlefansPageChange(pageNum) {
            this.$axios.get(`/api/query-follow-me?userId=${this.userId}&myUserId=${this.$store.state.user.userId}&pageNum=${pageNum}`)
                .then(
                    response => {
                        let result = response.data;
                        console.log("粉丝",result);
                        if (result.success) {
                            let user = result.data.list
                            this.fansUser = user
                            this.fansUser.totalRecord = result.data.totalRecord
                            console.log(this.fansUser.totalRecord)
                        }
                    }
                )
        },
        handlefollowPageChange(pageNum) {
            this.$axios.get(`/api/query-all-follow?userId=${this.userId}&myUserId=${this.$store.state.user.userId}&pageNum=${pageNum}`)
                .then(
                    response => {
                        let result = response.data;
                        console.log("我的关注",result);
                        if (result.success) {
                            let user = result.data.list
                            this.followUser = user
                            this.followPage.totalRecord = result.data.totalRecord
                        }
                    }
                )
        },
        handleFollowClick(userId) {
            this.$axios.post('/api/add-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("关注成功")
                    this.getFollowUser();
                    this.getFansUser();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleUnFollowClick(userId) {
            this.$axios.post('/api/delete-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消关注成功");
                    this.getFollowUser();
                    this.getFansUser();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleRightMenu(name){
            switch (name) {
                case 'fans':this.bodyName='fans';break;
                case 'follow':this.bodyName='follow';break;
            }
        },
        getFansUser(){
            this.$axios.get(`/api/query-follow-me?userId=${this.userId}&myUserId=${this.$store.state.user.userId}&pageNum=${this.fanspage.currentPage}`)
                .then(
                    response => {
                        let result = response.data;
                        // console.log("粉丝",result);
                        if (result.success) {
                            let user = result.data.list
                            this.fansUser = user
                            this.fanspage.totalRecord = result.data.totalRecord
                            // this.fanspage.currentPage=result.data.
                            console.log(this.fansUser.totalRecord)
                        }
                    }
                )
        },
        getFollowUser(){
            this.$axios.get(`/api/query-all-follow?userId=${this.userId}&myUserId=${this.$store.state.user.userId}&pageNum=${this.followPage.currentPage}`)
                .then(
                    response => {
                        let result = response.data;
                        // console.log("我的关注",result);
                        if (result.success) {
                            let user = result.data.list
                            this.followUser = user
                            this.followPage.totalRecord = result.data.totalRecord
                            console.log(this.followUser.totalRecord)
                        }
                    }
                )
        },
        getThisUserInfo(){
            this.$axios.get(`/api/query-user?userId=${this.userId}&myUserId=${this.$store.state.user.userId}`)
                .then(
                    response => {
                        let result = response.data;
                        // console.log("当前用户",result);
                        if (result.success) {
                            let user = result.data
                            this.thisUser = user
                        }
                    }
                )
        }
    },
    components:{
    },
    mounted(){
        this.getThisUserInfo();
        this.getFollowUser();
        this.getFansUser();
  }
  }
</script>

<style scoped>
  .home-back {
    background: url("../assets/home-back.jpg") no-repeat center;
    background-size: cover;
    min-height: 600px;
  }
  .header-info{
    background: url("../assets/page-person-home-back.jpg") no-repeat center;
    background-size: cover;
    height: 200px;
  }
  .header-container{
    padding-top: 10px;
  }
  .username{
    font-size: 20px;
    display: inline;
  }
  .pf_username{
    margin-top: 6px;
    color: #fff;
    text-align: center;
    text-shadow: 0 0 4px rgba(0,0,0,0.5);
    vertical-align: text-bottom;
  }
  .menusize{
    height:40px !important;
    line-height: 40px !important;
}
.menuitem{
  position:relative !important;
  margin:0 auto!important;
}
strong{
  display: block;
  margin: 2px 0 6px 0;
  font-family: Tahoma;
  font-weight: 400;
}
.left-box-item{
  text-align: left;
  margin-top: 10px;
}
.right-box-item{
  /*margin-left: 10px;*/
  margin-top: 10px;
}

</style>
