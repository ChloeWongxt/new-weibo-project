<template>
  <div id="app">
    <weibo-header/>
    <v-app>
      <router-view/>
    </v-app>
    <weibo-footer></weibo-footer>
  </div>
</template>

<script>
import WeiboHeader from './components/Header'
import WeiboFooter from './components/Footer'
export default {
    name: 'App',
    data() {
        return {
            editor:''
        }
    },
    components: {
        WeiboHeader,
        WeiboFooter
    }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  margin-top: 48px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
