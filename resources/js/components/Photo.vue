<template>
    <div class="photo">
        <figure class="photo__wrapper">
            <img
              class="photo__image"
              :src="item.url"
              :alt="`Photo by ${item.owner.name}`"
            >
        </figure>
        <!-- マウスオーバー時のオーバーレイ -->
        <RouteLink 
          class="photo__overlay"
          :to="`/photos/${item.id}`"
          :title="`View the photo by ${item.owner.name}`"
        >
        <!-- いいねボタン -->
          <div class="photo__controls">
              <button
                 class="photo__action photo__action--like"
                 title="Like photo"
              >
              </button>
          </div>
        </RouteLink>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    }
}
</script>