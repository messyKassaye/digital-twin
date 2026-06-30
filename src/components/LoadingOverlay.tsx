import { useEffect, useState } from "react";

export function LoadingOverlay() {
  const [dots, setDots] = useState(".");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const d = setInterval(
      () => setDots((p) => (p.length >= 3 ? "." : p + ".")),
      400,
    );
    const p = setInterval(
      () => setProgress((p) => (p >= 90 ? p : p + Math.random() * 8)),
      200,
    );
    return () => {
      clearInterval(d);
      clearInterval(p);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        background:
          "linear-gradient(135deg,#020b1a 0%,#04091a 50%,#020e1f 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      {/* Corner brackets */}
      {[
        { top: 24, left: 24, borderWidth: "2px 0 0 2px" },
        { top: 24, right: 24, borderWidth: "2px 2px 0 0" },
        { bottom: 24, left: 24, borderWidth: "0 0 2px 2px" },
        { bottom: 24, right: 24, borderWidth: "0 2px 2px 0" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 24,
            height: 24,
            borderStyle: "solid",
            borderColor: "rgba(0,200,255,0.4)",
            ...s,
          }}
        />
      ))}

      {/* Spinner */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        {[0, 10, 20].map((inset, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset,
              borderRadius: "50%",
              border: "1px solid transparent",
              borderTopColor: ["#00c8ff", "#0088dd", "#004488"][i],
              animation: `ic-spin ${1 + i * 0.4}s linear infinite${i === 1 ? " reverse" : ""}`,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00c8ff",
              boxShadow: "0 0 16px #00c8ff",
              animation: "ic-pulse 1s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            color: "#00c8ff",
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 4,
            marginBottom: 4,
            textShadow: "0 0 20px rgba(0,200,255,0.6)",
          }}
        >
          LOADING SCENE{dots}
        </div>
        <div
          style={{
            color: "#1a4a6a",
            fontSize: 11,
            fontFamily: "'Share Tech Mono', monospace",
            letterSpacing: 2,
          }}
        >
          INITIALIZING 3D MODULE
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 240 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: "#1a4a6a",
              fontFamily: "monospace",
              letterSpacing: 1,
            }}
          >
            LOADING
          </span>
          <span
            style={{ fontSize: 10, color: "#00c8ff", fontFamily: "monospace" }}
          >
            {Math.round(Math.min(progress, 90))}%
          </span>
        </div>
        <div
          style={{
            height: 2,
            background: "#051020",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 1,
              background: "linear-gradient(90deg, #003366, #00c8ff)",
              width: `${Math.min(progress, 90)}%`,
              transition: "width 0.2s ease",
              boxShadow: "0 0 10px #00c8ff",
            }}
          />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@700&family=Share+Tech+Mono&display=swap');
        @keyframes ic-spin { to { transform: rotate(360deg) } }
        @keyframes ic-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.6)} }
      `}</style>
    </div>
  );
}
