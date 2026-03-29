# Screenshot Studio

Free, open-source Play Store screenshot editor built for Android developers.

🔗 **Use it live → [chrone.vercel.app](https://chrone.vercel.app)**

No signup. No subscription. No Figma seat.

---

## What it does

Design beautiful Google Play Store listing screenshots with:

- 📱 Realistic phone mockups — Pixel 8, iPhone 15, Clean frameless
- 🎨 Gradient backgrounds with custom color stops and angle control
- ✍️ Draggable title & subtitle text with full typography control
- 📐 Custom frame dimensions — type your exact screenshot pixel size for perfect fit
- 🔢 Multi-slide management with drag-to-reorder
- 📤 High-res 2× PNG export — single slide or all at once
- 💾 Persistent state — layouts and settings survive page reloads

---

## Run locally

**Requirements:** Node.js 20.9+
```bash
git clone https://github.com/quantumai25/screenshot-studio.git
cd screenshot-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Stack

- [Next.js 16](https://nextjs.org) — framework
- [Zustand](https://zustand-demo.pmnd.rs) + [Immer](https://immerjs.github.io/immer/) — state
- [dnd-kit](https://dndkit.com) — drag to reorder slides
- [html-to-image](https://github.com/bubkoo/html-to-image) — PNG export
- [idb](https://github.com/jakearchibald/idb) — IndexedDB for image persistence

---

## Built by

[@quantumai25](https://github.com/quantumai25) — also building [Chrone](https://play.google.com/store/apps/details?id=com.chrone), an on-device AI calendar for Android.

---

## License

MIT
