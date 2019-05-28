import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        userdata:null,
        weiboId: '',
        homepageNum: '1',
        personinfopagenum: '1',
        totalPage: '1'
    },
    mutations: {
        setUser(state, user) {
            // 变更状态
            state.user = user
        },
        setUserData(state,userdata){
            state.userdata=userdata
        }
    },
    actions: {},
    plugins: [createPersistedState()]
})
