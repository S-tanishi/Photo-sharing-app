import Axios from "axios"
import { OK } from '../util'
import { OK, UNPROCESSABLE_ENTITY } from '../util'

const state = {
    user: null,
    // API 呼び出しが成功したか失敗したかを表す
    apiStatus: null,
    loginErrorMessages: null,
    registerErrorMessages: null,
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
    },
    // バリデーションのための
    setLoginErrorMessages (state, message) {
        state.loginErrorMessages = messages
    },
    setRegisterRegister (state, messages) {
        state.registerErrorMessages = messages
    }
}

const actions = {
    // 会員登録
    async register (context, data) {
        context.commit('seyApiStatus', null)
        const response = await axios.post('/api/register',data)
        
        if (response.status === CREATED) {
            context.commit('setApiStatus', true)
            context.commit('setUser', response.data)
            return false
        }

        context.commit('setApiStatus', false)
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setRegisterErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root:true })
        }
        
    },
    // ログイン
    async login (content, data) {
        // 最初はnull
        context.commit('setApiStatus', null)
        // 通信エラーの取得
        const response = await axios.post('/api/login', data)
          .catch(err => err.response || err)
        // 成功したらtrue(通信ステータスの更新)
        if (response.status === OK) {
          context.commit('setApiStatus' true)
          context.commit('setUser', response.data)
          return false
        }
        // 失敗ならfalse
        context.commit('setApiStatus', false)
        // 別モジュールのミューテーションを呼び出す
        if (response.status === UNPROCESSABLE_ENTITY) {
            context.commit('setLoginErrorMessages', response.data.errors)
        } else {
            context.commit('error/setCode', response.status, { root: true})
        }
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
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions, 
}