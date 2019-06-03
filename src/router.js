import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/PageLogin'
import Home from './views/PageHome'
import Register from './views/PageRegister'
import WeiboDetail from './views/PageWeiboDetail'
import PersonHome from './views/PagePersonHome'
import HomeSearch from './views/PageSearch'
import WeiboSet from './views/PageSet'
import PageFans from './views/PageFans'
import PageFollow from './views/PageFollow'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/weibodetail/:weiboId',
            name: 'WeiboDetail',
            props: true,
            component: WeiboDetail
        },
        {
            path: '/personhome/:userId',
            name: 'personHome',
            props: true,
            component: PersonHome
        },
        {
            path: '/homesearch',
            name: 'homeSearch',
            props: route => ({q: route.query.q}),
            component: HomeSearch
        },
        {
            path: '/set',
            name: 'WeiboSet',
            component: WeiboSet
        },
        {
            path: '/pagefans/:userId',
            name: 'PageFans',
            props: true,
            component: PageFans
        },
        {
            path: '/pagefollow/:userId',
            name: 'PageFollow',
            props: true,
            component: PageFollow
        }
    ]
})
