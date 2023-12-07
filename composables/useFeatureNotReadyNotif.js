// composables/useCounter.js

import { ref } from 'vue'

export function useShowFeatureNotReadyNotif() {
  const isShowFeatureNotReadyNotif = ref(false)

  const showFeatureNotReadyNotif = () => {
    isShowFeatureNotReadyNotif.value = true
    setTimeout(() => {
      isShowFeatureNotReadyNotif.value = false
    }, 500)
  }

  return {
    isShowFeatureNotReadyNotif,
    showFeatureNotReadyNotif
  }
}
