<script setup lang="ts">
defineProps<{ data: TitleProps }>()
</script>

<template>
  <div class="px-bleed flex flex-col gap-12 pt-12 pb-12 lg:gap-24 lg:pt-24 lg:pb-24">
    <div class="trumpet inline-flex w-full justify-between">
      <span v-if="data.trumpet" class="text-text-meta text-dark-grey font-mono lowercase"
        >({{ data.trumpet }})</span
      >
      <span v-if="data.indicator" class="text-text-meta font-mono lowercase">{{
        data.indicator
      }}</span>
    </div>
    <div class="title">
      <h2
        v-if="data.title"
        class="lg:text-heading-large text-heading-small xl:text-heading-xxlarge font-display"
      >
        {{ data.title }}
      </h2>
      <p
        v-if="data.text"
        class="xl:text-heading-alt-h2 lg:text-heading-alt-h3 text-heading-alt-h4 font-sans"
      >
        {{ data.text }}
      </p>
    </div>
  </div>
</template>
