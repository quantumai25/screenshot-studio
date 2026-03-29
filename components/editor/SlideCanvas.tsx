'use client'

import { useRef, useState } from 'react'
import type { MockupSlide, TextLayer } from '@/types/editor'
import { PhoneFrame } from './PhoneFrame'
import { useStore } from '@/lib/store'

function bgCSS(slide: MockupSlide): string {
    const bg = slide.background
    if (bg.type === 'gradient' && bg.gradient) {
        const stops = bg.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ')
        return `linear-gradient(${bg.gradient.angle}deg, ${stops})`
    }
    if (bg.type === 'solid') return `linear-gradient(0deg, ${bg.solid ?? '#111'}, ${bg.solid ?? '#111'})`
    if (bg.type === 'image' && bg.imageUrl) return `url(${bg.imageUrl})`
    return 'linear-gradient(0deg, #111, #111)'
}

// ─── Draggable text layer ─────────────────────────────────────────────────────
function DraggableText({
    layer, slideId, which, canvasW, canvasH, zoom, isActive, onSelect,
}: {
    layer: TextLayer; slideId: string; which: 'title' | 'subtitle'
    canvasW: number; canvasH: number; zoom: number
    isActive: boolean; onSelect: () => void
}) {
    const updateTitle = useStore(s => s.updateTitle)
    const updateSubtitle = useStore(s => s.updateSubtitle)
    const update = which === 'title' ? updateTitle : updateSubtitle

    const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null)
    const resizeRef = useRef<{ startX: number; startW: number } | null>(null)
    const [dragging, setDragging] = useState(false)

    const px = (layer.x / 100) * canvasW * zoom
    const py = (layer.y / 100) * canvasH * zoom
    const pw = (layer.width / 100) * canvasW * zoom

    function onMouseDown(e: React.MouseEvent) {
        e.stopPropagation()
        onSelect()
        if ((e.target as HTMLElement).dataset.resize) {
            resizeRef.current = { startX: e.clientX, startW: layer.width }
            const onMove = (ev: MouseEvent) => {
                if (!resizeRef.current) return
                const dx = (ev.clientX - resizeRef.current.startX) / zoom
                const newW = Math.max(10, Math.min(100, resizeRef.current.startW + (dx / canvasW) * 100))
                update(slideId, { width: newW })
            }
            const onUp = () => { resizeRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onUp)
            return
        }
        dragRef.current = { startX: e.clientX, startY: e.clientY, ox: layer.x, oy: layer.y }
        setDragging(true)
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return
            const dx = (ev.clientX - dragRef.current.startX) / zoom
            const dy = (ev.clientY - dragRef.current.startY) / zoom
            update(slideId, {
                x: Math.max(0, Math.min(100, dragRef.current.ox + (dx / canvasW) * 100)),
                y: Math.max(0, Math.min(100, dragRef.current.oy + (dy / canvasH) * 100)),
            })
        }
        const onUp = () => { setDragging(false); dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
    }

    const fs = layer.fontSize * zoom

    return (
        <div
            onMouseDown={onMouseDown}
            style={{
                position: 'absolute',
                left: px, top: py,
                width: pw,
                transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
                cursor: dragging ? 'grabbing' : 'grab',
                boxShadow: isActive ? '0 0 0 1.5px rgba(99,102,241,0.9), 0 0 0 4px rgba(99,102,241,0.15)' : 'none',
                borderRadius: 4,
                userSelect: 'none',
                zIndex: which === 'title' ? 20 : 19,
            }}
        >
            <div style={{
                fontSize: fs,
                fontWeight: layer.fontWeight,
                color: layer.color,
                textAlign: layer.align,
                letterSpacing: layer.letterSpacing * zoom,
                lineHeight: layer.lineHeight,
                fontFamily: '"DM Sans", system-ui, sans-serif',
                padding: `${2 * zoom}px ${6 * zoom}px`,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            }}>
                {layer.content}
            </div>
            {isActive && (
                <div
                    data-resize="1"
                    style={{
                        position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
                        width: 12, height: 24, borderRadius: 6,
                        background: '#6366f1', cursor: 'ew-resize',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'all',
                    }}
                >
                    <div style={{ width: 2, height: 10, background: 'rgba(255,255,255,0.6)', borderRadius: 1, pointerEvents: 'none' }} />
                </div>
            )}
        </div>
    )
}

