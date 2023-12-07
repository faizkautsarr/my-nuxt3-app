// composables/useCounter.js

import { ref } from 'vue'

export function useShowLikeNotif() {
  const isShowLikeNotif = ref(false)

  const showLikeNotif = () => {
    isShowLikeNotif.value = true
    setTimeout(() => {
      isShowLikeNotif.value = false
    }, 500)
  }

  return {
    isShowLikeNotif,
    showLikeNotif
  }
}
