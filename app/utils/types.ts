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
    linkLabel: string
    techStack: {
        title: string
    }[]
    leftMedia: boolean
}

export type StackedScreen = {
    title: string
    text: string
    media: {
        type: 'image' | 'video'
        src: string
    }
    projectType: string
    link: string
    linkLabel: string
    techStack: {
        title: string
    }[]
}

export type StackedScreensProps = {
    stackedScreens: SplitScreenProps[]
}

export type PageSection =
    | { type: 'title'; data: TitleProps }
    | { type: 'double-media'; data: DoubleMediaProps }
    | { type: 'split-screen'; data: SplitScreenProps }
    | { type: 'stacked-screens'; data: StackedScreensProps }
