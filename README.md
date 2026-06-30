# GLB Material Inspector

A React + Three.js (react-three-fiber) viewer for inspecting and recoloring materials on a GLB model, with time-of-day lighting and an interactive sidebar.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

## Adding your model

The viewer expects a `.glb` file to be served from the `public/model/` folder,
matching the `url` prop passed to `<GLBViewer />` in `src/main.tsx`
(default: `/model/tower_glass_c.glb`).

Place your file at:

```
public/model/tower_glass_c.glb
```

or change the `url` prop in `src/main.tsx` to point at a different path / URL.

Note: the material list in `src/data.ts` (`MATERIALS`) is hard-coded to match
the names/categories of materials in that specific model. Update it to match
the material names in your own `.glb` file.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  GLBViewer.tsx        — top-level component (state + composition)
  types.ts             — shared TypeScript types
  data.ts              — material/category data, HDRI map
  utils.ts             — cleanName(), getTimeConfig()
  styles.ts            — global CSS string for the sidebar UI
  components/
    LoadingOverlay.tsx
    RealSky.tsx
    PanToTarget.tsx
    Model.tsx
    Scene.tsx
    SidebarHeader.tsx
    CategoryFilters.tsx
    MaterialList.tsx
    StreetAssetMeshList.tsx
    SelectedMaterialFooter.tsx
    MaterialSidebar.tsx
```
"# digital-twin" 
