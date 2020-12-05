<template>
    <div v-show="value" class="photo-form">
        <h2 class="title">Submit a photp</h2>
        <!-- ローディング表示処理 -->
        <div v-show="loading" class="panel">
            <Loader>Sending your photo...</Loader>
        </div>

        <form v-show="! loading" class="form" @submit.prevent="submit">
            <!-- 写真投稿機能のエラー処理 -->
            <div class="errors" v-if="errors">
                <ul v-if="errors.photo">
                    <li v-for="msg in errors.photo" :key="msg">{{ msg }}</li>
                </ul>
            </div>
            
            <input class="form__item" type="file" @change="onFileChange">
            <output class="form__output" v-if="preview">
                <img :src="preview" alt="">
            </output>
            <div class="form_button">
                <button type="submit" class="button--inverse">submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import { CREATED, UNPROCESSABLE_ENTITY } from '../util'
import Loader from './Loader.vue'

export default {
    components: {
        Loader
    },
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            loading: false,
            preview: null,
            photo: null,
            errors: null,
        }
    },
    methods: {
        // formでファイルが選択されたら実行される
        onFileChange (event) {
            // 何も選択されていなければ処理中断
            if (event.target.files/length === 0) {
                this.reset()
                return false
            }
            // ファイルが画像でなければ処理中断
            if (! event.target.file[0].type.match('image.*')) {
                this.reset()
                return false
            }

            // FileReaderクラスのインスタンス取得
            const reader = new FileReader()

            // ファイルを読み込み終わったタイミングで実行される処理
            reader.onload = e => {
                // previewに読み込み結果（データURL）を代入する
                // previewに値が入ると<output>につけたv-ifがtrueと判定される
                // また<output>内部の<img>のsrc属性はpreviewの値を参照しているので
                // 結果として画像が表示される
                this.preview = e.target.result
            }

            // ファイルを読み込む
            // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
            reader.readAsDataURL(event.target.files[0])

            this.photo = event.target.files[0]
        },
        // 入力欄の値とプレビュー表示をクリアするメソッド
        reset() {
                this.preview = ''
                this.photo = nullthis.$el.querySeletor('input[type="file"]').value = null
                this.$el.querySeletor('input[type="file"]').value = null
        },
        async submit () {
            this.loading = true

            const formData = new FormData()
            formData.append('photo', this.photo)
            const response = await axios.post('/api/photos', formData)

            this.loading = false

            if (response.status === UNPROCESSABLE_ENTITY) {
                this.errors = response.data.errors
                return false
            }

            this.reset()
            this.$emit('input', false)

            this.$router.push(`/photos/${response.data.id}`)

        }
        
    }
}
</script>