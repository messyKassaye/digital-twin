export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

  :root {
    --ic-bg:        #04091a;
    --ic-panel:     rgba(4, 18, 42, 0.86);
    --ic-border:    rgba(0, 200, 255, 0.18);
    --ic-accent:    #00c8ff;
    --ic-accent2:   #0066cc;
    --ic-glow:      rgba(0, 200, 255, 0.35);
    --ic-text:      #c8e8ff;
    --ic-muted:     #4a7a9b;
    --ic-warning:   #ffcc00;
    --ic-danger:    #ff4444;
    --ic-success:   #00ff88;
    --ic-grid-dot:  rgba(0, 200, 255, 0.06);
    --ic-bar-h:     300px;
  }

  * { box-sizing: border-box; }

  /* ── Top bar shell ── */
  .ic-sidebar {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: var(--ic-bar-h);
    background: var(--ic-panel);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--ic-border);
    box-shadow: 0 8px 30px rgba(0,0,0,0.45);
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    font-family: 'Rajdhani', 'system-ui', sans-serif;
    transition: transform 0.3s ease;
  }

  /* dot-grid background texture */
  .ic-sidebar::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, var(--ic-grid-dot) 1px, transparent 1px);
    background-size: 18px 18px;
    pointer-events: none;
    z-index: 0;
  }

  .ic-sidebar > * { position: relative; z-index: 1; }

  /* ── Two-pane split ── */
  .ic-pane {
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    overflow: hidden;
  }

  .ic-pane-left {
    flex: 1.5 1 0%;
    border-right: 1px solid var(--ic-border);
  }

  .ic-pane-right {
    flex: 1 1 0%;
  }

  .ic-pane-label-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-bottom: 1px solid var(--ic-border);
    background: linear-gradient(90deg, rgba(0,120,200,0.18) 0%, transparent 100%);
    flex-shrink: 0;
  }

  .ic-pane-label {
    font-size: 9px;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 2px;
    color: var(--ic-muted);
    text-transform: uppercase;
  }

  /* ── Header (left pane top row) ── */
  .ic-header-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    background: linear-gradient(90deg, rgba(0,120,200,0.25) 0%, transparent 100%);
    border-bottom: 1px solid var(--ic-border);
    flex-shrink: 0;
  }

  .ic-module-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    border: 1px solid var(--ic-accent);
    border-radius: 4px;
    background: rgba(0, 200, 255, 0.1);
    box-shadow: 0 0 10px var(--ic-glow);
    flex-shrink: 0;
  }

  .ic-module-badge svg {
    width: 14px; height: 14px;
    fill: var(--ic-accent);
    filter: drop-shadow(0 0 4px var(--ic-accent));
  }

  .ic-title-text { flex-shrink: 0; }

  .ic-title-main {
    font-size: 13px;
    font-weight: 700;
    color: var(--ic-accent);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    line-height: 1;
    text-shadow: 0 0 10px var(--ic-glow);
    white-space: nowrap;
  }

  .ic-title-sub {
    font-size: 10px;
    color: var(--ic-muted);
    letter-spacing: 0.5px;
    font-family: 'Share Tech Mono', monospace;
    margin-top: 2px;
    white-space: nowrap;
  }

  .ic-count-badge {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: var(--ic-warning);
    background: rgba(255, 204, 0, 0.1);
    border: 1px solid rgba(255, 204, 0, 0.3);
    border-radius: 3px;
    padding: 1px 6px;
    flex-shrink: 0;
  }

  /* ── Search (inline, right side of header row) ── */
  .ic-search-wrap {
    flex: 1;
    min-width: 120px;
    display: flex;
    justify-content: flex-end;
  }

  .ic-search-icon-wrap {
    position: relative;
    width: 100%;
    max-width: 240px;
  }

  .ic-search {
    width: 100%;
    padding: 6px 10px 6px 30px;
    background: rgba(0, 30, 60, 0.8);
    border: 1px solid rgba(0, 200, 255, 0.2);
    border-radius: 3px;
    color: var(--ic-text);
    font-size: 12px;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 0.5px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .ic-search:focus {
    border-color: var(--ic-accent);
    box-shadow: 0 0 8px var(--ic-glow), inset 0 0 8px rgba(0,200,255,0.05);
  }

  .ic-search::placeholder { color: var(--ic-muted); }

  .ic-search-icon {
    position: absolute;
    left: 22px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ic-muted);
    font-size: 12px;
    pointer-events: none;
  }

  /* ── Category filters + reset (second row in left pane) ── */
  .ic-categories-row {
    display: flex;
    align-items: center;
    width:auto
    justify-content: space-between;
    background: rgba(4, 18, 42, 0.60);
    gap: 10px;
    padding: 7px 14px;
    border-bottom: 1px solid var(--ic-border);
    flex-shrink: 0;
  }

  .ic-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .ic-cat-btn {
    padding: 2px 8px;
    border-radius: 2px;
    font-size: 10px;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 0.5px;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.15s;
    border-width: 1px;
    border-style: solid;
  }

  .ic-reset-btn {
    flex-shrink: 0;
    padding: 4px 10px;
    border-radius: 3px;
    font-size: 10px;
    font-family: 'Share Tech Mono', monospace;
    cursor: pointer;
    background: rgba(255, 60, 60, 0.1);
    border: 1px solid rgba(255, 60, 60, 0.4);
    color: #ff8888;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .ic-reset-btn:hover {
    background: rgba(255, 60, 60, 0.2);
    border-color: #ff4444;
    box-shadow: 0 0 8px rgba(255, 60, 60, 0.3);
  }

  /* ── Material list (left pane, fills remaining height, 2-col grid) ── */
  .ic-mat-list {
    display:flex
    overflow-y: auto;
    padding: 6px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
    align-content: start;
    background: rgba(4, 18, 42, 0.60);

  }

  .ic-mat-list::-webkit-scrollbar { width: 4px; }
  .ic-mat-list::-webkit-scrollbar-track { background: transparent; }
  .ic-mat-list::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.2); border-radius: 2px; }

  .ic-mat-row {
    cursor: pointer;
    border: 1px solid transparent;
    border-left: 2px solid transparent;
    border-radius: 3px;
    transition: all 0.15s;
  }

  .ic-mat-row.selected {
    border-left-color: var(--ic-accent);
    border-color: var(--ic-border);
    background: rgba(0, 200, 255, 0.08);
  }

  .ic-mat-inner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
  }

  .ic-mat-row:hover .ic-mat-inner {
    background: rgba(0, 200, 255, 0.04);
  }

  .ic-swatch-wrap {
    position: relative;
    width: 18px; height: 18px;
    flex-shrink: 0;
  }

  .ic-selected-prop{
      background: rgba(4, 18, 42, 0.60);

  }

  .ic-swatch {
    width: 18px; height: 18px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.15);
  }

  .ic-swatch.overridden {
    border-color: var(--ic-warning);
    box-shadow: 0 0 6px rgba(255,204,0,0.4);
  }

  .ic-swatch-input {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
  }

  .ic-mat-info { flex: 1; min-width: 0; }

  .ic-mat-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--ic-text);
    letter-spacing: 0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .ic-mat-row.selected .ic-mat-name { color: var(--ic-accent); }

  .ic-mat-cat {
    font-size: 9px;
    color: var(--ic-muted);
    font-family: 'Share Tech Mono', monospace;
  }

  .ic-mat-action {
    font-size: 11px;
    color: var(--ic-muted);
    flex-shrink: 0;
  }

  .ic-mat-row.selected .ic-mat-action { color: var(--ic-accent); }

  .ic-override-dot {
    color: var(--ic-warning);
    margin-left: 4px;
    font-size: 9px;
  }

  .ic-reset-icon {
    background: transparent;
    border: none;
    color: #ff6666;
    cursor: pointer;
    font-size: 13px;
    padding: 2px 4px;
    flex-shrink: 0;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .ic-reset-icon:hover { opacity: 1; }

  /* ── Right pane: properties ── */
  .ic-props-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
  }

  .ic-props-body::-webkit-scrollbar { width: 4px; }
  .ic-props-body::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.2); border-radius: 2px; }

  .ic-props-empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--ic-muted);
    text-align: center;
    padding: 20px;
  }

  .ic-props-empty-icon {
    font-size: 22px;
    opacity: 0.4;
  }

  .ic-props-empty-text {
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* ── Section divider (street asset sub-list header) ── */
  .ic-section-label {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0 6px;
    margin-top: 10px;
    font-size: 9px;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 1.5px;
    color: var(--ic-warning);
    text-transform: uppercase;
    border-top: 1px solid var(--ic-border);
  }

  .ic-section-label::before {
    content: '';
    display: block;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--ic-warning);
    box-shadow: 0 0 6px var(--ic-warning);
    flex-shrink: 0;
  }

  /* ── Street mesh sub-list ── */
  .ic-mesh-list {
    max-height: 140px;
    overflow-y: auto;
    border: 1px solid var(--ic-border);
    border-radius: 3px;
  }
  .ic-mesh-list::-webkit-scrollbar { width: 3px; }
  .ic-mesh-list::-webkit-scrollbar-thumb { background: rgba(0,200,255,0.15); }

  .ic-mesh-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 10px;
    cursor: pointer;
    border-left: 2px solid transparent;
    transition: all 0.12s;
  }

  .ic-mesh-row.selected {
    border-left-color: var(--ic-danger);
    background: rgba(255, 50, 50, 0.1);
  }

  .ic-mesh-row:hover:not(.selected) { background: rgba(255,255,255,0.03); }

  .ic-mesh-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
    background: #333;
    transition: all 0.12s;
  }

  .ic-mesh-row.selected .ic-mesh-dot {
    background: var(--ic-danger);
    box-shadow: 0 0 8px var(--ic-danger);
  }

  .ic-mesh-name {
    flex: 1;
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    color: #7a9bbb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ic-mesh-row.selected .ic-mesh-name { color: #ff9999; }

  /* ── Selected material detail (right pane) ── */
  .ic-footer-label {
    font-size: 9px;
    font-family: 'Share Tech Mono', monospace;
    letter-spacing: 2px;
    color: var(--ic-accent);
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ic-footer-label::before {
    content: '';
    display: block;
    width: 12px; height: 1px;
    background: var(--ic-accent);
    box-shadow: 0 0 4px var(--ic-accent);
  }

  .ic-footer-name {
    font-size: 15px;
    font-weight: 700;
    color: var(--ic-text);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .ic-footer-raw {
    font-size: 10px;
    color: var(--ic-muted);
    font-family: 'Share Tech Mono', monospace;
    margin-bottom: 12px;
  }

  .ic-color-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding: 6px 8px;
    background: rgba(0, 200, 255, 0.04);
    border: 1px solid var(--ic-border);
    border-radius: 3px;
  }

  .ic-color-label {
    font-size: 10px;
    font-family: 'Share Tech Mono', monospace;
    color: var(--ic-muted);
    letter-spacing: 1px;
  }

  .ic-color-picker {
    width: 32px; height: 22px;
    border-radius: 2px;
    border: 1px solid rgba(0,200,255,0.25);
    cursor: pointer;
    background: transparent;
  }

  .ic-color-hex {
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    color: var(--ic-accent);
    flex: 1;
  }

  .ic-clear-btn {
    padding: 5px 12px;
    border-radius: 3px;
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    background: transparent;
    border: 1px solid var(--ic-border);
    color: var(--ic-muted);
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.2s;
    text-transform: uppercase;
  }

  .ic-clear-btn:hover {
    border-color: var(--ic-accent);
    color: var(--ic-accent);
    box-shadow: 0 0 8px var(--ic-glow);
  }

  /* ── Collapse toggle (bottom-center of bar) ── */
  .ic-toggle {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 20;
    background: rgba(4, 18, 42, 0.95);
    border: 1px solid rgba(0, 200, 255, 0.3);
    border-top: none;
    color: var(--ic-accent);
    border-radius: 0 0 6px 6px;
    width: 64px;
    height: 18px;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: top 0.3s, box-shadow 0.2s;
    box-shadow: 0 2px 12px rgba(0,200,255,0.15);
    letter-spacing: 2px;
    font-family: 'Share Tech Mono', monospace;
  }

  .ic-toggle:hover {
    box-shadow: 0 2px 20px rgba(0,200,255,0.3);
    color: #fff;
  }

  /* ── Hint bar ── */

  .ic-bg {
    background: rgba(4, 18, 42, 0.60);
    color: var(--ic-muted);
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    pointer-events: none;
    letter-spacing: 0.5px;
    white-space: nowrap;
    border: 1px solid rgba(0, 200, 255, 0.2);
    box-shadow: 0 0 20px rgba(0,200,255,0.08);
  }

  .ic-hint {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(4, 18, 42, 0.70);
    border: 1px solid rgba(0, 200, 255, 0.2);
    color: var(--ic-muted);
    font-size: 11px;
    font-family: 'Share Tech Mono', monospace;
    padding: 6px 16px;
    border-radius: 2px;
    pointer-events: none;
    letter-spacing: 0.5px;
    white-space: nowrap;
    box-shadow: 0 0 20px rgba(0,200,255,0.08);
  }

  /* corner brackets on hint */
  .ic-hint::before, .ic-hint::after {
    content: '';
    position: absolute;
    width: 6px; height: 6px;
    border-color: var(--ic-accent);
    border-style: solid;
    opacity: 0.5;
  }
  .ic-hint::before { top: 2px; left: 2px; border-width: 1px 0 0 1px; }
  .ic-hint::after  { bottom: 2px; right: 2px; border-width: 0 1px 1px 0; }

  @media (max-width: 760px) {
    :root { --ic-bar-h: 70vh; }
    .ic-sidebar { flex-direction: column; }
    .ic-pane-left { flex: 1.2 1 0%; border-right: none; border-bottom: 1px solid var(--ic-border); }
    .ic-mat-list { grid-template-columns: 1fr; }
  }
`;
