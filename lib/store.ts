import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { saveImage, loadImage, deleteImage } from '@/lib/imagedb'
import type { MockupSlide, Background, TextLayer, DeviceFrame, PhoneTransform, CanvasSize } from '@/types/editor'

// Templates - up to 10 pre-made designs
export interface Template {
    id: string
    name: string
    description: string
    slides: Omit<MockupSlide, 'id' | 'screenshotUrl'>[]
    thumbnail?: string
}

const BGRADS: Background[] = [
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#0f2027', position: 0 }, { color: '#2c5364', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#1a1a2e', position: 0 }, { color: '#0f3460', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 160, stops: [{ color: '#0d0d0d', position: 0 }, { color: '#1a0533', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 45, stops: [{ color: '#f953c6', position: 0 }, { color: '#b91d73', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }] } },
]

// Template Library (10 templates)
const TEMPLATES: Template[] = [
    {
        id: nanoid(),
        name: 'Modern Bold',
        description: 'Bold typography with vibrant gradients',
        slides: [{
            label: 'Feature 1',
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] } },
            device: 'pixel-8',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Amazing Feature',
                fontSize: 80, fontWeight: 800, color: '#ffffff',
                align: 'center', letterSpacing: -2, lineHeight: 1.0,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Showcase your app with style',
                fontSize: 40, fontWeight: 500, color: '#e0e0ff',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.4,
                x: 50, y: 28, rotation: 0, width: 75,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Minimalist Clean',
        description: 'Simple and elegant with ample whitespace',
        slides: [{
            label: 'Clean Design',
            background: { type: 'solid', solid: '#ffffff' },
            device: 'iphone-15-pro',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Simple & Elegant',
                fontSize: 72, fontWeight: 700, color: '#000000',
                align: 'center', letterSpacing: -1, lineHeight: 1.1,
                x: 50, y: 12, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Minimal design speaks volumes',
                fontSize: 32, fontWeight: 400, color: '#666666',
                align: 'center', letterSpacing: 0, lineHeight: 1.5,
                x: 50, y: 24, rotation: 0, width: 70,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Dark Premium',
        description: 'Luxury dark theme with metallic accents',
        slides: [{
            label: 'Premium',
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#0f0c29', position: 0 }, { color: '#302b63', position: 50 }, { color: '#24243e', position: 100 }] } },
            device: 'galaxy-s24-ultra',
            deviceColor: 'titanium',
            title: {
                id: nanoid(), content: 'Premium Experience',
                fontSize: 76, fontWeight: 700, color: '#e0d5c8',
                align: 'center', letterSpacing: -1.5, lineHeight: 1.1,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Refined performance meets luxury',
                fontSize: 36, fontWeight: 400, color: '#b8a996',
                align: 'center', letterSpacing: 1, lineHeight: 1.5,
                x: 50, y: 27, rotation: 0, width: 72,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Neon Glow',
        description: 'Vibrant neon colors for tech products',
        slides: [{
            label: 'Neon',
            background: { type: 'solid', solid: '#0a0e27' },
            device: 'oneplus-12',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Next Generation',
                fontSize: 78, fontWeight: 800, color: '#00ff88',
                align: 'center', letterSpacing: -2, lineHeight: 1.0,
                x: 50, y: 14, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Power beyond limits',
                fontSize: 38, fontWeight: 500, color: '#00ddff',
                align: 'center', letterSpacing: 1.5, lineHeight: 1.4,
                x: 50, y: 28, rotation: 0, width: 70,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Sunset Vibes',
        description: 'Warm gradient sunset aesthetic',
        slides: [{
            label: 'Sunset',
            background: { type: 'gradient', gradient: { angle: 45, stops: [{ color: '#ff6b6b', position: 0 }, { color: '#feca57', position: 50 }, { color: '#ff9ff3', position: 100 }] } },
            device: 'iphone-15',
            deviceColor: 'white',
            title: {
                id: nanoid(), content: 'Golden Hour',
                fontSize: 76, fontWeight: 800, color: '#ffffff',
                align: 'center', letterSpacing: -1.5, lineHeight: 1.0,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Warm, inviting, and memorable',
                fontSize: 36, fontWeight: 400, color: 'rgba(255,255,255,0.9)',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.4,
                x: 50, y: 27, rotation: 0, width: 72,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Ocean Blue',
        description: 'Calming blue gradient with deep tones',
        slides: [{
            label: 'Ocean',
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#0066cc', position: 0 }, { color: '#0099ff', position: 50 }, { color: '#00ccff', position: 100 }] } },
            device: 'galaxy-s24',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Dive Deep',
                fontSize: 74, fontWeight: 700, color: '#ffffff',
                align: 'center', letterSpacing: -1.5, lineHeight: 1.0,
                x: 50, y: 16, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Explore endless possibilities',
                fontSize: 34, fontWeight: 400, color: 'rgba(255,255,255,0.85)',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.5,
                x: 50, y: 28, rotation: 0, width: 70,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Forest Green',
        description: 'Nature-inspired green tones',
        slides: [{
            label: 'Nature',
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] } },
            device: 'pixel-8-pro',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Go Green',
                fontSize: 76, fontWeight: 800, color: '#ffffff',
                align: 'center', letterSpacing: -2, lineHeight: 1.0,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Sustainable & beautiful design',
                fontSize: 36, fontWeight: 500, color: '#c8e6c9',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.4,
                x: 50, y: 27, rotation: 0, width: 72,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Fire Red',
        description: 'Bold red and orange energetic theme',
        slides: [{
            label: 'Energy',
            background: { type: 'gradient', gradient: { angle: 45, stops: [{ color: '#ff0000', position: 0 }, { color: '#ff7300', position: 100 }] } },
            device: 'nothing-phone-2',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Feel the Heat',
                fontSize: 78, fontWeight: 800, color: '#ffffff',
                align: 'center', letterSpacing: -2, lineHeight: 1.0,
                x: 50, y: 14, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Ignite your passion',
                fontSize: 38, fontWeight: 600, color: '#ffe0b2',
                align: 'center', letterSpacing: 1, lineHeight: 1.4,
                x: 50, y: 27, rotation: 0, width: 70,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Purple Haze',
        description: 'Mystical purple gradient theme',
        slides: [{
            label: 'Mystery',
            background: { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] } },
            device: 'iphone-14-pro-max',
            deviceColor: 'titanium',
            title: {
                id: nanoid(), content: 'Mystique',
                fontSize: 76, fontWeight: 800, color: '#e0e0ff',
                align: 'center', letterSpacing: -2, lineHeight: 1.0,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Unlock extraordinary experiences',
                fontSize: 36, fontWeight: 400, color: '#d0d0ff',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.5,
                x: 50, y: 27, rotation: 0, width: 72,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
    {
        id: nanoid(),
        name: 'Monochrome Pro',
        description: 'Professional black and white theme',
        slides: [{
            label: 'Pro',
            background: { type: 'solid', solid: '#1a1a1a' },
            device: 'ipad-pro',
            deviceColor: 'black',
            title: {
                id: nanoid(), content: 'Professional',
                fontSize: 72, fontWeight: 700, color: '#ffffff',
                align: 'center', letterSpacing: -1.5, lineHeight: 1.0,
                x: 50, y: 15, rotation: 0, width: 80,
            },
            subtitle: {
                id: nanoid(), content: 'Work with precision and clarity',
                fontSize: 32, fontWeight: 400, color: '#cccccc',
                align: 'center', letterSpacing: 0.5, lineHeight: 1.5,
                x: 50, y: 28, rotation: 0, width: 70,
            },
            phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
        }],
    },
]

function makeSlide(i: number): MockupSlide {
    return {
        id: nanoid(),
        label: `Screenshot ${i + 1}`,
        background: BGRADS[i % BGRADS.length],
        screenshotUrl: null,
        device: 'pixel-8',
        deviceColor: 'black',
        title: {
            id: nanoid(), content: `Feature ${i + 1}`,
            fontSize: 72, fontWeight: 700, color: '#ffffff',
            align: 'center', letterSpacing: -1.5, lineHeight: 1.1,
            x: 50, y: 12, rotation: 0, width: 80,
        },
        subtitle: {
            id: nanoid(), content: 'A short description that sells',
            fontSize: 36, fontWeight: 400, color: 'rgba(255,255,255,0.75)',
            align: 'center', letterSpacing: 0, lineHeight: 1.5,
            x: 50, y: 22, rotation: 0, width: 70,
        },
        phone: { x: 50, y: 65, scale: 1.0, rotation: 0, frameW: 320, frameH: 680 },
    }
}

interface Store {
    slides: MockupSlide[]
    activeId: string | null
    canvas: CanvasSize
    zoom: number
    
    // History for undo/redo
    history: MockupSlide[][]
    historyIndex: number
    
    // Template system
    templates: Template[]
    
    setActive: (id: string) => void
    addSlide: () => void
    removeSlide: (id: string) => void
    duplicateSlide: (id: string) => void
    reorderSlides: (from: number, to: number) => void
    updateSlide: (id: string, patch: Partial<MockupSlide>) => void
    updateTitle: (id: string, patch: Partial<TextLayer>) => void
    updateSubtitle: (id: string, patch: Partial<TextLayer>) => void
    updatePhone: (id: string, patch: Partial<PhoneTransform>) => void
    updateBackground: (id: string, bg: Background) => void
    setScreenshot: (id: string, url: string | null) => void
    setDevice: (id: string, device: DeviceFrame) => void
    setCanvas: (w: number, h: number) => void
    setZoom: (z: number) => void
    uploadScreenshot: (id: string, file: File) => Promise<void>
    rehydrateImages: () => Promise<void>
    
    // History management
    undo: () => void
    redo: () => void
    canUndo: () => boolean
    canRedo: () => boolean
    
    // Template management
    applyTemplate: (templateId: string) => void
    getTemplates: () => Template[]
}

export const useStore = create<Store>()(
    persist(
        immer((set, get) => {
            const slides = [makeSlide(0), makeSlide(1), makeSlide(2)]
            
            // Helper to save state to history
            const saveToHistory = () => set(s => {
                s.historyIndex++
                s.history = s.history.slice(0, s.historyIndex)
                s.history.push(JSON.parse(JSON.stringify(s.slides)))
            })
            
            return {
                slides,
                activeId: slides[0].id,
                canvas: { width: 1080, height: 1920 },
                zoom: 0.28,
                history: [JSON.parse(JSON.stringify(slides))],
                historyIndex: 0,
                templates: TEMPLATES,

                setActive: (id) => set(s => { s.activeId = id }),

                addSlide: () => set(s => {
                    const sl = makeSlide(s.slides.length)
                    s.slides.push(sl)
                    s.activeId = sl.id
                    saveToHistory()
                }),

                removeSlide: (id) => set(s => {
                    if (s.slides.length <= 1) return
                    const i = s.slides.findIndex(sl => sl.id === id)
                    s.slides.splice(i, 1)
                    s.activeId = s.slides[Math.max(0, i - 1)].id
                    deleteImage(id)
                    saveToHistory()
                }),

                duplicateSlide: (id) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (!sl) return
                    const c = JSON.parse(JSON.stringify(sl))
                    c.id = nanoid()
                    c.label += ' copy'
                    c.title.id = nanoid()
                    c.subtitle.id = nanoid()
                    c.screenshotUrl = null
                    const i = s.slides.findIndex(sl => sl.id === id)
                    s.slides.splice(i + 1, 0, c)
                    s.activeId = c.id
                    saveToHistory()
                }),

                reorderSlides: (from, to) => set(s => {
                    const [r] = s.slides.splice(from, 1)
                    s.slides.splice(to, 0, r)
                    saveToHistory()
                }),

                updateSlide: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl, patch)
                    saveToHistory()
                }),

                updateTitle: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.title, patch)
                    saveToHistory()
                }),

                updateSubtitle: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.subtitle, patch)
                    saveToHistory()
                }),

                updatePhone: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.phone, patch)
                    saveToHistory()
                }),

                updateBackground: (id, bg) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.background = bg
                    saveToHistory()
                }),

                setScreenshot: (id, url) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.screenshotUrl = url
                    saveToHistory()
                }),

                setDevice: (id, device) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.device = device
                    saveToHistory()
                }),

                setCanvas: (w, h) => set(s => { s.canvas = { width: w, height: h } }),
                setZoom: (z) => set(s => { s.zoom = z }),

                uploadScreenshot: async (id, file) => {
                    const blob = new Blob([await file.arrayBuffer()], { type: file.type })
                    await saveImage(id, blob)
                    const url = URL.createObjectURL(blob)
                    set(s => {
                        const sl = s.slides.find(sl => sl.id === id)
                        if (sl) sl.screenshotUrl = url
                        saveToHistory()
                    })
                },

                rehydrateImages: async () => {
                    const { slides } = get()
                    for (const slide of slides) {
                        const url = await loadImage(slide.id)
                        if (url) {
                            set(s => {
                                const sl = s.slides.find(sl => sl.id === slide.id)
                                if (sl) sl.screenshotUrl = url
                            })
                        }
                    }
                },
                
                // Undo/Redo functionality
                undo: () => set(s => {
                    if (s.historyIndex > 0) {
                        s.historyIndex--
                        s.slides = JSON.parse(JSON.stringify(s.history[s.historyIndex]))
                    }
                }),
                
                redo: () => set(s => {
                    if (s.historyIndex < s.history.length - 1) {
                        s.historyIndex++
                        s.slides = JSON.parse(JSON.stringify(s.history[s.historyIndex]))
                    }
                }),
                
                canUndo: () => {
                    const { historyIndex } = get()
                    return historyIndex > 0
                },
                
                canRedo: () => {
                    const { historyIndex, history } = get()
                    return historyIndex < history.length - 1
                },
                
                // Template management
                applyTemplate: (templateId) => set(s => {
                    const template = TEMPLATES.find(t => t.id === templateId)
                    if (!template) return
                    
                    s.slides = template.slides.map(slide => ({
                        ...slide,
                        id: nanoid(),
                        title: { ...slide.title, id: nanoid() },
                        subtitle: { ...slide.subtitle, id: nanoid() },
                        screenshotUrl: null,
                    }))
                    if (s.slides.length > 0) s.activeId = s.slides[0].id
                    saveToHistory()
                }),
                
                getTemplates: () => TEMPLATES,
            }
        }),
        {
            name: 'screenshot-studio',
            partialize: (state) => ({
                slides: state.slides.map(s => ({ ...s, screenshotUrl: null })),
                activeId: state.activeId,
                canvas: state.canvas,
                zoom: state.zoom,
                history: state.history,
                historyIndex: state.historyIndex,
                templates: state.templates,
            }),
        }
    )
)