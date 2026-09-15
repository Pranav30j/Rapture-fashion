"use client";

import { useEffect, useRef, useCallback } from "react";

interface CursorState {
  type: "default" | "hover" | "image" | "drag";
  label: string;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  const state = useRef<CursorState>({ type: "default", label: "" });
  const visible = useRef(false);

  const updateCursorType = useCallback(
    (type: CursorState["type"], label: string = "") => {
      state.current = { type, label };
      if (labelRef.current) {
        labelRef.current.textContent = label;
      }
    },
    []
  );

  useEffect(() => {
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const circle = circleRef.current;
    const label = labelRef.current;
    if (!dot || !circle || !label) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        dot.style.opacity = "1";
        circle.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
      circle.style.opacity = "0";
    };

    const onMouseEnter = () => {
      visible.current = true;
      dot.style.opacity = "1";
      circle.style.opacity = "1";
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='hover']")
      ) {
        updateCursorType("hover");
      } else if (
        target.closest("img") ||
        target.closest("[data-cursor='image']")
      ) {
        updateCursorType("image", "VIEW");
      } else if (target.closest("[data-cursor='drag']")) {
        updateCursorType("drag", "DRAG");
      } else {
        updateCursorType("default");
      }
    };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      dot.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;

      const sizeMap = {
        default: 32,
        hover: 56,
        image: 64,
        drag: 64,
      };
      const size = sizeMap[state.current.type];
      circle.style.transform = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`;
      circle.style.width = `${size}px`;
      circle.style.height = `${size}px`;

      if (state.current.type === "hover") {
        circle.style.borderColor = "#C8A45D";
        circle.style.background = "rgba(200, 164, 93, 0.08)";
      } else if (state.current.type === "image") {
        circle.style.borderColor = "#C8A45D";
        circle.style.background = "transparent";
      } else {
        circle.style.borderColor = "rgba(200, 164, 93, 0.5)";
        circle.style.background = "transparent";
      }

      label.style.transform = `translate(${pos.current.x}px, ${pos.current.y + 24}px)`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = "";
    };
  }, [updateCursorType]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#C8A45D",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none opacity-0 transition-all duration-300"
        style={{
          border: "1px solid rgba(200, 164, 93, 0.5)",
          borderRadius: "50%",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={labelRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none opacity-0 transition-opacity duration-200"
        style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "#C8A45D",
          transform: "translate(-50%, 0)",
          whiteSpace: "nowrap",
        }}
      />
    </>
  );
}
