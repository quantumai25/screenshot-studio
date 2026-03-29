'use client'

import { useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import type { Background, GradientStop, DeviceFrame, TextLayer } from '@/types/editor'
import { CANVAS_PRESETS } from '@/types/editor'

// ─── atoms ───────────────────────────────────────────────────────────────────

const S = {
    panel: { width: 264, minWidth: 264, background: '#111113', borderLeft: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
    scroll: { flex: 1, overflowY: 'auto' as const },
    section: { borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px' },
    sectionHead: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 },
    sectionTitle: { fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '0.1em', fontWeight: 600 },
    label: { fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.09em', fontWeight: 500, marginBottom: 5, display: 'block' },
    input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 10px', fontSize: 13, color: 'rgba(255,255,255,0.8)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
    textarea: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 10px', fontSize: 13, color: 'rgba(255,255,255,0.8)', outline: 'none', fontFamily: 'inherit', resize: 'none' as const, boxSizing: 'border-box' as const },
    row: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 },
    chip: (active: boolean) => ({
        flex: 1, padding: '6px 4px', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'all 0.12s',
        background: active ? '#6366f1' : 'rgba(255,255,255,0.06)',
        color: active ? '#fff' : 'rgba(255,255,255,0.45)',
    }),
    uploadBtn: { width: '100%', padding: '9px 0', borderRadius: 8, border: '1.5px dashed rgba(255,255,255,0.13)', background: 'transparent', color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' },
}

function Label({ children }: { children: React.ReactNode }) {
    return <span style={S.label}>{children}</span>
}

function SliderRow({ label, value, min, max, step = 1, onChange }: {
    label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void
}) {
    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <Label>{label}</Label>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontVariantNumeric: 'tabular-nums' }}>{typeof value === 'number' ? Math.round(value * 10) / 10 : value}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value}
                onChange={e => onChange(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }} />
        </div>
    )
}

function ColorRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div style={{ marginBottom: 10 }}>
            <Label>{label}</Label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: value, border: '1px solid rgba(255,255,255,0.15)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    <input type="color" value={value.startsWith('rgba') ? '#ffffff' : value} onChange={e => onChange(e.target.value)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>{value}</span>
            </label>
        </div>
    )
}

// ─── Background ───────────────────────────────────────────────────────────────

