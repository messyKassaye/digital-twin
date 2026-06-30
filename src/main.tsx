import React from "react";
import ReactDOM from "react-dom/client";
import GLBViewer from "./GLBViewer";
// @ts-ignore: side-effect import of CSS without type declarations
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GLBViewer url="/model/tower_glass_c.glb" />
  </React.StrictMode>,
);
