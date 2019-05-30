<template>
    <div>
        <Row class="home-back">
            <Col span="16" offset="4">
                <!--搜索页面主体-->
                <Row>
                    <!--搜索头部-->
                    <Col span="4">
                        <div class="nv-logo">
                            <a class="box" href="/">
                                <span class="logo"></span>
                            </a>
                        </div>
                    </Col>
                    <Col span="14">
                        <!--<sui-input :value="this.searchKey" placeholder="搜索关键字" class="fluid" style="margin-top: 20px"/>-->
                    </Col>
                    <Col span="2">
                        <!--<Button type="warning" style="margin-top: 20px;width: 100%;margin-left: 10px" class="fluid">搜索-->
                        <!--</Button>-->
                    </Col>
                    <Col span="2" offset="2" style="margin-top: 30px;">

                    </Col>
                </Row>

                <Row style="margin-top: 30px;height:600px">
                    <!--搜索结果-->
                    <Col span="18">
                        <!--搜索微博结果-->
                        <sui-card style="text-align:left;margin-bottom: 10px" class="fluid">
                            <sui-card-content>
                                <sui-card-header style="">
                                    用户搜索结果
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content>
                                <Row v-if="!weiboListEmpty">
                                    <sui-card class="fluid" v-for="item in weibo" :key="item.id">
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
                                                <!--父微博-->
                                                <div v-if="item.weiboType">
                                                    <sui-card class="fluid" v-if="item.fatherWeibo"
                                                              :key="item.fatherWeibo.weiboId"
                                                              style="background-color: ghostwhite">
                                                        <sui-card-content>
                                                            <sui-image class="left floated" size="mini" :circular="true"
                                                                       :src="item.fatherWeibo.userAvatar"/>
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
                                                <sui-image v-for="(fileSrc,index) in JSON.parse(item.fileList)"
                                                           :src="fileSrc"
                                                           :key="index"/>
                                            </sui-image-group>
                                        </sui-card-content>
                                        <sui-card-content extra>
                                            <Row>
                                                <Col span="6">
                                                    <sui-icon v-if="item.collect==true" style="color: orange"
                                                              name="star" @click="handleUnCollectionClick(item.weiboId)"
                                                              key="itemcollect"/>
                                                    <sui-icon v-else name="star"
                                                              @click="handleCollectionClick(item.weiboId)"/>
                                                    收藏
                                                </Col>
                                                <Col span="6">
                                                    <sui-icon name="like"
                                                              @click="handleRepostClick(item.nickName,item.weiboContent,item.weiboId)"/>
                                                    转发{{item.forwardingAmount}}
                                                </Col>
                                                <Col span="6">
                                                    <sui-icon name="star" @click="handleCommentClick(item.weiboId)"/>
                                                    评论{{item.commentAmount}}
                                                </Col>
                                                <Col span="6">
                                                    <sui-icon v-if="item.isLike" name="like" style="color: red"
                                                              @click="handleUnLikeClick(item.weiboId)"/>
                                                    <sui-icon v-else name="like"
                                                              @click="handleLikeClick(item.weiboId)"/>
                                                    点赞{{item.likeAmount}}
                                                </Col>
                                            </Row>
                                        </sui-card-content>
                                    </sui-card>
                                </Row>
                                <Row v-if="!weiboListEmpty">
                                    <sui-card class="fluid" style="margin-bottom: 10px;margin-top: 10px">
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

                                <Row v-if="weiboListEmpty">
                                    <sui-card class="fluid" style="margin-bottom: 10px;">
                                        <sui-card-content>
                                            <sui-card-description>
                                                没有搜索到相关微博
                                            </sui-card-description>
                                        </sui-card-content>
                                    </sui-card>
                                </Row>
                            </sui-card-content>
                        </sui-card>
                    </Col>
                    <Col span="6">
                        <!--搜索用户结果-->
                        <sui-card style="margin-left: 10px;margin-bottom: 10px">
                            <sui-card-content>
                                <sui-card-header style="text-align:left">
                                    用户搜索结果
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content v-if="!userListEmpty"  v-for="(item,index) in searchUser" :key="index" style="text-align: left">
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
                            <Row v-if="!userListEmpty">
                                <sui-card class="fluid">
                                    <sui-card-content>
                                        <sui-card-description>
                                            <!--分页-->
                                            <Page :current="this.userpage.currentPage" :page-size="10"
                                                  :total="this.userpage.totalRecord"
                                                  simple @on-change="handleuserPageChange"/>
                                        </sui-card-description>
                                    </sui-card-content>
                                </sui-card>
                            </Row>
                            <Row v-if="userListEmpty">
                                <sui-card class="fluid">
                                    <sui-card-content>
                                        <sui-card-description>
                                            <!--分页-->
                                            没有搜索到相关用户
                                        </sui-card-description>
                                    </sui-card-content>
                                </sui-card>
                            </Row>
                        </sui-card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>

