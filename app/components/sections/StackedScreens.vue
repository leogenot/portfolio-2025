<script setup lang="ts">
defineProps<{ data: StackedScreensProps }>()
const screenRefs = useTemplateRef('screens')
const { $SplitText, $gsap } = useNuxtApp()
let scrollTriggers: gsap.core.ScrollTrigger[] = []

onMounted(() => {
  if (import.meta.server) return
  screenRefs.value?.forEach((slide) => {
    const contentWrapper = slide.querySelector('.content-wrapper')
    const content = slide.querySelector('.content')

    const tween = $gsap.to(content, {
      scale: 0.7,
      ease: 'power1.in',
      filter: 'blur(10px)',
      borderRadius: '5%',
      scrollTrigger: {
        pin: contentWrapper,
        trigger: slide,
        start: 'top',
        end: 'bottom',
        scrub: true,
        // markers: true,
      },
    })
    scrollTriggers.push(tween)
  })
})

onBeforeUnmount(() => {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
})
</script>

<template>
  <div class="stacked-screens h-full">
    <div
      v-for="(screen, index) in data"
      ref="screens"
      :key="index"
      class="slide h-screen"
      :class="{ 'is-active': (index = 0) }"
    >
      <div class="content-wrapper h-full w-full perspective-[250vw]">
        <div
          class="content absolute inset-0 flex origin-[50%_10%] flex-col justify-between overflow-clip transform-3d"
        >
          <div
            class="grid lg:min-h-screen lg:grid-cols-12"
            :class="{
              'bg-(--color-surface)': screen.leftMedia,
              'bg-(--color-background)': !screen.leftMedia,
            }"
          >
            <div
              class="media h-full w-full overflow-clip bg-red-500"
              :class="{
                'order-1 lg:order-0 lg:col-start-1 lg:col-end-5': screen.leftMedia,
                'order-1 lg:order-1 lg:col-start-9 lg:col-end-13': !screen.leftMedia,
              }"
            >
              <NuxtImg
                v-if="screen.media?.type === 'image'"
                :src="screen.media.src"
                sizes="100vw sm:50vw"
                format="webp"
                :alt="screen.media.src || 'Image alt'"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div
              class="content px-bleed flex h-full w-full flex-col justify-between gap-9 py-12 lg:py-24 xl:py-32"
              :class="{
                'order-0 lg:order-1 lg:col-start-5 lg:col-end-12': screen.leftMedia,
                'order-0 lg:order-0 lg:col-start-1 lg:col-end-8': !screen.leftMedia,
              }"
            >
              <div class="heading">
                <h2
                  v-if="screen.title"
                  class="text-heading-h2 lg:text-heading-h1 xl:text-heading-small font-display"
                >
                  {{ screen.title }}
                </h2>
                <p
                  v-if="screen.text"
                  class="text-text-medium lg:text-heading-alt-h5 xl:text-heading-alt-h4 font-sans"
                >
                  {{ screen.text }}
                </p>
              </div>
              <div class="infos flex flex-col gap-2 lg:gap-8">
                <span
                  v-if="screen.projectType"
                  class="text-text-meta font-mono text-(--color-muted)"
                  >({{ screen.projectType }})</span
                >
                <div class="more-infos flex items-end justify-between">
                  <ul
                    v-if="screen.techStack"
                    class="text-text-medium xl:text-heading-alt-h5 font-mono"
                  >
                    <li v-for="(item, index) in screen.techStack" :key="index">{{ item.title }}</li>
                  </ul>
                  <NuxtLink
                    v-if="screen.link"
                    :href="screen.link"
                    target="_blank"
                    :aria-label="`Link to ${screen.link}`"
                    class="text-text-medium xl:text-heading-alt-h5 font-mono"
                    >{{ screen.linkLabel }}</NuxtLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
