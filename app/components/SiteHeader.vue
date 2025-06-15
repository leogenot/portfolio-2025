<script lang="ts" setup>
const { data } = await useAsyncData('navigation', () => {
  return queryCollection('page').all()
})
const border = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)
const square = ref<HTMLElement | null>(null)
const menuRefs = useTemplateRef('menus')
const menusWithoutIndex = data.value?.filter((item) => item.slug !== '/')

const { $gsap } = useNuxtApp()
let tl: gsap.core.Timeline
onMounted(async () => {
  await nextTick()
  tl = $gsap.timeline()
  tl.fromTo(
    logo.value?.$el,
    {
      y: -50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    },
  )
    .fromTo(
      menuRefs.value,
      {
        y: -50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '-=0.25',
    )
    .fromTo(
      border.value,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '<',
    )
})

onUnmounted(() => {
  tl?.kill()
})
</script>

<template>
  <nav ref="navigation" class="px-bleed fixed top-0 left-0 w-full">
    <div class="safari-blur relative inline-flex w-full justify-between py-4">
      <div class="logo inline-flex items-center gap-1">
        <Logo class="h-3 w-3 lg:h-4 lg:w-4" />
        <NuxtLink ref="logo" to="/" aria-label="Home" class="text-lg uppercase lg:text-xl"
          >Léo Genot</NuxtLink
        >
      </div>
      <ul v-if="data" class="gap-gap inline-flex items-center">
        <li
          v-for="item in menusWithoutIndex"
          :key="item.slug"
          ref="menus"
          class="text-lg uppercase lg:text-xl"
        >
          <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
        </li>
      </ul>
      <div ref="border" class="absolute bottom-0 left-0 h-[1px] w-full border bg-black" />
    </div>
  </nav>
</template>
