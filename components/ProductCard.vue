<template>
  <div
    style="display: flex; flex-direction: column"
    @click="goToProductDetail()"
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
        @click="(event) => setLikedProduct(event)"
        class="material-symbols-outlined text-xlarge"
        :class="{
          'text-black': !isLiked,
          'material-symbols-outlined__filled text-red': isLiked
        }"
      >
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

<script setup>
const props = defineProps({
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
  }
})

const likedProducts = useLikedProducts()
const router = useRouter()
const isLiked = ref(false)

const goToProductDetail = () => {
  router.push('/product/' + props.id)
}

const setLikedProduct = (event) => {
  // handle trigger parent click
  event.stopPropagation()
  isLiked.value = !isLiked.value
  if (!likedProducts.value.includes(props.id.toString())) {
    likedProducts.value.push(props.id.toString())
  } else {
    const newLikedProducts = likedProducts.value.filter(
      (id) => id !== props.id.toString()
    )
    likedProducts.value = newLikedProducts
  }
}

onMounted(() => {
  if (likedProducts.value.includes(props.id.toString())) {
    isLiked.value = true
  }
})
</script>
