'use client'

import { useRef } from 'react'
import { toPng } from 'html-to-image'
import { useStore } from '@/lib/store'

interface Props { exportRefs: React.MutableRefObject<Map<string, HTMLDivElement>> }

export function Toolbar({ exportRefs }: Props) {
    const slides = useStore(s => s.slides)
    const activeId = useStore(s => s.activeId)
    const zoom = useStore(s => s.zoom)
    const setZoom = useStore(s => s.setZoom)
    const canvas = useStore(s => s.canvas)
    const busy = useRef(false)

    async function doExport(ids: string[]) {
        if (busy.current) return
        busy.current = true
        for (const id of ids) {
            const el = exportRefs.current.get(id); if (!el) continue
            const slide = slides.find(s => s.id === id)!
            // temporarily move offscreen-div into viewport for html-to-image
            const prev = { position: el.style.position, left: el.style.left, top: el.style.top, zIndex: el.style.zIndex }
            Object.assign(el.style, { position: 'fixed', left: '0', top: '0', zIndex: '-1' })
            try {
                const url = await toPng(el, { width: canvas.width, height: canvas.height, pixelRatio: 2 })
                Object.assign(el.style, prev)
                const a = document.createElement('a')
                a.href = url; a.download = `${slide.label.replace(/\s+/g, '-')}.png`; a.click()
                if (ids.length > 1) await new Promise(r => setTimeout(r, 350))
            } catch { Object.assign(el.style, prev) }
        }
        busy.current = false
    }

    const btn = (label: string, onClick: () => void, primary = false) => (
        <button onClick={onClick} style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '0 12px', height: 28, borderRadius: 7,
            background: primary ? '#6366f1' : 'rgba(255,255,255,0.07)', border: 'none',
            color: primary ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: primary ? 500 : 400,
            cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s',
        }}>{label}</button>
    )

    return (
        <div style={{ height: 48, background: '#0d0d0f', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10, flexShrink: 0 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 12 }}>
                <div style={{ width: 26, height: 26, borderRadius: 7, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>SS</div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Screenshot Editor</span>
            </div>

            <div style={{ flex: 1 }} />

            {/* Canvas info */}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>{canvas.width}×{canvas.height}</span>

            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />

            {/* Zoom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {[['−', () => setZoom(Math.max(0.1, zoom - 0.04))], [`${Math.round(zoom * 100)}%`, () => setZoom(0.28)], ['+', () => setZoom(Math.min(1.2, zoom + 0.04))]].map(([label, fn], i) => (
                    <button key={i} onClick={fn as () => void} style={{ minWidth: i === 1 ? 44 : 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: i === 0 || i === 2 ? 16 : 11, cursor: 'pointer', fontFamily: 'monospace', textAlign: 'center' }}>{label as string}</button>
                ))}
            </div>

            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.08)' }} />

            {btn('↓ Export slide', () => activeId && doExport([activeId]))}
            {btn('↓ Export all', () => doExport(slides.map(s => s.id)), true)}
        </div>
    )
}