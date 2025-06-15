<script setup>
const route = useRoute()
console.log(route.path)
const {
  data: project,
  error,
  status,
} = await useAsyncData(route.params.slug, () => {
  return queryCollection('project').path(`/projects/${route.params.slug}`).first()
})

watch(
  status,
  () => {
    if (status.value === 'error' || (status.value === 'success' && !project.value)) {
      throw createError({
        statusCode: 404,
        stack: error.value?.stack,
        statusMessage: error.value?.message || 'Page Not Found',
        fatal: true,
      })
    }

    if (project.value) {
      useSeoMeta({
        title: project.value?.title,
        description: project.value?.description,
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <article class="prose mx-auto px-4 py-8">
    <h1>CURRENT PROJECT</h1>
    <h1>{{ project.title }}</h1>
    <p class="text-gray-600">{{ project.description }}</p>

    <ul class="mt-4 text-sm">
      <li><strong>Type:</strong> {{ project.projectType }}</li>
      <li><strong>Technologies:</strong> {{ project.technologies?.join(', ') }}</li>
    </ul>

    <div v-if="project.medias?.length" class="mt-6 space-y-4">
      <div v-for="media in project.medias" :key="media">
        <img v-if="media.endsWith('.jpg') || media.endsWith('.png')" :src="media" class="rounded" />
        <video v-else controls :src="media" class="w-full rounded" />
      </div>
    </div>
  </article>
</template>
