import Axios from "axios"

const state = {
    user: null
}

const getters = {}

const mutations = {
    せtUser (state, user) {
        state.user = user
    }
}

const actions = {
    // 会員登録 API を呼び出す register アクション
    async register (context, data) {
        const response = await Axios.post('/api/register', data)
        context.commit('setUser', response.data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions, 
}