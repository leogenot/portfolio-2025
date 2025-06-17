<script lang="ts" setup>
const { data } = await useAsyncData('navigation', () => {
  return queryCollection('page').all()
})
const knob = ref<HTMLElement | null>(null)
const chat = ref<HTMLElement | null>(null)
const menuRefs = useTemplateRef('menus')
const menusWithoutIndex = data.value?.filter((item) => item.slug !== '/')
const route = useRoute()
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
      end: `bottom bottom`,
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
    class="px-bleed text-text-small fixed top-0 left-0 flex h-16 w-full items-end font-mono lowercase"
  >
    <div class="relative inline-flex w-full justify-between overflow-clip">
      <div class="logo inline-flex items-center gap-1">
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
      <ul v-if="data" class="inline-flex items-center gap-12">
        <li
          v-for="item in menusWithoutIndex"
          :key="item.slug"
          ref="menus"
          class="relative opacity-0"
        >
          <NuxtLink :to="item.slug">{{ item.title }}</NuxtLink>
          <transition name="underline" mode="out-in">
            <div
              v-if="route.path === item.slug"
              class="underline-border absolute bottom-0 left-0 h-[1px] w-full bg-black"
            />
          </transition>
        </li>
      </ul>
      <a href="mailto:leogenot@gmail.com" ref="chat" class="lets-chat underline opacity-0"
        >Lets Chat</a
      >
    </div>
    <div class="gradient-blur" />
  </nav>
</template>

<style scoped>
.underline-enter-active,
.underline-leave-active {
  transition: transform 0.2s ease-in-out;
}

.underline-enter-from,
.underline-leave-to {
  transform: scaleX(0);
}

.gradient-blur {
  --nav-blur: 12px;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  pointer-events: none;
}
.gradient-blur::before,
.gradient-blur::after {
  position: absolute;
  inset: 0;
}
.gradient-blur::before {
  transition: backdrop-filter 0.3s ease-in-out;
  content: '';
  z-index: -1;
  -webkit-backdrop-filter: blur(var(--nav-blur));
  backdrop-filter: blur(var(--nav-blur));
  mask: linear-gradient(
    to bottom,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 1) 60%,
    rgba(31, 31, 35, 0) 100%
  );
  mask: linear-gradient(
    to bottom,
    rgba(31, 31, 35, 1) 50%,
    rgba(31, 31, 35, 1) 60%,
    rgba(31, 31, 35, 0) 100%
  );
}
</style>
