import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
// システムエラーのルート定義を追加
import SystemError from './pages/errors/System.vue'
import PhotoDetail from './pages/PhotoDetail.vue'

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
        path: '/photos/:id',
        component: PhotoDetail,
        props: true
    },
    {
        path: 'login'
    },
    {
        path: '/500',
        component: SystemError
    }
]
// URL にハッシュ # がつくため、デフォルト設定からhistoryモードに変更
const router = new VueRouter({
    mode: 'history',
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router