<script setup lang="ts">
import { NuxtLink } from '#components'

const { data } = await useAsyncData('projects', () => {
  return queryCollection('project').all()
})
const { $gsap } = useNuxtApp()
const titleRefs = useTemplateRef('titles')
const projectRefs = useTemplateRef('thumbnails')
const pinHeight = ref<HTMLElement | null>(null)
const parentCircleLeft = ref<HTMLElement | null>(null)
const parentCircleRight = ref<HTMLElement | null>(null)
let scrollTriggers: gsap.core.ScrollTrigger[] = []

onMounted(() => {
  if (!pinHeight.value || !parentCircleLeft.value || !parentCircleRight.value) return
  const leftItems = parentCircleLeft.value.querySelectorAll('.circle')
  const rightItems = parentCircleRight.value.querySelectorAll('.circle')
  const angle = 14

  leftItems.forEach((el, index) => {
    $gsap.set(el, { rotation: index * angle })
    // Negative angle for the child
    $gsap.set(el.querySelector('.project-link'), { rotation: -index * angle })
  })
  rightItems.forEach((el, index) => {
    $gsap.set(el, { rotation: index * angle })
    // Negative angle for the child
    $gsap.set(el.querySelector('.media-container'), { rotation: -index * angle })
  })

  const tween1 = $gsap.to(parentCircleLeft.value, {
    rotation: -(180 + angle * leftItems.length),
    ease: 'none',
    scrollTrigger: {
      trigger: pinHeight.value,
      pin: '.container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true,
    },
  })
  const tween2 = $gsap.to(parentCircleLeft.value.querySelectorAll('.project-link'), {
    rotation: '+=' + (180 + angle * leftItems.length),
    ease: 'none',
    scrollTrigger: {
      trigger: pinHeight.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true,
    },
  })

  const tween3 = $gsap.to(parentCircleRight.value, {
    rotation: -(180 + angle * leftItems.length),
    ease: 'none',
    scrollTrigger: {
      trigger: pinHeight.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true,
    },
  })
  const tween4 = $gsap.to(parentCircleRight.value.querySelectorAll('.media-container'), {
    rotation: '+=' + (180 + angle * leftItems.length),
    ease: 'none',
    scrollTrigger: {
      trigger: pinHeight.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      markers: true,
    },
  })
  scrollTriggers.push(tween1, tween2, tween3, tween4)
})

onBeforeUnmount(() => {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
})
</script>

<template>
  <div ref="pinHeight" class="pin-height pointer-events-none h-[500vh]">
    <div class="pointer-events-none relative container h-screen overflow-hidden">
      <div
        ref="parentCircleLeft"
        class="parent-circle parent-circle-left font-display text-heading-alt-h5 lg:text-heading-h5 xl:text-heading-h3 xxl:text-heading-h1 pointer-events-none absolute top-1/2 right-[52%] h-[160vw] w-[160vw] -translate-y-1/2 lg:h-[80vw] lg:w-[80vw]"
      >
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none absolute inset-0"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto absolute top-full right-1/2 origin-[100%_50%] -translate-y-1/2 whitespace-nowrap"
            >{{ project.title }}</NuxtLink
          >
        </div>
      </div>
      <div
        ref="parentCircleRight"
        class="parent-circle parent-circle-right pointer-events-none absolute top-1/2 left-[52%] h-[160vw] w-[160vw] -translate-y-1/2 lg:h-[80vw] lg:w-[80vw]"
      >
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none absolute inset-0"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="media-container pointer-events-auto absolute top-0 left-1/2 block h-[16vw] w-[16vw] origin-[0_50%] -translate-y-1/2 overflow-clip rounded-sm object-cover drop-shadow-[0px_4px_24px_rgba(0,0,0,0.13)] lg:h-[12vw] lg:w-[12vw]"
          >
            <img :src="project.thumbnail" alt="" class="media h-full w-full object-cover" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
