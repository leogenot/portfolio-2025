<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})

// ------- GSAP ANIMATION -------
const { $SplitText, $gsap, $ScrollTrigger } = useNuxtApp()
const container = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)

async function cleanupAnimation(): Promise<void> {
  $ScrollTrigger.getById('titleAnimation')?.kill()

  // if (target.value) {
  //   setTimeout(() => {
  //     $gsap.set(target.value, { clearProps: 'all' })
  //   }, 2000)
  // }

  await Promise.resolve()
}

const config = useRuntimeConfig().public

async function initAnimation() {
  if (!target.value || !container.value) return
  $gsap.set(target.value, { opacity: 1 })

  // Split text
  $SplitText.create(target.value, {
    id: 'titleAnimationSplit',
    type: 'words,lines',
    mask: 'lines',
    linesClass: 'line',
    autoSplit: true,
    onSplit: (instance) => {
      return $gsap.fromTo(
        instance.lines,
        {
          yPercent: 120,
        },
        {
          yPercent: 0,
          stagger: 0.2,
          scrollTrigger: {
            id: 'titleAnimation',
            trigger: container.value,
            markers: true,
            start: `top 90%`,
            end: `bottom top`,
            toggleActions: 'play reverse play reverse',
          },
        },
      )
    },
  })
}

onMounted(async () => {
  await nextTick()
  await cleanupAnimation()
  await initAnimation()
})

onBeforeUnmount(async () => {
  await cleanupAnimation()
})
</script>

<template>
  <section class="hero px-bleed flex min-h-screen w-full flex-row items-start gap-4 pt-30 lg:pt-70">
    <div v-if="title" ref="container" class="split-container">
      <h1 ref="target" class="split text-xl lg:text-4xl">{{ title }}</h1>
    </div>
  </section>
</template>

<style scoped>
.split {
  /* opacity: 0; */
  will-change: transform;
}

.split * {
  will-change: transform;
}
</style>
