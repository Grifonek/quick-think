import { useEffect } from "react";

export function useCloseWithEscape(action: () => void) {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") action();
    };

    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
  });
}
