import { useState } from "react";
import { Reveal } from "../hooks/utils"


const pains = [
  {
    icon: "📚",
    title: "Too Many PDFs & Notes",
    text: "Hundreds of files scattered across devices, drives, and tabs — with no unified way to access their knowledge.",
  },
  {
    icon: "🔍",
    title: "Hard to Find Answers",
    text: "Manual search fails you. Ctrl+F only goes so far. Hours spent hunting for a single fact buried in a deck.",
  },
  {
    icon: "💭",
    title: "Information Scattered Everywhere",
    text: "Slack, Notion, emails, PDFs, URLs — your knowledge is fragmented and impossible to synthesize quickly.",
  },
];

function PainCard({ icon, title, text, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="rounded-2xl p-7 transition-all duration-300 h-full"
        style={{
          background: "rgba(239,68,68,0.05)",
          border: `1px solid rgba(239,68,68,${hov ? 0.3 : 0.15})`,
          transform: hov ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <div className="text-3xl mb-4">{icon}</div>
        <div className="font-sora font-semibold text-[17px] mb-2 text-[#FCA5A5]">{title}</div>
        <div className="text-sm text-[#6B7280] leading-relaxed">{text}</div>
      </div>
    </Reveal>
  );
}

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative z-10 py-24 px-6"
      style={{ background: "#0F172A" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <Reveal>
            <div className="section-tag mb-5">The Problem</div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-sora font-bold leading-tight tracking-tight mb-4" style={{ fontSize: "clamp(28px,4vw,44px)" }}>
              Drowning in <span className="gradient-text">Information?</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto leading-relaxed">
              Every professional, student, and researcher faces the same chaos.
              AI Brain was built to end it.
            </p>
          </Reveal>
        </div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {pains.map((p, i) => <PainCard key={i} {...p} delay={i * 100} />)}
        </div>

        {/* Solution bridge */}
        <Reveal>
          <div
            className="text-center rounded-2xl p-10"
            style={{
              background: "linear-gradient(135deg,rgba(124,58,237,0.1),rgba(59,130,246,0.1))",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <p className="font-sora font-bold leading-snug" style={{ fontSize: "clamp(18px,3vw,26px)" }}>
              <span className="gradient-text">AI Brain connects everything</span>
              <br />
              and gives you precise answers instantly.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}