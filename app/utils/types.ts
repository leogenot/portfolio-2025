export type TitleProps = {
    title: string
    text: string
    trumpet?: string
    indicator?: string
    link?: string
}

export type DoubleMediaProps = {
    medias: {
        type: 'image' | 'video'
        src: string
    }[]
}

export type SplitScreenProps = {
    title: string
    text: string
    media: {
        type: 'image' | 'video'
        src: string
    }
    projectType: string
    link: string
    techStack: {
        title: string
    }[]
    leftMedia: boolean
}


export type PageSection =
    | { type: 'title'; data: TitleProps }
    | { type: 'double-media'; data: DoubleMediaProps }
    | { type: 'split-screen'; data: SplitScreenProps }
