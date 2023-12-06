<template>
  <div style="display: flex; flex-direction: column">
    <div class="product-listing-wrapper">
      <div style="display: flex; flex-direction: column">
        <div class="text-gray-8 text-xlarge text-bold">"Baju Kokos Harian"</div>
        <div class="text-gray-4 text-medium">
          {{
            isLoading
              ? 'Sedang mengambil data produk...'
              : `${products.length} produk ditemukan`
          }}
        </div>
      </div>
    </div>

    <div style="padding: 0px 16px 0px 16px">
      <div v-if="isLoading" class="product-loader-section">
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

<script>
import LottieLoadingAnimation from '~/components/LottieLoadingAnimation.vue'
import ProductCard from '~/components/ProductCard.vue'
export default {
  layout: 'default',
  data() {
    return {
      isLoading: false,
      products: []
    }
  },

  components: {
    LottieLoadingAnimation,
    ProductCard
  },

  async created() {
    this.fetchProducts()
  },

  methods: {
    goToUserPage() {
      this.$router.push(`/`)
    },
    async fetchProducts() {
      this.isLoading = true
      try {
        // api call to get static products data

        const response = await fetch(
          'https://my-json-server.typicode.com/faizkautsarr/demo-mock/data'
        )
        const data = await response.json()

        this.products = data.products
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss">
.product-listing-wrapper {
  margin-top: 64px;
  padding: 16px 16px 0px 16px;
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-listing-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-loader-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
