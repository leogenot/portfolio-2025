<script setup lang="ts">
const { data, error, status } = await useAsyncData(() =>
  queryCollection('content').path('/').first(),
)

watch(
  status,
  () => {
    if (status.value === 'error' || (status.value === 'success' && !data.value)) {
      throw createError({
        statusCode: 404,
        stack: error.value?.stack,
        statusMessage: error.value?.message || 'Page Not Found',
        fatal: true,
      })
    }

    if (data.value) {
      useSeoMeta({
        title: data.value?.title,
        description: data.value?.description,
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <ContentRenderer v-if="data" :value="data" />
  <div v-else>Home not found</div>
</template>
