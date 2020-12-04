<template>
    <div v-show="value" class="photo-form">
        <h2 class="title">Submit a photp</h2>
        <form class="form">
            <input class="form__item" type="file">
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
    }
}
</script>