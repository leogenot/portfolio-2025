<script lang="ts" setup>
import { VueLenis } from 'lenis/vue'

const { $gsap, $ScrollTrigger } = useNuxtApp()

const lenisOptions = computed(() => {
  return {
    lerp: 0.7,
    wheelMultiplier: 0.8,
  }
})

const lenisRef = ref()

watchEffect((onInvalidate) => {
  if (import.meta.server) return
  function update(time: number) {
    lenisRef.value?.lenis?.raf(time * 1000)
  }
  $gsap.ticker.add(update)
  onInvalidate(() => {
    $gsap.ticker.remove(update)
  })
})
useColorScheme()
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#0e1011' },
    { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#ffffff' },
    {
      name: 'google-site-verification',
      content: 'nKPy2XQG9rBND-W_C_e0a-veDL_ZUmMHei3e12CGeDA',
    },
  ],
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon-light.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon-dark.svg',
      media: '(prefers-color-scheme: dark)',
    },
  ],
})

const { width: innerWidth } = useWindowSize()
const debouncedSetup = useDebounceFn(() => {
  $ScrollTrigger?.refresh()
  console.log('All triggers::::', $ScrollTrigger.getAll())
}, 200)

watch(innerWidth, debouncedSetup)

const { isMobileOrTablet } = useDevice()

const isMobile = computed(() => {
  if (import.meta.server) return isMobileOrTablet
  return innerWidth.value < 900
})
</script>

<template>
  <main class="main-site min-h-screen w-screen overflow-x-clip">
    <SiteHeader v-if="!isMobile" />
    <VueLenis ref="lenisRef" :auto-raf="false" root :options="lenisOptions">
      <NuxtPage
        class="min-h-screen"
        :transition="{
          name: 'page',
          mode: 'out-in',
        }"
      />
    </VueLenis>
    <SiteHeaderMobile v-if="isMobile" />
  </main>
</template>
