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
    height: number  // now explicit, not derived from ratio
    uid: string
}

// Screen fills the entire frame area — coords passed in, no hardcoding
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

// All frames use a dynamic viewBox matching frameW × frameH
// Screen area is inset by a fixed border thickness so the frame chrome scales too

function Pixel8({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `p8-${uid}`
    // border thicknesses as fraction of viewBox
    const bx = vw * 0.056   // ~18/320
    const by = vh * 0.076   // ~52/680
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
            {/* Body */}
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill={c.body} />
            <rect x={vw * 0.006} y={vh * 0.032} width={vw * 0.988} height={vh * 0.936} rx={rx * 0.97} fill={c.inner} />
            <rect x={0} y={vh * 0.03} width={vw} height={vh * 0.94} rx={rx} fill="none" stroke={c.rail} strokeWidth={vw * 0.005} />
            {/* Screen */}
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

function IPhone15({ c, url, uid, vw, vh }: { c: typeof FC.black; url: string | null; uid: string; vw: number; vh: number }) {
    const clipId = `ip-${uid}`
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

export function PhoneFrame({ device, color, screenshotUrl, width, height, uid }: Props) {
    if (device === 'none') return null
    const c = FC[color]
    // vw/vh are the SVG coordinate space dimensions — frames scale proportionally to these
    const vw = width
    const vh = height
    return (
        <div style={{ width, height, flexShrink: 0, position: 'relative' }}>
            {device === 'pixel-8' && <Pixel8 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'iphone-15' && <IPhone15 c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
            {device === 'clean' && <CleanPhone c={c} url={screenshotUrl} uid={uid} vw={vw} vh={vh} />}
        </div>
    )
}