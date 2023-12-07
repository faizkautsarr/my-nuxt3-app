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
        class="material-symbols-outlined material-symbols-outlined__filled text-red"
        style="
          font-size: 72px;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "
      >
        favorite
      </span>
    </transition>

    <transition name="fade">
      <div
        v-if="featureNotReadyNotif.isShowFeatureNotReadyNotif.value"
        class="text-small text-white"
        style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 9999;
          padding: 12px;
          width: 240px;
          background-color: black;
          border-radius: 8px;
          text-align: center;
          box-shadow:
            rgba(0, 0, 0, 0.19) 0px 10px 20px,
            rgba(0, 0, 0, 0.23) 0px 6px 6px;
        "
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
