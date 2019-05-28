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
                            <p>{{this.user.userPerSignature}}</p>
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

                        <Row class="left-box-item">
                            <div>
                                <sui-card>
                                    <sui-card-content>
                                        <sui-card-header>
                                            相册
                                        </sui-card-header>
                                    </sui-card-content>
                                    <sui-card-content>
                                        图片
                                    </sui-card-content>
                                    <sui-card-content extra>
                                        <sui-button>查看更多</sui-button>
                                    </sui-card-content>
                                </sui-card>
                            </div>
                        </Row>

                        <Row class="left-box-item">
                            <div>
                                <sui-card>
                                    <sui-card-content>
                                        <sui-card-header>
                                            赞
                                        </sui-card-header>
                                    </sui-card-content>
                                    <sui-card-content>
                                        赞的微博
                                    </sui-card-content>
                                    <sui-card-content extra>
                                        <sui-button>查看更多</sui-button>
                                    </sui-card-content>
                                </sui-card>
                            </div>
                        </Row>
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
                                        </sui-card-description>
                                        <sui-image-group size="small">
                                            <sui-image v-for="fileSrc in JSON.parse(item.fileList)" :src="fileSrc"
                                                       :key="fileSrc.index"/>
                                        </sui-image-group>
                                    </sui-card-content>
                                    <sui-card-content extra>
                                        <Row>
                                            <Col span="6">
                                                <sui-icon name="star" @click="handleCollectionClick(item.weiboId)"/>
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
                                                <sui-icon name="like" @click="handleLikeClick(item.weiboId)"/>
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
            isAvaliable:false
        }
    },
    components: {},
    mounted() {
        this.$axios.get(`/api/query-user?userId=${this.userId}`)
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
        this.getHomeWeibo()
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
    methods: {
        handlePageChange(pageNum) {
            this.$axios.get('/api/get-all-weibo-of-home-page?userId=' + this.$store.state.user.userId + '&pageNum=' + pageNum).then(
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
            this.$axios.get(`/api/get-weibo-of-user-home-page?userId=${this.userId}&pageNum=` + this.page.currentPage).then(
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
