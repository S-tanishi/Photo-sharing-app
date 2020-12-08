import Vue from 'vue'
import VueRouter from 'vue-router'

// ページコンポーネントをインポートする
import PhotoList from './pages/PhotoList.vue'
import Login from './pages/Login.vue'
import SystemError from './pages/errors/System.vue'
import PhotoDetail from './pages/PhotoDetail.vue'
import NotFound from './pages/errors/NotFound.vue'
import { component } from 'vue/types/umd'
import { Store } from 'vuex'

// VueRouterプラグインを使用する
// これによって<RouterView />コンポーネントなどが使用可能に
Vue.use(VueRouter)

// パスとコンポーネントのマッピング
const routes = [
    {
        path: '/',
        component: PhotoList,
        props: route => {
            const page = route.query.page
            return { page: /^[1-9][0-9]*$/.test(page) ? page * 1 : 1 }
        }
    },
    {
        path: '/photos/:id',
        component: PhotoDetail,
        props: true
    },
    {
        path: 'login',
        component: Login,
        beforeEnter (to, from, next) {
            if (Store.getters['auth/check']) {
                next('/')
            } else {
                next()
            }
        }

    },
    {
        path: '/500',
        component: SystemError
    },
    {
        path: '*',
        component: NotFound
    }
]
// VueRouterインスタンスの作成
// URL にハッシュ # がつくため、デフォルト設定からhistoryモードに変更
const router = new VueRouter({
    mode: 'history',
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    routes
})

// VueRouterインスタンスをエクスポートする
// app.jsでインポートするため
export default router