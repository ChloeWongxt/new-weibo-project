<template>
    <div>
        <Row class="home-back">
            <Col span="14" offset="5" class="header-container">
                <Row class="header-info">
                    <Col span="24">
                        <div class="text-xs-center">
                            <!--头像签名-->
                            <v-avatar size="72" color="accent" style="margin-top: 30px">
                                <img :src="this.user.userAvatar" alt="avatar">
                            </v-avatar>
                        </div>
                        <div class="pf_username">
                            <h1 class="username">{{this.user.nickName}}</h1>
                            <p style="max-width: 777px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis ">{{this.user.userPerSignature}}</p>
                            <div v-if="!isAvaliable">
                            <Button type="warning" v-if="!user.follow" @click="handleFollowClick(user.userId)">未关注</Button>
                            <Button type="success" v-if="user.follow" @click="handleUnFollowClick(user.userId)">已关注</Button>
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
                                    <MenuItem name="my-setting" class="menusize menuitem" v-if="isAvaliable">
                                        管理中心
                                    </MenuItem>
                                </Col>
                            </Row>
                        </Menu>
                    </Col>
                </Row>

                <Row class="person-body">
                    <Col span="8" class="left-box">
                        <Row class="person-num">
                            <Col span="8" class="list-num S_txt1">
                                <strong class="W_f18">{{this.userdata.followAmount}}</strong>
                                <span class="S_txt2">关注</span>
                            </Col>
                            <Col span="8" class="list-num S_txt1">
                                <div class="middle-border">
                                    <strong class="W_f18">{{this.userdata.beFollowedAmount}}</strong>
                                    <span class="S_txt2">粉丝</span>
                                </div>
                            </Col>
                            <Col span="8" class="list-num S_txt1">
                                <strong class="W_f18">{{this.userdata.weiboAmount}}</strong>
                                <span class="S_txt2">微博数</span>
                            </Col>
                        </Row>

                        <Row class="left-box-item" v-if="comFollowUser">
                            <div>
                                <sui-card style="margin-bottom: 10px">
                                    <sui-card-content>
                                        <sui-card-header>
                                            微关系
                                        </sui-card-header>
                                    </sui-card-content>
                                    <sui-card-content>
                                        共同关注
                                        <br/>
                                        <p v-if="comFollowUserListEmpty" style="margin-top: 10px">没有共同关注的人</p>
                                        <sui-statistics-group :columns="4">
                                        <sui-statistic in-group v-for="item in comFollowUser" :key="item.userId" size="mini">
                                            <sui-statistic-value>
                                                <img :src="item.userAvatar" class="ui circular inline image" style="width: 42px;height: 42px;">
                                            </sui-statistic-value>
                                            <sui-statistic-label style="max-width: 56px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis ">
                                                {{item.nickName}}
                                            </sui-statistic-label>
                                        </sui-statistic>
                                        </sui-statistics-group>
                                        <br/>
                                        <Divider/>
                                        我关注的人也关注他
                                        <br/>
                                        <p v-if="myFollowHerUserListEmpt" style="margin-top: 10px;margin-bottom: 30px">没有我关注也关注他的人</p>
                                        <sui-statistics-group :columns="4">
                                        <sui-statistic in-group v-for="item in myFollowHerUser" size="mini">
                                            <sui-statistic-value>
                                                <img :src="item.userAvatar" class="ui circular inline image" style="width: 42px;height: 42px;">
                                            </sui-statistic-value>
                                            <sui-statistic-label style="max-width: 56px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis ">
                                                {{item.nickName}}
                                            </sui-statistic-label>
                                        </sui-statistic>
                                        </sui-statistics-group>
                                    </sui-card-content>
                                    <sui-card-content extra>
                                        <router-link :to="'/pagefans/'+userId">
                                        <sui-button>查看更多</sui-button>
                                        </router-link>
                                    </sui-card-content>
                                </sui-card>
                            </div>
                        </Row>

                        <!--<Row class="left-box-item" style="margin-bottom: 10px">-->
                            <!--<div>-->
                                <!--<sui-card>-->
                                    <!--<sui-card-content>-->
                                        <!--<sui-card-header>-->
                                            <!--赞-->
                                        <!--</sui-card-header>-->
                                    <!--</sui-card-content>-->
                                    <!--<sui-card-content>-->
                                        <!--赞的微博-->
                                    <!--</sui-card-content>-->
                                    <!--<sui-card-content extra>-->
                                        <!--<sui-button>查看更多</sui-button>-->
                                    <!--</sui-card-content>-->
                                <!--</sui-card>-->
                            <!--</div>-->
                        <!--</Row>-->
                    </Col>

                    <Col span="16">
                        <!--右侧边栏-->
                        <Row class="body-menu-weibo right-box-item" style="margin-bottom: 10px">
                            <Menu mode="horizontal" theme="light" class="menusize">
                                <Row>
                                    <Col span="4">
                                        <MenuItem name="all-weibo-item" class="menusize menuitem">
                                            全部
                                        </MenuItem>
                                    </Col>
                                    <Col span="4">
                                        <MenuItem name="hot-weibo-item" class="menusize menuitem">
                                            热门
                                        </MenuItem>
                                    </Col>
                                    <Col span="4">
                                        <MenuItem name="my-weibo-tag" class="menusize menuitem">
                                            更多
                                        </MenuItem>
                                    </Col>
                                    <Col span="8" offset="4">
                                        <Input search :placeholder="this.noteText" style="padding-right: 4px"/>
                                    </Col>
                                </Row>
                            </Menu>
                        </Row>

                        <Row class="right-box-item">
                            <div class="fluid">
                                <sui-card v-if="!weiboListEmpty" class="weibo-card" v-for="item in weibo" :key="item.id">
                                    <sui-card-content>
                                        <sui-image class="left floated" size="mini" :circular="true"
                                                   :src="item.userAvatar"/>
                                        <sui-card-header>{{item.nickName}}</sui-card-header>
                                        <sui-card-meta>{{item.gmtCreate}}</sui-card-meta>
                                        <sui-card-description>
                                            {{item.weiboContent}}
                                            <div v-if="item.weiboType">
                                                <sui-card class="weibo-card" v-if="item.fatherWeibo"
                                                          :key="item.fatherWeibo.weiboId"
                                                          style="background-color: ghostwhite">
                                                    <sui-card-content>
                                                        <router-link :to="'/personhome/' + item.fatherWeibo.userId">
                                                            <sui-image class="left floated"
                                                                       style="width: 40px;height: 40px;"
                                                                       :circular="true"
                                                                       :src="item.fatherWeibo.userAvatar"/></router-link>
                                                        <sui-card-header>{{item.fatherWeibo.nickName}}
                                                        </sui-card-header>
                                                        <sui-card-meta>{{item.fatherWeibo.gmtCreate}}
                                                        </sui-card-meta>
                                                        <!--<sui-card-meta class="right floated">-->
                                                        <!--<Dropdown>-->
                                                        <!--<a href="javascript:void(0)">-->
                                                        <!--<Icon type="ios-arrow-down"></Icon>-->
                                                        <!--</a>-->
                                                        <!--<DropdownMenu slot="list" on-click="handleDetailOperation">-->
                                                        <!--<DropdownItem v-if="item.userId==$store.state.user.userId" name="edit">编辑</DropdownItem>-->
                                                        <!--<DropdownItem v-if="item.userId==$store.state.user.userId" name="delete">删除</DropdownItem>-->
                                                        <!--<DropdownItem name="detail">详情</DropdownItem>-->
                                                        <!--</DropdownMenu>-->
                                                        <!--</Dropdown>-->
                                                        <!--</sui-card-meta>-->
                                                        <sui-card-description>
                                                            {{item.fatherWeibo.weiboContent}}
                                                        </sui-card-description>
                                                        <sui-image-group size="small">
                                                            <sui-image
                                                                    v-for="(fileSrc,index) in JSON.parse(item.fatherWeibo.fileList)"
                                                                    :src="fileSrc"
                                                                    :key="index"/>
                                                        </sui-image-group>
                                                    </sui-card-content>
                                                    <sui-card-content extra>
                                                        <Row>
                                                            <Col span="6">
                                                                <sui-icon v-if="item.fatherWeibo.collect"
                                                                          style="color: orange" name="star"
                                                                          @click="handleUnCollectionClick(item.fatherWeibo.weiboId)"/>
                                                                <sui-icon v-else name="star"
                                                                          @click="handleCollectionClick(item.weiboId)"/>
                                                                收藏
                                                            </Col>
                                                            <Col span="6">
                                                                <sui-icon name="like"
                                                                          @click="handleRepostClick(item.fatherWeibo.nickName,item.fatherWeibo.weiboContent,item.fatherWeibo.weiboId)"/>
                                                                转发{{item.fatherWeibo.forwardingAmount}}
                                                            </Col>
                                                            <Col span="6">
                                                                <sui-icon name="star"
                                                                          @click="handleCommentClick(item.fatherWeibo.weiboId)"/>
                                                                评论{{item.fatherWeibo.commentAmount}}
                                                            </Col>
                                                            <Col span="6">
                                                                <sui-icon v-if="item.fatherWeibo.isLike" name="like"
                                                                          style="color: red"
                                                                          @click="handleUnLikeClick(item.fatherWeibo.weiboId)"/>
                                                                <sui-icon v-else name="like"
                                                                          @click="handleLikeClick(item.fatherWeibo.weiboId)"/>
                                                                点赞{{item.fatherWeibo.likeAmount}}
                                                            </Col>

                                                        </Row>
                                                    </sui-card-content>
                                                </sui-card>
                                                <sui-card v-else class="weibo-card"
                                                          style="background-color: ghostwhite">
                                                    <sui-card-content>
                                                        <sui-card-description>
                                                            原微博已删除
                                                        </sui-card-description>
                                                    </sui-card-content>
                                                </sui-card>
                                            </div>
                                        </sui-card-description>
                                        <sui-image-group size="small">
                                            <sui-image v-for="fileSrc in JSON.parse(item.fileList)" :src="fileSrc"
                                                       :key="fileSrc.index"/>
                                        </sui-image-group>
                                    </sui-card-content>
                                    <sui-card-content extra>
                                        <Row>
                                            <Col span="6">
                                                <sui-icon v-if="item.collect==true" style="color: orange" name="star"
                                                          @click="handleUnCollectionClick(item.weiboId)" key="itemcollect"/>
                                                <sui-icon v-else name="star" @click="handleCollectionClick(item.weiboId)"/>
                                                <!--<sui-icon name="star" @click="handleCollectionClick(item.weiboId)"/>-->
                                                收藏
                                            </Col>
                                            <Col span="6">
                                                <sui-icon name="like"/>
                                                转发{{item.forwardingAmount}}
                                            </Col>
                                            <Col span="6">
                                                <sui-icon name="star"/>
                                                评论{{item.commentAmount}}
                                            </Col>
                                            <Col span="6">
                                                <sui-icon v-if="item.isLike" name="like" style="color: red"
                                                          @click="handleUnLikeClick(item.weiboId)"/>
                                                <sui-icon v-else name="like" @click="handleLikeClick(item.weiboId)"/>
                                                <!--<sui-icon name="like" @click="handleLikeClick(item.weiboId)"/>-->
                                                点赞{{item.likeAmount}}
                                            </Col>

                                        </Row>
                                    </sui-card-content>
                                </sui-card>
                                <sui-card v-if="weiboListEmpty" class="weibo-card" style="text-align: center;margin-bottom: 10px">
                                    <sui-card-content>
                                        <sui-card-description style="height: 400px;padding-top: 50px">
                                            这里还没有内容
                                        </sui-card-description>

                                    </sui-card-content>
                                </sui-card>
                            </div>
                        </Row>
                        <Row v-if="!weiboListEmpty" class="right-box-item">
                            <sui-card class="fluid" style="margin-bottom: 10px; margin-top: 10px">
                                <sui-card-content>
                                    <sui-card-description>
                                        <!--分页-->
                                        <Page :current="this.page.currentPage" :page-size="10"
                                              :total="this.page.totalRecord"
                                              simple @on-change="handlePageChange"/>
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
    name: "PersonHome",
    props: ['userId'],
    data() {
        return {
            right: null,
            content: '',
            user: {
                userGender:''
            },
            userdata: {},
            weibo: [],
            weiboListEmpty: false,
            page: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            noteText:'搜索微博',
            noteTextOp:{
                she:'搜索她的微博',
                he:'搜索他的微博',
                me:'搜索我的微博',
            },
            isAvaliable:false,
            comFollowUser:[],
            comFollowUserListEmpty:true,
            myFollowHerUser:[],
            myFollowHerUserListEmpt:true,
        }
    },
    components: {},
    mounted() {
        this.getThisUserInfo();
        this.getHomeWeibo();
        this.checkIsUserSelf();
        this.getComFollowAndMyFollowHerUser();
        this.getMyFollowHerUser();
    },
    methods: {
        handleFollowClick(userId) {
            this.$axios.post('/api/add-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("关注成功")
                    this.getThisUserInfo();
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
                    this.$Message.info("取消关注成功")
                    this.getThisUserInfo();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleCollectionClick(weiboId) {
            this.$axios.post('/api/add-collection', {
                userId: this.$store.state.user.userId,
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("收藏成功");
                    this.getHomeWeibo()
                } else {
                    this.$Message.info(result.msg);
                }
            })
        },
        handleUnCollectionClick(weiboId) {
            this.$axios.post('/api/delete-collection', {
                userId: this.$store.state.user.userId,
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消收藏成功");
                    this.getHomeWeibo()
                } else {
                    this.$Message.info(result.msg);
                }
            })
        },
        handleLikeClick(weiboId) {
            this.$axios.post('/api/add-like', {
                userId: this.$store.state.user.userId,
                weiboId: weiboId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("点赞成功")
                    this.getHomeWeibo();
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
                    this.getHomeWeibo();
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleCommentClick(weiboId) {
            this.$router.push(`/weibodetail/${weiboId}`)
        },
        getMyFollowHerUser(){
            this.$axios.get(`/api/get-my-follow-her-user?myUserId=${this.$store.state.user.userId}&userId=${this.userId}&pageNum=1`)
                .then(
                    response => {
                        let result = response.data;
                        console.log(result);
                        if (result.success&&result.data!=null) {
                            let user = result.data.list
                            this.myFollowHerUser = user
                            this.myFollowHerUserListEmpt=false
                        }
                    }
                )
        },
        getComFollowAndMyFollowHerUser(){
            this.$axios.get(`/api/get-common-follow-user?myUserId=${this.$store.state.user.userId}&userId=${this.userId}&pageNum=1`)
                .then(
                    response => {
                        let result = response.data;
                        console.log(result);
                        if (result.success&&result.data!=null) {
                            let user = result.data.list
                            this.comFollowUser = user
                            this.comFollowUserListEmpty=false
                        }
                    }
                )
        },
        checkIsUserSelf(){
            if (this.userId!=this.$store.state.user.userId){
                if(this.user.userGender=='男'){
                    this.noteText=this.noteTextOp.he
                }else {
                    this.noteText=this.noteTextOp.she
                }
            }else {
                this.noteText=this.noteTextOp.me
                this.isAvaliable=true
            }
        },
        getThisUserInfo(){
            this.$axios.get(`/api/query-user?userId=${this.userId}&myUserId=${this.$store.state.user.userId}`)
                .then(
                    response => {
                        let result = response.data;
                        // console.log(result);
                        if (result.success) {
                            let user = result.data
                            this.user = user
                            this.getUserData()
                        }
                    }
                )
        },
        handlePageChange(pageNum) {
            this.$axios.get(`/api/get-weibo-of-user-home-page?userId=${this.userId}&pageNum=${pageNum}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.weibo = result.data.list
                        this.page.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                            this.getHotWeiboList();
                        }
                    } else {
                        this.$Message.error('获取主页微博失败');
                    }
                }
            )
        },
        getHomeWeibo() {
            this.$axios.get(`/api/get-weibo-of-user-home-page?userId=${this.userId}&pageNum=${this.page.currentPage}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                        } else {
                            this.weibo = result.data.list
                            this.page.totalPage = result.data.totalPage
                            this.page.totalRecord = result.data.totalRecord
                        }
                    } else {
                        this.$Message.error('获取主页微博失败');
                    }
                }
            )
        },
        getUserData() {
            this.$axios.get(`/api/get-user-data?userId=${this.userId}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        let userdata = result.data
                        this.userdata = userdata
                    } else {
                        this.$Message.error('获取用户数据失败');
                    }
                }
            )
        }
    }
}
</script>

<style scoped>
.home-back {
    background: url("../assets/home-back.jpg") no-repeat center;
    background-size: cover;
    min-height: 600px;
}

.header-info {
    background: url("../assets/page-person-home-back.jpg") no-repeat center;
    background-size: cover;
    height: 200px;
}

.header-container {
    padding-top: 10px;
}

.username {
    font-size: 20px;
    display: inline;
}

.pf_username {
    margin-top: 6px;
    color: #fff;
    text-align: center;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    vertical-align: text-bottom;
}

.menusize {
    height: 40px !important;
    line-height: 40px !important;
}

.menuitem {
    position: relative !important;
    margin: 0 auto !important;
}

.person-body {
    margin-top: 10px;
}

.person-num {
    background-color: white;
}

.list-num {
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
}

.middle-border {
    border-left: lightgrey 1px solid;
    border-right: lightgray 1px solid;
}

.S_txt1 {
    color: #333;
    text-decoration: none;
}

strong {
    display: block;
    margin: 2px 0 6px 0;
    font-family: Tahoma;
    font-weight: 400;
}

.W_f18 {
    font-size: 18px;
}

.S_txt2 {
    color: #808080;
    text-decoration: none;
}

.left-box-item {
    text-align: left;
    margin-top: 10px;
}

.right-box-item {
    margin-left: 10px;
}

.weibo-card {
    text-align: left;
    width: 100% !important;
    height: 100%!important;
}
</style>
