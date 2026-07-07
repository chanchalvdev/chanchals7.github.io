"use client";

import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [text, deleting, index, roles]);

  return (
    <span className="type-caret font-mono text-cobalt" aria-live="polite">
      {text || " "}
    </span>
  );
}
