<template>
    <div>
        <Row class="home-back">
            <Col span="2" offset="4">
                <!--首页左侧导航栏-->
                <v-list style="background: rgba(208, 230, 255, 0.2);position:fixed;height: 100%;width: 100%">
                    <v-list-tile v-for="item in items" :key="item.title" @click="handleLeftMenuClick(item.name)">
                        <v-list-tile-content>
                            <v-list-tile-title style="font-weight: bold;color: #fff">{{ item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </Col>
            <Col span="10" offset="6">
                <!--首页中间主体部分-->
                <Row v-if="bodyName=='home'">
                    <v-card style="margin-bottom: 10px;margin-top: 10px;">
                        <v-card-text>
                            <!--发布微博编辑框-->
                            <Col>
                                <Row>
                                    <Input v-model="weibotext" type="textarea" :autosize="{minRows: 5,maxRows: 8}"
                                           placeholder="有什么新鲜事想告诉大家?快来发条微博吧：）"/>
                                </Row>
                                <!--上传图片控件-->
                                <Row>
                                    <Col span="16">
                                        <ImageUploader ref="imageUploader" @images-change="images => imgs = images"/>
                                    </Col>
                                    <Col span="2" offset="2">
                                        <v-btn @click="wbSubmit" color="warning" depressed :disabled="isDisable">发布
                                        </v-btn>
                                    </Col>
                                </Row>
                            </Col>
                        </v-card-text>
                    </v-card>
                </Row>

                <Row v-if="!weiboListEmpty">
                    <div class="fluid">
                        <sui-card class="weibo-card" v-for="item in weibo" :key="item.id">
                            <sui-card-content>
                                <sui-image class="left floated" size="mini" :circular="true"
                                           :src="item.userAvatar"/>
                                <sui-card-header>{{item.nickName}}</sui-card-header>
                                <sui-card-meta>{{item.gmtCreate}}</sui-card-meta>
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
                                    {{item.weiboContent}}
                                </sui-card-description>
                                <sui-image-group size="small">
                                    <sui-image v-for="(fileSrc,index) in JSON.parse(item.fileList)" :src="fileSrc"
                                               :key="index"/>
                                </sui-image-group>
                            </sui-card-content>
                            <sui-card-content extra>
                                <Row>
                                    <Col span="6">
                                        <sui-icon v-if="item.collect==true" style="color: orange" name="star" @click="handleUnCollectionClick(item.weiboId)"/>
                                        <sui-icon v-else name="star" @click="handleCollectionClick(item.weiboId)"/>
                                        收藏
                                    </Col>
                                    <Col span="6">
                                        <sui-icon name="like"/>
                                        转发{{item.forwardingAmount}}
                                    </Col>
                                    <Col span="6">
                                        <sui-icon name="star" @click="handleCommentClick(item.weiboId)"/>
                                        评论{{item.commentAmount}}
                                    </Col>
                                    <Col span="6">
                                        <sui-icon v-if="item.isLike" name="like" style="color: red" @click="handleUnLikeClick(item.weiboId)"/>
                                        <sui-icon v-else name="like" @click="handleLikeClick(item.weiboId)"/>
                                        点赞{{item.likeAmount}}
                                    </Col>

                                </Row>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <Row v-else>
                    <div class="fluid">
                        <sui-card class="weibo-card">
                            <sui-card-content>
                                <sui-card-header>
                                    热门微博
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content extra>
                                <div class="fluid">
                                    <sui-card class="weibo-card" v-for="item in hotWeibo" :key="item.id">
                                        <sui-card-content>
                                            <sui-image class="left floated" size="mini" :circular="true"
                                                       :src="item.userAvatar"/>
                                            <sui-card-header>{{item.nickName}}</sui-card-header>
                                            <sui-card-meta>{{item.gmtCreate}}</sui-card-meta>
                                            <sui-card-description>
                                                {{item.weiboContent}}
                                            </sui-card-description>
                                        </sui-card-content>
                                        <sui-card-content extra>
                                            <span>
                                                <sui-icon name="star" @click="handleCollectionClick(item.weiboId)"/> 收藏
                                            </span>
                                            <span>
                                                <sui-icon name="like"/>转发{{item.forwardingAmount}}
                                            </span>
                                            <span>
                                                <sui-icon name="star"/> 评论{{item.commentAmount}}
                                            </span>
                                            <span>
                                                <sui-icon name="like" @click="handleLikeClick(item.weiboId)"/>点赞{{item.likeAmount}}
                                            </span>
                                        </sui-card-content>
                                    </sui-card>
                                </div>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <Row v-if="!weiboListEmpty">
                    <sui-card class="fluid" style="margin-bottom: 10px;">
                        <sui-card-content>
                            <sui-card-description>
                                <!--分页-->
                                <Page :current="this.page.currentPage" :page-size="10" :total="this.page.totalRecord"
                                      simple @on-change="handlePageChange"/>
                            </sui-card-description>
                        </sui-card-content>
                    </sui-card>
                </Row>
            </Col>

            <Col span="4" style="margin-left: 10px;">
                <!--首页右侧部分-->
                <Row class="home-left-box">
                    <person-info-card style="background-color: white;"></person-info-card>
                </Row>
                <Row>
                    <Col span="24" class="home-left-box">
                        <!--热门用户滚动窗口-->
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
                    <Col span="24" class="home-left-box">
                        <!--热门话题滚动窗口-->
                        <hot-topic></hot-topic>
                    </Col>
                </Row>
            </Col>

        </Row>
    </div>
</template>

<script>
import editor from '../components/WangEditor'
import PersonInfoCard from '../components/PersonInfoCard'
import RecomUser from '../components/RecomUser'
import HotUser from '../components/HotUser'
import HotTopic from '../components/HotTopic'
import ImageUploader from '../components/ImageUploader'

export default {
    name: "Home",
    components: {
        editor,
        // WeiboCard,
        PersonInfoCard,
        RecomUser,
        HotUser,
        HotTopic,
        ImageUploader
    },
    data() {
        return {
            weibo: [],
            hotWeibo: [],
            items: [
                {title: '首页', href: '/', name: 'home'},
                {title: '我的收藏', href: '/collect', name: 'collection'},
                {title: '我的赞', href: '/like', name: 'like'},
                {title: '好友圈', href: '/friendWb', name: 'friendWeibo'}
            ],
            right: null,
            content: '',
            user: {
                nickName: '',
                beFollowedAmount: '',
                followAmount: '',
                weiboAmount: ''
            },
            recomUser: [],
            isRecomUse: false,
            page: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            weiboListEmpty: false,
            weibotext: '',
            imgs: [],
            isDisable: true,
            isText: true,
            files: [],
            bodyName: 'home'
        }
    },
    methods: {
        catchData(value) {
            this.content = value      //在这里接受子组件传过来的参数，赋值给data里的参数
        },
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
        getHotWeiboList() {
            this.$axios.get('/api/get-all-weibo-of-home-page?userId=1' + '&pageNum' + pageNum).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.hotWeibo = result.data.list
                        this.page.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取主页微博失败');
                    }
                }
            )
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
        wbSubmit() {
            if (this.imgs != null) {
                this.isText = true
            } else {
                this.isText = false
            }
            this.$axios.post('/api/add-weibo', {
                userId: this.$store.state.user.userId,
                weiboContent: this.weibotext,
                fileList: JSON.stringify(this.imgs),
                isOnlyText: this.isText
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.success("发送成功");
                    this.weibotext = null;
                    this.imgs = null;
                    // 清楚 ImageUploader 上传列表
                    this.$refs.imageUploader.clearImages();
                    let userdata = this.$store.state.userdata;
                    userdata.weiboAmount = this.$store.state.userdata.weiboAmount + 1
                    this.$store.commit('setUserData', userdata);
                    this.getHomeWeibo();
                } else {
                    this.$Message.error('发送微博失败');
                }
            })
        },
        getHomeWeibo() {
            this.$axios.get('/api/get-all-weibo-of-home-page?userId=' + this.$store.state.user.userId + '&pageNum=' + this.page.currentPage).then(
                response => {
                    let result = response.data;
                    console.log(result)
                    if (result.success) {
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                        } else {
                            this.weibo = result.data.list
                            console.log(this.weibo)
                            this.page.totalPage = result.data.totalPage
                            this.page.totalRecord = result.data.totalRecord
                        }
                    } else {
                        this.$Message.error('获取主页微博失败');
                    }
                }
            )
        },
        handleRecomUserClick(userId) {
            this.$router.push('/personhome/' + userId);
            // console.log(userId);
        },
        getCollectWeibo() {

        },
        getLikeWeibo() {

        },
        getFriendWeibo() {

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
        handleUnCollectionClick(weiboId){
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
                    this.getHomeWeibo()
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
                    this.getHomeWeibo()
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleCommentClick(weiboId) {
            this.$router.push(`/weibodetail/${weiboId}`)
        },
        handleLeftMenuClick(name) {
            switch (name) {
                case 'home':
                    this.bodyName = 'home';
                    break;
                case 'like':
                    this.bodyName = 'like';
                    this.getLikeWeibo();
                    break;
                case 'collection':
                    this.bodyName = 'collection';
                    this.getCollectWeibo();
                    break;
                case 'friendWeibo':
                    this.bodyName = 'friendWeibo';
                    this.getFriendWeibo();
                    break;
            }
        },
        handleFollowClick(userId) {
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
        getIsFollow(userId) {
            let isFollow = false
            this.$axios.post('/api/query-is-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    let followtext = result.msg;
                    console.log(followtext)
                    if (followtext == 'mutualfollow') {
                        isFollow = true
                    }
                    if (followtext == 'follow') {
                        isFollow = true
                    }
                    if (followtext == 'befollowed') {
                        isFollow = false
                    }
                    if (followtext == 'unfollow') {
                        isFollow = false
                    }
                } else {
                    this.$Message.info(result.msg)
                }
            })
            return isFollow
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
        },
    },
    watch: {
        weibotext: function () {
            this.isDisable = this.weibotext === ''
        }
    },
    mounted() {
        this.getHomeWeibo()
        this.getRecomUserList()
        this.user.nickName = this.$store.state.user.nickName;
        this.user.beFollowedAmount = this.$store.state.userdata.beFollowedAmount;
        this.user.followAmount = this.$store.state.userdata.followAmount;
        this.user.weiboAmount = this.$store.state.userdata.weiboAmount;
    }
}
</script>

<style scoped>
.home-back {
    background: url("../assets/home-back.jpg") no-repeat center;
    background-size: cover;
    min-height: 600px;
}

.home-left-box {
    margin-top: 10px
}

.weibo-card {
    text-align: left;
    width: 100% !important;
}
</style>
