<script lang="ts" setup>
const square = ref<HTMLElement | null>(null)

const { $Draggable } = useNuxtApp()
onMounted(async () => {
  await nextTick()
  $Draggable.create(square.value, {
    type: 'rotation',
    inertia: true,
  })
})
</script>
<template>
  <div ref="square" class="square bg-(--color-text)" />
</template>
