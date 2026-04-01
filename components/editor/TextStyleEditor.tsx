'use client'

import { useStore } from '@/lib/store'
import type { TextLayer } from '@/types/editor'

const S = {
    section: { borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px' },
    label: { fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.09em', fontWeight: 500, marginBottom: 8, display: 'block' },
    row: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 },
    chip: (active: boolean) => ({
        flex: 1, padding: '6px 8px', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer',
        border: 'none', fontFamily: 'inherit', transition: 'all 0.12s',
        background: active ? '#6366f1' : 'rgba(255,255,255,0.06)',
        color: active ? '#fff' : 'rgba(255,255,255,0.45)',
    }),
    input: { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 8, padding: '7px 10px', fontSize: 13, color: 'rgba(255,255,255,0.8)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' as const },
}

function Label({ children }: { children: React.ReactNode }) {
    return <span style={S.label}>{children}</span>
}

export function TextStyleEditor({ slideId, isTitle }: { slideId: string; isTitle: boolean }) {
    const slides = useStore(s => s.slides)
    const updateTitle = useStore(s => s.updateTitle)
    const updateSubtitle = useStore(s => s.updateSubtitle)
    
    const slide = slides.find(s => s.id === slideId)
    if (!slide) return null
    
    const text = isTitle ? slide.title : slide.subtitle
    const updateText = isTitle ? updateTitle : updateSubtitle

    return (
        <div style={S.section}>
            <div style={S.row}>
                <div style={{ flex: 1 }}>
                    <Label>Font size</Label>
                    <input
                        type="range"
                        min="8"
                        max="200"
                        value={text.fontSize}
                        onChange={e => updateText(slideId, { fontSize: Number(e.target.value) })}
                        style={{ width: '100%', accentColor: '#6366f1' }}
                    />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', width: 36, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                    {text.fontSize}px
                </div>
            </div>

            <div>
                <Label>Font weight</Label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5, marginBottom: 10 }}>
                    {[300, 400, 500, 600, 700, 800].map(w => (
                        <button
                            key={w}
                            onClick={() => updateText(slideId, { fontWeight: w as any })}
                            style={{
                                ...S.chip(text.fontWeight === w),
                                fontSize: 10,
                                fontWeight: w as any,
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <Label>Text style</Label>
                <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    <button
                        onClick={() => updateText(slideId, { fontStyle: text.fontStyle === 'italic' ? 'normal' : 'italic' })}
                        style={{
                            ...S.chip(text.fontStyle === 'italic'),
                            fontStyle: 'italic',
                            flex: 1,
                        }}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() => updateText(slideId, { textDecoration: text.textDecoration === 'underline' ? 'none' : 'underline' })}
                        style={{
                            ...S.chip(text.textDecoration === 'underline'),
                            textDecoration: 'underline',
                            flex: 1,
                        }}
                    >
                        Underline
                    </button>
                    <button
                        onClick={() => updateText(slideId, { textDecoration: text.textDecoration === 'line-through' ? 'none' : 'line-through' })}
                        style={{
                            ...S.chip(text.textDecoration === 'line-through'),
                            textDecoration: 'line-through',
                            flex: 1,
                        }}
                    >
                        Strike
                    </button>
                </div>
            </div>

            <div>
                <Label>Text transform</Label>
                <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
                    {['none', 'uppercase', 'lowercase', 'capitalize'].map(t => (
                        <button
                            key={t}
                            onClick={() => updateText(slideId, { textTransform: t as any })}
                            style={{
                                ...S.chip(text.textTransform === t),
                                flex: 'calc(50% - 2.5px)',
                                fontSize: 10,
                            }}
                        >
                            {t === 'none' ? 'Normal' : t.charAt(0).toUpperCase() + t.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <Label>Alignment</Label>
                <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
                    {['left', 'center', 'right'].map(a => (
                        <button
                            key={a}
                            onClick={() => updateText(slideId, { align: a as any })}
                            style={{
                                ...S.chip(text.align === a),
                                flex: 1,
                            }}
                        >
                            {a.charAt(0).toUpperCase() + a.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Label>Letter spacing</Label>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{text.letterSpacing.toFixed(1)}</span>
                </div>
                <input
                    type="range"
                    min="-5"
                    max="10"
                    step="0.1"
                    value={text.letterSpacing}
                    onChange={e => updateText(slideId, { letterSpacing: Number(e.target.value) })}
                    style={{ width: '100%', accentColor: '#6366f1', marginBottom: 10 }}
                />
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Label>Line height</Label>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{text.lineHeight.toFixed(2)}</span>
                </div>
                <input
                    type="range"
                    min="0.8"
                    max="3"
                    step="0.1"
                    value={text.lineHeight}
                    onChange={e => updateText(slideId, { lineHeight: Number(e.target.value) })}
                    style={{ width: '100%', accentColor: '#6366f1', marginBottom: 10 }}
                />
            </div>

            <div>
                <Label>Opacity</Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={text.opacity ?? 1}
                        onChange={e => updateText(slideId, { opacity: Number(e.target.value) })}
                        style={{ flex: 1, accentColor: '#6366f1' }}
                    />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', width: 32, textAlign: 'right' }}>
                        {Math.round((text.opacity ?? 1) * 100)}%
                    </span>
                </div>
            </div>
        </div>
    )
}
