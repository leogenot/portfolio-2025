<script setup lang="ts">
defineProps<{ data: TitleProps }>()

// ------- GSAP ANIMATION -------
const { $SplitText, $gsap, $ScrollTrigger } = useNuxtApp()
const textContainer = ref<HTMLElement | null>(null)
const textTarget = ref<HTMLElement | null>(null)
const titleContainer = ref<HTMLElement | null>(null)
const titleTarget = ref<HTMLElement | null>(null)
const randomId = Math.floor(Math.random() * 1000)

const splitTitleInstance = ref<any>(null)
const splitTextInstance = ref<any>(null)
const titleTween = ref<any>(null)
const textTween = ref<any>(null)

const scrollTriggers: any[] = []

async function cleanupAnimation(): Promise<void> {
  // Kill all stored ScrollTriggers
  console.log('scrollTriggers', scrollTriggers)
  scrollTriggers.forEach((st) => st?.kill())
  scrollTriggers.length = 0

  // Revert SplitText instances
  splitTitleInstance.value?.revert()
  splitTextInstance.value?.revert()
  splitTitleInstance.value = null
  splitTextInstance.value = null

  // Kill tweens
  titleTween.value?.kill()
  textTween.value?.kill()
  titleTween.value = null
  textTween.value = null

  await Promise.resolve()
}

async function initTitleAnimation() {
  if (!titleTarget.value || !titleContainer.value) return
  $gsap.set(titleTarget.value, { opacity: 1 })

  splitTitleInstance.value = $SplitText.create(titleTarget.value, {
    id: 'titleAnimationSplit',
    type: 'words,lines',
    mask: 'lines',
    linesClass: 'line',
    autoSplit: true,
    onSplit: (instance) => {
      titleTween.value = $gsap.fromTo(
        instance.words,
        { yPercent: 120 },
        {
          yPercent: 0,
          stagger: 0.2,
          scrollTrigger: {
            id: 'titleAnimation' + randomId,
            trigger: titleContainer.value,
            markers: true,
            start: `top 90%`,
            end: `bottom top`,
            toggleActions: 'play reverse play reverse',
            onEnter: () => {},
          },
        },
      )
      scrollTriggers.push(titleTween.value.scrollTrigger)
    },
  })
}

async function initTextAnimation() {
  if (!textTarget.value || !textContainer.value) return
  $gsap.set(textTarget.value, { opacity: 1 })

  splitTextInstance.value = $SplitText.create(textTarget.value, {
    id: 'textAnimationSplit',
    type: 'words,lines',
    mask: 'lines',
    linesClass: 'line',
    autoSplit: true,
    onSplit: (instance) => {
      textTween.value = $gsap.fromTo(
        instance.lines,
        { yPercent: 120 },
        {
          yPercent: 0,
          stagger: 0.2,
          scrollTrigger: {
            id: 'textAnimation' + randomId,
            trigger: textContainer.value,
            markers: true,
            start: `top 90%`,
            end: `bottom top`,
            toggleActions: 'play reverse play reverse',
          },
        },
      )
      scrollTriggers.push(textTween.value.scrollTrigger)
    },
  })
}

onMounted(async () => {
  await nextTick()
  await cleanupAnimation()
  await initTitleAnimation()
  await initTextAnimation()
})

onUnmounted(async () => {
  await cleanupAnimation()
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
  /* opacity: 0; */
  will-change: transform;
}

.split * {
  will-change: transform;
}
</style>
