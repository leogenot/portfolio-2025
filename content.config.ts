import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        page: defineCollection({
            type: 'page',
            source: 'pages/*.json',
            schema: z.object({
                title: z.string(),
                slug: z.string(),
                description: z.string(),
                hero: z.string(),
                projects: z.array(z.object({
                    title: z.string(),
                    slug: z.string(),
                    metaDescription: z.string(),
                })),
                pageBuilder: z.array(z.object({
                    type: z.string(),
                    data: z.object({
                        leftMedia: z.boolean().optional(),
                        title: z.string().optional(),
                        text: z.string().optional(),
                        trumpet: z.string().optional(),
                        indicator: z.string().optional(),
                        link: z.string().optional(),
                        medias: z.array(z.object({
                            type: z.string(),
                            src: z.string()
                        })),
                        projectType: z.string().optional(),
                        techStack: z.array(z.object({
                            title: z.string()
                        })).optional(),
                    }),

                })).optional()
            })
        }),
        project: defineCollection({
            type: 'page',
            source: 'projects/*.json',
            schema: z.object({
                title: z.string(),
                slug: z.string(),
                description: z.string(),
                hero: z.string(),
                projects: z.array(z.object({
                    title: z.string(),
                    slug: z.string(),
                    metaDescription: z.string(),
                })),
                pageBuilder: z.array(z.object({
                    type: z.string(),
                    data: z.object({
                        leftMedia: z.boolean().optional(),
                        title: z.string().optional(),
                        text: z.string().optional(),
                        trumpet: z.string().optional(),
                        indicator: z.string().optional(),
                        link: z.string().optional(),
                        medias: z.array(z.object({
                            type: z.string(),
                            src: z.string()
                        })),
                        projectType: z.string().optional(),
                        techStack: z.array(z.object({
                            title: z.string()
                        })).optional(),
                    }),

                })).optional()
            })
        }),
    }
})
