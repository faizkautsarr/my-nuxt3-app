<template>
  <div class="container">
    <div
      style="
        position: fixed;
        display: flex;
        background-color: black;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        justify-content: space-between;
        padding: 12px;
      "
    >
      <!-- click to home -->
      <img
        src="~/assets/images/brand_logo.png"
        alt="brand logo"
        style="width: 24px"
      />
      <span class="material-symbols-outlined" style="color: white"> menu </span>
    </div>

    <div
      style="
        margin-top: 64px;
        padding: 16px 16px 0px 16px;
        flex-direction: row;
        display: flex;
        align-items: center;
        justify-content: space-between;
      "
    >
      <div style="display: flex; flex-direction: column">
        <div
          style="
            color: #000;
            font-size: 24px;
            font-style: normal;
            font-weight: 800;
          "
        >
          "Baju Koko Harian"
        </div>
        <div
          style="
            color: #848181;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
          "
        >
          {{
            isLoading
              ? 'Sedang mengambil data produk...'
              : `${products.length} produk ditemukan`
          }}
        </div>
      </div>
    </div>

    <div style="padding: 0px 16px 0px 16px">
      <div
        v-if="isLoading"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <LottieLoadingAnimation />
      </div>
      <div
        v-else
        style="
          display: flex;
          flex-direction: row;
          flex: 1;
          flex-wrap: wrap;
          justify-content: space-between;
        "
      >
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
          <div
            style="
              color: #000;
              margin-top: 8px;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
            "
          >
            {{ product.name }}
          </div>
          <div
            style="
              color: #7c7a7a;
              margin-top: 8px;
              margin-bottom: 8px;
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            "
          >
            {{ product.desc }}
          </div>
          <div style="font-size: 16px; font-style: normal; font-weight: 800">
            {{ product.price }}
          </div>

          <div>
            <div
              style="
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                margin-top: 4px;
              "
            >
              <span
                class="material-symbols-outlined"
                style="color: rgb(255, 166, 0); font-size: 14px"
              >
                grade
              </span>
              <div
                style="
                  margin-left: 4px;
                  color: #9d9b9b;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                "
              >
                {{ product.rating }} | {{ product.sold }} terjual
              </div>
            </div>

            <div
              style="
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                margin-top: 4px;
              "
            >
              <span
                class="material-symbols-outlined"
                style="color: #00aa5b; font-size: 14px"
              >
                location_on
              </span>
              <div
                style="
                  margin-left: 4px;
                  color: #9d9b9b;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                "
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

  &.image {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  }
}
</style>
