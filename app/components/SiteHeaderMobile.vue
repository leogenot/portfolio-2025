<script lang="ts" setup>
const { data } = await useAsyncData('navigation', () => {
  return queryCollection('page').all()
})
const knob = ref<HTMLElement | null>(null)
const chat = ref<HTMLElement | null>(null)
const menuRefs = useTemplateRef('menus')
const menusWithoutIndex = data.value?.filter((item) => item.slug !== '/')

const { $gsap, $ScrollTrigger } = useNuxtApp()
let knobTl: gsap.core.Timeline
let tl: gsap.core.Timeline

async function cleanupAnimation(): Promise<void> {
  $ScrollTrigger.getById('knob-rotate')?.kill()
  knobTl?.kill()
  tl?.kill()
  await Promise.resolve()
}

async function initKnobAnimation() {
  if (!knob.value?.$el) return

  const page = document.querySelector('.main-site')
  console.log('main-site', page)
  if (!page) return

  knobTl = $gsap.timeline()
  knobTl.to(knob.value?.$el, {
    rotate: 360,
    scrollTrigger: {
      id: 'knob-rotate',
      trigger: page,
      //markers: true,
      scrub: true,
      start: `top top`,
      end: `bottom-=64px bottom-=64px`,
    },
  })
}

function initMenusAnimation() {
  tl = $gsap.timeline()
  $gsap.set(menuRefs.value, { opacity: 1 })
  $gsap.set(knob.value.$el, { opacity: 1 })
  $gsap.set(chat.value, { opacity: 1 })
  tl.fromTo(
    knob.value?.$el,
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
}
onMounted(async () => {
  await nextTick()
  await cleanupAnimation()
  await initKnobAnimation()
  initMenusAnimation()
})

onUnmounted(async () => {
  await cleanupAnimation()
})
</script>

<template>
  <nav
    ref="navigation"
    class="text-text-small sticky bottom-0 flex h-16 w-full items-end font-mono"
  >
    <div
      class="pointer-events-none absolute bottom-0 left-0 flex h-dvh w-screen flex-col items-center justify-between"
    >
      <div
        class="px-bleed py-bleed pointer-events-auto relative inline-flex w-full justify-between"
      >
        <div class="logo relative inline-flex items-center gap-1 overflow-clip">
          <NuxtLink ref="knob" to="/" aria-label="Home" class="opacity-0">
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
        <div ref="chat" class="lets-chat underline opacity-0">Lets Chat</div>
        <!-- <div class="gradient-blur-top" /> -->
      </div>
      <div class="bottom-links pointer-events-auto relative w-full">
        <ul
          v-if="data"
          class="px-bleed py-bleed pointer-events-auto relative inline-flex w-full items-center justify-between gap-12"
        >
          <li v-for="item in menusWithoutIndex" :key="item.slug" ref="menus" class="opacity-0">
            <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
          </li>
        </ul>
        <!-- <div class="gradient-blur-bottom" /> -->
      </div>
    </div>
  </nav>
</template>

<style scoped>
.gradient-blur-top {
  --nav-blur: 12px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  pointer-events: none;
}
.gradient-blur-top::before,
.gradient-blur-top::after {
  position: absolute;
  inset: 0;
}
.gradient-blur-top::before {
  transition: backdrop-filter 0.3s ease-in-out;
  content: '';
  z-index: -1;
  -webkit-backdrop-filter: blur(var(--nav-blur));
  backdrop-filter: blur(var(--nav-blur));
  mask: linear-gradient(
    to bottom,
    rgba(31, 31, 35, 1) 0%,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 0) 100%
  );
  mask: linear-gradient(
    to bottom,
    rgba(31, 31, 35, 1) 0%,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 0) 100%
  );
}

.gradient-blur-bottom {
  --nav-blur: 12px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  pointer-events: none;
}
.gradient-blur-bottom::before,
.gradient-blur-bottom::after {
  position: absolute;
  inset: 0;
}
.gradient-blur-bottom::before {
  transition: backdrop-filter 0.3s ease-in-out;
  content: '';
  z-index: -1;
  -webkit-backdrop-filter: blur(var(--nav-blur));
  backdrop-filter: blur(var(--nav-blur));
  mask: linear-gradient(
    to top,
    rgba(31, 31, 35, 1) 0%,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 0) 100%
  );
  mask: linear-gradient(
    to top,
    rgba(31, 31, 35, 1) 0%,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 0) 100%
  );
}
</style>
