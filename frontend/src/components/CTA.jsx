import { useState } from "react";
import { Reveal} from "../hooks/utils"

/* ─── CTA ─── */
export function CTA() {
  const [hov, setHov] = useState(false);
  return (
    <section
      className="relative z-10 py-28 px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <Reveal>
          <div className="section-tag mb-5">Get Started</div>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="font-sora font-bold leading-tight tracking-tight mb-4"
            style={{ fontSize: "clamp(30px,5vw,52px)" }}
          >
            Build Your AI Brain Today
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="text-[#9CA3AF] text-lg max-w-md mx-auto mb-12 leading-relaxed">
            Start organising your knowledge like never before. Free to start, no
            credit card required.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="inline-block rounded-2xl p-0.5 ring-pulse transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
              boxShadow: hov
                ? "0 0 80px rgba(124,58,237,0.7), 0 0 160px rgba(59,130,246,0.5)"
                : "0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(59,130,246,0.3)",
            }}
          >
            <button
              className="rounded-[14px] px-12 py-5 text-lg font-bold font-sora text-white inline-flex items-center gap-2.5 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
                border: "none",
                filter: hov ? "brightness(1.1)" : "brightness(1)",
                transform: hov ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              🧠 Start for Free
            </button>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <p className="text-xs text-[#6B7280] mt-5">
            ✓ Free plan forever &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Setup in 60 seconds
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
const footerCols = [
  { head: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { head: "Developers", links: ["API Docs", "SDK", "Status", "GitHub"] },
  { head: "Company", links: ["About", "Blog", "Careers", "Privacy"] },
];

const socials = ["𝕏", "in", "⌥", "▶"];

function FooterLink({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <li>
      <a
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        className="text-sm no-underline transition-colors duration-200 cursor-pointer"
        style={{ color: hov ? "#fff" : "#6B7280" }}
      >
        {children}
      </a>
    </li>
  );
}

function SocialBtn({ children }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm transition-all duration-200 cursor-pointer"
      style={{
        background: hov ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)"}`,
        transform: hov ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="relative z-10 px-6 pt-16 pb-10"
      style={{ background: "#0F172A", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-lg"
                style={{
                  background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                🧠
              </div>
              <span className="font-sora font-bold text-xl text-white">AI Brain</span>
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed max-w-[220px]">
              The intelligent knowledge engine for modern professionals, researchers, and builders.
            </p>
          </div>

          {/* Link columns */}
          {footerCols.map(({ head, links }) => (
            <div key={head}>
              <h4 className="font-sora font-bold text-sm text-white mb-4">{head}</h4>
              <ul className="flex flex-col gap-2.5 list-none">
                {links.map((l) => <FooterLink key={l}>{l}</FooterLink>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap justify-between items-center pt-8 gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-[#6B7280]">© 2025 AI Brain, Inc. All rights reserved.</p>
          <div className="flex gap-3">
            {socials.map((s) => <SocialBtn key={s}>{s}</SocialBtn>)}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CTA;