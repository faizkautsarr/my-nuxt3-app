<template>
  <div class="container">
    <div class="navbar">
      <!-- click to home -->
      <img
        @click="backToHome"
        src="~/assets/images/brand_logo.png"
        alt="brand logo"
        style="width: 24px"
      />
      <span class="material-symbols-outlined text-white"> menu </span>
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  methods: {
    backToHome() {
      const route = useRoute()
      const currentRouteName = route.name
      if (currentRouteName === 'index') {
        this.$router.go()
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
