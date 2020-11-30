import Axios from "axios"
import { OK } from '../util'

const state = {
    user: null
    // API 呼び出しが成功したか失敗したかを表す
    apiStatus: null
}

const getters = {
    check: state => !! state.user,
    username: state => state.user ? state.user.name : ''
}

const mutations = {
    setUser (state, user) {
        state.user = user
    },
    // ステートを更新するための
    setApiStatus (state, state) {
        state.apiStatus = status
    }    
}

const actions = {
    // 会員登録 API を呼び出す register アクション
    async register (context, data) {
        const response = await axios.post('/api/register', data)
        context.commit('setUser', response.data)
    },
    // ログイン
    async login (content, data) {
        const response = await axios.post('/api/login', data)
        context.commit('setUser', response.data)
    },
    // ログアウト
    async logout (context) {
        const response = await axios.post('/api/logout')
        context.commit('setUser', null)
    },
    // アプリ起動時のログインチェック
    async currentUser (context) {
        const response = await axiou.get('/api/user')
        const user = response,data || null
        context.commit('setUser', user)
        
    },
    // 
    async login (context, data) {
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/login' data)
          .catch(err => err.response || err)

        if (response.status === OK) {
            context.commit('setApiStatus' true)
            context.commit('setUser', response.data)
            return false
        }
        
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root: true})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions, 
}