// ─── Draggable phone ──────────────────────────────────────────────────────────
function DraggablePhone({
    slide, canvasW, canvasH, zoom, isActive, onSelect,
}: {
    slide: MockupSlide; canvasW: number; canvasH: number; zoom: number; isActive: boolean; onSelect: () => void
}) {
    const updatePhone = useStore(s => s.updatePhone)
    const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null)
    const rotRef = useRef<{ startX: number; or: number } | null>(null)
    const scaleRef = useRef<{ startX: number; startY: number; os: number } | null>(null)

    const ph = slide.phone
    const phoneW = ph.frameW * ph.scale * zoom
    const phoneH = ph.frameH * ph.scale * zoom
    const cx = (ph.x / 100) * canvasW * zoom
    const cy = (ph.y / 100) * canvasH * zoom

    function startDrag(e: React.MouseEvent) {
        e.stopPropagation(); onSelect()
        dragRef.current = { startX: e.clientX, startY: e.clientY, ox: ph.x, oy: ph.y }
        const onMove = (ev: MouseEvent) => {
            if (!dragRef.current) return
            updatePhone(slide.id, {
                x: Math.max(0, Math.min(100, dragRef.current.ox + ((ev.clientX - dragRef.current.startX) / zoom / canvasW) * 100)),
                y: Math.max(0, Math.min(100, dragRef.current.oy + ((ev.clientY - dragRef.current.startY) / zoom / canvasH) * 100)),
            })
        }
        const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
    }

    function startRotate(e: React.MouseEvent) {
        e.stopPropagation()
        rotRef.current = { startX: e.clientX, or: ph.rotation }
        const onMove = (ev: MouseEvent) => {
            if (!rotRef.current) return
            updatePhone(slide.id, { rotation: rotRef.current.or + (ev.clientX - rotRef.current.startX) * 0.4 })
        }
        const onUp = () => { rotRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
    }

    function startScale(e: React.MouseEvent) {
        e.stopPropagation()
        scaleRef.current = { startX: e.clientX, startY: e.clientY, os: ph.scale }
        const onMove = (ev: MouseEvent) => {
            if (!scaleRef.current) return
            const dx = ev.clientX - scaleRef.current.startX
            const dy = ev.clientY - scaleRef.current.startY
            const delta = (dx + dy) / 300
            updatePhone(slide.id, { scale: Math.max(0.2, Math.min(2.5, scaleRef.current.os + delta)) })
        }
        const onUp = () => { scaleRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseup', onUp)
    }

    return (
        <div style={{
            position: 'absolute',
            left: cx, top: cy,
            width: phoneW, height: phoneH,
            transform: `translate(-50%, -50%) rotate(${ph.rotation}deg)`,
            zIndex: 10,
            pointerEvents: 'none',
        }}>
            <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
                <PhoneFrame
                    device={slide.device}
                    color={slide.deviceColor}
                    screenshotUrl={slide.screenshotUrl}
                    width={phoneW}
                    height={phoneH}
                    uid={slide.id}
                />
            </div>

            <div
                style={{ position: 'absolute', inset: 0, cursor: 'default', pointerEvents: 'all', zIndex: 1 }}
                onClick={(e) => { e.stopPropagation(); onSelect() }}
            />

            {isActive && (
                <>
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: 8,
                        border: '1.5px dashed rgba(99,102,241,0.6)',
                        boxShadow: '0 0 0 4px rgba(99,102,241,0.12)',
                        pointerEvents: 'none', zIndex: 2,
                    }} />
                    <div onMouseDown={startDrag} title="Drag to move" style={{
                        position: 'absolute', top: -36, left: '50%',
                        transform: 'translateX(-50%)',
                        height: 28, paddingInline: 14, borderRadius: 20,
                        background: '#18181e', border: '1px solid rgba(99,102,241,0.4)',
                        cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 5, userSelect: 'none', zIndex: 30, pointerEvents: 'all',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.5)', whiteSpace: 'nowrap',
                        fontSize: 11, color: 'rgba(255,255,255,0.5)',
                    }}>⠿ move</div>
                    <div onMouseDown={startRotate} title="Rotate" style={{
                        position: 'absolute', top: -14, right: -14,
                        width: 28, height: 28, borderRadius: '50%',
                        background: '#6366f1', cursor: 'ew-resize',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, color: '#fff', userSelect: 'none', zIndex: 30,
                        pointerEvents: 'all', boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    }}>↻</div>
                    <div onMouseDown={startScale} title="Drag to resize" style={{
                        position: 'absolute', bottom: -14, right: -14,
                        width: 28, height: 28, borderRadius: '50%',
                        background: '#6366f1', cursor: 'nwse-resize',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 14, color: '#fff', userSelect: 'none', zIndex: 30,
                        pointerEvents: 'all', boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    }}>⤡</div>
                </>
            )}
        </div>
    )
}

