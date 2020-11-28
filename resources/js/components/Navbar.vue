<template>
    <nav class="navbar">
        <RouteLink class="navbar__brand" to="/">
          Vuesplash
        </RouteLink>
        <div class="navbar__memu">
            <div class="navbar__item">
                <button class="button">
                    <i class="icon" ion-md-add></i>
                    Submit a photo
                </button>
            </div>
            <span class="navbar__item">
                username 
            </span>
            <div class="navbar__item">
                <RouteLiink class="button button--link" to="/login">
                  Login / register
                </RouteLiink>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isLogin () {
            return this.$store.getters['auth/check']
        },
        username () {
            return this.$store.getters['auth/username']
        }
    }
}
</script>