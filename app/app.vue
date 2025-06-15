<script lang="ts" setup>
import { VueLenis } from 'lenis/vue'

const { $gsap, $ScrollTrigger } = useNuxtApp()

const lenisOptions = computed(() => {
  return {
    lerp: 0.7,
    wheelMultiplier: 0.5,
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

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'theme-color',
      content: '#e6e6e6',
    },
  ],
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon-black.svg',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/favicon-white.svg',
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
</script>

<template>
  <main class="main-site w-screen overflow-x-clip">
    <VueLenis ref="lenisRef" :auto-raf="false" root :options="lenisOptions">
      <SiteHeader />
      <NuxtPage />
    </VueLenis>
  </main>
</template>
