# nivo-3d

[![NPM Version](https://img.shields.io/npm/v/nivo-3d.svg?style=flat-square&color=6C63FF)](https://www.npmjs.com/package/nivo-3d)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Nivo 3D Studio](https://img.shields.io/badge/Authoring-Nivo%203D%20Studio-6C63FF.svg?style=flat-square)](https://nivo.jonave.in)

The official universal 3D spatial experience component for **React**, **Next.js (App & Pages Router)**, and **Astro**.  
Crafted with [Nivo 3D Studio](https://nivo.jonave.in).

---

## 🌟 Key Highlights

- ⚡ **Zero Framework Lock-in**: Run identical 3D scenes across Vite, Next.js (App Router & Pages Router), Astro, and Remix.
- 🛡️ **RSC Safe by Default**: `<NivoSceneClient>` encapsulates `'use client'` internally so your Next.js pages remain 100% server-rendered React Server Components.
- 💤 **Lazy WebGL Mounting**: Uses `IntersectionObserver` to defer WebGL and GPU context allocation until the element scrolls into view.
- 🔄 **Automatic Context Loss Recovery**: Gracefully handles GPU context loss (`webglcontextlost` / `webglcontextrestored`) without crashing your app.
- 🔋 **Battery-Friendly Micro-Throttling**: Automatically throttles when idle and sleeps to 0 FPS when the browser tab is hidden.
- 📱 **Mobile Touch Disambiguation**: Single-finger vertical dragging cleanly scrolls the page, while two fingers orbit and pinch-zoom the 3D canvas.
- 🌐 **Headless Dynamic 3D**: Point `<NivoViewer src="https://cdn.example.com/scene.json" />` to load scenes dynamically from any CDN or S3 bucket without redeploying your site.

---

## 📦 Installation

```bash
npm install nivo-3d three @react-three/fiber @react-three/drei
```

---

## 🚀 Quick Start

### 1. Next.js App Router (RSC-Safe)

Drop `scene.json` exported from Nivo Studio into your project and render:

```tsx
// app/scene/page.tsx
import { NivoSceneClient } from 'nivo-3d';
import sceneData from './scene.json';

export default function Page() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#0a0a0f' }}>
      <NivoSceneClient
        scene={sceneData}
        cameraControls={true}
        autoPlay={true}
      />
    </main>
  );
}
```

*Because `NivoSceneClient` encapsulates client-side WebGL internally, your Next.js page remains an SEO-friendly React Server Component.*

---

### 2. Vite / Standard React

```tsx
import React from 'react';
import { NivoViewer } from 'nivo-3d';
import sceneData from './scene.json';

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '600px' }}>
      <NivoViewer
        scene={sceneData}
        cameraControls={true}
        autoPlay={true}
      />
    </div>
  );
}
```

---

### 3. Headless CDN Dynamic Loading

Host your declarative `scene.json` on any CDN, Cloudflare R2, or AWS S3:

```tsx
<NivoViewer src="https://scenes.nivo.jonave.in/cyberpunk-city.json" />
```

---

## ⚙️ Props Reference

| Prop | Type | Default | Description |
|---|---|---|---|
| `scene` | `NivoSceneData` | `undefined` | Declarative 3D scene data JSON exported from Nivo 3D Studio |
| `sceneData` | `NivoSceneData` | `undefined` | *(Backward-compatible alias for `scene`)* |
| `src` | `string` | `undefined` | Remote URL to fetch `scene.json` dynamically from CDN or R2 |
| `cameraControls` | `boolean` | `true` | Orbit controls (orbit, pan, pinch to zoom) |
| `touchMode` | `'scroll-priority' \| 'rotate-priority' \| 'auto'` | `'scroll-priority'` | Mobile touch strategy: `'scroll-priority'` allows single-finger vertical page scroll and two-finger orbit; `'rotate-priority'` allows single-finger 3D rotation |
| `sleepWhenHidden` | `boolean` | `true` | Sleep render loop to 0 FPS when browser tab is hidden (Page Visibility API) |
| `autoPlay` | `boolean` | `true` | Automatically plays GLTF model animations and timeline keyframes |
| `lazy` | `boolean` | `true` | Defer WebGL mounting until element scrolls into viewport |
| `rootMargin` | `string` | `'200px'` | Pre-initialization margin distance for lazy loading |
| `posterUrl` | `string` | `undefined` | Static fallback image placeholder during WebGL compilation |
| `className` | `string` | `undefined` | Optional CSS class name for wrapper container |
| `style` | `React.CSSProperties` | `undefined` | Optional inline CSS styles for wrapper |
| `onLoad` | `(scene: NivoSceneData) => void` | `undefined` | Callback fired once the scene finishes mounting |
| `onContextLost` | `() => void` | `undefined` | Callback fired when WebGL GPU context loss occurs |
| `onContextRestored` | `() => void` | `undefined` | Callback fired after WebGL context is restored and canvas remounts |
| `fallback` | `React.ReactNode` | `null` | Optional fallback element while remote scene is loading |

---

## 🌐 Supported Framework Matrix

| Framework | Version Profile | Route / Component Model | Status |
|---|---|---|---|
| **Next.js** | `16.4.x` (Active LTS) | App Router (RSC `<NivoSceneClient>`) & Pages Router | ✅ Verified |
| **Next.js** | `15.5.x` (Maintenance) | App Router & Pages Router | ✅ Verified |
| **React** | `^18.3.1` \| `^19.0.0` | Client Component / SPA | ✅ Verified |
| **Vite** | `^5.0.0` \| `^6.0.0` | React Single Page App | ✅ Verified |
| **Astro** | `^4.0.0` \| `^5.0.0` | `client:visible` / `client:load` Island | ✅ Verified |

---

## 🛠️ Local Development

```bash
git clone https://github.com/jonave-official/nivo-3d.git
cd nivo-3d
npm install
npm run build
npm test
```

---

## 📄 License

MIT © [Jonave Technologies LLC / Nivo Contributors](https://nivo.jonave.in)
