// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' } ]
    }
  },
  css: ['~/assets/scss/main.scss', '~/assets/scss/utils.scss', '~/assets/scss/productCard.scss',  '~/assets/scss/productDetail.scss' ],
 
})
