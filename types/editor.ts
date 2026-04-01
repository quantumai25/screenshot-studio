export type DeviceFrame = 
  // Android Phones - Google
  | 'pixel-8' | 'pixel-8-pro' | 'pixel-7' | 'pixel-7-pro' 
  | 'pixel-6' | 'pixel-6-pro' | 'pixel-5' | 'pixel-4'
  | 'pixel-3' | 'pixel-3-xl'
  // Android Phones - Samsung
  | 'galaxy-s24' | 'galaxy-s24-ultra' | 'galaxy-s23' | 'galaxy-s23-ultra'
  | 'galaxy-s22' | 'galaxy-s21' | 'galaxy-s20'
  | 'galaxy-z-fold-6' | 'galaxy-z-flip-6' | 'galaxy-a54'
  // Android Phones - Other
  | 'oneplus-12' | 'oneplus-11' | 'motorola-edge' | 'motorola-g84'
  | 'nothing-phone-2' | 'xiaomi-14' | 'honor-90'
  // iPhone Models
  | 'iphone-15' | 'iphone-15-plus' | 'iphone-15-pro' | 'iphone-15-pro-max'
  | 'iphone-14' | 'iphone-14-plus' | 'iphone-14-pro' | 'iphone-14-pro-max'
  | 'iphone-13' | 'iphone-13-mini' | 'iphone-13-pro' | 'iphone-13-pro-max'
  | 'iphone-12' | 'iphone-12-mini' | 'iphone-12-pro' | 'iphone-se'
  // Tablets
  | 'ipad-pro' | 'ipad-air' | 'ipad-mini' | 'galaxy-tab-s9' | 'galaxy-tab-s9-ultra'
  // Other
  | 'clean' | 'none'
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
    fontWeight: 300 | 400 | 500 | 600 | 700 | 800
    color: string
    align: TextAlign
    letterSpacing: number
    lineHeight: number
    x: number
    y: number
    rotation: number
    width: number
    textDecoration?: 'none' | 'underline' | 'line-through' | 'overline'
    fontStyle?: 'normal' | 'italic'
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    textShadow?: string
    opacity?: number
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

export interface DeviceMetadata {
  label: string
  aspectRatio: number
  platformTag: 'Android' | 'iOS' | 'Tablet'
  year: number
}

