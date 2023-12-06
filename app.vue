<template>
  <div class="container">
    <div class="navbar">
      <!-- click to home -->
      <img
        src="~/assets/images/brand_logo.png"
        alt="brand logo"
        style="width: 24px"
      />
      <span class="material-symbols-outlined text-white"> menu </span>
    </div>

    <div class="product-listing-wrapper">
      <div style="display: flex; flex-direction: column">
        <div class="text-gray-8 text-xlarge text-bold">"Baju Koko Harian"</div>
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
          <img
            class="image"
            style="max-width: 100%; border-radius: 16px"
            :src="product.imageUrl"
          />

          <div>
            <div class="text-gray-8 text-large" style="margin-top: 8px">
              {{ product.name }}
            </div>

            <div
              style="display: flex; flex-direction: row; align-items: center"
            >
              <div class="text-gray-4 text-small">
                {{ product.sellerName }}
              </div>
              <span
                v-if="product.isVerifiedSeller"
                class="material-symbols-outlined text-blue text-small"
                style="margin-left: 4px"
              >
                check_circle
              </span>
            </div>
          </div>

          <div class="text-gray-5 text-small description" style="">
            {{ product.desc }}
          </div>
          <div class="text-large text-gray-8 text-bold">
            {{ product.price }}
          </div>

          <div>
            <div class="additional-detail">
              <span class="material-symbols-outlined text-orange text-large">
                grade
              </span>
              <div
                class="text-small text-gray-4"
                style="margin: 4px 0px 0px 4px"
              >
                {{ product.rating }} | {{ product.sold }} terjual
              </div>
            </div>

            <div
              style="display: flex; flex-direction: row; align-items: center"
            >
              <span class="material-symbols-outlined text-green text-large">
                location_on
              </span>
              <div
                class="text-small text-gray-4"
                style="margin: 4px 0px 0px 4px"
              >
                {{ product.sellerRegion }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LottieLoadingAnimation from '~/components/LottieLoadingAnimation.vue'
export default {
  data() {
    return {
      isLoading: false,
      products: []
    }
  },
  components: {
    LottieLoadingAnimation
  },
  watch: {},
  async created() {
    this.fetchProducts()
  },
  methods: {
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
.navbar {
  position: fixed;
  display: flex;
  background-color: black;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  padding: 12px;
}
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
