<template>
    <div class="pagnation">
        <RouteLink 
          v-if="! isFirstPage"
          :to="`/?page=${currentPage - 1}`"
          class="button"
        >&laquo; prev</RouteLink>
        <Routelink 
          v-if="! isLastPage"
          :to="`/?page=${currentPage + 1}`"
          class="button"
        >next &raquo;</Routelink>
    </div>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
            required: true,
        },
        lastPage: {
            type: Number,
            required: true,
        }
    },
    computed: {
        isFirstPage () {
            return this.currentPage === 1
        },
        isLastPage () {
            return this.currentPage === this.lastPage
        }
    }
}
</script>