export const DEVICE_METADATA: Record<DeviceFrame, DeviceMetadata> = {
  // Google Pixel
  'pixel-8': { label: 'Pixel 8', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'pixel-8-pro': { label: 'Pixel 8 Pro', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'pixel-7': { label: 'Pixel 7', aspectRatio: 19.5/9, platformTag: 'Android', year: 2022 },
  'pixel-7-pro': { label: 'Pixel 7 Pro', aspectRatio: 19.5/9, platformTag: 'Android', year: 2022 },
  'pixel-6': { label: 'Pixel 6', aspectRatio: 20/9, platformTag: 'Android', year: 2021 },
  'pixel-6-pro': { label: 'Pixel 6 Pro', aspectRatio: 19.5/9, platformTag: 'Android', year: 2021 },
  'pixel-5': { label: 'Pixel 5', aspectRatio: 19.5/9, platformTag: 'Android', year: 2020 },
  'pixel-4': { label: 'Pixel 4', aspectRatio: 19.5/9, platformTag: 'Android', year: 2019 },
  'pixel-3': { label: 'Pixel 3', aspectRatio: 18/9, platformTag: 'Android', year: 2018 },
  'pixel-3-xl': { label: 'Pixel 3 XL', aspectRatio: 18.5/9, platformTag: 'Android', year: 2018 },
  
  // Samsung Galaxy
  'galaxy-s24': { label: 'Galaxy S24', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'galaxy-s24-ultra': { label: 'Galaxy S24 Ultra', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'galaxy-s23': { label: 'Galaxy S23', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'galaxy-s23-ultra': { label: 'Galaxy S23 Ultra', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'galaxy-s22': { label: 'Galaxy S22', aspectRatio: 20/9, platformTag: 'Android', year: 2022 },
  'galaxy-s21': { label: 'Galaxy S21', aspectRatio: 20/9, platformTag: 'Android', year: 2021 },
  'galaxy-s20': { label: 'Galaxy S20', aspectRatio: 20/9, platformTag: 'Android', year: 2020 },
  'galaxy-z-fold-6': { label: 'Galaxy Z Fold 6', aspectRatio: 17.4/9, platformTag: 'Android', year: 2024 },
  'galaxy-z-flip-6': { label: 'Galaxy Z Flip 6', aspectRatio: 21/9, platformTag: 'Android', year: 2024 },
  'galaxy-a54': { label: 'Galaxy A54', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  
  // Other Android
  'oneplus-12': { label: 'OnePlus 12', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'oneplus-11': { label: 'OnePlus 11', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'motorola-edge': { label: 'Motorola Edge 50', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'motorola-g84': { label: 'Motorola G84', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'nothing-phone-2': { label: 'Nothing Phone 2', aspectRatio: 20/9, platformTag: 'Android', year: 2023 },
  'xiaomi-14': { label: 'Xiaomi 14', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  'honor-90': { label: 'Honor 90', aspectRatio: 20/9, platformTag: 'Android', year: 2024 },
  
  // iPhone
  'iphone-15': { label: 'iPhone 15', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2023 },
  'iphone-15-plus': { label: 'iPhone 15 Plus', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2023 },
  'iphone-15-pro': { label: 'iPhone 15 Pro', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2023 },
  'iphone-15-pro-max': { label: 'iPhone 15 Pro Max', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2023 },
  'iphone-14': { label: 'iPhone 14', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2022 },
  'iphone-14-plus': { label: 'iPhone 14 Plus', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2023 },
  'iphone-14-pro': { label: 'iPhone 14 Pro', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2022 },
  'iphone-14-pro-max': { label: 'iPhone 14 Pro Max', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2022 },
  'iphone-13': { label: 'iPhone 13', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2021 },
  'iphone-13-mini': { label: 'iPhone 13 Mini', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2021 },
  'iphone-13-pro': { label: 'iPhone 13 Pro', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2021 },
  'iphone-13-pro-max': { label: 'iPhone 13 Pro Max', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2021 },
  'iphone-12': { label: 'iPhone 12', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2020 },
  'iphone-12-mini': { label: 'iPhone 12 Mini', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2020 },
  'iphone-12-pro': { label: 'iPhone 12 Pro', aspectRatio: 19.5/9, platformTag: 'iOS', year: 2020 },
  'iphone-se': { label: 'iPhone SE', aspectRatio: 16/9, platformTag: 'iOS', year: 2023 },
  
  // Tablets
  'ipad-pro': { label: 'iPad Pro 12.9"', aspectRatio: 4/3, platformTag: 'Tablet', year: 2024 },
  'ipad-air': { label: 'iPad Air', aspectRatio: 4/3, platformTag: 'Tablet', year: 2024 },
  'ipad-mini': { label: 'iPad Mini', aspectRatio: 4/3, platformTag: 'Tablet', year: 2023 },
  'galaxy-tab-s9': { label: 'Galaxy Tab S9', aspectRatio: 16/10, platformTag: 'Tablet', year: 2023 },
  'galaxy-tab-s9-ultra': { label: 'Galaxy Tab S9 Ultra', aspectRatio: 16/10, platformTag: 'Tablet', year: 2023 },
  
  // Generic
  'clean': { label: 'Clean Frame', aspectRatio: 19.5/9, platformTag: 'Android', year: 2024 },
  'none': { label: 'No Frame', aspectRatio: 19.5/9, platformTag: 'Android', year: 2024 },
}

export const CANVAS_PRESETS: Record<string, CanvasSize & { label: string }> = {
    'play-store-phone': { width: 1080, height: 1920, label: 'Play Store Phone' },
    'play-store-tablet': { width: 1600, height: 2560, label: 'Play Store Tablet' },
    'app-store': { width: 1290, height: 2796, label: 'App Store' },
    'square': { width: 1080, height: 1080, label: 'Square 1:1' },
    'custom': { width: 1100, height: 1980, label: 'Custom' },
}