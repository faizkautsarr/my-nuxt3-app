<template>
  <div style="display: flex; flex-direction: column">
    <div class="product-listing-wrapper">
      <div style="display: flex; flex-direction: column">
        <p class="text-gray-8 text-xxlarge text-bold">"Baju Koko Harian"</p>
        <p class="text-gray-4 text-medium">
          {{
            isLoading
              ? 'Sedang mengambil data produk...'
              : `${products.length} produk ditemukan`
          }}
        </p>
      </div>
    </div>

    <div style="padding: 0px 16px 0px 16px">
      <div>{{ likedProducts }}</div>
      <div v-if="isLoading" class="loader-section">
        <LottieLoadingAnimation />
      </div>
      <div v-else class="product-listing-section">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="product-card"
        >
          <ProductCard
            :id="product.id"
            :imageUrl="product.imageUrl"
            :rating="product.rating"
            :name="product.name"
            :price="product.price"
            :sold="product.sold"
            :desc="product.desc"
            :sellerRegion="product.sellerRegion"
            :sellerName="product.sellerName"
            :isVerifiedSeller="product.isVerifiedSeller"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = ref([])
const likedProducts = useLikedProducts()
const isLoading = ref(false)

const fetchProducts = async () => {
  isLoading.value = true
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/faizkautsarr/demo-mock/data'
    )
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  isLoading.value = false
}

onMounted(() => {
  fetchProducts()
})
</script>
