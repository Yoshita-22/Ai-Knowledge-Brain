import { useState } from "react";
import { Reveal } from "../hooks/utils"


const features = [
  {
    icon: "📤",
    title: "Upload Anything",
    desc: "PDFs, images, URLs, Notion pages, markdown files — AI Brain ingests them all seamlessly.",
  },
  {
    icon: "🧩",
    title: "Smart Understanding",
    desc: "Goes beyond text — comprehends tables, diagrams, charts, and complex document structures.",
  },
  {
    icon: "🎯",
    title: "Context-Aware Answers",
    desc: "Understands nuance and context to deliver precise, relevant responses — not just keyword matches.",
  },
  {
    icon: "📦",
    title: "Multi-Document Intelligence",
    desc: "Ask questions that span hundreds of documents simultaneously. Synthesize insights across your library.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast Retrieval",
    desc: "Sub-second responses backed by vector search and semantic indexing. No more waiting.",
  },
  {
    icon: "💡",
    title: "AI-Powered Insights",
    desc: "Automatically surfaces patterns, summaries, and connections you didn't know existed in your data.",
  },
];

function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="rounded-[18px] p-7 h-full transition-all duration-300 cursor-default"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${hov ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.08)"}`,
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.4), 0 0 20px rgba(124,58,237,0.25)" : "none",
        }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-5 transition-all duration-300"
          style={{
            background: hov
              ? "linear-gradient(135deg,rgba(124,58,237,0.35),rgba(59,130,246,0.25))"
              : "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.15))",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: hov ? "0 0 20px rgba(124,58,237,0.3)" : "none",
          }}
        >
          {icon}
        </div>
        <div className="font-sora font-semibold text-[17px] mb-2.5 text-white">{title}</div>
        <div className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</div>
      </div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-tag mb-5">Capabilities</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-sora font-bold leading-tight tracking-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Everything you need to
              <br />
              <span className="gradient-text">master your knowledge</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}