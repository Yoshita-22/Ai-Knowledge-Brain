import { useEffect, useRef, useState } from "react";

/* ─── useReveal: IntersectionObserver scroll animation ─── */
export function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          ob.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [delay]);
  return ref;
}

/* ─── Reveal wrapper component ─── */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── HoverCard: card with lift + glow on hover ─── */
export function HoverCard({ children, className = "", hoverBorder = "rgba(124,58,237,0.35)", style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`glass-card rounded-[18px] p-7 transition-all duration-300 ${className}`}
      style={{
        border: `1px solid ${hov ? hoverBorder : "rgba(255,255,255,0.08)"}`,
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.25)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── PrimaryButton ─── */
export function PrimaryButton({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`btn-glow text-white rounded-xl px-6 py-3 text-[15px] font-semibold font-inter inline-flex items-center gap-2 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── SecondaryButton ─── */
export function SecondaryButton({ children, className = "", onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      className="glass-card rounded-xl px-6 py-3 text-[15px] font-semibold font-inter inline-flex items-center gap-2 transition-all duration-300"
      style={{
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      {children}
    </button>
  );
}