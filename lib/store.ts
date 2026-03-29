import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import { saveImage, loadImage, deleteImage } from '@/lib/imagedb'
import type { MockupSlide, Background, TextLayer, DeviceFrame, PhoneTransform, CanvasSize } from '@/types/editor'

const BGRADS: Background[] = [
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#0f2027', position: 0 }, { color: '#2c5364', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#1a1a2e', position: 0 }, { color: '#0f3460', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 160, stops: [{ color: '#0d0d0d', position: 0 }, { color: '#1a0533', position: 100 }] } },
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
}

export const useStore = create<Store>()(
    persist(
        immer((set, get) => {
            const slides = [makeSlide(0), makeSlide(1), makeSlide(2)]
            return {
                slides,
                activeId: slides[0].id,
                canvas: { width: 1080, height: 1920 },
                zoom: 0.28,

                setActive: (id) => set(s => { s.activeId = id }),

                addSlide: () => set(s => {
                    const sl = makeSlide(s.slides.length)
                    s.slides.push(sl); s.activeId = sl.id
                }),

                removeSlide: (id) => set(s => {
                    if (s.slides.length <= 1) return
                    const i = s.slides.findIndex(sl => sl.id === id)
                    s.slides.splice(i, 1)
                    s.activeId = s.slides[Math.max(0, i - 1)].id
                    // clean up image from IndexedDB
                    deleteImage(id)
                }),

                duplicateSlide: (id) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (!sl) return
                    const c = JSON.parse(JSON.stringify(sl))
                    c.id = nanoid(); c.label += ' copy'
                    c.title.id = nanoid(); c.subtitle.id = nanoid()
                    c.screenshotUrl = null // duplicate doesn't copy image, user re-uploads
                    const i = s.slides.findIndex(sl => sl.id === id)
                    s.slides.splice(i + 1, 0, c); s.activeId = c.id
                }),

                reorderSlides: (from, to) => set(s => {
                    const [r] = s.slides.splice(from, 1); s.slides.splice(to, 0, r)
                }),

                updateSlide: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl, patch)
                }),

                updateTitle: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.title, patch)
                }),

                updateSubtitle: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.subtitle, patch)
                }),

                updatePhone: (id, patch) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) Object.assign(sl.phone, patch)
                }),

                updateBackground: (id, bg) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.background = bg
                }),

                // legacy — kept for compatibility, use uploadScreenshot for new uploads
                setScreenshot: (id, url) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.screenshotUrl = url
                }),

                setDevice: (id, device) => set(s => {
                    const sl = s.slides.find(sl => sl.id === id)
                    if (sl) sl.device = device
                }),

                setCanvas: (w, h) => set(s => { s.canvas = { width: w, height: h } }),
                setZoom: (z) => set(s => { s.zoom = z }),

                // Upload screenshot → save blob to IndexedDB → store object URL in state
                uploadScreenshot: async (id, file) => {
                    const blob = new Blob([await file.arrayBuffer()], { type: file.type })
                    await saveImage(id, blob)
                    const url = URL.createObjectURL(blob)
                    set(s => {
                        const sl = s.slides.find(sl => sl.id === id)
                        if (sl) sl.screenshotUrl = url
                    })
                },

                // On app load — restore object URLs from IndexedDB for all slides
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
            }
        }),
        {
            name: 'screenshot-studio',
            // Don't persist screenshotUrl — it's an object URL that dies on reload
            // Images live in IndexedDB, rehydrated on mount
            partialize: (state) => ({
                slides: state.slides.map(s => ({ ...s, screenshotUrl: null })),
                activeId: state.activeId,
                canvas: state.canvas,
                zoom: state.zoom,
            }),
        }
    )
)