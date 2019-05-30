<template>
    <div>
        <Row class="home-back">
            <!--首页左侧导航栏-->
            <Col span="2" offset="4">
                <v-list style="background: rgba(208, 230, 255, 0.2);position:fixed;height: 100%;width: 100%">
                    <v-list-tile v-for="item in items" :key="item.title" @click="handleLeftMenuClick(item.name)">
                        <v-list-tile-content>
                            <v-list-tile-title style="font-weight: bold;color: #fff">{{ item.title}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </Col>
            <!--首页主体-->
            <Col span="10" offset="6" v-show="bodyName === 'home'">
                <!--首页中间主体部分-->
                <Row>
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

                <!--首页微博-->
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
                                    <!--父微博-->
                                    <div v-if="item.weiboType">
                                        <sui-card class="weibo-card" v-if="item.fatherWeibo"
                                                  :key="item.fatherWeibo.weiboId" style="background-color: ghostwhite">
                                            <sui-card-content>
                                                <sui-image class="left floated" size="mini" :circular="true"
                                                           :src="item.fatherWeibo.userAvatar"/>
                                                <sui-card-header>{{item.fatherWeibo.nickName}}</sui-card-header>
                                                <sui-card-meta>{{item.fatherWeibo.gmtCreate}}</sui-card-meta>
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
                                                        <sui-icon v-if="item.fatherWeibo.collect" style="color: orange"
                                                                  name="star"
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
                                        <sui-card v-else class="weibo-card" style="background-color: ghostwhite">
                                            <sui-card-content>
                                                <sui-card-description>
                                                    原微博已删除
                                                </sui-card-description>
                                            </sui-card-content>
                                        </sui-card>
                                    </div>
                                </sui-card-description>
                                <sui-image-group size="small">
                                    <sui-image v-for="(fileSrc,index) in JSON.parse(item.fileList)" :src="fileSrc"
                                               :key="index"/>
                                </sui-image-group>
                            </sui-card-content>
                            <sui-card-content extra>
                                <Row>
                                    <Col span="6">
                                        <sui-icon v-if="item.collect==true" style="color: orange" name="star"
                                                  @click="handleUnCollectionClick(item.weiboId)" key="itemcollect"/>
                                        <sui-icon v-else name="star" @click="handleCollectionClick(item.weiboId)"/>
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
                                        <sui-icon v-else name="like" @click="handleLikeClick(item.weiboId)"/>
                                        点赞{{item.likeAmount}}
                                    </Col>

                                </Row>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <!--热门微博-->
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
                                                <!--父微博-->
                                                <sui-card class="weibo-card" v-if="item.fatherWeibo"
                                                          :key="item.fatherWeibo.weiboId"
                                                          style="background-color: ghostwhite">
                                                    <sui-card-content>
                                                        <sui-image class="left floated" size="mini" :circular="true"
                                                                   :src="item.fatherWeibo.userAvatar"/>
                                                        <sui-card-header>{{item.fatherWeibo.nickName}}</sui-card-header>
                                                        <sui-card-meta>{{item.fatherWeibo.gmtCreate}}</sui-card-meta>
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
                                                                <sui-icon v-if="item.fatherWeibo.collect==true"
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
                                            </sui-card-description>
                                        </sui-card-content>
                                        <sui-card-content extra>
                                            <span>
                                                <sui-icon v-if="item.collect==true" style="color: orange" name="star"
                                                          @click="handleUnCollectionClick(item.weiboId)"/>
                                                <sui-icon v-else name="star"
                                                          @click="handleCollectionClick(item.weiboId)"/>
                                                收藏
                                            </span>
                                            <span>
                                                <sui-icon name="like"
                                                          @click="handleRepostClick(item.nickName,item.weiboContent,item.weiboId)"/>转发{{item.forwardingAmount}}
                                            </span>
                                            <span>
                                                <sui-icon name="star" @click="handleCommentClick(item.weiboId)"/> 评论{{item.commentAmount}}
                                            </span>
                                            <span>
                                                <sui-icon v-if="item.isLike" name="like" style="color: red"
                                                          @click="handleUnLikeClick(item.weiboId)"/>
                                                <sui-icon v-else name="like" @click="handleLikeClick(item.weiboId)"/>
                                                点赞{{item.likeAmount}}
                                            </span>
                                        </sui-card-content>
                                    </sui-card>
                                </div>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <!--分页-->
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
                <Row v-else>
                    <sui-card class="fluid" style="margin-bottom: 10px;">
                        <sui-card-content>
                            <sui-card-description>
                                <!--分页-->
                                <Page :current="this.hotpage.currentPage" :page-size="10"
                                      :total="this.hotpage.totalRecord"
                                      simple @on-change="handleHotPageChange"/>
                            </sui-card-description>
                        </sui-card-content>
                    </sui-card>
                </Row>
            </Col>
            <Col span="10" offset="6" v-show="bodyName === 'collection'">
                <!--首页中间主体部分-->
                <Row>
                    <div class="fluid">
                        <sui-card class="weibo-card" style="margin-bottom: 10px;margin-top: 10px;">
                            <sui-card-content>
                                <sui-card-header>
                                    我的收藏
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content extra>
                                <div class="fluid" style="min-height: 560px">
                                    <sui-card v-if="!collectweiboListEmpty" class="weibo-card"
                                              v-for="item in collectWeibo" :key="item.weiboId">
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
                                                    <sui-card class="weibo-card" v-if="item.fatherWeibo"
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
                                    <sui-card v-if="collectweiboListEmpty" class="fluid">
                                        <sui-card-content>
                                            <sui-card-description>
                                                没有收藏的微博
                                            </sui-card-description>
                                        </sui-card-content>
                                    </sui-card>

                                </div>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <Row v-if="!collectweiboListEmpty">
                    <sui-card class="fluid" style="margin-bottom: 10px;">
                        <sui-card-content>
                            <sui-card-description>
                                <!--分页-->
                                <Page :current="this.collectepage.currentPage" :page-size="10"
                                      :total="this.collectepage.totalRecord"
                                      simple @on-change="handleCollectPageChange"/>
                            </sui-card-description>
                        </sui-card-content>
                    </sui-card>
                </Row>
            </Col>
            <Col span="10" offset="6" v-show="bodyName === 'like'">
                <!--首页中间主体部分-->
                <Row>
                    <div class="fluid">
                        <sui-card class="weibo-card" style="margin-bottom: 10px;margin-top: 10px;">
                            <sui-card-content>
                                <sui-card-header>
                                    我的点赞
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content extra>
                                <div class="fluid" style="min-height: 560px">
                                    <sui-card v-if="!likeweiboListEmpty" class="weibo-card" v-for="item in likeWeibo"
                                              :key="item.id">
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
                                                    <sui-card class="weibo-card" v-if="item.fatherWeibo"
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
                                    <sui-card v-if="likeweiboListEmpty" class="fluid">
                                        <sui-card-content>
                                            <sui-card-description>
                                                没有点赞的微博
                                            </sui-card-description>
                                        </sui-card-content>
                                    </sui-card>

                                </div>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <Row v-if="!likeweiboListEmpty">
                    <sui-card class="fluid" style="margin-bottom: 10px;margin-top: 10px">
                        <sui-card-content>
                            <sui-card-description>
                                <!--分页-->
                                <Page :current="this.likepage.currentPage" :page-size="10"
                                      :total="this.likepage.totalRecord"
                                      simple @on-change="handleLikePageChange"/>
                            </sui-card-description>
                        </sui-card-content>
                    </sui-card>
                </Row>
            </Col>
            <Col span="10" offset="6" v-show="bodyName === 'hotWeibo'">
                <!--首页中间主体部分-->
                <Row v-if="!hotweiboListEmpty">
                    <div class="fluid">
                        <sui-card class="weibo-card" style="margin-top: 10px;">
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
                                                    <sui-card class="weibo-card" v-if="item.fatherWeibo"
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
                                </div>
                            </sui-card-content>
                        </sui-card>
                    </div>
                </Row>
                <Row v-if="!hotweiboListEmpty">
                    <sui-card class="fluid" style="margin-bottom: 10px;">
                        <sui-card-content>
                            <sui-card-description>
                                <!--分页-->
                                <Page :current="this.hotpage.currentPage" :page-size="10"
                                      :total="this.hotpage.totalRecord"
                                      simple @on-change="handleHotPageChange"/>
                            </sui-card-description>
                        </sui-card-content>
                    </sui-card>
                </Row>
            </Col>
            <!--首页右侧部分-->
            <Col span="4" style="margin-left: 10px;">
                <Row class="home-left-box">
                    <person-info-card style="background-color: white;"></person-info-card>
                </Row>
                <!--推荐用户滚动窗口-->
                <Row>
                    <Col span="24" class="home-left-box">
                        <sui-card>
                            <sui-card-content>
                                <sui-card-header style="text-align: left">
                                    推荐用户
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content v-if="isRecomUse" v-for="(item,index) in recomUser" :key="index"
                                              style="text-align: left">
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
                            <sui-card-content v-if="!isRecomUse">
                                <!--<sui-card-description style="text-align: left">-->
                                无推荐用户
                                <!--</sui-card-description>-->
                            </sui-card-content>
                        </sui-card>
                    </Col>
                </Row>
                <!--热门用户滑动窗口-->
                <Row>
                    <Col span="24" class="home-left-box">
                        <sui-card>
                            <sui-card-content>
                                <sui-card-header style="text-align: left">
                                    热门用户
                                </sui-card-header>
                            </sui-card-content>
                            <sui-card-content v-if="isHotUse" v-for="(item,index) in hotUser" :key="index"
                                              style="text-align: left">
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
                            <Row v-if="isHotUse">
                                <sui-card class="fluid">
                                    <sui-card-content>
                                        <sui-card-description>
                                            <!--分页-->
                                            <Page :current="this.hotuserepage.currentPage" :page-size="10"
                                                  :total="this.hotuserepage.totalRecord"
                                                  simple @on-change="handleHotUserPageChange"/>
                                        </sui-card-description>
                                    </sui-card-content>
                                </sui-card>
                            </Row>
                            <sui-card-content v-if="!isHotUse">
                                <!--<sui-card-description style="text-align: left">-->
                                无热门用户
                                <!--</sui-card-description>-->
                            </sui-card-content>
                        </sui-card>
                    </Col>
                </Row>
            </Col>

            <Modal v-model="isRepostAvailable" title="转发微博" @on-ok="ok" @on-cancel="cancel">
                <sui-card class="fluid" style="background-color: #EEEEEE">
                    <sui-card-content>
                        <sui-card-description>
                            {{this.repostorg_weibo_content}}
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
            collectWeibo: [],
            likeWeibo: [],
            items: [
                {title: '我的首页', href: '/', name: 'home'},
                {title: '我的收藏', href: '/collection', name: 'collection'},
                {title: '我的点赞', href: '/like', name: 'like'},
                {title: '热门微博', href: '/hotWeibo', name: 'hotWeibo'}
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
            hotUser: [],
            isHotUse: false,
            page: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            hotpage: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            likepage: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            collectepage: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            hotuserepage: {
                currentPage: 1,
                totalPage: 0,
                totalRecord: 0,
            },
            weiboListEmpty: false,
            hotweiboListEmpty: false,
            likeweiboListEmpty: false,
            collectweiboListEmpty: false,
            weibotext: '',
            imgs: [],
            isDisable: true,
            isText: true,
            files: [],
            bodyName: 'home',
            repost_weiboId: '',
            repostorg_weibo_content: '',
            isRepostAvailable: false,
            repostWeiboText: ''
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
            this.$axios.get(`/api/get-hot-weibo?userId=${this.$store.state.user.userId} &pageNum=${this.hotpage.currentPage}`).then(
                response => {
                    let result = response.data;
                    console.log("热门微博", result.data)
                    if (result.success) {
                        this.hotWeibo = result.data.list
                        this.hotpage.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.hotweiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取热门微博失败');
                    }
                }
            )
        },
        handleHotPageChange(pageNum) {
            this.$axios.get('/api/get-hot-weibo?userId=' + this.$store.state.user.userId + '&pageNum=' + pageNum).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.hotWeibo = result.data.list
                        this.hotpage.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.hotweiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取热门微博失败');
                    }
                }
            )
        },

        getLikeWeiboList() {
            this.$axios.get(`/api/get-like-weibo?userId=${this.$store.state.user.userId}&pageNum=${this.likepage.currentPage}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.likeWeibo = result.data.data.list
                        this.likepage.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.likeweiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取点赞微博失败');
                    }
                }
            )
        },
        handleLikePageChange(pageNum) {
            this.$axios.get(`/api/get-like-weibo?userId=${this.$store.state.user.userId}&pageNum=${pageNum}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.likeWeibo = result.data.list
                        this.likepage.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.likeweiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取点赞微博失败');
                    }
                }
            )
        },

        getCollectWeiboList() {
            console.log("getCollectWeiboList");
            this.$axios.get(`/api/get-collection-weibo-1?userId=${this.$store.state.user.userId}&pageNum=${this.collectepage.currentPage}`)
                .then(response => {
                        let result = response.data;
                        console.log("收藏微博", result.data)
                        if (result.success) {
                            this.collectWeibo = result.data.data.list
                            console.log("收藏",this.collectWeibo);
                            this.collectepage.totalRecord = result.data.totalRecord
                            if (result.data.totalRecord == 0) {
                                this.collectweiboListEmpty = true;
                            }
                        } else {
                            this.$Message.error('获取收藏微博失败');
                        }
                    }
                )
                .catch(error => {
                    console.log(error);
                })
        },
        handleCollectPageChange(pageNum) {
            this.$axios.get('/api/get-collectione-weibo?userId=' + this.$store.state.user.userId + '&pageNum=' + pageNum).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        this.collectWeibo = result.data.list
                        this.collectepage.totalRecord = result.data.totalRecord
                        if (result.data.totalRecord == 0) {
                            this.collectweiboListEmpty = true;
                        }
                    } else {
                        this.$Message.error('获取收藏微博失败');
                    }
                }
            )
        },

        getRecomUserList() {
            this.$axios.get('/api/get-recommend-userId?userId=' + this.$store.state.user.userId).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        // console.log(result.data)
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
        getHotUserList() {
            this.$axios.get(`/api/get-hot-user?userId=${this.$store.state.user.userId}&pageNum=${this.hotuserepage.currentPage}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        if (result.data != null) {
                            this.hotUser = result.data.list
                            this.hotuserepage.totalRecord = result.data.totalRecord
                            if (result.data.totalRecord != 0) {
                                this.isHotUse = true;
                            }
                        }
                    } else {
                        this.$Message.error('获取热门用户失败');
                    }
                }
            )
        },
        handleHotUserPageChange(pageNum) {
            this.$axios.get(`/api/get-hot-user?userId=${this.$store.state.user.userId}&pageNum=${pageNum}`).then(
                response => {
                    let result = response.data;
                    if (result.success) {
                        if (result.data != null) {
                            this.hotUser = result.data.list
                            this.hotuserepage.totalRecord = result.data.totalRecord
                            if (result.data.totalRecord != 0) {
                                this.isHotUse = true;
                            }
                        }
                    } else {
                        this.$Message.error('获取热门用户失败');
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
                    this.$router.push('/');
                } else {
                    this.$Message.error('发送微博失败');
                }
            })
        },
        getHomeWeibo() {
            console.log("getHomeWeibo");
            this.$axios.get('/api/get-all-weibo-of-home-page?userId=' + this.$store.state.user.userId + '&pageNum=' + this.page.currentPage).then(
                response => {
                    let result = response.data;
                    console.log(result)
                    if (result.success) {
                        if (result.data.totalRecord == 0) {
                            this.weiboListEmpty = true;
                            this.getHotWeiboList();
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
            console.log(name);

            switch (name) {
                case 'home':
                    this.bodyName = 'home';
                    this.getHomeWeibo();
                    break;
                case 'like':
                    this.bodyName = 'like';
                    this.getLikeWeiboList();
                    break;
                case 'collection':
                    this.bodyName = 'collection';
                    this.getCollectWeiboList();
                    break;
                case 'hotWeibo':
                    this.bodyName = 'hotWeibo';
                    this.getHotWeiboList();
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
                    this.getHotUserList();
                    this.getHomeWeibo()
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
                    this.getHotUserList()
                    this.getHomeWeibo()
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        handleRepostClick(nickName, weiboContent, weiboId) {
            this.repostorg_weibo_content = '@' + nickName + ':' + weiboContent;
            this.repost_weiboId = weiboId
            this.isRepostAvailable = true;
            this.$axios.get('/api/get-weibo-message?weiboId=' + weiboId).then(response => {
                let result = response.data;
                // console.log(result.msg)
                if (result.success) {
                    if (result.msg != '' && result.msg != null) {
                        this.repostWeiboText = result.msg
                    }
                    this.isRepostAvailable = true;
                } else {
                    this.$Message.info('获取原微博内容出错')
                    // this.$Message.info(result.msg)
                }
            })
        },
        ok() {
            //转发微博
            this.$axios.post('/api/forwarding-weibo', {
                weiboId: this.repost_weiboId,
                userId: this.$store.state.user.userId,
                weiboContent: this.repostWeiboText
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.getHomeWeibo()
                } else {
                    this.$Message.info(result.msg)
                }
            })
        },
        cancel() {
            this.$Message.info('取消转发');
        }
    },
    watch: {
        weibotext: function () {
            this.isDisable = this.weibotext === ''
        }
    },
    mounted() {
        this.getHomeWeibo()
        this.getRecomUserList()
        this.getHotUserList()
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
