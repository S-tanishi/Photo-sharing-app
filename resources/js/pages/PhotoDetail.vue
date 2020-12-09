<template>
    <div 
      v-if="photo" 
      class="photo-detail"
      :class="{ 'photo-detail--column': fullWidth }"
    >
        <figure class="photo-detail__pane photo-detail__image"
                @click="fullWidth = ! fullWidth"
        >
            <img :src="photo.url" alt="">
            <figcaption>Posted by {{ photo.owner.name }}</figcaption>
        </figure>
        <div class="photo-detail__pane">
            <!-- いいね機能 -->
            <button 
                class="button button--like"
                :class="{ 'button--liked': photo.liked_by_user }" 
                title="Like photo"
                @click="onLikeClick"
            >
                <i class="icon ion-md-heart"></i>{{ photo.likes_count }}
            </button>
            <a 
              :href="`/photo/${photo.id}/download`"
              class="button"
              title="Download photo"
            >
              <i class="icon ion-md-arrow-round-down"></i>Download
            </a>
            <h2 class="photo-detail__title">
                <i class="icon ion-md-chatboxes"></i>Commments
            </h2>
            <!-- comment一覧機能 -->
            <ul v-if="photo.comments.length > 0" class="photo-detail__comments">
                <li v-if="comment in photo.comments"
                    :key="comment.content"
                    class="photo-detail__commentBody"
                >
                    <p class="photo-detail__commentBody">
                      {{ comment.content }}
                    </p>
                    <p class="photo-detail__commentInfo">
                      {{ comment.author.name }}
                    </p>
                </li>
            </ul>
            <p v-else>No comment yet.</p>
            <!-- comment投稿機能 -->
            <form v-if="isLogin" @submit="addComment" class="form">
                <!-- エラーメッセージ表示 -->
                <div v-if="commentErrors" class="form">
                    <div v-if="commentErrors" class="errors">
                        <ul v-if="commentErrors.content">
                            <li v-for="msg in commnetErrors.content" :key="msg">{{ msg }}</li>
                        </ul>
                    </div>
                    
                <textarea class="form__item" v-model="commentContent"></textarea>
                <div class="form__button">
                    <button type="submit" class="button button--inverse">submit comment</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Photo from '../components/Photo.vue'
import { OK, CREATED, UNPROCESSABLE_ENITITY } from '../util'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            photo: null,
            fullWidth: false,
            commentContent: '',
            commentErrors: null
        }
    },
    computed: {
        isLogin () {
            return this.$store.getters['auth/check']
        }
    },
    methods: {
        async fetchPhoto () {
            const response = await axios.get(`/api/photos/${this.id}`)

            if (response.status !== OK) {
                this.$store.commit('errors/setCode', response.status)
                return false
            }

            this.photo = response.data
        },
        async addComment () {
            const response = await axios.post(`/api/photo/${this.id}/comments`, {
                content: this.commentContent
            })

            // validation error
            if (response.status === UNPROCESSABLE_ENITITY) {
                this.commentErrors = response.data.errors
                return false
            }

            this.commentContent = ''
            // エラーメッセージをクリア
            this.commentErrors = null

            // その他のエラー
            if (response.status !== CREATED) {
                this.$store.commit('error/setCode', response.status)
                return false
            }
            this.photo.comments = [
                response.data,
                ...this.photo.comments
            ]
        },
        onLikeClick () {
            if (! this.isLogin) {
                alert('いいね機能を使う場合にはログインしてください')
                return false
            }
            if (this.photo.liked_by_user) {
            this.unlike()
            } else {
                this.like()
            }
        },
        async like () {
            const response = await axios.put(`/api/photo/${this.id}/like`)

            if (response.status !== OK) {
                this.$store.commit('error/setCode', response.status)
                return false
            }

            this.photo.likes_count = this.photo.likes_count + 1
            this.photo.liked_by_user = true
        },
        async unlike () {
            const response = await axios.delete(`/api/photos/${this.id}/like`)

            if (response.status !== OK) {
                this.$store.commit('error/setCode', response.status)
                return false
            }

            this.photo.likes_count = this.photo.likes_count - 1
            this.photo.liked_by_user = false
        }
    },
    watch: {
        $route: {
            async handler () {
                await this.fetchPhoto()
            },
            immediate: true
        }
    }
}
</script>