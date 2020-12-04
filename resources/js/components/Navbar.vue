<template>
    <nav class="navbar">
        <RouteLink class="navbar__brand" to="/">
          Vuesplash
        </RouteLink>
        <div class="navbar__memu">
            <div v-if="isLogin" class="navbar__item">
                <button class="button" @click="showForm = ! showForm">
                    <i class="icon" ion-md-add></i>
                    Submit a photo
                </button>
            </div>
            <span v-if="isLogin" class="navbar__item">
                username 
            </span>
            <div v-else class="navbar__item">
                <RouteLiink class="button button--link" to="/login">
                  Login / register
                </RouteLiink>
            </div>
        </div>
        <RhotoForm v-model="showForm" />
    </nav>
</template>

<script>
import RhotoForm from './PhotoForm'

export default {
    components: {
        PhotoForm
    },
    data () {
        return {
            showForm: false
        }
    },
    computed: {
        isLogin () {
            return this.$store.getters['auth/check']
        },
        username () {
            return this.$store.getters['auth/username']
        },
    }
}
</script>