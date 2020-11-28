<template>
    <footer class="footer">
        <button v-if="isLogin" class="button button--link" @click="logout">Logout</button>
        <RouteLink v-else class="button button--link" to="/login">
          Login / Register
        </RouteLink>
    </footer>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')

      this.$router.push('/login')
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/check']
    }
  },
}
</script>