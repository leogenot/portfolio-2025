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

onMounted(() => {
  if (!pinHeight.value || !parentCircleLeft.value || !parentCircleRight.value) return
  const leftItems = parentCircleLeft.value.querySelectorAll('.circle')
  const rightItems = parentCircleRight.value.querySelectorAll('.circle')
  const angle = 14

  // const pinHeight = document.querySelector('.pin-height')

  leftItems.forEach((el, index) => {
    $gsap.set(el, { rotation: index * angle })
    // Negative angle for the child
    $gsap.set(el.querySelector('.project-link'), { rotation: -index * angle })
  })
  rightItems.forEach((el, index) => {
    $gsap.set(el, { rotation: index * angle })
    // Negative angle for the child
    $gsap.set(el.querySelector('.media'), { rotation: -index * angle })
  })

  $gsap.to(parentCircleLeft.value, {
    rotation: -(180 + angle * leftItems.length),
    ease: 'none', // Linear movement
    scrollTrigger: {
      trigger: pinHeight.value, // Listen to pin-height position
      pin: '.container', // Pin the container
      start: 'top top',
      end: 'bottom bottom',
      scrub: true, // Progression linked to scroll
      markers: true,
    },
  })
  $gsap.to(parentCircleLeft.value.querySelectorAll('.project-link'), {
    rotation: '+=' + (180 + angle * leftItems.length),
    ease: 'none', // Linear movement
    scrollTrigger: {
      trigger: pinHeight.value, // Listen to pin-height position
      start: 'top top',
      end: 'bottom bottom',
      scrub: true, // Progression linked to scroll
      markers: true,
    },
  })

  $gsap.to(parentCircleRight.value, {
    rotation: -(180 + angle * leftItems.length),
    ease: 'none', // Linear movement
    scrollTrigger: {
      trigger: pinHeight.value, // Listen to pin-height position
      start: 'top top',
      end: 'bottom bottom',
      scrub: true, // Progression linked to scroll
      markers: true,
    },
  })
  $gsap.to(parentCircleRight.value.querySelectorAll('.media'), {
    rotation: '+=' + (180 + angle * leftItems.length),
    ease: 'none', // Linear movement
    scrollTrigger: {
      trigger: pinHeight.value, // Listen to pin-height position
      start: 'top top',
      end: 'bottom bottom',
      scrub: true, // Progression linked to scroll
      markers: true,
    },
  })
})
</script>

<template>
  <div ref="pinHeight" class="pin-height pointer-events-none">
    <div class="pointer-events-none container">
      <div
        ref="parentCircleLeft"
        class="parent-circle parent-circle-left font-display text-heading-h1 pointer-events-none"
      >
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto"
            >{{ project.title }}</NuxtLink
          >
        </div>
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto"
            >{{ project.title }}</NuxtLink
          >
        </div>
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto"
            >{{ project.title }}</NuxtLink
          >
        </div>
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto"
            >{{ project.title }}</NuxtLink
          >
        </div>
        <div
          v-for="(project, index) in data"
          ref="titles"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink
            :to="project.slug"
            :aria-label="project.title"
            class="label project-link pointer-events-auto"
            >{{ project.title }}</NuxtLink
          >
        </div>
      </div>
      <div ref="parentCircleRight" class="parent-circle parent-circle-right pointer-events-none">
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink :to="project.slug" :aria-label="project.title" class="pointer-events-auto">
            <img :src="project.thumbnail" alt="" class="media" />
          </NuxtLink>
        </div>
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink :to="project.slug" :aria-label="project.title" class="pointer-events-auto">
            <img :src="project.thumbnail" alt="" class="media" />
          </NuxtLink>
        </div>
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink :to="project.slug" :aria-label="project.title" class="pointer-events-auto">
            <img :src="project.thumbnail" alt="" class="media" />
          </NuxtLink>
        </div>
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink :to="project.slug" :aria-label="project.title" class="pointer-events-auto">
            <img :src="project.thumbnail" alt="" class="media" />
          </NuxtLink>
        </div>
        <div
          v-for="(project, index) in data"
          ref="thumbnails"
          :key="index"
          class="circle pointer-events-none"
        >
          <NuxtLink :to="project.slug" :aria-label="project.title" class="pointer-events-auto">
            <img :src="project.thumbnail" alt="" class="media" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.pin-height {
  height: 500vh;
}
.container {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
.parent-circle {
  width: 80vw;
  height: 80vw;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
.parent-circle-left {
  right: 52%;
}
.parent-circle-right {
  left: 52%;
}
.circle {
  position: absolute;
  inset: 0;
}
.label {
  position: absolute;
  right: 50%;
  top: 100%;
  transform: translate(0, -50%);
  transform-origin: 100% 50%;
  white-space: nowrap;
}
.media {
  width: 12vw;
  height: 12vw;
  display: block;
  object-fit: cover;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(0, -50%);
  transform-origin: 0 50%;
  border-radius: 0.8vw;
  filter: drop-shadow(0px 4px 24px rgba(0, 0, 0, 0.13));
}

@media (max-width: 768px) {
  .parent-circle {
    width: 160vw;
    height: 160vw;
  }
  .label {
    font-size: 6vw;
  }
  .media {
    width: 16vw;
    height: 16vw;
  }
}
</style>
