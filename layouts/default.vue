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

    <div style="margin-top: 64px">
      <slot />
    </div>
  </div>
</template>

<script setup>
const backToHome = () => {
  const route = useRoute()
  const router = useRouter()
  const currentRouteName = route.name

  console.log(currentRouteName)
  if (currentRouteName.toString().includes('product')) {
    router.push('/')
  } else {
    router.go('')
  }
}
</script>
