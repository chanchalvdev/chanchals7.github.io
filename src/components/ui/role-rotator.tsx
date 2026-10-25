"use client";

import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const current = roles[index % roles.length];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(hold);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const tick = setTimeout(
      () => {
        setText(
          deleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      },
      deleting ? 32 : 62,
    );
    return () => clearTimeout(tick);
  }, [text, deleting, index, roles, reduceMotion]);

  // The typed text changes every keystroke, so it stays out of the
  // accessibility tree; assistive tech gets the full role list once instead.
  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className={`font-medium text-ink ${reduceMotion ? "" : "type-caret"}`}>
        {reduceMotion ? roles[0] : text || " "}
      </span>
    </>
  );
}
