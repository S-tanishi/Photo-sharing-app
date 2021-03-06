import Axios from "axios"
import { OK, CREATED, UNPROCESSABLE_ENTITY } from '../util'

const state = {
    user: null,
    apiStatus: null, // API 呼び出しが成功したか失敗したかを表す
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
        context.commit('setApiStatus', null)
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
    async login (context, data) {
        context.commit('setApiStatus', null)
        // 通信エラーの取得
        const response = await axios.post('/api/login', data)
        // 成功したらtrue(通信ステータスの更新)
        if (response.status === OK) {
          context.commit('setApiStatus', true)
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
        context.commit('setApiStatus', null)
        const response = await axios.post('/api/logout')

        if (response.status === OK) {
          context.commit('setApiStatus', true)
          context.commit('setUser', null)
          return false
        }
        
        context.commit('setApiStatus', false)
        context.commit('error/setCode', response.status, { root:true })
    },

    // アプリ起動時のログインユーザーチェック
    async currentUser (context) {
        context.commit('setApiStatus', null)
        const response = await axios.get('/api/user')
        const user = response.data || null

        if (response.status === OK) {
            context.commit('setApiStatus', true)
            context.commit('setUser', user)
            return false 
        }

        context.commit('setApiStatus', true)
        context.commit('error/setCode', response.status, { root: true })
    
    },
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions, 
}