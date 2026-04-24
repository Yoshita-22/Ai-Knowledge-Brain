import { useState } from "react";
import { Reveal } from "../hooks/utils"

const steps = [
  {
    num: "01",
    icon: "⬆️",
    title: "Upload Your Content",
    desc: "Drag and drop PDFs, paste URLs, or sync from your favourite apps. AI Brain accepts anything.",
  },
  {
    num: "02",
    icon: "🔄",
    title: "AI Processes & Understands",
    desc: "Our models deeply index every word, concept, and relationship inside your documents in seconds.",
  },
  {
    num: "03",
    icon: "💬",
    title: "Ask & Get Answers",
    desc: "Type any question in natural language. Get precise, sourced answers with exact citations.",
  },
];

function StepCard({ num, icon, title, desc, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="rounded-2xl p-10 text-center h-full transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${hov ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)"}`,
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.25)" : "none",
        }}
      >
        {/* Step number */}
        <div
          className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center font-sora font-extrabold text-xl"
          style={{
            background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
            boxShadow: "0 0 20px rgba(124,58,237,0.4)",
          }}
        >
          {num}
        </div>
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-sora font-bold text-lg mb-3 text-white">{title}</div>
        <div className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</div>
      </div>
    </Reveal>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative z-10 py-24 px-6"
      style={{ background: "#0F172A" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-tag mb-5">Process</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-sora font-bold leading-tight tracking-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Up and running in
              <br />
              <span className="gradient-text">3 simple steps</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <StepCard key={i} {...s} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}