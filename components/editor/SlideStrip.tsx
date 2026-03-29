'use client'

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '@/lib/store'
import type { MockupSlide } from '@/types/editor'

function thumbBg(slide: MockupSlide): string {
    const bg = slide.background
    if (bg.type === 'gradient' && bg.gradient)
        return `linear-gradient(${bg.gradient.angle}deg, ${bg.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    return bg.solid ?? '#111'
}

function Thumb({ slide, index }: { slide: MockupSlide; index: number }) {
    const activeId = useStore(s => s.activeId)
    const setActive = useStore(s => s.setActive)
    const removeSlide = useStore(s => s.removeSlide)
    const duplicateSlide = useStore(s => s.duplicateSlide)
    const isActive = activeId === slide.id
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: slide.id })

    return (
        <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1, position: 'relative', flexShrink: 0 }}
            className="thumb-group">
            <button onClick={() => setActive(slide.id)}
                style={{ width: 72, height: 128, borderRadius: 10, overflow: 'hidden', border: isActive ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.08)', background: thumbBg(slide), cursor: 'pointer', position: 'relative', boxShadow: isActive ? '0 0 0 3px rgba(99,102,241,0.25)' : 'none', transition: 'all 0.12s', display: 'block' }}>
                {/* Screenshot preview */}
                {slide.screenshotUrl && (
                    <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 44, height: 60, overflow: 'hidden', opacity: 0.9 }}>
                        <img src={slide.screenshotUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                )}
                <div style={{ position: 'absolute', top: 5, left: 5, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {index + 1}
                </div>
                {isActive && <div style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7, borderRadius: '50%', background: '#818cf8' }} />}
            </button>

            {/* Drag handle */}
            <div {...attributes} {...listeners}
                style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: 'rgba(255,255,255,0.25)', cursor: 'grab', padding: '2px 6px', userSelect: 'none' }}>
                ⠿
            </div>

            {/* Action row */}
            <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 3 }}>
                <button onClick={() => duplicateSlide(slide.id)} title="Duplicate"
                    style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⧉</button>
                <button onClick={() => removeSlide(slide.id)} title="Delete"
                    style={{ width: 20, height: 20, borderRadius: 5, background: 'rgba(255,255,255,0.07)', border: 'none', color: 'rgba(220,80,80,0.6)', cursor: 'pointer', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
        </div>
    )
}

export function SlideStrip() {
    // const { slides, addSlide, reorderSlides } = useStore(s => ({ slides: s.slides, addSlide: s.addSlide, reorderSlides: s.reorderSlides }))
    const slides = useStore(s => s.slides)
    const addSlide = useStore(s => s.addSlide)
    const reorderSlides = useStore(s => s.reorderSlides)
    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

    function onDragEnd(e: DragEndEvent) {
        const { active, over } = e
        if (!over || active.id === over.id) return
        reorderSlides(slides.findIndex(s => s.id === active.id), slides.findIndex(s => s.id === over.id))
    }

    return (
        <div style={{ height: 168, borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0d0d0f', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, overflowX: 'auto' }}>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={slides.map(s => s.id)} strategy={horizontalListSortingStrategy}>
                    {slides.map((slide, i) => <Thumb key={slide.id} slide={slide} index={i} />)}
                </SortableContext>
            </DndContext>

            <button onClick={addSlide}
                style={{ flexShrink: 0, width: 72, height: 128, borderRadius: 10, border: '1.5px dashed rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.color = 'rgba(99,102,241,0.8)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
            >
                <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
                <span style={{ fontSize: 9, letterSpacing: '0.05em' }}>Add slide</span>
            </button>
        </div>
    )
}