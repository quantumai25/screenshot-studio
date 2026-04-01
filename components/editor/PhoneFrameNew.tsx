'use client'
import type { DeviceFrame } from '@/types/editor'

const FC = {
    black: { body: '#1a1a1a', inner: '#111', rail: '#2a2a2a', btn: '#222', shine: 'rgba(255,255,255,0.05)' },
    white: { body: '#e8e8e8', inner: '#f5f5f5', rail: '#d0d0d0', btn: '#ccc', shine: 'rgba(255,255,255,0.45)' },
    titanium: { body: '#8a8680', inner: '#6e6b66', rail: '#9e9b96', btn: '#7a7770', shine: 'rgba(255,255,255,0.12)' },
}

interface Props {
    device: DeviceFrame
    color: 'black' | 'white' | 'titanium'
    screenshotUrl: string | null
    width: number
    height: number
    uid: string
}

function ScreenContent({ url, x, y, w, h, clip }: {
    url: string | null; x: number; y: number; w: number; h: number; clip: string
}) {
    if (url) return (
        <image
            href={url} x={x} y={y} width={w} height={h}
            clipPath={`url(#${clip})`}
            preserveAspectRatio="xMidYMid slice"
        />
    )
    return (
        <g clipPath={`url(#${clip})`}>
            <rect x={x} y={y} width={w} height={h} fill="#1c1c1e" />
            {Array.from({ length: 14 }).map((_, r) =>
                Array.from({ length: 7 }).map((_, c) => (
                    <rect key={`${r}-${c}`}
                        x={x + c * (w / 7)} y={y + r * (h / 14)}
                        width={w / 14} height={h / 28}
                        fill={(r + c) % 2 === 0 ? '#252528' : '#1c1c1e'} />
                ))
            )}
        </g>
    )
}

// ===== ANDROID PHONES =====

function Pixel8({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `p8-${uid}`
    const bx = vw * 0.056
    const by = vh * 0.076
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.015
    const rx = vw * 0.08
    const camH = vh * 0.038

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.032} width={vw * 0.988} height={vh * 0.936} rx={rx * 0.97} fill={c.inner} />
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill="none" stroke={c.rail} strokeWidth={vw * 0.005} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill={c.shine} />
            {/* Camera bar */}
            <rect x={vw * 0.19} y={vh * 0.032} width={vw * 0.625} height={camH} rx={camH * 0.5} fill={c.body} />
            <rect x={vw * 0.194} y={vh * 0.035} width={vw * 0.613} height={camH * 0.85} rx={camH * 0.4} fill={c.rail} />
            <circle cx={vw * 0.406} cy={vh * 0.051} r={vw * 0.025} fill="#0a0a0a" />
            <circle cx={vw * 0.406} cy={vh * 0.051} r={vw * 0.016} fill="#111" />
            <circle cx={vw * 0.494} cy={vh * 0.051} r={vw * 0.025} fill="#0a0a0a" />
            <circle cx={vw * 0.494} cy={vh * 0.051} r={vw * 0.016} fill="#111" />
            <circle cx={vw * 0.575} cy={vh * 0.051} r={vw * 0.0125} fill="#0a0a0a" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.016} height={vh * 0.103} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.206} width={vw * 0.016} height={vh * 0.066} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.287} width={vw * 0.016} height={vh * 0.066} rx={vw * 0.008} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.422} y={vh * 0.953} width={vw * 0.156} height={vh * 0.015} rx={vw * 0.016} fill={c.rail} />
            <rect x={vw * 0.438} y={vh * 0.956} width={vw * 0.125} height={vh * 0.009} rx={vw * 0.009} fill="#0a0a0a" />
        </svg>
    )
}

