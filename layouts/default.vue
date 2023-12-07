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

const showFeatureNotReadyNotif = () => {
  featureNotReadyNotif.showFeatureNotReadyNotif()
}

const showLikeNotif = () => {
  likeNotif.showLikeNotif()
}

// provider for consumer to inject, to maintain reactivity
provide('showFeatureNotReadyNotif', showFeatureNotReadyNotif)
provide('showLikeNotif', showLikeNotif)

const backToHome = () => {
  const route = useRoute()
  const router = useRouter()
  const currentRouteName = route.name

  if (currentRouteName.toString().includes('product')) {
    router.push('/')
  } else {
    router.go('')
  }
}
</script>
