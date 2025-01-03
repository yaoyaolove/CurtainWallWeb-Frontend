// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [process.env.NUXT_UI_PRO_PATH || '@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', "@nuxt/image", '@element-plus/nuxt','@pinia/nuxt'],
  // plugins: [
  //   '~/plugins/cleanup.js'
  // ],
  ui: {
    icons: ['heroicons', 'simple-icons','material-symbols'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  devtools: { enabled: true },
  ssr: false,// 不开启服务端渲染
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://110.42.214.164:8008',
         changeOrigin: true,
      },
      '/stonedirty': {
        target: 'http://111.231.168.12:8090',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/stonedirty/, ''),
      },
    },
  },
})
