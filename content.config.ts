import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        page: defineCollection({
            type: 'page',
            source: 'pages/*.md',
            schema: z.object({
                title: z.string(),
                slug: z.string(),
                description: z.string(),
                hero: z.string(),
                projects: z.array(z.object({
                    title: z.string(),
                    slug: z.string(),
                    metaDescription: z.string(),
                }))
            })
        }),
        project: defineCollection({
            type: 'page',
            source: 'projects/*.md',
            schema: z.object({
                title: z.string(),
                slug: z.string(),
                description: z.string(),
                technologies: z.array(z.string()),
                medias: z.array(z.string()),
            })
        })
    }
})
