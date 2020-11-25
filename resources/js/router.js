import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'

// VueRouterプラグインを使用する
// これによって<RouterView />こんんポーねんとなどが使用可能に
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList
    },
    {
        path: 'login'
    }
]

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router