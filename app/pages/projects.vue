<script setup lang="ts">
import { SectionsProjectList } from '#components'

const { data, error, status } = await useAsyncData(() =>
  queryCollection('page').path('/pages/projects').first(),
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
  <div><SectionsProjectList /></div>
</template>
