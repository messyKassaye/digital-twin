import { MaterialInfo } from "./types";

export const MATERIALS: MaterialInfo[] = [
  {
    index: 7,
    label: "Car",
    name: "CarTex_1",
    color: "#c0392b",
    category: "vehicle",
  },
  {
    index: 12,
    label: "Light",
    name: "Street_Assets",
    color: "#999999",
    category: "street",
  },
  {
    index: 15,
    label: "Tower A",
    name: "FoliageTrees.001",
    color: "#2d6a2d",
    category: "vegetation",
  },
  {
    index: 17,
    label: "Tower B",
    name: "FoliageTrees.004",
    color: "#3a7a3a",
    category: "vegetation",
  },
  {
    index: 20,
    label: "Tower C",
    name: "FoliageTrees.002",
    color: "#256025",
    category: "vegetation",
  },
  {
    index: 21,
    label: "Tower D",
    name: "FoliageTrees.003",
    color: "#2e6b2e",
    category: "vegetation",
  },
  {
    index: 24,
    name: "CityGenroof.003",
    color: "#4a4a55",
    category: "building",
  },
  { index: 26, name: "US_Doors_1", color: "#8b5e3c", category: "building" },
  {
    index: 27,
    name: "Us_Builds_facadesWalls.001",
    color: "#c8a882",
    category: "building",
  },
];

export const CATEGORIES = [
  {
    label: "All",
    value: "all",  
  },
  {
    label: "Power",
    value: "building",
  },
  {
    label: "Road",
    value: "road",
  },
  {
    label: "Lights",
    value: "street",
  },
  {
    label: "Towers",
    value: "vegetation",
  },
  {
    label: "Vehicle",
    value: "vehicle",
  },
  {
    label: "Decal",
    value: "decal",
  },
];

export const CATEGORY_COLORS: Record<string, string> = {
  building: "#00c8ff",
  road: "#aaaaaa",
  street: "#ffcc00",
  vegetation: "#00ff88",
  vehicle: "#ff6655",
  decal: "#cc88ff",
  all: "#ffffff",
};

export const HDRI_MAP: Record<string, string> = {
  dawn: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dawn_2_1k.hdr",
  city: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/kloofendal_48d_partly_cloudy_puresky_1k.hdr",
  sunset:
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/evening_road_01_1k.hdr",
  night:
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/starry_night_1k.hdr",
};
