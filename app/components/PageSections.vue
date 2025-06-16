<script setup lang="ts">
const props = defineProps<{
  sections: PageSection[]
}>()
</script>

<template>
  <section v-for="({ type, data }, index) in sections || []" :key="index" :data-type="type">
    <SectionsTitle v-if="type === 'title'" :data="data || {}" />
    <SectionsDoubleMedia v-else-if="type === 'double-media'" :data="data || {}" />
    <SectionsSplitScreen v-else-if="type === 'split-screen'" :data="data || {}" />
  </section>
</template>
