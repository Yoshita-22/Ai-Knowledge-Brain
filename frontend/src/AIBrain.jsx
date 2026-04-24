import { useState, useRef, useEffect } from "react";

const style = document.createElement("style");
style.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0B0F19;
    --sidebar: #0F172A;
    --card: rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --primary-gradient: linear-gradient(135deg, #7C3AED, #3B82F6);
    --accent: #22D3EE;
    --text-primary: #FFFFFF;
    --text-secondary: #9CA3AF;
    --purple: #7C3AED;
    --blue: #3B82F6;
  }

  body { background: var(--bg); font-family: 'Inter', sans-serif; color: var(--text-primary); overflow: hidden; }

  .sora { font-family: 'Sora', sans-serif; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(124,58,237,0.7); }

  /* Sidebar */
  .sidebar { background: var(--sidebar); border-right: 1px solid var(--border); }

  /* Glass card */
  .glass {
    background: var(--card);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  /* Gradient text */
  .gradient-text {
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Gradient button */
  .btn-gradient {
    background: var(--primary-gradient);
    transition: all 0.2s ease;
    box-shadow: 0 0 0 rgba(124,58,237,0);
  }
  .btn-gradient:hover {
    box-shadow: 0 0 20px rgba(124,58,237,0.5);
    transform: translateY(-1px);
  }
  .btn-gradient:active { transform: translateY(0); }

  /* New chat button */
  .btn-new-chat {
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.3);
    transition: all 0.2s ease;
  }
  .btn-new-chat:hover {
    background: rgba(124,58,237,0.22);
    border-color: rgba(124,58,237,0.6);
    box-shadow: 0 0 12px rgba(124,58,237,0.2);
  }

  /* Sidebar item */
  .sidebar-item {
    transition: all 0.15s ease;
    border: 1px solid transparent;
    cursor: pointer;
  }
  .sidebar-item:hover {
    background: rgba(255,255,255,0.05);
    border-color: var(--border);
  }
  .sidebar-item.active {
    background: rgba(124,58,237,0.15);
    border-color: rgba(124,58,237,0.3);
    box-shadow: 0 0 12px rgba(124,58,237,0.1);
  }
  .sidebar-item.active .item-dot { background: var(--purple); box-shadow: 0 0 6px var(--purple); }

  /* Message animations */
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .message-in { animation: fadeSlideIn 0.35s ease forwards; }

  /* Typing dots */
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
  .dot1 { animation: typingBounce 1.2s ease infinite; }
  .dot2 { animation: typingBounce 1.2s ease 0.15s infinite; }
  .dot3 { animation: typingBounce 1.2s ease 0.3s infinite; }

  /* Input area */
  .input-area {
    background: rgba(15,23,42,0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-top: 1px solid var(--border);
  }

  .input-box {
    background: rgba(255,255,255,0.05);
    border: 1.5px solid var(--border);
    transition: all 0.2s ease;
    outline: none;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    resize: none;
  }
  .input-box:focus {
    border-color: rgba(124,58,237,0.6);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.12), 0 0 20px rgba(124,58,237,0.08);
    background: rgba(255,255,255,0.06);
  }
  .input-box::placeholder { color: var(--text-secondary); }

  /* Chip */
  .file-chip {
    background: #1F2937;
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.15s ease;
  }
  .file-chip:hover { border-color: rgba(124,58,237,0.4); background: #1F2937; }

  /* Upload button */
  .btn-upload {
    background: rgba(255,255,255,0.06);
    border: 1px solid var(--border);
    transition: all 0.2s ease;
    cursor: pointer;
  }
  .btn-upload:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(124,58,237,0.4);
    box-shadow: 0 0 10px rgba(124,58,237,0.15);
  }

  /* AI message card */
  .ai-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  /* Source tag */
  .source-tag {
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.2);
    color: var(--accent);
    font-size: 11px;
    font-family: 'Inter', sans-serif;
  }

  /* Logo glow */
  .logo-icon {
    background: var(--primary-gradient);
    box-shadow: 0 0 20px rgba(124,58,237,0.4);
  }

  /* Mesh background */
  .mesh-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .mesh-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.06;
  }

  /* Mobile sidebar toggle */
  .sidebar-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 40;
  }

  @media (max-width: 768px) {
    .sidebar-panel {
      position: fixed !important;
      top: 0; left: 0; bottom: 0;
      width: 280px !important;
      z-index: 50;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }
    .sidebar-panel.open { transform: translateX(0); }
    .sidebar-overlay.show { display: block; }
    .main-header-mobile { display: flex !important; }
  }

  /* Hover lift */
  .hover-lift { transition: transform 0.15s ease; }
  .hover-lift:hover { transform: translateY(-1px); }

  /* Section label */
  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  /* Send btn disabled */
  .btn-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

  /* Highlight key term */
  .key-term {
    background: linear-gradient(135deg, #7C3AED, #3B82F6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }

  /* Welcome screen */
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
    50% { box-shadow: 0 0 40px rgba(124,58,237,0.6); }
  }
  .brain-pulse { animation: pulseGlow 2.5s ease infinite; }

  /* Suggestion chip */
  .suggestion-chip {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    transition: all 0.2s ease;
    cursor: pointer;
    text-align: left;
  }
  .suggestion-chip:hover {
    background: rgba(124,58,237,0.12);
    border-color: rgba(124,58,237,0.35);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }
`;
document.head.appendChild(style);

// ─── DATA ────────────────────────────────────────────────────────────────────

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I'm **AI Brain**, your intelligent document assistant. Upload your files and I'll help you extract insights, summarize content, and answer precise questions from your documents.",
    source: null,
    timestamp: "09:41 AM",
  },
];

const CHAT_HISTORY = [
  { id: 1, title: "Neural Network Summary", active: true, time: "Today" },
  { id: 2, title: "Q4 Financial Report Analysis", active: false, time: "Today" },
  { id: 3, title: "Research Paper Review", active: false, time: "Yesterday" },
  { id: 4, title: "Product Spec Breakdown", active: false, time: "Yesterday" },
  { id: 5, title: "Legal Contract Review", active: false, time: "Mon" },
];

const UPLOADED_FILES = [
  { id: 1, name: "neural_networks.pdf", type: "pdf", size: "2.4 MB" },
  { id: 2, name: "research_paper.pdf", type: "pdf", size: "1.1 MB" },
];

const SUGGESTIONS = [
  { icon: "📋", text: "Summarize this document", sub: "Get a concise overview" },
  { icon: "🔍", text: "Extract key insights", sub: "Find the most important points" },
  { icon: "❓", text: "Answer questions from my file", sub: "Ask anything specific" },
  { icon: "📊", text: "Compare multiple documents", sub: "Identify similarities & differences" },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────

const Icon = {
  Brain: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.41-4.65 2.5 2.5 0 0 1 .63-4.87 2.5 2.5 0 0 1 3.23-3.42Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.41-4.65 2.5 2.5 0 0 0-.63-4.87 2.5 2.5 0 0 0-3.23-3.42Z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  File: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  ),
  Link: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
  ),
  Image: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
  ),
  X: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  Settings: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ),
  Chat: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  ),
  Upload: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
  ),
  Menu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  Source: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  ),
  Sparkle: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"/></svg>
  ),
};

// ─── PARSE AI CONTENT ─────────────────────────────────────────────────────────

function renderAIContent(content) {
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <span key={i} className="key-term">{part.slice(2, -2)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 message-in" style={{ marginBottom: 24 }}>
      <div className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: 32, height: 32, background: "linear-gradient(135deg,#7C3AED,#3B82F6)", boxShadow: "0 0 12px rgba(124,58,237,0.4)" }}>
        <Icon.Brain />
      </div>
      <div className="ai-card rounded-2xl" style={{ padding: "14px 18px", borderRadius: "18px 18px 18px 4px" }}>
        <div className="flex gap-1.5 items-center" style={{ height: 20 }}>
          <div className="dot1 rounded-full" style={{ width: 7, height: 7, background: "#7C3AED" }} />
          <div className="dot2 rounded-full" style={{ width: 7, height: 7, background: "#3B82F6" }} />
          <div className="dot3 rounded-full" style={{ width: 7, height: 7, background: "#22D3EE" }} />
        </div>
      </div>
    </div>
  );
}

function UserMessage({ msg }) {
  return (
    <div className="flex justify-end message-in" style={{ marginBottom: 24 }}>
      <div style={{ maxWidth: "70%" }}>
        <div className="btn-gradient text-white"
          style={{ padding: "12px 18px", borderRadius: "18px 18px 4px 18px", fontSize: 14, lineHeight: 1.6, fontFamily: "'Inter',sans-serif" }}>
          {msg.content}
        </div>
        <div style={{ textAlign: "right", marginTop: 6, fontSize: 11, color: "#4B5563" }}>{msg.timestamp}</div>
      </div>
    </div>
  );
}

function AIMessage({ msg }) {
  return (
    <div className="flex items-start gap-3 message-in" style={{ marginBottom: 24 }}>
      <div className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{ width: 32, height: 32, background: "linear-gradient(135deg,#7C3AED,#3B82F6)", boxShadow: "0 0 12px rgba(124,58,237,0.35)", marginTop: 2 }}>
        <Icon.Brain />
      </div>
      <div style={{ maxWidth: "78%", flex: 1 }}>
        <div className="ai-card"
          style={{ padding: "16px 20px", borderRadius: "4px 18px 18px 18px", fontSize: 14, lineHeight: 1.75, color: "#E2E8F0" }}>
          {renderAIContent(msg.content)}
          {msg.bullets && (
            <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: "none" }}>
              {msg.bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8, color: "#CBD5E1", fontSize: 13 }}>
                  <span style={{ color: "#7C3AED", marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span>{renderAIContent(b)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {msg.source && (
          <div className="flex items-center gap-2 mt-2">
            <div className="source-tag flex items-center gap-1.5 rounded-full" style={{ padding: "3px 10px" }}>
              <Icon.Source />
              <span>{msg.source}</span>
            </div>
            <span style={{ fontSize: 11, color: "#4B5563" }}>{msg.timestamp}</span>
          </div>
        )}
        {!msg.source && (
          <div style={{ marginTop: 6, fontSize: 11, color: "#4B5563" }}>{msg.timestamp}</div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ onSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center h-full" style={{ padding: "40px 24px" }}>
      <div className="brain-pulse logo-icon flex items-center justify-center rounded-2xl mb-6"
        style={{ width: 64, height: 64, borderRadius: 20 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.41-4.65 2.5 2.5 0 0 1 .63-4.87 2.5 2.5 0 0 1 3.23-3.42Z"/>
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.41-4.65 2.5 2.5 0 0 0-.63-4.87 2.5 2.5 0 0 0-3.23-3.42Z"/>
        </svg>
      </div>
      <h1 className="sora gradient-text" style={{ fontSize: 28, fontWeight: 700, marginBottom: 10, textAlign: "center" }}>
        What can I help you understand?
      </h1>
      <p style={{ color: "#6B7280", fontSize: 15, textAlign: "center", maxWidth: 420, lineHeight: 1.6, marginBottom: 36 }}>
        Upload documents, PDFs, images, or URLs — then ask anything. I'll give you precise, context-aware answers.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 560 }}>
        {SUGGESTIONS.map((s, i) => (
          <button key={i} className="suggestion-chip rounded-xl"
            style={{ padding: "14px 16px" }}
            onClick={() => onSuggestion(s.text)}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#E2E8F0", marginBottom: 3, fontFamily: "'Inter',sans-serif" }}>{s.text}</div>
            <div style={{ fontSize: 11, color: "#6B7280" }}>{s.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function AIBrain() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chips, setChips] = useState([
    { id: 1, name: "neural_networks.pdf", type: "pdf" },
    { id: 2, name: "openai.com/research", type: "url" },
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const now = () => {
    const d = new Date();
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const AI_RESPONSES = [
    {
      content: "This document explains how **neural networks** work, their applications, and their **advantages** in solving complex problems. It covers fundamental architecture, training methodologies, and real-world deployment strategies.",
      bullets: ["**Feedforward networks** form the backbone of most modern architectures", "**Backpropagation** enables efficient gradient-based learning", "**Deep learning** extends these concepts to multi-layered representations"],
      source: "Page 5 • Introduction",
    },
    {
      content: "Based on your uploaded files, I found **3 key insights** that directly answer your question. The research indicates significant correlation between **model depth** and task performance, particularly in NLP applications.",
      bullets: ["Architecture complexity scales with dataset size", "**Transfer learning** reduces training time by up to 70%", "Regularization techniques prevent **overfitting** in high-dimensional spaces"],
      source: "Page 12 • Results & Discussion",
    },
    {
      content: "The document outlines a comprehensive **framework** for understanding the relationship between data quality and model outputs. Key findings suggest that **preprocessing pipelines** have an outsized impact on final accuracy metrics.",
      source: "Page 3 • Methodology",
    },
    {
      content: "I've analyzed the content across your uploaded files. The **primary conclusion** is that hybrid architectures combining **convolutional layers** with attention mechanisms consistently outperform single-paradigm models on multimodal tasks.",
      bullets: ["Cross-modal attention yields +12% accuracy gains", "**Sparse transformers** reduce memory footprint by 40%", "Ensemble approaches remain state-of-the-art for benchmark tasks"],
      source: "Page 28 • Conclusion",
    },
  ];

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;

    setShowWelcome(false);
    setInput("");
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: msg, timestamp: now() }]);
    setIsTyping(true);

    const resp = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", timestamp: now(), ...resp }]);
    }, 1800 + Math.random() * 800);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const removeChip = (id) => setChips(c => c.filter(f => f.id !== id));

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(f => {
      setChips(prev => [...prev, { id: Date.now() + Math.random(), name: f.name, type: f.type.includes("image") ? "img" : "pdf" }]);
    });
  };

  const chipIcon = (type) => {
    if (type === "url") return <Icon.Link />;
    if (type === "img") return <Icon.Image />;
    return <Icon.File />;
  };
  const chipEmoji = (type) => type === "url" ? "🌐" : type === "img" ? "🖼️" : "📄";

  const newChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setActiveChat(null);
    setSidebarOpen(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#0B0F19", position: "relative", overflow: "hidden" }}>
      {/* Mesh background */}
      <div className="mesh-bg">
        <div className="mesh-blob" style={{ width: 600, height: 600, background: "#7C3AED", top: -200, left: -100 }} />
        <div className="mesh-blob" style={{ width: 500, height: 500, background: "#3B82F6", bottom: -150, right: -100 }} />
        <div className="mesh-blob" style={{ width: 300, height: 300, background: "#22D3EE", top: "40%", left: "40%", opacity: 0.04 }} />
      </div>

      {/* Mobile overlay */}
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar sidebar-panel flex flex-col`}
        style={{ width: 260, minWidth: 260, height: "100vh", zIndex: 10, position: "relative", flexShrink: 0 }}>

        {/* Logo */}
        <div className="flex items-center gap-3" style={{ padding: "22px 20px 18px" }}>
          <div className="logo-icon flex items-center justify-center rounded-xl flex-shrink-0"
            style={{ width: 36, height: 36, borderRadius: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.41-4.65 2.5 2.5 0 0 1 .63-4.87 2.5 2.5 0 0 1 3.23-3.42Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.41-4.65 2.5 2.5 0 0 0-.63-4.87 2.5 2.5 0 0 0-3.23-3.42Z"/>
            </svg>
          </div>
          <div>
            <div className="sora gradient-text" style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>AI Brain</div>
            <div style={{ fontSize: 10, color: "#4B5563", marginTop: 1 }}>Document Intelligence</div>
          </div>
        </div>

        {/* New Chat */}
        <div style={{ padding: "0 14px 18px" }}>
          <button className="btn-new-chat w-full flex items-center justify-center gap-2 rounded-xl sora"
            style={{ padding: "10px 16px", color: "#A78BFA", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            onClick={newChat}>
            <Icon.Plus />
            New Chat
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "0 14px" }}>

          {/* Uploaded Files */}
          <div style={{ marginBottom: 24 }}>
            <div className="section-label" style={{ marginBottom: 10, paddingLeft: 6 }}>Uploaded Files</div>
            {UPLOADED_FILES.map(f => (
              <div key={f.id} className="sidebar-item rounded-xl flex items-center gap-2.5"
                style={{ padding: "9px 10px", marginBottom: 4 }}>
                <div style={{ color: "#7C3AED", flexShrink: 0 }}><Icon.File /></div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: "#CBD5E1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: "#4B5563", marginTop: 1 }}>{f.size}</div>
                </div>
              </div>
            ))}
            <button className="btn-upload w-full flex items-center justify-center gap-2 rounded-xl"
              style={{ padding: "8px", marginTop: 6, fontSize: 12, color: "#6B7280", cursor: "pointer" }}
              onClick={() => fileRef.current?.click()}>
              <Icon.Upload />
              Add File
            </button>
          </div>

          {/* Chat History */}
          <div style={{ marginBottom: 16 }}>
            <div className="section-label" style={{ marginBottom: 10, paddingLeft: 6 }}>Recent Chats</div>
            {CHAT_HISTORY.map(chat => (
              <div key={chat.id}
                className={`sidebar-item rounded-xl flex items-center gap-2.5 ${activeChat === chat.id ? "active" : ""}`}
                style={{ padding: "9px 10px", marginBottom: 4 }}
                onClick={() => { setActiveChat(chat.id); setSidebarOpen(false); }}>
                <div className="item-dot rounded-full flex-shrink-0"
                  style={{ width: 6, height: 6, background: activeChat === chat.id ? "#7C3AED" : "#374151", transition: "all 0.2s" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: activeChat === chat.id ? "#E2E8F0" : "#9CA3AF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chat.title}</div>
                  <div style={{ fontSize: 10, color: "#4B5563", marginTop: 1 }}>{chat.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div style={{ padding: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="sidebar-item rounded-xl flex items-center gap-2.5" style={{ padding: "10px 12px" }}>
            <div style={{ color: "#6B7280" }}><Icon.Settings /></div>
            <span style={{ fontSize: 13, color: "#6B7280" }}>Settings</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl" style={{ padding: "10px 12px", marginTop: 4 }}>
            <div className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7C3AED,#22D3EE)", fontSize: 12, fontWeight: 700 }}>J</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#CBD5E1" }}>John Doe</div>
              <div style={{ fontSize: 10, color: "#4B5563" }}>Pro Plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="flex items-center justify-between"
          style={{ padding: "16px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(11,15,25,0.7)", backdropFilter: "blur(12px)" }}>
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <button className="main-header-mobile" style={{ display: "none", background: "none", border: "none", color: "#9CA3AF", cursor: "pointer", padding: 4 }}
              onClick={() => setSidebarOpen(true)}>
              <Icon.Menu />
            </button>
            <div>
              <div className="sora" style={{ fontSize: 14, fontWeight: 600, color: "#E2E8F0" }}>
                {CHAT_HISTORY.find(c => c.id === activeChat)?.title || "New Conversation"}
              </div>
              {chips.length > 0 && (
                <div style={{ fontSize: 11, color: "#4B5563", marginTop: 1 }}>
                  {chips.length} file{chips.length > 1 ? "s" : ""} attached
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full" style={{ padding: "5px 12px", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22D3EE", boxShadow: "0 0 6px #22D3EE" }} />
              <span style={{ fontSize: 11, color: "#22D3EE", fontWeight: 500 }}>AI Active</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto" style={{ padding: "28px 32px 0" }}>
          {(!hasMessages && showWelcome) ? (
            <WelcomeScreen onSuggestion={(text) => { setInput(text); inputRef.current?.focus(); }} />
          ) : (
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
              {messages.map(msg =>
                msg.role === "user"
                  ? <UserMessage key={msg.id} msg={msg} />
                  : <AIMessage key={msg.id} msg={msg} />
              )}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} style={{ height: 20 }} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area" style={{ padding: "16px 28px 20px", flexShrink: 0 }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>

            {/* File chips */}
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-2" style={{ marginBottom: 12 }}>
                {chips.map(chip => (
                  <div key={chip.id} className="file-chip flex items-center gap-1.5 rounded-lg" style={{ padding: "5px 10px" }}>
                    <span style={{ fontSize: 13 }}>{chipEmoji(chip.type)}</span>
                    <span style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 500, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chip.name}</span>
                    <button style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", display: "flex", alignItems: "center", padding: "0 0 0 2px" }}
                      onClick={() => removeChip(chip.id)}>
                      <Icon.X />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Input box */}
            <div className="flex items-end gap-3">
              <button className="btn-upload flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 44, height: 44, color: "#9CA3AF" }}
                onClick={() => fileRef.current?.click()}>
                <Icon.Plus />
              </button>
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  className="input-box w-full rounded-2xl"
                  style={{ padding: "13px 16px", minHeight: 48, maxHeight: 160 }}
                  placeholder="Ask anything about your files…"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={1}
                />
              </div>
              <button
                className="btn-gradient btn-send flex items-center justify-center rounded-xl flex-shrink-0"
                style={{ width: 44, height: 44, color: "white", border: "none", cursor: "pointer" }}
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}>
                <Icon.Send />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5" style={{ marginTop: 10 }}>
              <Icon.Sparkle />
              <span style={{ fontSize: 11, color: "#374151" }}>AI Brain may make mistakes. Verify important info from source documents.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden file input */}
      <input ref={fileRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.webp" style={{ display: "none" }} onChange={handleFileUpload} />
    </div>
  );
}
