import { Cloud, UploadCloud } from "lucide-react";
import { MATERIALS, tabs } from "./data";
import dashboardState from "../../store/dashboard-state";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  onSelect: (matName: string, color?: string) => void;
  time: string;
  onUpload?: (file: File) => void;
};
export function Header({ onSelect, time, onUpload }: Props) {
  const { selectedTab, setSelectedTab } = dashboardState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later

    if (!file) return;

    const isGlb =
      file.name.toLowerCase().endsWith(".glb") ||
      file.type === "model/gltf-binary";

    if (!isGlb) {
      setUploadError("Only .glb files are supported");
      setUploadedFile(null);
      return;
    }

    setUploadError(null);
    setUploadedFile(file);
    onUpload?.(file);
  };

  return (
    <>
      <div className="pointer-events-none relative ic-bg flex items-center justify-between px-10 py-2.5 bg-transparent border-b border-cyan-400/20 [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-slate-100">
          <span className="text-rose-400">◆</span> DIGITAL HAIL
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="text-cyan-300 text-sm">▦</span>
          <h1 className="text-[19px] font-bold tracking-[0.15em] text-slate-50">
            INTELLIGENT CAMPUS
          </h1>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <span className="hidden sm:inline">
            Intelligent Office Experience
          </span>
          <span className="hidden sm:inline text-cyan-300">Solution</span>
          <Cloud size={14} className="text-cyan-300" />
          <span className="font-mono text-cyan-100">{time}</span>
        </div>
      </div>

      <div className="flex ic-bg items-center justify-between gap-1 bg-transparent border-b border-cyan-400/20 text-[11px] [text-shadow:0_1px_4px_rgba(0,0,0,0.9)]">
        <span></span>
        <div className="flex items-center justify-center gap-1">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab);
              }}
              className={`pointer-events-auto px-5 py-1.5 tracking-wide cursor-pointer border-b-2 -mb-px ${
                selectedTab.id - 1 === i
                  ? "border-cyan-400 text-cyan-200"
                  : "border-transparent text-slate-300 hover:text-cyan-200"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="relative pointer-events-auto mr-8 flex gap-3 items-center justify-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,model/gltf-binary"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            className="flex items-center justify-center gap-1 bg-slate-900/80 px-2 py-1 rounded text-[11px] text-cyan-100 border border-cyan-400/30 hover:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud size={16} />
            Upload GLB file
          </button>

          {uploadedFile && (
            <span
              className="text-cyan-200 font-mono max-w-[160px] truncate"
              title={uploadedFile.name}
            >
              {uploadedFile.name}
            </span>
          )}
          {uploadError && <span className="text-rose-400">{uploadError}</span>}

          <select
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const material = MATERIALS.find((m) => m.name === e.target.value);
              if (material) onSelect(material.name, material.color);
            }}
            defaultValue={"all"}
            className="appearance-none bg-slate-900/80 border border-cyan-400/30 text-cyan-100 text-[11px]
               rounded px-3 py-1 pr-6 tracking-wide cursor-pointer
               hover:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60
               transition-colors"
          >
            {MATERIALS.map((material) => (
              <option
                className="bg-slate-900 text-slate-100"
                value={material.name}
                key={material.index}
              >
                {material.label}
              </option>
            ))}
          </select>
          {/* custom arrow, since appearance-none removes the native one */}
          <svg
            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
