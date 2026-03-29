export type DeviceFrame = 'pixel-8' | 'iphone-15' | 'clean' | 'none'
export type BackgroundType = 'gradient' | 'solid' | 'image'
export type TextAlign = 'left' | 'center' | 'right'

export interface GradientStop { color: string; position: number }

export interface Background {
    type: BackgroundType
    gradient?: { angle: number; stops: GradientStop[] }
    solid?: string
    imageUrl?: string
}

export interface TextLayer {
    id: string
    content: string
    fontSize: number
    fontWeight: 300 | 400 | 500 | 600 | 700
    color: string
    align: TextAlign
    letterSpacing: number
    lineHeight: number
    x: number
    y: number
    rotation: number
    width: number
}

export interface PhoneTransform {
    x: number
    y: number
    scale: number
    rotation: number
    frameW: number   // phone frame width in native SVG units (default 320)
    frameH: number   // phone frame height in native SVG units (default 680)
}

export interface MockupSlide {
    id: string
    label: string
    background: Background
    screenshotUrl: string | null
    device: DeviceFrame
    deviceColor: 'black' | 'white' | 'titanium'
    title: TextLayer
    subtitle: TextLayer
    phone: PhoneTransform
}

export interface CanvasSize { width: number; height: number }

export const CANVAS_PRESETS: Record<string, CanvasSize & { label: string }> = {
    'play-store-phone': { width: 1080, height: 1920, label: 'Play Store Phone' },
    'play-store-tablet': { width: 1600, height: 2560, label: 'Play Store Tablet' },
    'app-store': { width: 1290, height: 2796, label: 'App Store' },
    'square': { width: 1080, height: 1080, label: 'Square 1:1' },
    'custom': { width: 1100, height: 1980, label: 'Custom' },
}