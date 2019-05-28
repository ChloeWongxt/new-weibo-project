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
            <sui-input placeholder="搜索关键字" class="fluid" style="margin-top: 20px"/>
          </Col>
          <Col span="2">
            <Button type="warning" style="margin-top: 20px;width: 100%;margin-left: 10px" class="fluid">搜索</Button>
          </Col>
          <Col span="2" offset="2" style="margin-top: 30px;">
            <span style="text-align: right;">搜索设置</span>
          </Col>
        </Row>

        <Row style="margin-top: 30px;height:600px">
          <!--搜索结果-->
          <Col span="18" style="background-color: yellow">
            <!--搜索微博结果-->
            <Card dis-hover style="text-align:left">
              <p slot="title" >微博搜索结果</p>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </Card>
          </Col>
          <Col span="6">
            <!--搜索用户结果-->
            <Card dis-hover style="margin-left: 10px;text-align:left">
              <p slot="title">用户搜索结果</p>
              <p>Content of card</p>
              <p>Content of card</p>
              <p>Content of card</p>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>

  export default {
    name: "Search",
    data() {
      return {

      }
    },
    methods:{

    },
    components:{

    },
    mounted(){

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
