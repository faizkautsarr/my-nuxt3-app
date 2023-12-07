export const useShowFeatureNotReadyPopUp = () => {
  const isShowFeatureNotReadyPopUp = useShowFeatureNotReadyPopUp()

  const showFeatureNotReadyPopUp = () => {
    setIsShowFeatureNotReadyPopUp(true)
    setTimeout(() => {
      setIsShowFeatureNotReadyPopUp(false)
    }, 500)
  }

  return {
    isShowFeatureNotReadyPopUp,
    showFeatureNotReadyPopUp
  }
}