function Pixel8Pro({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    // Slightly different aspect, camera bar is slightly larger
    const clipId = `p8p-${uid}`
    const bx = vw * 0.055
    const by = vh * 0.072
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.015
    const rx = vw * 0.075
    const camH = vh * 0.042

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.032} width={vw * 0.988} height={vh * 0.936} rx={rx * 0.97} fill={c.inner} />
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill="none" stroke={c.rail} strokeWidth={vw * 0.005} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill={c.shine} />
            {/* Larger camera bar - Pro model */}
            <rect x={vw * 0.15} y={vh * 0.032} width={vw * 0.7} height={camH} rx={camH * 0.5} fill={c.body} />
            <rect x={vw * 0.157} y={vh * 0.035} width={vw * 0.686} height={camH * 0.85} rx={camH * 0.4} fill={c.rail} />
            <circle cx={vw * 0.315} cy={vh * 0.053} r={vw * 0.028} fill="#0a0a0a" />
            <circle cx={vw * 0.315} cy={vh * 0.053} r={vw * 0.018} fill="#111" />
            <circle cx={vw * 0.416} cy={vh * 0.053} r={vw * 0.028} fill="#0a0a0a" />
            <circle cx={vw * 0.416} cy={vh * 0.053} r={vw * 0.018} fill="#111" />
            <circle cx={vw * 0.515} cy={vh * 0.053} r={vw * 0.028} fill="#0a0a0a" />
            <circle cx={vw * 0.515} cy={vh * 0.053} r={vw * 0.018} fill="#111" />
            <circle cx={vw * 0.614} cy={vh * 0.053} r={vw * 0.015} fill="#0a0a0a" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.016} height={vh * 0.103} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.206} width={vw * 0.016} height={vh * 0.066} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.287} width={vw * 0.016} height={vh * 0.066} rx={vw * 0.008} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.422} y={vh * 0.953} width={vw * 0.156} height={vh * 0.015} rx={vw * 0.016} fill={c.rail} />
            <rect x={vw * 0.438} y={vh * 0.956} width={vw * 0.125} height={vh * 0.009} rx={vw * 0.009} fill="#0a0a0a" />
        </svg>
    )
}

function SamsungGalaxyS24({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `gs24-${uid}`
    const bx = vw * 0.048
    const by = vh * 0.068
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.018
    const rx = vw * 0.078

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.02} width={vw} height={vh * 0.96} rx={rx} fill={c.body} />
            <rect x={vw * 0.005} y={vh * 0.024} width={vw * 0.99} height={vh * 0.952} rx={rx * 0.98} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill={c.shine} />
            {/* Camera module - flat design */}
            <rect x={vw * 0.35} y={vh * 0.025} width={vw * 0.3} height={vh * 0.035} rx={vw * 0.015} fill={c.body} />
            <circle cx={vw * 0.42} cy={vh * 0.042} r={vw * 0.022} fill="#0a0a0a" />
            <circle cx={vw * 0.42} cy={vh * 0.042} r={vw * 0.014} fill="#111" />
            <circle cx={vw * 0.58} cy={vh * 0.042} r={vw * 0.022} fill="#0a0a0a" />
            <circle cx={vw * 0.58} cy={vh * 0.042} r={vw * 0.014} fill="#111" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.22} width={vw * 0.014} height={vh * 0.095} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.19} width={vw * 0.014} height={vh * 0.065} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.27} width={vw * 0.014} height={vh * 0.065} rx={vw * 0.007} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.41} y={vh * 0.96} width={vw * 0.18} height={vh * 0.013} rx={vw * 0.015} fill={c.rail} />
        </svg>
    )
}

function SamsungGalaxyS24Ultra({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `gs24u-${uid}`
    const bx = vw * 0.046
    const by = vh * 0.065
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.016
    const rx = vw * 0.076

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.02} width={vw} height={vh * 0.96} rx={rx} fill={c.body} />
            <rect x={vw * 0.005} y={vh * 0.024} width={vw * 0.99} height={vh * 0.952} rx={rx * 0.98} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill={c.shine} />
            {/* Large camera module - Ultra model */}
            <rect x={vw * 0.3} y={vh * 0.022} width={vw * 0.4} height={vh * 0.042} rx={vw * 0.018} fill={c.body} />
            <circle cx={vw * 0.365} cy={vh * 0.043} r={vw * 0.025} fill="#0a0a0a" />
            <circle cx={vw * 0.365} cy={vh * 0.043} r={vw * 0.016} fill="#111" />
            <circle cx={vw * 0.5} cy={vh * 0.043} r={vw * 0.025} fill="#0a0a0a" />
            <circle cx={vw * 0.5} cy={vh * 0.043} r={vw * 0.016} fill="#111" />
            <circle cx={vw * 0.635} cy={vh * 0.043} r={vw * 0.025} fill="#0a0a0a" />
            <circle cx={vw * 0.635} cy={vh * 0.043} r={vw * 0.016} fill="#111" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.22} width={vw * 0.014} height={vh * 0.095} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.19} width={vw * 0.014} height={vh * 0.065} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.27} width={vw * 0.014} height={vh * 0.065} rx={vw * 0.007} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.41} y={vh * 0.96} width={vw * 0.18} height={vh * 0.013} rx={vw * 0.015} fill={c.rail} />
        </svg>
    )
}

