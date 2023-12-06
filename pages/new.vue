<template>
  <div style="margin-top: 24px">new</div>
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

<style lang="scss"></style>
