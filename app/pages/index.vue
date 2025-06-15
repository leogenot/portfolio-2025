<script setup lang="ts">
const { data, error, status } = await useAsyncData(() =>
  queryCollection('page').path('/pages').first(),
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
  <div>
    <Hero :title="data.hero" />
    <h2>All projects:</h2>
    <ul>
      <li v-for="project in data.projects" :key="project.slug">
        <NuxtLink :to="`/${project.slug}`">{{ project.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