function OnePlus12({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `op12-${uid}`
    const bx = vw * 0.052
    const by = vh * 0.07
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.016
    const rx = vw * 0.082

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.58} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.025} width={vw} height={vh * 0.95} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.028} width={vw * 0.988} height={vh * 0.944} rx={rx * 0.97} fill={c.inner} />
            <rect x={0} y={vh * 0.025} width={vw} height={vh * 0.95} rx={rx} fill="none" stroke={c.rail} strokeWidth={vw * 0.004} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.58} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.58} fill={c.shine} />
            {/* Camera - circular island */}
            <circle cx={vw * 0.5} cy={vh * 0.048} r={vw * 0.065} fill={c.body} />
            <circle cx={vw * 0.42} cy={vh * 0.048} r={vw * 0.028} fill="#0a0a0a" />
            <circle cx={vw * 0.42} cy={vh * 0.048} r={vw * 0.018} fill="#111" />
            <circle cx={vw * 0.58} cy={vh * 0.048} r={vw * 0.028} fill="#0a0a0a" />
            <circle cx={vw * 0.58} cy={vh * 0.048} r={vw * 0.018} fill="#111" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.24} width={vw * 0.015} height={vh * 0.098} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.21} width={vw * 0.015} height={vh * 0.062} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.29} width={vw * 0.015} height={vh * 0.062} rx={vw * 0.007} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.42} y={vh * 0.962} width={vw * 0.16} height={vh * 0.014} rx={vw * 0.015} fill={c.rail} />
        </svg>
    )
}

function NothingPhone2({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `np2-${uid}`
    const bx = vw * 0.05
    const by = vh * 0.068
    const sw = vw - bx * 2
    const sh = vh - by - vh * 0.018
    const rx = vw * 0.08

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} />
                </clipPath>
            </defs>
            <rect x={0} y={vh * 0.025} width={vw} height={vh * 0.95} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.028} width={vw * 0.988} height={vh * 0.944} rx={rx * 0.97} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.6} fill={c.shine} />
            {/* Unique glyph interface camera */}
            <rect x={vw * 0.35} y={vh * 0.032} width={vw * 0.3} height={vh * 0.038} rx={vw * 0.015} fill={c.body} />
            <circle cx={vw * 0.425} cy={vh * 0.051} r={vw * 0.02} fill="#0a0a0a" />
            <circle cx={vw * 0.425} cy={vh * 0.051} r={vw * 0.012} fill="#111" />
            <circle cx={vw * 0.575} cy={vh * 0.051} r={vw * 0.02} fill="#0a0a0a" />
            <circle cx={vw * 0.575} cy={vh * 0.051} r={vw * 0.012} fill="#111" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.014} height={vh * 0.1} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.2} width={vw * 0.014} height={vh * 0.067} rx={vw * 0.007} fill={c.btn} />
            <rect x={-vw * 0.005} y={vh * 0.285} width={vw * 0.014} height={vh * 0.067} rx={vw * 0.007} fill={c.btn} />
            {/* USB-C */}
            <rect x={vw * 0.42} y={vh * 0.96} width={vw * 0.16} height={vh * 0.014} rx={vw * 0.014} fill={c.rail} />
        </svg>
    )
}

// ===== iPhone MODELS =====

