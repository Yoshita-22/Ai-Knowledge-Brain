import { useState, useEffect, useRef } from "react";

const AI_TEXT =
  "This document explains how neural networks work, where they are used, and their advantages in solving complex problems like image recognition and language understanding.";

const KEYWORDS = ["neural networks", "image recognition", "language understanding"];

function renderWithKeywords(text) {
  let parts = [{ text, kw: false }];
  KEYWORDS.forEach((kw) => {
    parts = parts.flatMap((p) => {
      if (p.kw) return [p];
      const segs = p.text.split(new RegExp(`(${kw})`, "gi"));
      return segs.map((s) => ({ text: s, kw: s.toLowerCase() === kw }));
    });
  });
  return parts.map((p, i) =>
    p.kw ? (
      <span key={i} className="keyword-highlight">
        {p.text}
      </span>
    ) : (
      <span key={i}>{p.text}</span>
    )
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 items-center py-1">
      {[0, 1, 2].map((i) => (
        <div key={i} className="typing-dot" style={{ animationDelay: `${i * 0.2}s` }} />
      ))}
    </div>
  );
}

function FileItem({ icon, name, size }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <span className="text-base">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium truncate text-white">{name}</div>
        <div className="text-[11px] text-[#6B7280]">{size}</div>
      </div>
      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
    </div>
  );
}

export default function ChatDemo() {
  const [phase, setPhase] = useState("typing"); // typing | writing | done
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  const timerRef = useRef(null);

  const runTyping = () => {
    idx.current = 0;
    setDisplayed("");
    setPhase("writing");
    const interval = setInterval(() => {
      idx.current += 1;
      setDisplayed(AI_TEXT.slice(0, idx.current));
      if (idx.current >= AI_TEXT.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, 26);
    timerRef.current = interval;
  };

  useEffect(() => {
    const t1 = setTimeout(() => runTyping(), 2000);
    return () => {
      clearTimeout(t1);
      clearInterval(timerRef.current);
    };
  }, []);

  // Loop
  useEffect(() => {
    if (phase !== "done") return;
    const loop = setTimeout(() => {
      setPhase("typing");
      setDisplayed("");
      setTimeout(() => runTyping(), 2200);
    }, 5500);
    return () => clearTimeout(loop);
  }, [phase]);

  const [uploadHov, setUploadHov] = useState(false);

  return (
    <div
      className="w-full max-w-[900px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 20px rgba(124,58,237,0.25), 0 0 40px rgba(59,130,246,0.2)",
      }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        {[["#FF5F57"], ["#FFBD2E"], ["#28CA42"]].map(([c], i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
        ))}
        <div className="flex-1 text-center text-xs text-[#6B7280] font-mono">
          AI Brain — Knowledge Engine
        </div>
      </div>

      {/* Body */}
      <div className="grid" style={{ gridTemplateColumns: "clamp(200px,260px,30%) 1fr" }}>
        {/* Upload Panel */}
        <div
          className="p-5"
          style={{ background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest mb-4">
            📁 Knowledge Base
          </div>

          {/* Drop zone */}
          <div
            onMouseEnter={() => setUploadHov(true)}
            onMouseLeave={() => setUploadHov(false)}
            className="rounded-xl p-4 text-center mb-4 cursor-pointer transition-all duration-300"
            style={{
              border: `1px dashed rgba(124,58,237,${uploadHov ? 0.7 : 0.4})`,
              background: `rgba(124,58,237,${uploadHov ? 0.08 : 0.04})`,
            }}
          >
            <div className="text-2xl mb-1.5">⬆️</div>
            <div className="text-[11px] text-[#6B7280] leading-relaxed">
              Drop files here
              <br />
              <span className="text-[#A78BFA] font-medium">PDFs, Images, URLs</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <FileItem icon="📄" name="Neural_Networks.pdf" size="2.4 MB" />
            <FileItem icon="🖼️" name="Architecture.png" size="856 KB" />
            <FileItem icon="🔗" name="arxiv.org/2024" size="URL" />
          </div>
        </div>

        {/* Chat Panel */}
        <div className="flex flex-col p-5 gap-3 min-h-[340px]">
          <div className="flex flex-col gap-3.5 flex-1">
            {/* User message */}
            <div className="flex gap-2.5 items-start chat-slide">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                style={{ background: "rgba(59,130,246,0.2)", border: "1px solid rgba(59,130,246,0.3)" }}
              >
                👤
              </div>
              <div
                className="rounded-xl px-3.5 py-2.5 text-sm text-[#9CA3AF] max-w-xs"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                Summarize this document in simple terms
              </div>
            </div>

            {/* Typing indicator */}
            {phase === "typing" && (
              <div className="flex gap-2.5 items-start chat-slide">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
                    boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                  }}
                >
                  🧠
                </div>
                <div
                  className="rounded-xl px-3.5 py-2.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <TypingDots />
                </div>
              </div>
            )}

            {/* AI response */}
            {(phase === "writing" || phase === "done") && (
              <div className="flex gap-2.5 items-start chat-slide">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0"
                  style={{
                    background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
                    boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                  }}
                >
                  🧠
                </div>
                <div
                  className="rounded-xl px-3.5 py-2.5 text-sm leading-relaxed max-w-sm"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {renderWithKeywords(displayed)}
                  {phase === "writing" && (
                    <span
                      className="inline-block w-0.5 h-4 ml-0.5 align-middle"
                      style={{ background: "#A78BFA" }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Input row */}
          <div
            className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <input
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-[#6B7280] font-inter"
              placeholder="Ask anything about your documents…"
            />
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm transition-all hover:scale-110"
              style={{
                background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
                boxShadow: "0 0 12px rgba(124,58,237,0.4)",
                border: "none",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}