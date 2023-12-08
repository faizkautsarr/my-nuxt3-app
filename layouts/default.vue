<template>
  <div class="container">
    <div class="navbar">
      <!-- click to home -->
      <img
        v-if="!currentRouteName.toString().includes('product')"
        @click="backToHome"
        src="~/assets/images/brand_logo.png"
        alt="brand logo"
        style="width: 24px"
      />

      <span
        v-else
        @click="backToHome"
        class="material-symbols-outlined text-white"
      >
        arrow_back
      </span>
      <span
        @click="featureNotReadyNotif.showFeatureNotReadyNotif"
        class="material-symbols-outlined text-white"
      >
        menu
      </span>
    </div>

    <transition name="fade">
      <span
        v-if="likeNotif.isShowLikeNotif.value"
        class="material-symbols-outlined material-symbols-outlined__filled text-red absolute-center"
      >
        favorite
      </span>
    </transition>

    <transition name="fade">
      <div
        v-if="featureNotReadyNotif.isShowFeatureNotReadyNotif.value"
        class="text-small text-white absolute-center feature-not-ready-notif"
      >
        Maaf, fitur tersebut belum tersedia
      </div>
    </transition>
    <div style="margin-top: 64px">
      <slot />
    </div>
  </div>
</template>

<script setup>
const featureNotReadyNotif = useShowFeatureNotReadyNotif()
const likeNotif = useShowLikeNotif()
const route = useRoute()
const currentRouteName = ref('')

const showFeatureNotReadyNotif = () => {
  featureNotReadyNotif.showFeatureNotReadyNotif()
}

const showLikeNotif = () => {
  likeNotif.showLikeNotif()
}

// Watch for changes in the route name
watchEffect(() => {
  currentRouteName.value = route.name
})

provide('showFeatureNotReadyNotif', showFeatureNotReadyNotif)
provide('showLikeNotif', showLikeNotif)

const backToHome = () => {
  const router = useRouter()

  if (currentRouteName.value.toString().includes('product')) {
    router.push('/')
  } else {
    router.go('')
  }
}
</script>