function IPhone15({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `ip15-${uid}`
    const bx = vw * 0.05
    const by = vh * 0.024
    const sw = vw - bx * 2
    const sh = vh - by * 2
    const rx = vw * 0.144

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} />
                </clipPath>
            </defs>
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill={c.body} />
            <rect x={vw * 0.009} y={vh * 0.004} width={vw * 0.981} height={vh * 0.991} rx={rx * 0.97} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill={c.shine} />
            {/* Dynamic Island */}
            <rect x={vw * 0.331} y={vh * 0.038} width={vw * 0.338} height={vh * 0.05} rx={vh * 0.025} fill="#000" />
            <circle cx={vw * 0.606} cy={vh * 0.063} r={vw * 0.022} fill="#111" />
            <circle cx={vw * 0.606} cy={vh * 0.063} r={vw * 0.013} fill="#0a0a0a" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.016} height={vh * 0.118} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.206} width={vw * 0.016} height={vh * 0.053} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.274} width={vw * 0.016} height={vh * 0.088} rx={vw * 0.008} fill={c.btn} />
            <rect x={-vw * 0.006} y={vh * 0.376} width={vw * 0.016} height={vh * 0.088} rx={vw * 0.008} fill={c.btn} />
            {/* Bottom */}
            <rect x={vw * 0.406} y={vh * 0.968} width={vw * 0.188} height={vh * 0.015} rx={vw * 0.016} fill={c.rail} />
            <rect x={vw * 0.422} y={vh * 0.971} width={vw * 0.156} height={vh * 0.009} rx={vw * 0.009} fill="#0a0a0a" />
        </svg>
    )
}

function IPhone15Pro({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `ip15p-${uid}`
    const bx = vw * 0.048
    const by = vh * 0.022
    const sw = vw - bx * 2
    const sh = vh - by * 2
    const rx = vw * 0.138

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} />
                </clipPath>
            </defs>
            {/* Titanium body for Pro */}
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill={c.body} />
            <rect x={vw * 0.008} y={vh * 0.003} width={vw * 0.984} height={vh * 0.994} rx={rx * 0.97} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill={c.shine} />
            {/* Dynamic Island */}
            <rect x={vw * 0.328} y={vh * 0.036} width={vw * 0.344} height={vh * 0.052} rx={vh * 0.026} fill="#000" />
            <circle cx={vw * 0.604} cy={vh * 0.062} r={vw * 0.023} fill="#111" />
            <circle cx={vw * 0.604} cy={vh * 0.062} r={vw * 0.014} fill="#0a0a0a" />
            {/* Pro buttons style */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.018} height={vh * 0.125} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.204} width={vw * 0.018} height={vh * 0.056} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.274} width={vw * 0.018} height={vh * 0.093} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.381} width={vw * 0.018} height={vh * 0.093} rx={vw * 0.009} fill={c.btn} />
            {/* Bottom */}
            <rect x={vw * 0.406} y={vh * 0.968} width={vw * 0.188} height={vh * 0.015} rx={vw * 0.016} fill={c.rail} />
        </svg>
    )
}

function IPhone14Pro({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    // Similar to 15 Pro but notch instead of dynamic island
    const clipId = `ip14p-${uid}`
    const bx = vw * 0.048
    const by = vh * 0.022
    const sw = vw - bx * 2
    const sh = vh - by * 2
    const rx = vw * 0.138

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} />
                </clipPath>
            </defs>
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill={c.body} />
            <rect x={vw * 0.008} y={vh * 0.003} width={vw * 0.984} height={vh * 0.994} rx={rx * 0.97} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill={c.shine} />
            {/* Notch */}
            <rect x={vw * 0.3} y={vh * 0.035} width={vw * 0.4} height={vh * 0.056} rx={vh * 0.028} fill="#000" />
            <circle cx={vw * 0.388} cy={vh * 0.063} r={vw * 0.02} fill="#111" />
            <circle cx={vw * 0.388} cy={vh * 0.063} r={vw * 0.012} fill="#0a0a0a" />
            <circle cx={vw * 0.612} cy={vh * 0.063} r={vw * 0.02} fill="#111" />
            <circle cx={vw * 0.612} cy={vh * 0.063} r={vw * 0.012} fill="#0a0a0a" />
            {/* Pro buttons */}
            <rect x={vw * 0.991} y={vh * 0.235} width={vw * 0.018} height={vh * 0.125} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.204} width={vw * 0.018} height={vh * 0.056} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.274} width={vw * 0.018} height={vh * 0.093} rx={vw * 0.009} fill={c.btn} />
            <rect x={-vw * 0.007} y={vh * 0.381} width={vw * 0.018} height={vh * 0.093} rx={vw * 0.009} fill={c.btn} />
            <rect x={vw * 0.406} y={vh * 0.968} width={vw * 0.188} height={vh * 0.015} rx={vw * 0.016} fill={c.rail} />
        </svg>
    )
}

// ===== TABLETS =====

