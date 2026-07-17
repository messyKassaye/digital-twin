# Intelligent Campus Dashboard

A Huawei-style "Intelligent Campus" digital-twin dashboard: dark navy/cyan HUD UI
with a live 3D viewport (Three.js) in the center and environment, energy,
security, and asset panels around it (React, TypeScript, Tailwind CSS, recharts).

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- `@react-three/fiber` + `@react-three/drei` for the 3D scene (`Scene.tsx`, `OrbitControls`, `Stars`, `Grid`)
- three.js underneath the fiber layer
- recharts for the donut / area / radar / line charts
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` type-checks and builds
a production bundle; `npm run typecheck` runs `tsc --noEmit` only.

## Project structure

```
src/
  three/
    Scene.tsx                        # your Scene component — lighting, sky, model, grid, controls
    Model.tsx                        # ⚠️ placeholder — swap for your real Model.tsx
    RealSky.tsx                      # ⚠️ placeholder — swap for your real HDRI-based RealSky.tsx
    PanToTarget.tsx                  # ⚠️ placeholder — swap for your real PanToTarget.tsx
    utils.ts                         # ⚠️ placeholder — swap for your real getTimeConfig
    types.ts                         # ⚠️ placeholder — swap for your real StreetMeshEntry type
  components/
    IntelligentCampusDashboard.tsx   # main layout — top bar, tabs, 3-column grid, all transparent
    SceneBackground.tsx              # <Canvas> wrapper mounting Scene as the fixed full-page background
    hud.tsx                          # shared HUD primitives (Panel, DonutStat, MiniLine, StatRow)
  hooks/
    useClock.ts                      # live clock used in the top bar
  App.tsx
  main.tsx
  index.css                          # Tailwind directives
```

## Swapping in your real Scene dependencies

`Scene.tsx` is used as-is. Everything it imports from `./RealSky`, `./Model`,
`./PanToTarget`, `./utils`, and `./types` is a **placeholder** built just to
satisfy `Scene`'s prop contract and get the project compiling/running
end-to-end. Replace each file with your project's real implementation
(the actual HDRI sky, material/street-mesh extraction, camera pan easing,
etc.) — `Scene.tsx` itself shouldn't need any changes.

`SceneBackground.tsx` currently wires `selectedMaterial`, `colorOverrides`,
`panTarget`, and `selectedMeshUUID` to inert defaults so the scene renders
standalone as a background. If you bring back the material picker / mesh
inspector UI, lift that state up into (or above) `SceneBackground` and pass
it through.

## Swapping in your own 3D model

`SceneBackground` loads a small public sample `.glb` by default so the
project runs out of the box. Pass your own model instead:

```tsx
<SceneBackground modelUrl="/models/your-campus.glb" />
```

Put the file under `public/models/` (create the folder) so Vite serves it
statically, or point at any reachable HTTPS URL.

## Notes

- Layout targets desktop widths (12-column grid); add responsive breakpoints
  if you need mobile support.
- Every card, the top bar, and the tab strip are fully transparent
  (`bg-transparent`, border only) so the 3D scene reads through the whole
  page, not just one panel.
- Chart data in `IntelligentCampusDashboard.tsx` is static sample data — wire
  it up to your real telemetry/API as needed.
