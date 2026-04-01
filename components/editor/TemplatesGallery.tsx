'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import type { Template } from '@/lib/store'

const S = {
    section: { borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 16px' },
    label: { fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, letterSpacing: '0.09em', fontWeight: 500, marginBottom: 10, display: 'block' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 10 },
    templateCard: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: 10, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' as const },
    templateCardHover: { background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)' },
    templateName: { fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 4 },
    templateDesc: { fontSize: 10, color: 'rgba(255,255,255,0.5)', lineHeight: 1.3 },
    allTemplatesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 },
    modal: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { background: '#111113', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 24, maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto', width: '100%', maxWidth: 600 },
    closeBtn: { position: 'absolute' as const, top: 12, right: 12, background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 24, cursor: 'pointer' },
    useBtn: { width: '100%', padding: '12px 16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 600, cursor: 'pointer', marginTop: 12, fontSize: 14 },
}

export function TemplatesGallery() {
    const [showAllTemplates, setShowAllTemplates] = useState(false)
    const templates = useStore(s => s.getTemplates())
    const applyTemplate = useStore(s => s.applyTemplate)

    const displayTemplates = showAllTemplates ? templates : templates.slice(0, 2)

    return (
        <div style={S.section}>
            <span style={S.label}>Templates</span>
            <div style={S.grid}>
                {displayTemplates.map(template => (
                    <div
                        key={template.id}
                        style={S.templateCard}
                        onMouseEnter={e => Object.assign(e.currentTarget.style, S.templateCardHover)}
                        onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.09)' })}
                        onClick={() => {
                            applyTemplate(template.id)
                            setShowAllTemplates(false)
                        }}
                    >
                        <div style={S.templateName}>{template.name}</div>
                        <div style={S.templateDesc}>{template.description}</div>
                    </div>
                ))}
            </div>

            {!showAllTemplates && (
                <button
                    onClick={() => setShowAllTemplates(true)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: 8,
                        color: '#a5b4fc',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.2)'
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'
                    }}
                >
                    View all {templates.length} templates →
                </button>
            )}

            {showAllTemplates && (
                <div style={S.modal} onClick={() => setShowAllTemplates(false)}>
                    <div style={S.modalContent} onClick={e => e.stopPropagation()}>
                        <button style={S.closeBtn} onClick={() => setShowAllTemplates(false)}>×</button>
                        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4, color: '#fff' }}>Templates gallery</h2>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Click any template to apply it</p>
                        <div style={S.allTemplatesGrid}>
                            {templates.map(template => (
                                <div
                                    key={template.id}
                                    style={{
                                        ...S.templateCard,
                                        padding: 16,
                                        textAlign: 'left' as const,
                                    }}
                                    onMouseEnter={e => Object.assign(e.currentTarget.style, S.templateCardHover)}
                                    onMouseLeave={e => Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.09)' })}
                                    onClick={() => {
                                        applyTemplate(template.id)
                                        setShowAllTemplates(false)
                                    }}
                                >
                                    <div style={S.templateName}>{template.name}</div>
                                    <div style={S.templateDesc}>{template.description}</div>
                                    <button style={S.useBtn}>Use this template</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