// ─── Main canvas card ─────────────────────────────────────────────────────────
type ActiveEl = 'phone' | 'title' | 'subtitle' | null

interface SlideCanvasProps {
    slide: MockupSlide
    canvasW: number
    canvasH: number
    zoom: number
    isActive: boolean
    onClick: () => void
    exportRef?: React.Ref<HTMLDivElement>
}

export function SlideCanvas({ slide, canvasW, canvasH, zoom, isActive, onClick, exportRef }: SlideCanvasProps) {
    const [activeEl, setActiveEl] = useState<ActiveEl>(null)
    const w = canvasW * zoom
    const h = canvasH * zoom

    return (
        <div
            onClick={() => { onClick(); setActiveEl(null) }}
            style={{
                width: w, height: h,
                flexShrink: 0,
                position: 'relative',
                borderRadius: 10 * zoom,
                overflow: 'hidden',
                outline: isActive ? '2px solid #6366f1' : '2px solid transparent',
                outlineOffset: 3,
                boxShadow: isActive
                    ? '0 0 0 4px rgba(99,102,241,0.2), 0 24px 64px rgba(0,0,0,0.6)'
                    : '0 12px 40px rgba(0,0,0,0.45)',
                backgroundImage: bgCSS(slide),
                backgroundSize: 'cover',
                cursor: 'default',
                userSelect: 'none',
            }}
        >
            <DraggableText
                layer={slide.title} slideId={slide.id} which="title"
                canvasW={canvasW} canvasH={canvasH} zoom={zoom}
                isActive={activeEl === 'title'}
                onSelect={() => setActiveEl('title')}
            />
            <DraggableText
                layer={slide.subtitle} slideId={slide.id} which="subtitle"
                canvasW={canvasW} canvasH={canvasH} zoom={zoom}
                isActive={activeEl === 'subtitle'}
                onSelect={() => setActiveEl('subtitle')}
            />
            <DraggablePhone
                slide={slide} canvasW={canvasW} canvasH={canvasH} zoom={zoom}
                isActive={activeEl === 'phone'}
                onSelect={() => setActiveEl('phone')}
            />

            {exportRef && (
                <div ref={exportRef} style={{
                    position: 'absolute', left: -99999, top: -99999,
                    width: canvasW, height: canvasH,
                    backgroundImage: bgCSS(slide),
                    backgroundSize: 'cover',
                    overflow: 'hidden', borderRadius: 0, pointerEvents: 'none',
                }}>
                    <ExportContent slide={slide} canvasW={canvasW} canvasH={canvasH} />
                </div>
            )}
        </div>
    )
}

function ExportContent({ slide, canvasW, canvasH }: { slide: MockupSlide; canvasW: number; canvasH: number }) {
    const layer = (l: TextLayer) => ({
        position: 'absolute' as const,
        left: `${l.x}%`, top: `${l.y}%`,
        width: `${l.width}%`,
        transform: `translate(-50%, -50%) rotate(${l.rotation}deg)`,
        fontSize: l.fontSize, fontWeight: l.fontWeight, color: l.color,
        textAlign: l.align, letterSpacing: l.letterSpacing, lineHeight: l.lineHeight,
        fontFamily: '"DM Sans", system-ui, sans-serif',
        whiteSpace: 'pre-wrap' as const, wordBreak: 'break-word' as const,
    })
    const phoneW = slide.phone.frameW * slide.phone.scale
    const phoneH = slide.phone.frameH * slide.phone.scale
    return (
        <>
            <div style={layer(slide.title)}>{slide.title.content}</div>
            <div style={layer(slide.subtitle)}>{slide.subtitle.content}</div>
            <div style={{
                position: 'absolute',
                left: `${slide.phone.x}%`, top: `${slide.phone.y}%`,
                width: phoneW, height: phoneH,
                transform: `translate(-50%, -50%) rotate(${slide.phone.rotation}deg)`,
            }}>
                <PhoneFrame
                    device={slide.device}
                    color={slide.deviceColor}
                    screenshotUrl={slide.screenshotUrl}
                    width={phoneW}
                    height={phoneH}
                    uid={`export-${slide.id}`}
                />
            </div>
        </>
    )
}