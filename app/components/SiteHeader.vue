<script lag="ts" setup>
const { data } = await useAsyncData('navigation', () => {
  return queryCollection('page').all()
})

const menusWithoutIndex = data.value.filter((item) => item.slug !== '/')
</script>

<template>
  <nav>
    <ul v-if="data" class="gap-gap inline-flex items-center">
      <li v-for="item in menusWithoutIndex" :key="item.slug">
        <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
