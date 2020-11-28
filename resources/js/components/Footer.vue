<template>
    <footer class="footer">
        <button class="button button--link" @click="logout">Logout</button>
        <RouteLink class="button button--link" to="/login">
          Login / Register
        </RouteLink>
    </footer>
</template>

<script>
export default {
  methods {
    async logout () {
      await this.$store.dispatch('auth/logout')

      this.$router.push('/login')
    }
  }
}
</script>