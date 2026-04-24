import { Reveal } from "../hooks/utils"


const stats = [
  { num: "50M+", label: "Documents Processed" },
  { num: "12K+", label: "Active Users" },
  { num: "99.9%", label: "Uptime SLA" },
  { num: "<0.3s", label: "Avg Response Time" },
];

export default function Stats() {
  return (
    <div
      className="relative z-10 py-8"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center">
        {stats.map((s, i) => (
          <Reveal
            key={i}
            delay={i * 80}
            className="flex flex-col items-center px-8 sm:px-10 py-2"
            style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
          >
            <div
              className="font-sora font-extrabold text-3xl leading-tight"
              style={{
                background: "linear-gradient(135deg,#7C3AED,#22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {s.num}
            </div>
            <div className="text-xs text-[#6B7280] mt-1">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}