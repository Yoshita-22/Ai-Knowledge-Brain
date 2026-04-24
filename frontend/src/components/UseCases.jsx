import { useState } from "react";
import { Reveal } from "../hooks/utils"


const cases = [
  {
    emoji: "🎓",
    label: "Students",
    title: "Study Smarter",
    desc: "Upload lecture notes, textbooks, and research papers. Quiz yourself, get summaries, ace every exam.",
  },
  {
    emoji: "⚙️",
    label: "Developers",
    title: "Master Documentation",
    desc: "Upload entire docs, GitHub repos, and API references. Instant answers without endless tab-switching.",
  },
  {
    emoji: "💼",
    label: "Professionals",
    title: "Manage Knowledge",
    desc: "Centralise reports, contracts, and policies. Find any information across your organisation in seconds.",
  },
  {
    emoji: "🔬",
    label: "Researchers",
    title: "Analyse Papers",
    desc: "Digest hundreds of academic papers, compare findings, and surface cross-paper connections effortlessly.",
  },
];

function UseCaseCard({ emoji, label, title, desc, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="rounded-[18px] p-7 h-full transition-all duration-300 cursor-default relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: hov ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        {/* Animated bottom border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-300"
          style={{
            background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
            transform: hov ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
          }}
        />
        <div className="text-4xl mb-4">{emoji}</div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#A78BFA] mb-2">{label}</div>
        <div className="font-sora font-bold text-xl mb-2.5 text-white">{title}</div>
        <div className="text-sm text-[#9CA3AF] leading-relaxed">{desc}</div>
      </div>
    </Reveal>
  );
}

export default function UseCases() {
  return (
    <section id="use-cases" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <div className="section-tag mb-5">Use Cases</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-sora font-bold leading-tight tracking-tight" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Built for the way
              <br />
              <span className="gradient-text">you actually work</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cases.map((c, i) => (
            <UseCaseCard key={i} {...c} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}