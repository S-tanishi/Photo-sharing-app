<template>
    <div v-show="value" class="photo-form">
        <h2 class="title">Submit a photp</h2>
        <form class="form">
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
export default {
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            preview: null
        }
    },
    methods: {
        // formでファイルが選択されたら実行される
        onFileChange (event) {
            // 何も選択されていなければ処理中断
            if (event.target.files/length === 0) {
                return false
            }
            // ファイルが画像でなければ処理中断
            if (! event.target.file[0].type.match('image.*')) {
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
            }
        }
    }
}
</script>