import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{ts,tsx,js,jsx,mdx}',
        './components/**/*.{ts,tsx,js,jsx,mdx}',
        './lib/**/*.{ts,tsx}',
        './types/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', 'system-ui', 'sans-serif'],
                mono: ['DM Mono', 'monospace'],
            },
            colors: {
                surface: {
                    DEFAULT: '#0d0d0f',
                    raised: '#111113',
                    overlay: '#18181c',
                },
            },
        },
    },
    plugins: [],
}

export default config