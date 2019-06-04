<template>
  <div>
    <Row class="home-back">
      <Col span="3" offset="5" style="margin-top: 10px">
        <!--设置主体左侧菜单-->
        <Menu theme="light" active-name="1" style="height: 600px;width:100%;text-align: left" @on-select="handleLeftMenu">
          <MenuGroup title="用户管理">
            <MenuItem name="my-info">
              <Icon type="md-document" />
              我的信息
            </MenuItem>
            <MenuItem name="my-avatar">
              <Icon type="md-chatbubbles" />
              我的头像
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Col>
      <Col span="11" style="margin-bottom: 10px">
        <Card v-if="myInfo" dis-hover style="text-align:left;margin-top: 10px;margin-left: 10px;min-height: 600px">
          <p slot="title" >我的信息</p>
          <Collapse v-model="value2" accordion>
            <Panel name="password" hide-arrow class="pandle-item">
              昵称名：{{$store.state.user.nickName}} <span style="float: right;margin-right: 10px">修改密码</span>
              <div slot="content" class="pandle-item">
                <div style="margin: 10px 0">
                  原密码：<sui-input type="password" placeholder="请输入原密码" icon="search" />
                </div>

                <br/>
                <div>
                  新密码：<sui-input type="password" placeholder="请输入新密码" icon="search" />
                </div>

                <br/>
                <Button type="warning">确认修改</Button>
              </div>
            </Panel>
            <Panel name="phoneNum" hide-arrow class="pandle-item">
              手机号 <span style="float: right;margin-right: 10px">查看</span>
              <p slot="content">
                手机号：1234214321
              </p>
            </Panel>
            <Panel name="nickName" hide-arrow class="pandle-item">
              登录名 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                登录名：{{$store.state.user.logName}}
              </p>
            </Panel>
            <Panel name="personInfo" hide-arrow class="pandle-item">
              个人资料 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                <person-info-form></person-info-form>
              </p>
            </Panel>
            <Panel name="education" hide-arrow class="pandle-item">
              教育信息 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                2015-2019 中北大学大数据学院
              </p>
            </Panel>
            <Panel name="carr" hide-arrow class="pandle-item">
              职业信息 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                学生
              </p>
            </Panel>
            <Panel name="7" hide-arrow class="pandle-item">
              个人标签 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                <Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">
                  标签{{ item + 1 }}
                </Tag>
                <Input v-model="value3" size="small" placeholder="标签名" style="width: 68.02px;margin-right: 4px" />
                <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
              </p>
            </Panel>
            <Panel name="8" hide-arrow class="pandle-item">
              收货地址 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                四川省成都市
              </p>
            </Panel>
            <Panel name="9" hide-arrow class="pandle-item">
              个性域名 <span style="float: right;margin-right: 10px">编辑</span>
              <p slot="content">
                https://www.weibo.com
              </p>
            </Panel>
          </Collapse>
        </Card>

        <Card v-else dis-hover style="text-align:left;margin-top: 10px;margin-left: 10px;min-height: 600px">
          <p slot="title" >我的头像</p>
          <Col>
            <Row>
              <sui-image v-if="avatarScr" :src="this.avatarScr" size="small" rounded style="margin: 0 auto;"  />
              <sui-image v-else src="/local-storage/avatar/default-icon.jpg" size="small" rounded style="margin: 0 auto;"  />
            </Row>
            <Row>
              <div style="margin: 0 auto">
                <Icon type="" />
                <Upload action="/api/local-storage/upload/" :data="data" :show-upload-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <Button icon="md-add">点击上传头像</Button>
                </Upload>
                <Button icon="md-checkmark" @click="handleAddAvatar">确定修改头像</Button>
              </div>
            </Row>
          </Col>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import PersonInfoForm from '../components/PersonInfoForm'
  export default {
    name: "WeiboSet",
    data() {
      return {
          count: [0, 1, 2],
          value2:'',
          value3:'',
          myInfo:true,
          myAvatar:false,
          avatarScr:'',
          data:{
              type:'avatar'
          }
      }
    },
    methods:{
        handleAdd () {
            if (this.count.length) {
                this.count.push(this.count[this.count.length - 1] + 1);
            } else {
                this.count.push(0);
            }
        },
        handleClose2 (event, name) {
            const index = this.count.indexOf(name);
            this.count.splice(index, 1);
        },
        handleLeftMenu(name){
            switch (name) {
                case 'my-info':this.myInfo=true;this.myAvatar=false;break;
                case 'my-avatar':this.myInfo=false;this.myAvatar=true;break;
            }
        },
        handleAvatarSuccess(res, file) {
            console.log(res.data.url);
            this.avatarScr = res.data.url
        },
        beforeAvatarUpload(file) {
            const isImg = (file.type === "image/jpeg" || file.type === "image/bmp" || file.type === "image/png");

            if (!isImg) {
                this.$message.error("上传头像图片只能是 JPG、BMP、PNG 格式!");
            }
            return isImg;
        },
        handleAddAvatar(){
            this.$axios.post('/api/update-user-avatar',{
                userId:this.$store.state.user.userId,
                userAvatar:this.avatarScr
            }).then(response => {
                let result = response.data;
                if (result.success) {
                    this.$Message.info("上传头像成功")
                    let user=this.$store.state.user;
                    user.userAvatar=this.avatarScr
                    this.$store.commit('setUser',user);
                }else {
                    this.$Message.info("上传头像失败")
                }
            })
        }
    },
    components:{
        PersonInfoForm
    },
    mounted(){
        if (this.$store.state.user) {
            this.avatarScr=this.$store.state.user.userAvatar
        }
    }
  }
</script>

<style scoped>
  .home-back {
    background: url("../assets/home-back-info.jpg") no-repeat center;
    background-size: cover;
    min-height: 600px;
  }
  .pandle-item{
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
