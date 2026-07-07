"use client";

import { useState, useEffect } from "react";

const bootLines = [
  { text: "▸ booting security console", delay: 150 },
  { text: "▸ loading agentic systems", delay: 500 },
  { text: "▸ session secured", delay: 900 },
];

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show on first session visit
    if (sessionStorage.getItem("portfolio_loaded")) {
      setVisible(false);
      return;
    }

    const MIN_DURATION = 1600;
    const start = Date.now();

    function dismiss() {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("portfolio_loaded", "1");
        }, 550);
      }, remaining);
    }

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // Failsafe
    const failsafe = setTimeout(dismiss, 5000);
    return () => clearTimeout(failsafe);
  }, []);

  return (
    <>
      {visible && (
        <div
          aria-hidden="true"
          className="ls-root"
          style={{
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? "none" : "auto",
          }}
        >
          {/* Fine grid */}
          <div className="ls-grid" />
          {/* Ambient orbs */}
          <div className="ls-orb ls-orb-cyan" />
          <div className="ls-orb ls-orb-violet" />

          {/* Content */}
          <div className="ls-content">
            {/* Monogram inside a spinning radar ring */}
            <div className="ls-emblem">
              <div className="ls-ring" />
              <div className="ls-ring-sweep" />
              <div className="ls-monogram">CV</div>
            </div>

            {/* Name + role */}
            <div className="ls-titles">
              <h1 className="ls-name">
                Chanchal <span className="ls-name-accent">Verma</span>
              </h1>
              <p className="ls-role">{"//"} AI Security Engineer · Full Stack · UI/UX</p>
            </div>

            {/* Boot log */}
            <div className="ls-log">
              {bootLines.map((line) => (
                <p key={line.text} className="ls-line" style={{ animationDelay: `${line.delay}ms` }}>
                  {line.text}
                </p>
              ))}
            </div>

            {/* Progress bar */}
            <div className="ls-track">
              <div className="ls-fill" />
            </div>
          </div>

          <style>{`
            .ls-root {
              position: fixed;
              inset: 0;
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #060a12;
              transition: opacity 550ms cubic-bezier(0.16, 1, 0.3, 1);
            }
            .ls-grid {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(rgba(120, 160, 210, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(120, 160, 210, 0.05) 1px, transparent 1px);
              background-size: 44px 44px;
              mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
              -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
            }
            .ls-orb {
              position: absolute;
              border-radius: 50%;
              filter: blur(90px);
              pointer-events: none;
            }
            .ls-orb-cyan {
              width: 30rem;
              height: 30rem;
              top: -12rem;
              left: 18%;
              background: rgba(34, 211, 238, 0.10);
            }
            .ls-orb-violet {
              width: 24rem;
              height: 24rem;
              bottom: -8rem;
              right: 18%;
              background: rgba(167, 139, 250, 0.09);
            }
            .ls-content {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.75rem;
              padding: 0 1.5rem;
              text-align: center;
            }
            .ls-emblem {
              position: relative;
              width: 7rem;
              height: 7rem;
              display: grid;
              place-items: center;
            }
            .ls-ring {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              border: 1px solid rgba(34, 211, 238, 0.18);
            }
            .ls-ring-sweep {
              position: absolute;
              inset: 0;
              border-radius: 50%;
              background: conic-gradient(from 0deg, rgba(34, 211, 238, 0.35), transparent 25%);
              -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
              mask: radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px));
              animation: ls-spin 2.4s linear infinite;
            }
            .ls-monogram {
              width: 4rem;
              height: 4rem;
              border-radius: 1.1rem;
              display: grid;
              place-items: center;
              background: linear-gradient(135deg, #22d3ee, #34d399);
              color: #060a12;
              font-family: var(--font-ibm-mono), monospace;
              font-size: 1.25rem;
              font-weight: 700;
              box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.25), 0 12px 40px rgba(34, 211, 238, 0.35);
              animation: ls-pulse 2s ease-in-out infinite;
            }
            .ls-titles {
              display: grid;
              gap: 0.55rem;
            }
            .ls-name {
              margin: 0;
              font-family: var(--font-display), var(--font-space), sans-serif;
              font-size: 2rem;
              font-weight: 700;
              letter-spacing: -0.03em;
              line-height: 1;
              color: #e6edf7;
            }
            .ls-name-accent {
              background: linear-gradient(120deg, #22d3ee, #34d399 60%, #a78bfa);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .ls-role {
              margin: 0;
              font-family: var(--font-ibm-mono), monospace;
              font-size: 0.72rem;
              font-weight: 600;
              letter-spacing: 0.12em;
              text-transform: uppercase;
              color: rgba(230, 237, 247, 0.42);
            }
            .ls-log {
              display: grid;
              gap: 0.3rem;
              min-height: 3.4rem;
            }
            .ls-line {
              margin: 0;
              font-family: var(--font-ibm-mono), monospace;
              font-size: 0.7rem;
              font-weight: 500;
              letter-spacing: 0.06em;
              color: rgba(52, 211, 153, 0.75);
              opacity: 0;
              animation: ls-line-in 350ms ease forwards;
            }
            .ls-track {
              width: 11rem;
              height: 2px;
              border-radius: 999px;
              background: rgba(34, 211, 238, 0.14);
              overflow: hidden;
            }
            .ls-fill {
              height: 100%;
              border-radius: 999px;
              background: linear-gradient(90deg, #22d3ee, #34d399, #a78bfa);
              animation: ls-progress 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
            @keyframes ls-spin {
              to { transform: rotate(360deg); }
            }
            @keyframes ls-pulse {
              0%, 100% { transform: scale(1); box-shadow: 0 0 0 1px rgba(34,211,238,0.25), 0 12px 40px rgba(34,211,238,0.35); }
              50% { transform: scale(1.05); box-shadow: 0 0 0 1px rgba(34,211,238,0.4), 0 16px 52px rgba(34,211,238,0.5); }
            }
            @keyframes ls-line-in {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: none; }
            }
            @keyframes ls-progress {
              from { width: 0%; }
              to { width: 100%; }
            }
            @media (prefers-reduced-motion: reduce) {
              .ls-ring-sweep, .ls-monogram, .ls-fill { animation-duration: 0.01ms; animation-iteration-count: 1; }
              .ls-line { animation-duration: 0.01ms; }
            }
          `}</style>
        </div>
      )}
      {children}
    </>
  );
}
