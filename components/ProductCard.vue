<template>
  <div
    style="display: flex; flex-direction: column"
    @click="goToProductDetail(id)"
  >
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 8px;
      "
    >
      <span
        v-if="isLiked"
        class="material-symbols-outlined material-symbols-outlined__filled text-red text-xlarge"
      >
        favorite
      </span>

      <span v-else class="material-symbols-outlined text-black text-xlarge">
        favorite
      </span>
    </div>

    <img
      class="image"
      style="max-width: 100%; border-radius: 16px"
      :src="imageUrl"
    />

    <div>
      <p class="text-gray-8 text-large" style="margin-top: 8px">
        {{ name }}
      </p>

      <div style="display: flex; flex-direction: row; align-items: center">
        <p class="text-small">
          {{ sellerName }}
        </p>
        <span
          v-if="isVerifiedSeller"
          class="material-symbols-outlined material-symbols-outlined__filled text-blue text-small"
          style="margin-left: 4px"
        >
          check_circle
        </span>
      </div>
    </div>

    <p class="text-gray-5 text-small description" style="">
      {{ desc }}
    </p>
    <p class="text-large text-gray-8 text-bold">
      {{ price }}
    </p>

    <div>
      <div class="additional-detail">
        <span
          class="material-symbols-outlined material-symbols-outlined__filled text-orange text-large"
        >
          grade
        </span>
        <p class="text-small text-gray-4" style="margin: 4px 0px 0px 4px">
          {{ rating }} | {{ sold }} terjual
        </p>
      </div>

      <div style="display: flex; flex-direction: row; align-items: center">
        <span class="material-symbols-outlined text-green text-large">
          location_on
        </span>
        <p class="text-small text-gray-4" style="margin: 4px 0px 0px 4px">
          {{ sellerRegion }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: Number
    },
    imageUrl: {
      required: true,
      type: String
    },
    rating: {
      required: true,
      type: Number
    },
    sold: {
      required: true,
      type: Number
    },
    name: {
      required: true,
      type: String
    },
    price: {
      required: true,
      type: String
    },
    desc: {
      required: true,
      type: String
    },
    sellerRegion: {
      required: true,
      type: String
    },
    sellerName: {
      required: true,
      type: String
    },
    isVerifiedSeller: {
      required: true,
      type: Boolean
    },
    isLiked: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    goToProductDetail(id) {
      console.log('masuk')
      this.$router.push('/product/' + id)
    }
  }
}
</script>

<style lang="scss">
.product-card {
  border-radius: 16px;
  background: #fff;
  width: calc(100vw / 2 - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 14px;
  margin-top: 16px;
  padding: 12px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .image {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }

  .additional-detail {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 4px;
  }

  .description {
    margin: 8px 0px 8px 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
