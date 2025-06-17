<script setup lang="ts">
defineProps<{
  data: TitleProps
}>()

// ------- GSAP ANIMATION -------
const { $SplitText, $gsap } = useNuxtApp()
const titleTarget = ref<HTMLElement | null>(null)
const textTarget = ref<HTMLElement | null>(null)

let scrollTriggers: gsap.core.ScrollTrigger[] = []
let splitInstances: SplitText[] = []

function animateSplitText(
  target: HTMLElement,
  options: {
    type?: string
    linesClass?: string
    yPercent?: number
    stagger?: number
  } = {},
) {
  const instance = $SplitText.create(target, {
    type: options.type || 'words,lines',
    linesClass: options.linesClass || 'line',
    mask: 'lines',
    autoSplit: true,
  })

  splitInstances.push(instance)

  $gsap.set(target, { opacity: 1 })

  const tween = $gsap.fromTo(
    instance.lines,
    { yPercent: options.yPercent ?? 100 },
    {
      yPercent: 0,
      ease: 'power2.out',
      stagger: options.stagger ?? 0.15,
      duration: 1,
      scrollTrigger: {
        trigger: target,
        start: `top 90%`,
        end: `bottom top`,
        toggleActions: 'play reverse play reverse',
        // markers: true,
      },
    },
  )

  scrollTriggers.push(tween.scrollTrigger!)
}

onMounted(() => {
  if (import.meta.server) return
  if (titleTarget.value) {
    animateSplitText(titleTarget.value, {
      type: 'words,lines',
      linesClass: 'line',
      yPercent: -100,
      stagger: 0.2,
    })
  }
  if (textTarget.value) {
    animateSplitText(textTarget.value, {
      type: 'lines',
      linesClass: 'line',
      yPercent: -100,
      stagger: 0.2,
    })
  }
})

onBeforeUnmount(() => {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  splitInstances.forEach((inst) => inst.revert?.())
  splitInstances = []
})
</script>

<template>
  <div class="px-bleed flex flex-col gap-12 pt-12 pb-12 lg:gap-24 lg:pt-24 lg:pb-24">
    <div class="trumpet inline-flex w-full justify-between">
      <span v-if="data.trumpet" class="text-text-meta text-dark-grey font-mono lowercase"
        >({{ data.trumpet }})</span
      >
      <span v-if="data.indicator" class="text-text-meta font-mono lowercase">{{
        data.indicator
      }}</span>
    </div>
    <div class="title">
      <div
        v-if="data.title"
        ref="titleContainer"
        class="lg:text-heading-large split-container text-heading-small xl:text-heading-xxlarge font-display"
      >
        <h2 ref="titleTarget" class="split">{{ data.title }}</h2>
      </div>

      <div
        v-if="data.text"
        ref="textContainer"
        class="split-container xl:text-heading-alt-h2 lg:text-heading-alt-h3 text-heading-alt-h4 font-sans"
      >
        <p ref="textTarget" class="split">{{ data.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.split {
  opacity: 0;
  will-change: transform;
}

.split * {
  will-change: transform;
}
</style>
