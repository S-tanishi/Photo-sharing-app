require('./bootstrap');
import './bootstrap'

import Vue from 'vue'
// ルーティングの定義をインポートする
import router from './router'
//ルートコンポーネントをインポートする
import App from './App.vue'

import store from './store'


new Vue({
    el: '#app',
    router, //ルーティングの定義を読み込む
    store, // インスタンス作成時にストアの読み取り
    components: { App }, //ルートコンポーネントの使用を宣言する
    template: '<App />'
})