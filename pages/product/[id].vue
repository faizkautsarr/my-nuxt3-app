<template>
  <div style="display: flex; flex-direction: column">
    <div v-if="isLoading" class="loader-section">
      <LottieLoadingAnimation />
    </div>
    <div v-else class="product-detail-wrapper">
      <img class="main-image" :src="product.imageUrl" />

      <div
        style="
          margin-top: 8px;
          align-self: normal;
          display: flex;
          justify-content: flex-end;
        "
      >
        <span
          @click="isLiked = !isLiked"
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
              style="margin: 0px 4px 0px 4px"
            >
              check_circle
            </span>

            <p class="text-small text-gray-4">
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
              {{ product.rating }} | {{ product.sold }} barang telah terjual
            </p>
          </div>
        </div>
      </div>
      <div class="button">Beli Sekarang</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      isLoading: false,
      product: {},
      selectedColor: '',
      selectedSize: '',
      isLiked: false
    }
  },
  created() {
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
        this.product = data.products.filter(
          (product) => product.id === parseInt(this.$route.params.id)
        )[0]
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.product-detail-wrapper {
  padding: 0px 16px 0px 16px;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .main-image {
    max-width: 80%;
    border-radius: 16px;
    align-self: center;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
  .item-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: normal;
  }

  .seller-section {
    padding: 8px 16px 8px 16px;
    align-self: normal;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 4px;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;

    .inner-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: normal;
      justify-content: space-between;
    }
  }

  .button {
    display: flex;
    width: 100%;
    height: 42px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: #000;
    color: #f8f9fa;
    font-weight: 400;
    margin-top: 16px;
  }

  .rect-item-container {
    display: flex;
    flex-direction: row;
    padding: 4px;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-left: 8px;
    border: 1px solid #adb5bd;

    &__size-selected {
      background-color: #343a40;
      border: 2px solid transparent;
      box-shadow:
        rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    &__color-selected {
      border: 2px solid transparent;
      box-shadow:
        rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }
  }
}
</style>
