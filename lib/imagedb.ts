import { openDB } from 'idb'

const DB_NAME = 'screenshot-studio'
const STORE = 'images'

async function getDB() {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE)
            }
        },
    })
}

export async function saveImage(key: string, blob: Blob): Promise<void> {
    const db = await getDB()
    await db.put(STORE, blob, key)
}

export async function loadImage(key: string): Promise<string | null> {
    const db = await getDB()
    const blob = await db.get(STORE, key)
    if (!blob) return null
    return URL.createObjectURL(blob)
}

export async function deleteImage(key: string): Promise<void> {
    const db = await getDB()
    await db.delete(STORE, key)
}

export async function clearAllImages(): Promise<void> {
    const db = await getDB()
    await db.clear(STORE)
}