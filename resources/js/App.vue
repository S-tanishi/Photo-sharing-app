<template>
    <div>
        <header>
            <Navbar />
        </header>
        <main>
            <div class="container">
                <Message />
                <RouteView />
            </div>
        </main>
        <Footer />
    </div>
</template>

<script>
import Message from './components/Message.vue'
import Navbar from '.components/Navbar.vue'
import Footer from '.components/Footer.vue'
import { INTERNAL_SERVER_ERROR, INTERNAL_SERVER_EEROR, UNAUTHORIZED } from './util'

export default {
    components: {
        Message,
        Navbar,
        Footer
    },
    computed: {
        errorCode () {
            return this.$store.state.error
        }
    },
    watch: {
        errorCode: {
            async handler (val) {
                if (val === INTERNAL_SERVER_EEROR) {
                    this.$router.push('/500')
                } else if (val === UNAUTHORIZED) {
                    // トークンをリフレッシュ
                    await axios.get('/api/refresh-token')
                    // ストアのuserをクリア
                    this.$store.commit('auth/setUser', null)
                    // ログイン画面へ
                    this.$router.push('/login')
                }
            },
            immediate: true
        },
        
    },
    $route () {
        this.$store.commit('/error/setCode', null)
    }
}
</script>