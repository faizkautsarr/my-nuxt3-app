<template>
  <div style="display: flex; flex-direction: column">
    <div v-if="isLoading" class="loader-section">
      <LottieLoadingAnimation />
    </div>

    <div v-else class="product-detail-wrapper">
      <img class="main-image" :src="product.imageUrl" />

      <div style="margin-top: 8px; display: flex; justify-content: flex-end">
        <span
          @click="setLikedProduct()"
          class="material-symbols-outlined text-xxlarge"
          :class="{
            'text-black': !isLiked,
            'material-symbols-outlined__filled text-red': isLiked
          }"
        >
          favorite
        </span>

        <span
          class="material-symbols-outlined text-black text-xxlarge"
          style="margin-left: 8px"
        >
          shopping_cart
        </span>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        "
      >
        <p class="text-xlarge text-bold">
          {{ product.name }}
        </p>

        <p class="text-xxlarge text-bold">
          {{ product.price }}
        </p>
      </div>

      <p class="text-small text-bold text-gray-5">
        {{ product.longDesc }}
      </p>

      <hr />

      <div class="item-wrapper">
        <p class="text-medium text-gray-8">Ukuran</p>
        <div
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <div v-for="(size, index) in product.availableSizes" :key="index">
            <div
              class="rect-item-container"
              @click="selectedSize = size"
              :class="[
                selectedSize === size
                  ? 'rect-item-container__size-selected'
                  : ''
              ]"
            >
              <p
                class="text-medium"
                :class="[selectedSize === size ? 'text-white' : 'text-gray-8']"
              >
                {{ size }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="item-wrapper">
        <p class="text-medium text-gray-8">Warna</p>
        <div
          style="display: flex; justify-content: flex-end; align-items: center"
        >
          <div v-for="(color, index) in product.availableColors" :key="index">
            <div
              @click="selectedColor = color"
              class="rect-item-container"
              :style="{ backgroundColor: color }"
              :class="[
                selectedColor === color
                  ? 'rect-item-container__color-selected'
                  : ''
              ]"
            ></div>
          </div>
        </div>
      </div>

      <hr />
      <div class="item-wrapper">
        <p class="text-medium text-gray-8">Jumlah Stok</p>
        <p class="text-medium text-gray-8">{{ product.stock }}</p>
      </div>
      <hr />

      <div class="item-wrapper">
        <p class="text-medium text-gray-8">Kondisi</p>
        <p class="text-medium text-gray-8">
          {{ product.isNew ? 'Baru' : 'Bekas' }}
        </p>
      </div>
      <hr />

      <div class="seller-section">
        <div class="inner-wrapper">
          <div style="display: flex; flex-direction: row; align-items: center">
            <p class="text-small text-gray-6">
              {{ product.sellerName }}
            </p>
            <span
              v-if="product.isVerifiedSeller"
              class="material-symbols-outlined material-symbols-outlined__filled text-blue text-small"
              style="margin-left: 4px"
            >
              check_circle
            </span>

            <p class="text-small text-gray-4" style="margin-left: 4px">
              {{ product.sellerRegion }}
            </p>
          </div>

          <div style="display: flex; flex-direction: row; align-items: center">
            <span
              class="material-symbols-outlined material-symbols-outlined__filled text-orange text-large"
            >
              grade
            </span>
            <p class="text-small text-gray-4" style="margin: 2px 0px 0px 4px">
              {{ product.rating }} | {{ product.sold }} terjual
            </p>
          </div>
        </div>
      </div>
      <div class="button">Beli Sekarang</div>
    </div>
  </div>
</template>

<script setup>
const isLoading = ref(false)
const product = ref({})
const selectedColor = ref('')
const selectedSize = ref('')
const isLiked = ref(false)
const route = useRoute()
const likedProducts = useLikedProducts()

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/faizkautsarr/demo-mock/data'
    )
    const data = await response.json()
    product.value = data.products.filter(
      (product) => product.id === parseInt(route.params.id)
    )[0]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}

const setLikedProduct = () => {
  isLiked.value = !isLiked.value
  if (!likedProducts.value.includes(route.params.id)) {
    likedProducts.value.push(route.params.id)
  } else {
    const newLikedProducts = likedProducts.value.filter(
      (id) => id !== route.params.id
    )
    likedProducts.value = newLikedProducts
  }
}

onMounted(() => {
  if (likedProducts.value.includes(route.params.id)) {
    isLiked.value = true
  }
  fetchProducts()
})
</script>
