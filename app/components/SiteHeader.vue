<script lang="ts" setup>
const { data } = await useAsyncData('navigation', () => {
  return queryCollection('page').all()
})
const logo = ref<HTMLElement | null>(null)
const chat = ref<HTMLElement | null>(null)
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
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.inOut',
    },
  )
    .fromTo(
      menuRefs.value,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.1,
      },
      '-=0.5',
    )
    .fromTo(
      chat.value,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power2.inOut',
      },
      '-=0.5',
    )
})

onUnmounted(() => {
  tl?.kill()
})
</script>

<template>
  <nav
    ref="navigation"
    class="px-bleed text-text-medium fixed top-0 left-0 flex h-16 w-full items-end font-sans font-semibold"
  >
    <div class="relative inline-flex w-full justify-between overflow-clip">
      <div class="logo inline-flex items-center gap-1">
        <NuxtLink ref="logo" to="/" aria-label="Home" class="">
          <div class="knob relative">
            <div class="indicator relative origin-center">
              <div
                class="indicator-inner absolute top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FF5D1F]"
              ></div>
            </div>
            <div class="h-9 w-9 rounded-full bg-black"></div>
          </div>
        </NuxtLink>
      </div>
      <ul v-if="data" class="inline-flex items-center gap-12">
        <li v-for="item in data" :key="item.slug" ref="menus" class="">
          <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
        </li>
      </ul>
      <div ref="chat" class="lets-chat underline">Lets Chat</div>
    </div>
  </nav>
</template>