function IPadPro({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `ipad-${uid}`
    const bx = vw * 0.04
    const by = vh * 0.04
    const sw = vw - bx * 2
    const sh = vh - by * 2
    const rx = vw * 0.12

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.8} />
                </clipPath>
            </defs>
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.006} width={vw * 0.988} height={vh * 0.988} rx={rx * 0.96} fill={c.inner} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.8} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.8} fill={c.shine} />
            {/* Center button */}
            <circle cx={vw * 0.5} cy={vh * 0.96} r={vw * 0.025} fill={c.btn} />
            {/* Top cameras */}
            <circle cx={vw * 0.25} cy={vh * 0.04} r={vw * 0.018} fill="#0a0a0a" />
            <circle cx={vw * 0.25} cy={vh * 0.04} r={vw * 0.011} fill="#111" />
            <circle cx={vw * 0.75} cy={vh * 0.04} r={vw * 0.018} fill="#0a0a0a" />
            <circle cx={vw * 0.75} cy={vh * 0.04} r={vw * 0.011} fill="#111" />
        </svg>
    )
}

// ===== GENERIC FRAMES =====

function CleanPhone({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `cl-${uid}`
    const bx = vw * 0.031
    const by = vh * 0.015
    const sw = vw - bx * 2
    const sh = vh - by * 2
    const rx = vw * 0.125

    return (
        <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width: '100%', height: '100%' }} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <clipPath id={clipId}>
                    <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} />
                </clipPath>
            </defs>
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.003} width={vw * 0.988} height={vh * 0.994} rx={rx * 0.97} fill={c.inner} />
            <rect x={0} y={0} width={vw} height={vh} rx={rx} fill="none" stroke={c.rail} strokeWidth={vw * 0.005} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill="#000" />
            <ScreenContent url={url} x={bx} y={by} w={sw} h={sh} clip={clipId} />
            <rect x={bx} y={by} width={sw} height={sh} rx={rx * 0.85} fill={c.shine} />
            {/* Pill notch */}
            <rect x={vw * 0.375} y={vh * 0.026} width={vw * 0.138} height={vh * 0.021} rx={vh * 0.011} fill="#000" />
            <circle cx={vw * 0.506} cy={vh * 0.037} r={vw * 0.011} fill="#111" />
            {/* Buttons */}
            <rect x={vw * 0.991} y={vh * 0.294} width={vw * 0.013} height={vh * 0.088} rx={vw * 0.006} fill={c.btn} />
            <rect x={-vw * 0.003} y={vh * 0.265} width={vw * 0.013} height={vh * 0.059} rx={vw * 0.006} fill={c.btn} />
            <rect x={-vw * 0.003} y={vh * 0.338} width={vw * 0.013} height={vh * 0.059} rx={vw * 0.006} fill={c.btn} />
        </svg>
    )
}

// ===== RENDER FUNCTION =====

export function PhoneFrame({ device, color, screenshotUrl, width, height, uid }: Props) {
    if (device === 'none') return null
    const c = FC[color]
    const vw = width
    const vh = height

    return (
        <div style={{ width, height, flexShrink: 0, position: 'relative' }}>
            {/* Android Phones */}
            {device === 'pixel-8' && <Pixel8 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'pixel-8-pro' && <Pixel8Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'galaxy-s24' && <SamsungGalaxyS24 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'galaxy-s24-ultra' && <SamsungGalaxyS24Ultra c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'oneplus-12' && <OnePlus12 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'nothing-phone-2' && <NothingPhone2 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            
            {/* Legacy Android (simplified versions of newer models) */}
            {['pixel-7', 'pixel-7-pro', 'pixel-6', 'pixel-6-pro'].includes(device) && <Pixel8 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'galaxy-s23' && <SamsungGalaxyS24 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'galaxy-z-fold-6' && <OnePlus12 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'motorola-edge' && <OnePlus12 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            
            {/* iPhone Models */}
            {device === 'iphone-15' && <IPhone15 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-15-plus' && <IPhone15 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-15-pro' && <IPhone15Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-15-pro-max' && <IPhone15Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-14' && <IPhone15 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-14-pro' && <IPhone14Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-14-pro-max' && <IPhone14Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-13' && <IPhone15 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-13-pro' && <IPhone14Pro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            
            {/* Tablets */}
            {device === 'ipad-pro' && <IPadPro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'galaxy-tab-s9' && <IPadPro c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            
            {/* Generic */}
            {device === 'clean' && <CleanPhone c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
        </div>
    )
}
