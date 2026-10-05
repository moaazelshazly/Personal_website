import React, { useState } from 'react';
import {
  CheckIcon,
  SparklesIcon,
  TerminalIcon,
  LayersIcon,
  CpuIcon,
  GithubIcon,
  ExternalLinkIcon
} from './Icons';

export const InteractiveHeroCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'tokens' | 'spec' | 'github'>('metrics');
  const [accentColor, setAccentColor] = useState<'indigo' | 'emerald' | 'amber'>('indigo');
  const [specState, setSpecState] = useState({
    active: true,
    hovered: false,
    focused: false,
  });

  const getAccentHex = () => {
    switch (accentColor) {
      case 'emerald':
        return '#27a644';
      case 'amber':
        return '#f0bf00';
      default:
        return '#5e6ad2';
    }
  };

  return (
    <div className="hero-console-card">
      {/* Window Header */}
      <div className="console-header">
        <div className="console-window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        
        {/* Navigation Tabs */}
        <div className="console-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'metrics'}
            className={`console-tab ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            <CpuIcon size={13} />
            <span>Architecture &amp; Metrics</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'github'}
            className={`console-tab ${activeTab === 'github' ? 'active' : ''}`}
            onClick={() => setActiveTab('github')}
          >
            <GithubIcon size={13} />
            <span>GitHub Live (@moaazelshazly)</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'tokens'}
            className={`console-tab ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            <LayersIcon size={13} />
            <span>Design Tokens</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'spec'}
            className={`console-tab ${activeTab === 'spec' ? 'active' : ''}`}
            onClick={() => setActiveTab('spec')}
          >
            <TerminalIcon size={13} />
            <span>Component Spec</span>
          </button>
        </div>

        <div className="console-status-indicator">
          <span className="live-indicator-pulse" />
          <span className="live-text">GITHUB SYNC OK</span>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="console-body">
        {activeTab === 'metrics' && (
          <div className="metrics-grid">
            <div className="metric-box">
              <div className="metric-top">
                <span className="metric-label">Lighthouse Score</span>
                <span className="metric-tag tag-green">Performance</span>
              </div>
              <div className="metric-value">100<span className="metric-unit">/100</span></div>
              <div className="metric-desc">Zero main-thread blocking, optimized asset delivery.</div>
            </div>

            <div className="metric-box">
              <div className="metric-top">
                <span className="metric-label">Core Web Vitals</span>
                <span className="metric-tag tag-indigo">INP &lt; 20ms</span>
              </div>
              <div className="metric-value">0.00<span className="metric-unit">CLS</span></div>
              <div className="metric-desc">Strict layout stability with pre-computed container bounds.</div>
            </div>

            <div className="metric-box">
              <div className="metric-top">
                <span className="metric-label">Type Soundness</span>
                <span className="metric-tag tag-green">TypeScript 5.x</span>
              </div>
              <div className="metric-value">100%<span className="metric-unit">Strict</span></div>
              <div className="metric-desc">Zero `any` escapes, deterministic domain types.</div>
            </div>

            <div className="metric-box">
              <div className="metric-top">
                <span className="metric-label">GitHub Telemetry</span>
                <span className="metric-tag tag-indigo">REST API v3</span>
              </div>
              <div className="metric-value">4<span className="metric-unit">Live Repos</span></div>
              <div className="metric-desc">Dynamic sync with GitHub Personal Access Token.</div>
            </div>
          </div>
        )}

        {activeTab === 'github' && (
          <div className="github-console-panel">
            <div className="github-profile-bar">
              <div className="profile-bar-left">
                <span className="profile-dot-live" />
                <span className="profile-handle">github.com/moaazelshazly</span>
                <span className="profile-badge-pill">4 Public Repos</span>
              </div>
              <a
                href="https://github.com/moaazelshazly"
                target="_blank"
                rel="noreferrer"
                className="profile-visit-btn"
              >
                <span>Open Profile</span>
                <ExternalLinkIcon size={12} />
              </a>
            </div>

            <div className="github-repos-mini-grid">
              <div className="mini-repo-card">
                <div className="mini-repo-top">
                  <span className="mini-repo-name">Personal_website</span>
                  <span className="mini-repo-lang lang-ts">TypeScript</span>
                </div>
                <p className="mini-repo-desc">Modern engineering portfolio with React 19 + Vite</p>
              </div>

              <div className="mini-repo-card">
                <div className="mini-repo-top">
                  <span className="mini-repo-name">TypingApp_React</span>
                  <span className="mini-repo-lang lang-js">JavaScript</span>
                </div>
                <p className="mini-repo-desc">Real-time typing speed benchmark &amp; WPM calculator</p>
              </div>

              <div className="mini-repo-card">
                <div className="mini-repo-top">
                  <span className="mini-repo-name">JsGame</span>
                  <span className="mini-repo-lang lang-js">JavaScript</span>
                </div>
                <p className="mini-repo-desc">Word-guessing browser game with pure DOM &amp; animations</p>
              </div>

              <div className="mini-repo-card">
                <div className="mini-repo-top">
                  <span className="mini-repo-name">neetcode-submissions</span>
                  <span className="mini-repo-lang lang-cpp">C++</span>
                </div>
                <p className="mini-repo-desc">Data structures &amp; algorithmic problem solutions</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="tokens-interactive-panel">
            <div className="tokens-picker-bar">
              <span className="picker-title">Active Brand Token:</span>
              <div className="color-swatches">
                <button
                  type="button"
                  aria-label="Linear Indigo"
                  className={`color-swatch indigo ${accentColor === 'indigo' ? 'active' : ''}`}
                  onClick={() => setAccentColor('indigo')}
                >
                  {accentColor === 'indigo' && <CheckIcon size={12} />}
                </button>
                <button
                  type="button"
                  aria-label="Emerald Green"
                  className={`color-swatch emerald ${accentColor === 'emerald' ? 'active' : ''}`}
                  onClick={() => setAccentColor('emerald')}
                >
                  {accentColor === 'emerald' && <CheckIcon size={12} />}
                </button>
                <button
                  type="button"
                  aria-label="Linear Amber"
                  className={`color-swatch amber ${accentColor === 'amber' ? 'active' : ''}`}
                  onClick={() => setAccentColor('amber')}
                >
                  {accentColor === 'amber' && <CheckIcon size={12} />}
                </button>
              </div>
              <code className="token-code-pill">{getAccentHex()}</code>
            </div>

            <div className="token-preview-sandbox" style={{ borderColor: `${getAccentHex()}33` }}>
              <div className="sandbox-element">
                <span className="sandbox-badge" style={{ backgroundColor: `${getAccentHex()}18`, color: getAccentHex(), borderColor: `${getAccentHex()}40` }}>
                  <SparklesIcon size={12} />
                  <span>Dynamic Token Preview</span>
                </span>
                <p className="sandbox-text">
                  Design tokens synchronize visual rhythm, typography scales, and interactive states with mathematical precision.
                </p>
                <div className="sandbox-controls">
                  <button
                    type="button"
                    className="sandbox-btn primary"
                    style={{ backgroundColor: getAccentHex() }}
                  >
                    Action Button
                  </button>
                  <button
                    type="button"
                    className="sandbox-btn outline"
                    style={{ borderColor: `${getAccentHex()}55`, color: getAccentHex() }}
                  >
                    Outlined Variant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <div className="spec-interactive-panel">
            <div className="spec-row">
              <div className="spec-info">
                <span className="spec-name">Interactive State Switch</span>
                <span className="spec-detail">Toggle to test accessible state transition</span>
              </div>
              <div className="spec-action">
                <button
                  type="button"
                  role="switch"
                  aria-checked={specState.active}
                  className={`linear-switch ${specState.active ? 'checked' : ''}`}
                  onClick={() => setSpecState(s => ({ ...s, active: !s.active }))}
                >
                  <span className="switch-thumb" />
                </button>
              </div>
            </div>

            <div className="spec-code-block">
              <div className="spec-code-header">
                <span>spec-output.json</span>
                <span>Generated Spec</span>
              </div>
              <pre className="code-content">
{`{
  "component": "InteractiveToggle",
  "state": "${specState.active ? 'active' : 'disabled'}",
  "contrastRatio": "14.2:1 (AAA)",
  "keyboardNavigable": true,
  "ariaRole": "switch",
  "reducedMotionSafe": true
}`}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Console Bottom Bar */}
      <div className="console-footer">
        <span className="footer-mono">git remote: <code>github.com/moaazelshazly</code></span>
        <span className="footer-runtime">Node.js 24 · React 19 · Vite 8</span>
      </div>
    </div>
  );
};
