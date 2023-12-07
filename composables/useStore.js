export const useLikedProducts = () => useState('likedProducts', () => [])
export const useShowLikePopUp = () => useState('isShowLikePopUp', () => false)
export const useShowFeatureNotReadyPopUp = () =>
  useState('isShowFeatureNotReadyPopUp', () => false)
