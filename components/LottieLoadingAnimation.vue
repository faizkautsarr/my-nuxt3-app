<!-- components/LottieAnimation.vue -->

<template>
  <div ref="lottieContainer" style="width: 240px"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import lottie from 'lottie-web'
import animationData from '~/assets/images/loading.json'

const lottieContainer = ref(null)

onMounted(() => {
  const animation = lottie.loadAnimation({
    container: lottieContainer.value,
    animationData: animationData,
    renderer: 'svg',
    loop: true,
    autoplay: true
  })
})
</script>
