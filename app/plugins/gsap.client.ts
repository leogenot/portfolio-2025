import type _ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(async () => {
    let gsap: typeof globalThis.gsap | undefined = undefined
    let ScrollTrigger: typeof _ScrollTrigger | undefined = undefined
    let SplitText = null
    let Flip = null
    let Inertia = null
    let Draggable = null

    gsap = (await import('gsap')).gsap

    // import your plugins here
    ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger
    SplitText = (await import('gsap/SplitText')).SplitText
    Flip = (await import('gsap/Flip')).Flip
    Inertia = (await import('gsap/InertiaPlugin')).InertiaPlugin
    Draggable = (await import('gsap/Draggable')).Draggable

    // register the plugins
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(SplitText)
    gsap.registerPlugin(Flip)
    gsap.registerPlugin(Draggable, Inertia);

    return {
        provide: {
            gsap,
            SplitText,
            ScrollTrigger,
            Flip,
            Inertia,
            Draggable
        },
    }
})