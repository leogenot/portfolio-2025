<script setup lang="ts">
import type { NuxtError } from '#app'

const route = useRoute()

const _props = defineProps<{ error: NuxtError }>()

if (import.meta.dev) {
  console.log('route', route)
  console.log(_props.error)
}

const handleError = () => clearError({ redirect: '/' })

watch(
  () => route.fullPath,
  () => {
    clearError()
  },
)

useHead({
  title: '404',
  htmlAttrs: { lang: 'en' },
  meta: [
    { property: 'og:title', content: '404' },
    { name: 'description', content: 'Error page' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
})
</script>

<template>
  <div>
    <h1>404</h1>
    <button @click="handleError">Go Home</button>
  </div>
</template>
