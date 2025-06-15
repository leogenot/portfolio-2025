import type _ScrollTrigger from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(async () => {
    let gsap: typeof globalThis.gsap | undefined = undefined
    let ScrollTrigger: typeof _ScrollTrigger | undefined = undefined
    let SplitText = null
    let Flip = null
    let CSSPlugin = null
    let CustomEase = null

    gsap = (await import('gsap')).gsap

    // import your plugins here
    ScrollTrigger = (await import('gsap/ScrollTrigger')).ScrollTrigger
    SplitText = (await import('gsap/SplitText')).SplitText
    Flip = (await import('gsap/Flip')).Flip
    CSSPlugin = (await import('gsap/CSSPlugin')).CSSPlugin
    CustomEase = (await import('gsap/CustomEase')).CustomEase

    // register the plugins
    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(CustomEase)
    gsap.registerPlugin(SplitText)
    gsap.registerPlugin(CSSPlugin)
    gsap.registerPlugin(Flip)

    return {
        provide: {
            gsap,
            SplitText,
            ScrollTrigger,
            Flip,
            CustomEase
        },
    }
})