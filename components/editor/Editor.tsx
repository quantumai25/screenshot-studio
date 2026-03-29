'use client'

import { useRef, useCallback, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { SlideCanvas } from './SlideCanvas'
import { SlideStrip } from './SlideStrip'
import { RightPanel } from './RightPanel'
import { Toolbar } from './Toolbar'

export function Editor() {
    const slides = useStore(s => s.slides)
    const activeId = useStore(s => s.activeId)
    const setActive = useStore(s => s.setActive)
    const canvas = useStore(s => s.canvas)
    const zoom = useStore(s => s.zoom)
    const rehydrateImages = useStore(s => s.rehydrateImages)

    useEffect(() => {
        rehydrateImages()
    }, [])

    const exportRefs = useRef<Map<string, HTMLDivElement>>(new Map())

    const getExportRef = useCallback((id: string) => (el: HTMLDivElement | null) => {
        if (el) exportRefs.current.set(id, el)
        else exportRefs.current.delete(id)
    }, [])

// ... rest unchanged from your current file
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0c', color: '#fff', fontFamily: '"DM Sans", system-ui, sans-serif', overflow: 'hidden' }}>
            <Toolbar exportRefs={exportRefs} />

            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Canvas area */}
                <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 40, background: 'radial-gradient(ellipse at 50% 30%, #18181e 0%, #0a0a0c 65%)' }}>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {slides.map(slide => (
                            <div key={slide.id} style={{ position: 'relative' }}>
                                <SlideCanvas
                                    slide={slide}
                                    canvasW={canvas.width}
                                    canvasH={canvas.height}
                                    zoom={zoom}
                                    isActive={activeId === slide.id}
                                    onClick={() => setActive(slide.id)}
                                    exportRef={getExportRef(slide.id)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <RightPanel />
            </div>

            <SlideStrip />
        </div>
    )
}