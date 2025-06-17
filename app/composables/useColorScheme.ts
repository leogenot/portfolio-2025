export const useColorScheme = () => {
    const colorScheme = useState<'light' | 'dark'>('color-scheme', () => {
        if (process.client) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'light'
    })

    const setColorScheme = (scheme: 'light' | 'dark') => {
        colorScheme.value = scheme
        const html = document.documentElement
        html.classList.remove('light', 'dark')
        html.classList.add(scheme)
    }

    // Watch and apply on client
    if (process.client) {
        watchEffect(() => {
            setColorScheme(colorScheme.value)
        })
    }

    return { colorScheme, setColorScheme }
}
