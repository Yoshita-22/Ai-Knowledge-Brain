import { useState } from "react";
import { Reveal } from "../hooks/utils"

const testimonials = [
  {
    initials: "SP",
    name: "Sarah Park",
    role: "ML Researcher @ Stanford",
    quote:
      "AI Brain completely transformed how I handle research. I uploaded 200 papers and got synthesis reports in minutes. It's like having a research assistant that never sleeps.",
  },
  {
    initials: "JM",
    name: "James Mitchell",
    role: "General Counsel @ Axiom Legal",
    quote:
      "Our legal team uses AI Brain to query thousands of contracts instantly. What took days now takes seconds. The accuracy is genuinely remarkable.",
  },
  {
    initials: "AK",
    name: "Arjun Krishnamurthy",
    role: "Senior Engineer @ Vercel",
    quote:
      "As a developer, I spend way too much time reading docs. AI Brain lets me ask exactly what I need and get the answer from the actual docs I uploaded.",
  },
];

const logos = ["STANFORD", "VERCEL", "AXIOM", "Y COMBINATOR", "OPENAI ALUMNI"];

function TestiCard({ initials, name, role, quote, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="rounded-[18px] p-7 h-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)"}`,
          transform: hov ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="text-yellow-400 text-base tracking-widest mb-4">★★★★★</div>
        <p className="text-sm text-[#9CA3AF] leading-relaxed mb-5 italic">
          <span
            className="text-4xl text-[rgba(124,58,237,0.4)] font-sora leading-none align-bottom mr-1"
            style={{ verticalAlign: "-14px" }}
          >
            "
          </span>
          {quote}
        </p>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: "linear-gradient(135deg,#7C3AED,#3B82F6)" }}
          >
            {initials}
          </div>
          <div>
            <div className="font-semibold text-sm text-white">{name}</div>
            <div className="text-xs text-[#6B7280]">{role}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function LogoPill({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="rounded-xl px-5 py-2.5 text-xs font-semibold tracking-wide transition-all duration-300 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: hov ? "#fff" : "#6B7280",
      }}
    >
      {children}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative z-10 py-24 px-6"
      style={{ background: "#0F172A" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-tag mb-5">Testimonials</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-sora font-bold leading-tight tracking-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Loved by knowledge
              <br />
              <span className="gradient-text">workers worldwide</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {testimonials.map((t, i) => (
            <TestiCard key={i} {...t} delay={i * 80} />
          ))}
        </div>

        {/* Logo trust bar */}
        <Reveal>
          <div
            className="flex flex-wrap items-center justify-center gap-4 pt-10"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {logos.map((l) => (
              <LogoPill key={l}>{l}</LogoPill>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}