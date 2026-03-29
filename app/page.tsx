'use client'
import Link from 'next/link'

export default function Home() {
    return (
        <main style={{
            minHeight: '100vh',
            background: '#08080a',
            color: '#fff',
            fontFamily: '"DM Sans", system-ui, sans-serif',
            overflowX: 'hidden',
        }}>

            {/* Nav */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                height: 56, display: 'flex', alignItems: 'center',
                padding: '0 32px', justifyContent: 'space-between',
                background: 'rgba(8,8,10,0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 30, height: 30, borderRadius: 8,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: '#fff',
                    }}>SS</div>
                    <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.02em' }}>
                        Screenshot Studio
                    </span>
                </div>
                <Link href="/editor" style={{
                    padding: '8px 18px', borderRadius: 10,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff', fontSize: 13, fontWeight: 600,
                    textDecoration: 'none', letterSpacing: '-0.01em',
                    boxShadow: '0 0 24px rgba(99,102,241,0.35)',
                }}>
                    Open Editor →
                </Link>
            </nav>

            {/* Hero */}
            <section style={{
                minHeight: '100vh',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: '120px 24px 80px',
                position: 'relative',
            }}>
                {/* Glow */}
                <div style={{
                    position: 'absolute', top: '20%', left: '50%',
                    transform: 'translateX(-50%)',
                    width: 600, height: 400,
                    background: 'radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    background: 'rgba(99,102,241,0.12)',
                    border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: 100, padding: '5px 14px',
                    fontSize: 12, color: '#a5b4fc', fontWeight: 500,
                    marginBottom: 32, letterSpacing: '0.02em',
                }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
                    Free Play Store screenshot editor
                </div>

                <h1 style={{
                    fontSize: 'clamp(42px, 8vw, 88px)',
                    fontWeight: 800, lineHeight: 1.0,
                    letterSpacing: '-0.04em',
                    margin: '0 0 24px',
                    maxWidth: 800,
                }}>
                    Store screenshots<br />
                    <span style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #38bdf8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>that actually convert.</span>
                </h1>

                <p style={{
                    fontSize: 18, color: 'rgba(255,255,255,0.5)',
                    maxWidth: 480, lineHeight: 1.7, margin: '0 0 48px',
                    letterSpacing: '-0.01em',
                }}>
                    Design beautiful Play Store listing screenshots with phone mockups,
                    custom backgrounds, and precise controls. No Figma, no Canva, no subscription.
                </p>

                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Link href="/editor" style={{
                        padding: '14px 32px', borderRadius: 12,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', fontSize: 15, fontWeight: 700,
                        textDecoration: 'none', letterSpacing: '-0.01em',
                        boxShadow: '0 0 40px rgba(99,102,241,0.4)',
                    }}>
                        Start designing free →
                    </Link>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>
                        No signup. No install.
                    </span>
                </div>
            </section>

            {/* Features */}
            <section style={{
                padding: '80px 24px 120px',
                maxWidth: 1100, margin: '0 auto',
            }}>
                <div style={{ textAlign: 'center', marginBottom: 64 }}>
                    <h2 style={{
                        fontSize: 'clamp(28px, 4vw, 48px)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        margin: '0 0 16px',
                    }}>Everything you need.</h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                        Built specifically for app developers publishing on the Play Store.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 16,
                }}>
                    {[
                        {
                            icon: '📐',
                            title: 'Custom Frame Dimensions',
                            desc: 'Type your exact screenshot pixel dimensions — 1080×2400, 1440×3200, anything. The phone frame reshapes to match perfectly with zero cropping and zero black bars.',
                        },
                        {
                            icon: '📱',
                            title: 'Realistic Phone Mockups',
                            desc: 'Pixel 8, iPhone 15, and clean frameless designs. Drag to move, rotate freely, scale with the corner handle. Every frame color: black, white, titanium.',
                        },
                        {
                            icon: '🎨',
                            title: 'Gradient Backgrounds',
                            desc: '12 curated presets or build your own with unlimited color stops, custom angles, and solid colors. Every slide can have a different background.',
                        },
                        {
                            icon: '✍️',
                            title: 'Draggable Text Layers',
                            desc: 'Title and subtitle layers with full typographic control — font size up to 400px, weight, color, letter spacing, line height, rotation. Drag directly on canvas.',
                        },
                        {
                            icon: '📤',
                            title: 'High-Res PNG Export',
                            desc: 'Export at 2× resolution — no blurry outputs. Export the active slide or all slides at once. Files named automatically from your slide labels.',
                        },
                        {
                            icon: '🔢',
                            title: 'Multi-Slide Management',
                            desc: 'Add unlimited slides, drag to reorder, duplicate with one click. Each slide is fully independent with its own background, frame, and text.',
                        },
                        {
                            icon: '📏',
                            title: 'Canvas Size Presets',
                            desc: 'Play Store Phone (1080×1920), Tablet, App Store, Square, or fully custom. Switch mid-session without losing your work.',
                        },
                        {
                            icon: '🔄',
                            title: 'Persistent State',
                            desc: 'Your slides auto-save to your browser. Close the tab, come back tomorrow — everything is exactly where you left it.',
                        },
                        {
                            icon: '⚡',
                            title: 'Zero Dependencies',
                            desc: 'No account. No subscription. No Figma seat. No uploading your screenshots to someone\'s server. Everything runs locally in your browser.',
                        },
                    ].map((f, i) => (
                        <div key={i} style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.07)',
                            borderRadius: 16, padding: '28px 24px',
                            transition: 'border-color 0.2s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)')}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}
                        >
                            <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                            <div style={{
                                fontSize: 15, fontWeight: 700,
                                letterSpacing: '-0.02em', marginBottom: 10,
                            }}>{f.title}</div>
                            <div style={{
                                fontSize: 13, color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.7,
                            }}>{f.desc}</div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    textAlign: 'center', marginTop: 80,
                    padding: '64px 24px',
                    background: 'rgba(99,102,241,0.06)',
                    border: '1px solid rgba(99,102,241,0.15)',
                    borderRadius: 24,
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: '-50%', left: '50%',
                        transform: 'translateX(-50%)',
                        width: 400, height: 300,
                        background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <h2 style={{
                        fontSize: 'clamp(24px, 3vw, 40px)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        margin: '0 0 16px',
                    }}>Ready to ship better screenshots?</h2>
                    <p style={{
                        fontSize: 15, color: 'rgba(255,255,255,0.45)',
                        margin: '0 0 32px',
                    }}>
                        Takes 5 minutes. Looks like you spent hours.
                    </p>
                    <Link href="/editor" style={{
                        padding: '14px 36px', borderRadius: 12,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff', fontSize: 15, fontWeight: 700,
                        textDecoration: 'none', letterSpacing: '-0.01em',
                        boxShadow: '0 0 40px rgba(99,102,241,0.35)',
                        display: 'inline-block',
                    }}>
                        Open Editor →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '24px 32px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                fontSize: 12, color: 'rgba(255,255,255,0.25)',
                flexWrap: 'wrap', gap: 8,
            }}>
                <span>Screenshot Studio — built for Android developers</span>
                <span>Free forever. No account needed.</span>
            </footer>

        </main>
    )
}