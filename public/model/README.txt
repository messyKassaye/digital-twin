Drop your .glb building models here.

Expected filenames (edit src/data/buildings.ts to match yours):
  tower_glass_a.glb
  tower_glass_b.glb
  building_midrise_a.glb
  building_midrise_b.glb
  building_lowrise_a.glb
  building_lowrise_b.glb
  building_wide.glb
  building_small.glb

ArcGIS fetches these as HTTP URLs at runtime — they are NOT JS imports.
Vite serves everything in public/ at the root: http://localhost:5173/models/<file>.glb
