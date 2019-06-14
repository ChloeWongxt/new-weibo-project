<template>
    <header>
        <nav class="my-navbar W_global_nav_alpha">
            <div class="W_global_nav">
                <Row>
                    <!--微博头部-->
                    <Col span="4">
                        <!--图标部分-->
                        <div class="nv-logo">
                            <a class="box" href="/">
                                <span class="logo"></span>
                            </a>
                        </div>
                    </Col>
                    <Col span="10" style="margin-top: 10px">
                        <!--搜索框部分-->
                        <Input search placeholder="搜索用户/微博" v-model="search" @on-click="handleSearchClick"
                               @on-enter="handleSearchClick"/>
                    </Col>
                    <Col span="6">
                        <!--头部导航部分-->
                        <div class="gn_position">
                            <div class="gn_nav">
                                <ul class="gn_nav_list">
                                    <li>
                                        <router-link to="/" class="S_txt1"><em class="S_txt1">首页</em></router-link>
                                    </li>
                                    <li>
                                        <router-link to="/" class="S_txt1"><em class="S_txt1">发现</em></router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="gn_login">
                                <ul class="gn_login_list">
                                    <li>
                                        <router-link to="/register" class="S_txt1">注册</router-link>
                                    </li>
                                    <li class="W_vline S_line1" v-if="!this.$store.state.user"></li>
                                </ul>
                            </div>
                            <div class="gn_login" v-if="!this.$store.state.user">
                                <ul class="gn_login_list">
                                    <li>
                                        <router-link to="/login" class="S_txt1">登录</router-link>
                                    </li>
                                    <!--<li class="W_vline S_line1"></li>-->
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col span="3">
                        <!--用户设置显示部分-->
                        <Row v-if="this.$store.state.user">
                            <Col span="6">
                                <v-avatar size="40">
                                    <Icon size="20" type="md-person"/>
                                </v-avatar>
                            </Col>
                            <Col span="18" style="text-align:left;line-height:48px;vertical-align: middle;">
                                {{this.$store.state.user.nickName}}
                            </Col>
                        </Row>
                    </Col>
                    <Col span="1" v-if="this.$store.state.user">
                        <Dropdown placement="bottom-end" @on-click="handleSetClick">
                            <a bpfilter="page_frame" href="javascript:void(0)" class="S_txt1">
                                <v-avatar size="40">
                                    <Icon type="ios-settings" size="20"/>
                                </v-avatar>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="set">账号设置</DropdownItem>
                                <DropdownItem>关于我们</DropdownItem>
                                <DropdownItem>帮助中心</DropdownItem>
                                <Divider/>
                                <DropdownItem name="quit">退出</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            icon: 'md-person',
            search: '',
        }
    },
    methods: {
        handleSetClick(name) {
            switch (name) {
                case 'set':
                    this.toSetPage();
                    break;
                case 'quit':
                    this.userQuit();
                    break;
            }
        },
        toSetPage() {
            this.$router.push('/set')
        },
        userQuit() {
            this.$store.commit('setUser', null);
            this.$store.commit('setUserData', null);
            this.$Message.info('登出成功');
            this.$router.push('/login');
        },
        handleSearchClick() {
            if (this.search !== '') {
                this.$router.push({name: 'homeSearch', query: {q: this.search}});
            } else {
                this.$Message.info("搜索框不能为空")
            }
        }
    }
}
</script>

<style scoped>
@import "//at.alicdn.com/t/font_1131779_a1znc4hjfre.css";

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
}

.my-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    margin: 0 auto;
    border-top: 2px solid #fa7d3c;
    background: #fff;
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.15);
    padding: 0;
    z-index: 999;
    display: block;
}

.W_global_nav_alpha {
    box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.94);
}

.W_global_nav {
    position: relative;
    /*width: 80%;*/
    /*height: 48px;*/
    margin: 0 auto;
    display: block;
}

.nv-logo {
    float: right;
    position: relative;
    width: 140px;
    height: 48px;
}

.nv-logo .box {
    position: absolute;
    left: -50px;
    top: 0;
    /*width: 190px;*/
    /*height: 48px;*/
    cursor: pointer;
}

.nv-logo .box .logo {
    display: block;
    margin-left: 50px;
    width: 140px;
    height: 48px;
    cursor: pointer;
    background: url("../assets/wb-logo.png") no-repeat 0 40%;
    /*background-size: 60%;*/
}

.nv-logo .box img {
    width: 100%;
    height: 100%;
}

.W_global_nav .search {
    width: 468px;
    position: relative;
    float: left;
    height: 28px;
    margin: 9px 0 0 17px;
    background-color: #f2f2f5;
    border: 1px solid #ccc;
}

.W_global_nav .search .placeholder, .W_global_nav .search .W_input {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    padding: 4px 33px 4px 10px;
    height: 20px;
    line-height: 20px;
    box-shadow: none;
    border: none;
    background-color: transparent;
    color: #808080;
    outline-style: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
}

.W_global_nav .search .ficon_search {
    position: absolute;
    top: 4px;
    right: 10px;
}

a:link {
    color: #000;
    text-decoration: none;
}

a:hover {
    color: #eb7350;
    text-decoration: none;
}

a {
    color: #eb7350;
    text-decoration: none;
}

 .W_global_nav a:hover{
    color: #696e78;
}

.W_global_nav .gn_position {
    float: left;
    margin-left: 85px;
}

.W_global_nav .gn_nav {
    float: left;
    margin: 11px 20px 11px 0;
}

.W_global_nav .gn_nav_list li {
    float: left;
    display: inline;
    position: relative;
    max-width: 139px \0;
    margin-left: 30px;
    font-size: 14px;
}

.W_global_nav .gn_nav_list li {
    margin-left: 26px;
}

.W_global_nav .gn_nav_list li a {
    display: block;
    height: 26px;
    line-height: 26px;
    color: #333;
    white-space: nowrap;
}

.W_global_nav .gn_nav_list li a .S_txt1 {
    display: inline-block;
    overflow: hidden;
    font-style: normal;
}

.W_global_nav .gn_login_list li.W_vline {
    margin: 6px 0px 0 0;
    height: 14px;
}

.W_global_nav .S_line1 {
    border-color: #d9d9d9;
}

.W_vline {
    border-left-width: 1px;
    border-left-style: solid;
    width: 0;
    overflow: hidden;
    *zoom: 1;
}

.W_global_nav .gn_login {
    float: left;
    margin: 11px 0 10px 0;
}

.W_global_nav .gn_login {
    float: left;
    margin: 11px 0 10px 0;
}

.W_global_nav .gn_login_list li {
    float: left;
    display: inline;
    position: relative;
    line-height: 26px;
    margin: 0 15px;
    white-space: nowrap;
}

.W_global_nav .gn_login_list li a {
    font-size: 14px;
    color: #333;
    text-decoration: none;
}
</style>
