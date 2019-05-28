<template>
  <div>
    <Row class="home-back">
      <Col span="14" offset="5" class="header-container">
        <Row class="header-info">
          <Col span="24">
            <div class="text-xs-center">
              <!--头像签名-->
              <v-avatar size="72" color="accent" style="margin-top: 30px">
                <img src="/api/avatar/100.jpg" alt="avatar">
              </v-avatar>
            </div>
            <div class="pf_username">
              <h1 class="username">易拉罐红石榴</h1>
              <p>一句话介绍一下自己吧，让别人更了解你</p>
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
                <Menu theme="light" active-name="1">
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

          <Col span="16">
            <!--右侧边栏-->
            <Row class="right-box-item">
              <div class="fluid">
                <sui-card style="width: 100%;text-align: left">
                  <sui-card-content >
                    <sui-card-header>
                      她的关注
                    </sui-card-header>
                  </sui-card-content>
                  <!--粉丝用户卡片开始-->
                  <sui-card-content >
                  </sui-card-content>
                  <!--粉丝用户卡片结束-->
                </sui-card>
              </div>
            </Row>
            <Row class="page right-box-item" style="margin-top: 10px;margin-bottom: 10px">
              <sui-card class="fluid" style="margin-bottom: 10px;">
                <sui-card-content>
                  <sui-card-description>
                    <!--分页-->
                    <Page :current="2" :total="50" simple />
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
    name: "PageFollow",
    data() {
        return {
            right: null,
            content:'',
            user:{
                nickName:'',
                beFollowedAmount:'',
                followAmount:'',
                weiboAmount:''
            },
            weibo:[]
        }
    },
    methods:{
    },
    components:{
    },
    mounted(){
        this.user.nickName=this.$store.state.user.nickName;
        this.user.beFollowedAmount=this.$store.state.userdata.beFollowedAmount;
        this.user.followAmount=this.$store.state.userdata.followAmount;
        this.user.weiboAmount=this.$store.state.userdata.weiboAmount;
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
  margin-left: 10px;
  margin-top: 10px;
}

</style>
