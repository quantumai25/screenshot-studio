'use client'

import { useStore } from '@/lib/store'

const S = {
    container: { display: 'flex', gap: 8, padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    button: (disabled: boolean) => ({
        flex: 1,
        padding: '8px 12px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.1)',
        background: disabled ? 'rgba(255,255,255,0.03)' : 'rgba(99,102,241,0.15)',
        color: disabled ? 'rgba(255,255,255,0.25)' : '#a5b4fc',
        fontSize: 12,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        opacity: disabled ? 0.5 : 1,
    }),
}

export function HistoryControls() {
    const undo = useStore(s => s.undo)
    const redo = useStore(s => s.redo)
    const canUndo = useStore(s => s.canUndo())
    const canRedo = useStore(s => s.canRedo())

    return (
        <div style={S.container}>
            <button
                onClick={undo}
                disabled={!canUndo}
                style={S.button(!canUndo)}
                onMouseEnter={e => !canUndo ? null : (e.currentTarget.style.background = 'rgba(99,102,241,0.25)')}
                onMouseLeave={e => !canUndo ? null : (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')}
                title="Undo (Ctrl+Z)"
            >
                ↶ Undo
            </button>
            <button
                onClick={redo}
                disabled={!canRedo}
                style={S.button(!canRedo)}
                onMouseEnter={e => !canRedo ? null : (e.currentTarget.style.background = 'rgba(99,102,241,0.25)')}
                onMouseLeave={e => !canRedo ? null : (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')}
                title="Redo (Ctrl+Shift+Z)"
            >
                ↷ Redo
            </button>
        </div>
    )
}
