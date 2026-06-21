"use client";

import { useState, useEffect } from "react";

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show on first session visit
    if (sessionStorage.getItem("portfolio_loaded")) {
      setVisible(false);
      return;
    }

    const MIN_DURATION = 1500;
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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f4f6fb",
            transition: "opacity 550ms cubic-bezier(0.16,1,0.3,1)",
            opacity: fadeOut ? 0 : 1,
            pointerEvents: fadeOut ? "none" : "auto",
          }}
        >
          {/* Fine grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(12,13,17,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(12,13,17,0.04) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
              opacity: 0.6,
            }}
          />

          {/* Gradient orbs */}
          <div
            style={{
              position: "absolute",
              top: "-10rem",
              left: "25%",
              width: "28rem",
              height: "28rem",
              borderRadius: "50%",
              background: "rgba(59,95,232,0.07)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0",
              right: "25%",
              width: "20rem",
              height: "20rem",
              borderRadius: "50%",
              background: "rgba(11,139,124,0.05)",
              filter: "blur(80px)",
              pointerEvents: "none",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Monogram */}
            <div
              style={{
                width: "4rem",
                height: "4rem",
                borderRadius: "1rem",
                background: "#3b5fe8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "monospace",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#ffffff",
                boxShadow: "0 12px 32px rgba(59,95,232,0.28)",
                animation: "ls-pulse 2s ease-in-out infinite",
              }}
            >
              CV
            </div>

            {/* Name */}
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#0c0d11",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                Chanchal Verma
              </h1>
              <p
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(12,13,17,0.5)",
                  letterSpacing: "0.01em",
                }}
              >
                Designing secure systems with product calm.
              </p>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "8rem",
                height: "2px",
                borderRadius: "999px",
                background: "rgba(59,95,232,0.12)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg,#3b5fe8,#7c3aed)",
                  animation: "ls-progress 1.5s cubic-bezier(0.4,0,0.2,1) forwards",
                }}
              />
            </div>
          </div>

          <style>{`
            @keyframes ls-pulse {
              0%,100% { transform: scale(1); box-shadow: 0 12px 32px rgba(59,95,232,0.28); }
              50% { transform: scale(1.04); box-shadow: 0 16px 40px rgba(59,95,232,0.38); }
            }
            @keyframes ls-progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>
      )}
      {children}
    </>
  );
}
