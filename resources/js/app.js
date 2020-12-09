import './bootstrap'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'

const createApp = async () => {
    await store.dispatch('auth/currentUser')

new Vue({
    el: '#app',
    router, //ルーティングの定義を読み込む
    store, // インスタンス作成時にストアの読み取り
    components: { App }, //ルートコンポーネントの使用を宣言する
    template: '<App />'
})

}

createApp()