const BG_PRESETS: Background[] = [
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#0f2027', position: 0 }, { color: '#2c5364', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#1a1a2e', position: 0 }, { color: '#e94560', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 160, stops: [{ color: '#0d0d0d', position: 0 }, { color: '#1a0533', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 120, stops: [{ color: '#134e5e', position: 0 }, { color: '#71b280', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#2d1b69', position: 0 }, { color: '#11998e', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 45, stops: [{ color: '#f953c6', position: 0 }, { color: '#b91d73', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#f7971e', position: 0 }, { color: '#ffd200', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#11998e', position: 0 }, { color: '#38ef7d', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#fc4a1a', position: 0 }, { color: '#f7b733', position: 100 }] } },
    { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#4776e6', position: 0 }, { color: '#8e54e9', position: 100 }] } },
    { type: 'solid', solid: '#0a0a0a' },
    { type: 'solid', solid: '#ffffff' },
]

function presetCSS(p: Background): string {
    if (p.type === 'gradient' && p.gradient)
        return `linear-gradient(${p.gradient.angle}deg, ${p.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    return p.solid ?? '#000'
}

function BackgroundEditor({ slideId }: { slideId: string }) {
    const slides = useStore(s => s.slides)
    const updateBackground = useStore(s => s.updateBackground)
    const slide = slides.find(s => s.id === slideId)!
    const bg = slide.background

    function updateStop(i: number, key: 'color' | 'position', v: string | number) {
        if (!bg.gradient) return
        const stops = bg.gradient.stops.map((s, j) => j === i ? { ...s, [key]: v } : s)
        updateBackground(slideId, { ...bg, gradient: { ...bg.gradient!, stops } })
    }

    function addStop() {
        if (!bg.gradient) return
        const stops = [...bg.gradient.stops, { color: '#ffffff', position: 50 }]
        updateBackground(slideId, { ...bg, gradient: { ...bg.gradient!, stops } })
    }

    function removeStop(i: number) {
        if (!bg.gradient || bg.gradient.stops.length <= 2) return
        const stops = bg.gradient.stops.filter((_, j) => j !== i)
        updateBackground(slideId, { ...bg, gradient: { ...bg.gradient!, stops } })
    }

    return (
        <div>
            {/* Presets */}
            <Label>Presets</Label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 14 }}>
                {BG_PRESETS.map((p, i) => (
                    <button key={i} onClick={() => updateBackground(slideId, p)}
                        style={{ aspectRatio: '1', borderRadius: 7, border: '1.5px solid rgba(255,255,255,0.1)', background: presetCSS(p), cursor: 'pointer', transition: 'transform 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                ))}
            </div>

            {/* Type toggle */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {(['gradient', 'solid'] as const).map(t => (
                    <button key={t} onClick={() => updateBackground(slideId, t === 'gradient'
                        ? { type: 'gradient', gradient: { angle: 135, stops: [{ color: '#111', position: 0 }, { color: '#333', position: 100 }] } }
                        : { type: 'solid', solid: '#111' }
                    )} style={S.chip(bg.type === t)}>{t}</button>
                ))}
            </div>

            {bg.type === 'gradient' && bg.gradient && (
                <div>
                    <SliderRow label="Angle" value={bg.gradient.angle} min={0} max={360}
                        onChange={v => updateBackground(slideId, { ...bg, gradient: { ...bg.gradient!, angle: v } })} />
                    <Label>Color stops</Label>
                    {bg.gradient.stops.map((stop, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                            <label style={{ width: 28, height: 28, borderRadius: 6, background: stop.color, border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                                <input type="color" value={stop.color} onChange={e => updateStop(i, 'color', e.target.value)}
                                    style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                            </label>
                            <input type="range" min={0} max={100} value={stop.position} onChange={e => updateStop(i, 'position', Number(e.target.value))}
                                style={{ flex: 1, accentColor: '#6366f1' }} />
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 24, textAlign: 'right' }}>{stop.position}%</span>
                            <button onClick={() => removeStop(i)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
                        </div>
                    ))}
                    <button onClick={addStop} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'none', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', marginTop: 4 }}>+ add stop</button>
                </div>
            )}

            {bg.type === 'solid' && (
                <ColorRow label="Color" value={bg.solid ?? '#000'} onChange={v => updateBackground(slideId, { ...bg, solid: v })} />
            )}
        </div>
    )
}

// ─── Device ───────────────────────────────────────────────────────────────────

function DeviceEditor({ slideId }: { slideId: string }) {
    const uploadScreenshot = useStore(s => s.uploadScreenshot)
    const slides = useStore(s => s.slides)
    const setDevice = useStore(s => s.setDevice)
    
    const updateSlide = useStore(s => s.updateSlide)
    const setScreenshot = useStore(s => s.setScreenshot)
    const slide = slides.find(s => s.id === slideId)!
    const fileRef = useRef<HTMLInputElement>(null)

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]; if (!file) return
        uploadScreenshot(slideId, file)
        e.target.value = '' // reset input
    }

    const devices: { id: DeviceFrame; label: string }[] = [
        { id: 'pixel-8', label: 'Pixel 8' }, { id: 'iphone-15', label: 'iPhone 15' },
        { id: 'clean', label: 'Clean' }, { id: 'none', label: 'None' },
    ]
    const colors: { id: 'black' | 'white' | 'titanium'; hex: string }[] = [
        { id: 'black', hex: '#1a1a1a' }, { id: 'white', hex: '#e8e8e8' }, { id: 'titanium', hex: '#8a8680' },
    ]

    return (
        <div>
            <Label>Frame</Label>
            <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
                {devices.map(d => <button key={d.id} onClick={() => setDevice(slideId, d.id)} style={S.chip(slide.device === d.id)}>{d.label}</button>)}
            </div>

            <Label>Frame color</Label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {colors.map(c => (
                    <button key={c.id} onClick={() => updateSlide(slideId, { deviceColor: c.id })}
                        style={{ width: 28, height: 28, borderRadius: '50%', background: c.hex, border: slide.deviceColor === c.id ? '2.5px solid #6366f1' : '2px solid transparent', cursor: 'pointer', transition: 'transform 0.1s', transform: slide.deviceColor === c.id ? 'scale(1.15)' : 'scale(1)' }} />
                ))}
            </div>

            <button onClick={() => fileRef.current?.click()} style={S.uploadBtn}>
                ↑ {slide.screenshotUrl ? 'Replace screenshot' : 'Upload screenshot'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
            {slide.screenshotUrl && (
                <button onClick={() => setScreenshot(slideId, null)}
                    style={{ ...S.uploadBtn, marginTop: 5, color: 'rgba(220,80,80,0.6)', borderColor: 'rgba(220,80,80,0.2)' }}>
                    × Remove screenshot
                </button>
            )}
            {/* Frame dimensions */}
            <div style={{ marginTop: 12 }}>
                <Label>Frame dimensions (px)</Label>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <input
                        type="number" placeholder="W" value={slide.phone.frameW}
                        onChange={e => {
                            const v = parseInt(e.target.value)
                            if (v > 0) updateSlide(slideId, { phone: { ...slide.phone, frameW: v } })
                        }}
                        style={{ ...S.input, width: 70, textAlign: 'center' }}
                    />
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>×</span>
                    <input
                        type="number" placeholder="H" value={slide.phone.frameH}
                        onChange={e => {
                            const v = parseInt(e.target.value)
                            if (v > 0) updateSlide(slideId, { phone: { ...slide.phone, frameH: v } })
                        }}
                        style={{ ...S.input, width: 70, textAlign: 'center' }}
                    />
                    <button
                        onClick={() => updateSlide(slideId, { phone: { ...slide.phone, frameW: 320, frameH: 680 } })}
                        style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)', border: 'none', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
                    >Reset</button>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginTop: 5 }}>
                    Match your screenshot dimensions for perfect fit
                </div>
            </div>
            
        </div>
    )
}

// ─── Text editor ──────────────────────────────────────────────────────────────

function TextEditor({ slideId, which }: { slideId: string; which: 'title' | 'subtitle' }) {
    const slides = useStore(s => s.slides)
    const updateTitle = useStore(s => s.updateTitle)
    const updateSubtitle = useStore(s => s.updateSubtitle)
    const slide = slides.find(s => s.id === slideId)!
    const layer = which === 'title' ? slide.title : slide.subtitle
    const update = which === 'title' ? updateTitle : updateSubtitle
    const weights = [300, 400, 500, 600, 700] as const

    return (
        <div>
            <Label>Text</Label>
            <textarea value={layer.content} rows={2} onChange={e => update(slideId, { content: e.target.value })} style={S.textarea} />
            <div style={{ height: 10 }} />
            <ColorRow label="Color" value={layer.color} onChange={v => update(slideId, { color: v })} />
            <Label>Align</Label>
            <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                {(['left', 'center', 'right'] as const).map(a => (
                    <button key={a} onClick={() => update(slideId, { align: a })} style={S.chip(layer.align === a)}>{a[0].toUpperCase()}</button>
                ))}
            </div>
            <Label>Weight</Label>
            <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {weights.map(w => (
                    <button key={w} onClick={() => update(slideId, { fontWeight: w })}
                        style={{ ...S.chip(layer.fontWeight === w), fontWeight: w, fontSize: 10 }}>{w}</button>
                ))}
            </div>
            <SliderRow label="Font size" value={layer.fontSize} min={12} max={180} onChange={v => update(slideId, { fontSize: v })} />
            <SliderRow label="Letter spacing" value={layer.letterSpacing} min={-5} max={20} step={0.5} onChange={v => update(slideId, { letterSpacing: v })} />
            <SliderRow label="Line height" value={layer.lineHeight} min={0.8} max={3} step={0.05} onChange={v => update(slideId, { lineHeight: v })} />
            <SliderRow label="X position %" value={layer.x} min={0} max={100} onChange={v => update(slideId, { x: v })} />
            <SliderRow label="Y position %" value={layer.y} min={0} max={100} onChange={v => update(slideId, { y: v })} />
            <SliderRow label="Width %" value={layer.width} min={10} max={100} onChange={v => update(slideId, { width: v })} />
            <SliderRow label="Rotation °" value={layer.rotation} min={-45} max={45} onChange={v => update(slideId, { rotation: v })} />
        </div>
    )
}

// ─── Canvas settings ──────────────────────────────────────────────────────────

function CanvasEditor() {
    const canvas = useStore(s => s.canvas)
    const setCanvas = useStore(s => s.setCanvas)
    const [customW, setCustomW] = useState(String(canvas.width))
    const [customH, setCustomH] = useState(String(canvas.height))

    function applyCustom() {
        const w = parseInt(customW); const h = parseInt(customH)
        if (w > 0 && h > 0) setCanvas(w, h)
    }

    return (
        <div>
            <Label>Presets</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 12 }}>
                {Object.entries(CANVAS_PRESETS).filter(([k]) => k !== 'custom').map(([key, val]) => {
                    const active = canvas.width === val.width && canvas.height === val.height
                    return (
                        <button key={key} onClick={() => { setCanvas(val.width, val.height); setCustomW(String(val.width)); setCustomH(String(val.height)) }}
                            style={{ padding: '7px 8px', borderRadius: 8, fontSize: 10, textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', border: active ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.06)', background: active ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.04)', color: active ? '#a5b4fc' : 'rgba(255,255,255,0.4)' }}>
                            <div style={{ fontWeight: 500, marginBottom: 2 }}>{val.label}</div>
                            <div style={{ opacity: 0.6 }}>{val.width}×{val.height}</div>
                        </button>
                    )
                })}
            </div>
            <Label>Custom size</Label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input value={customW} onChange={e => setCustomW(e.target.value)} placeholder="W" style={{ ...S.input, width: 70 }} />
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>×</span>
                <input value={customH} onChange={e => setCustomH(e.target.value)} placeholder="H" style={{ ...S.input, width: 70 }} />
                <button onClick={applyCustom} style={{ padding: '7px 12px', borderRadius: 8, background: '#6366f1', color: '#fff', border: 'none', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Apply</button>
            </div>
        </div>
    )
}

// ─── Accordion section ────────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen)
    return (
        <div style={S.section}>
            <button onClick={() => setOpen(!open)} style={{ ...S.sectionHead, width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <span style={S.sectionTitle}>{title}</span>
                <span style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.25)', fontSize: 12 }}>{open ? '▲' : '▼'}</span>
            </button>
            {open && <div style={{ paddingTop: 4 }}>{children}</div>}
        </div>
    )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function RightPanel() {
    const activeId = useStore(s => s.activeId)
    const slides = useStore(s => s.slides)
    // const { activeId, slides } = useStore(s => ({ activeId: s.activeId, slides: s.slides }))
    const slide = slides.find(s => s.id === activeId)

    if (!slide) return (
        <div style={{ ...S.panel, alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
            Select a slide
        </div>
    )

    return (
        <div style={S.panel}>
            <div style={S.scroll}>
                <Section title="Canvas size" defaultOpen><CanvasEditor /></Section>
                <Section title="Background" defaultOpen><BackgroundEditor slideId={slide.id} /></Section>
                <Section title="Device & screenshot" defaultOpen><DeviceEditor slideId={slide.id} /></Section>
                <Section title="Title text" defaultOpen><TextEditor slideId={slide.id} which="title" /></Section>
                <Section title="Subtitle text"><TextEditor slideId={slide.id} which="subtitle" /></Section>
            </div>
        </div>
    )
}