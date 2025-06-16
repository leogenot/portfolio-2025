<script setup lang="ts">
defineProps<{ data: DoubleMediaProps }>()
</script>

<template>
  <div class="gap-gap grid lg:grid-cols-12">
    <div
      v-if="data.medias?.length > 1 && data.medias[0]"
      class="h-full overflow-clip lg:col-start-1 lg:col-end-5"
    >
      <NuxtImg
        v-if="data.medias[0].type === 'image'"
        :src="data.medias[0].src"
        sizes="100vw sm:50vw"
        format="webp"
        :alt="data.medias[0].src || 'Image alt'"
        class="h-full w-full object-cover object-center"
      />
    </div>
    <div
      v-if="data.medias?.length > 1 && data.medias[1]"
      class="aspect-video h-full w-full overflow-clip lg:col-start-5 lg:col-end-13"
    >
      <NuxtImg
        v-if="data.medias[1].type === 'image'"
        :src="data.medias[1].src"
        sizes="100vw sm:70vw"
        format="webp"
        :alt="data.medias[1].src || 'Image alt'"
        class="h-full w-full object-cover object-center"
      />
    </div>
  </div>
</template>
