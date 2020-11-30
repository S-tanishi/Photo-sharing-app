import Axios from "axios"

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
        // ステートを更新するため
        setApiStatus (state, state) {
            state.apiStatus = status
        }    
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions, 
}