export default {
    name: "Search",
    props: ['q'],
    data() {
        return {
            weibo: [],
            weiboListEmpty: false,
            page: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            userpage: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            searchKey: '宝',
            searchUser: [],
            userListEmpty: false,
        }
    },
    methods: {
        getSeaarchWeibo(q) {
            // console.log("搜索参数：", q);
            //'/api/get-all-weibo-of-home-page?userId='+this.$store.state.user.userId + '&pageNum' + pageNum
            this.$axios.get(`/api/search-weibo?userId=${this.$store.state.user.userId}&weiboContent=${q}&pageNum=${this.page.currentPage}`).then(
                response => {
                    let result = response.data;
                    // console.log(result)
                    if (result.success) {
                        // console.log(result.data.list)
                        this.weibo = result.data.list
                        this.page.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取搜索微博失败');
                    }
                }
            )
        },
        handlePageChange(pageNum) {
            this.$axios.get(`/api/search-weibo?userId=${this.$store.state.user.userId}&weiboContent=${this.q}&pageNum=${pageNum}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.weibo = result.data.list
                        this.page.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                            // this.getHotWeiboList();
                        }
                    } else {
                        this.$Message.error('获取主页微博失败');
                    }
                }
            )
        },
        handleuserPageChange(pageNum) {
            this.$axios.get('/api/search-user?userId=' + this.$store.state.user.userId + '&userName=' + this.searchKey + '&pageNum=' + pageNum).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        console.log(result.data)
                        if (result.data != null) {
                            this.searchUser = result.data.list
                            this.userpage.totalRecord = result.data.totalRecord
                            if (result.data.totalRecord == 0) {
                                this.userListEmpty = true;
                            }
                        }
                    } else {
                        this.$Message.error('获取推荐用户失败');
                    }
                }
            )
        }, handleRecomUserClick(userId) {
            this.$router.push('/personhome/' + userId);
            // console.log(userId);
        }, handleUnFollowClick(userId) {
            this.$axios.post('/api/delete-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("取消关注成功")
                    this.getSearchUserList()
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleFollowClick(userId) {
            this.$axios.post('/api/add-follow', {
                followUserId: this.$store.state.user.userId,
                beFollowedUserId: userId
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("关注成功")
                    this.getSearchUserList()
                } else {
                    this.$Message.info(result.msg)
                }
            })
        }, getSearchUserList(q) {
            this.$axios.get('/api/search-user?userId=' + this.$store.state.user.userId + '&userName=' + q + '&pageNum=' + this.page.currentPage).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        console.log(result.data)
                        if (result.data != null) {
                            this.searchUser = result.data.list
                            this.userpage.totalRecord = result.data.totalRecord
                            if (result.data.totalRecord == 0) {
                                this.userListEmpty = true;
                            }
                        }
                    } else {
                        this.$Message.error('获取推荐用户失败');
                    }
                }
            )
        },
    },
    components: {},
    mounted() {
        this.searchKey=this.q
        this.getSeaarchWeibo(this.q);
        this.getSearchUserList(this.q);
    },
    watch: {
        searchKey(value) {
            this.getSeaarchWeibo(value)
            this.getSearchUserList(value)
        },
        q(value) {
            this.getSeaarchWeibo(value)
            this.getSearchUserList(value)
        }
    }
}
</script>

<style scoped>
.home-back {
    background-color: ghostwhite;
    min-height: 600px;
}

.nv-logo .box .logo {
    display: block;
    margin-left: 10px;
    margin-top: 20px;
    width: 116px;
    height: 30px;
    cursor: pointer;
    background: url("../assets/wb-search.png") no-repeat 0 40%;
    background-size: 80%;
}
</style>
