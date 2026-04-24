import { useState, useRef, useEffect, useCallback } from "react";
import "./ChatSection.css";
import { uploadFile, sendQuery } from "../api/chat";
import { useParams } from "react-router-dom";
import api from "../api/api";
// ── Helpers ──────────────────────────────────────────────
const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const getFileIcon = (name) => {
  const ext = name.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) return "🖼️";
  if (["pdf"].includes(ext)) return "📄";
  if (["mp4", "mov", "avi"].includes(ext)) return "🎬";
  if (["mp3", "wav", "ogg"].includes(ext)) return "🎵";
  if (["zip", "rar", "tar"].includes(ext)) return "🗜️";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  if (["js", "ts", "jsx", "tsx", "py", "html", "css"].includes(ext)) return "💻";
  return "📎";
};

// ── Typing Indicator ──────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="avatar ai">✦</div>
      <div className="typing-bubble">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

// ── Message Bubble ────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      <div className={`avatar ${isUser ? "user" : "ai"}`}>
        {isUser ? "Y" : "✦"}
      </div>

      <div className="bubble-wrap">
        {/* Files */}
        {message.files?.length > 0 && (
          <div className="file-stack">
            {message.files.map((f, i) => (
              <div key={i} className="bubble-attachment">
                <span>{getFileIcon(f.name)}</span>
                <span>{f.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Text */}
        {message.content && (
          <div className={`bubble ${isUser ? "user" : "ai"}`}>
            {message.content}
          </div>
        )}

        <span className="message-time">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────
export default function ChatSection() {
  const { sessionId } = useParams();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stagedFiles, setStagedFiles] = useState([]);

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);

  console.log("SESSION:", sessionId);

  // 🔥 RESET CHAT WHEN SESSION CHANGES
  useEffect(() => {
    console.log("NEW SESSION → RESET");

    setMessages([]);
    setInput("");
    setStagedFiles([]);
  }, [sessionId]);
  useEffect(() => {
  const loadHistory = async () => {
    try {
      setMessages([]);

      const res = await api.post("/chat/history", {
        sessionId,
      });

      const formatted = res.data.messages.map(m => ({
        id: m._id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.createdAt)
      }));

      setMessages(formatted);

    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  loadHistory();
}, [sessionId]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Input resize
  const handleInputChange = (e) => {
    setInput(e.target.value);

    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  };

  // File select
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setStagedFiles((prev) => {
      const names = new Set(prev.map((f) => f.name));
      return [...prev, ...files.filter((f) => !names.has(f.name))];
    });

    e.target.value = "";
  };

  const removeFile = (name) => {
    setStagedFiles((prev) => prev.filter((f) => f.name !== name));
  };

  //  SEND MESSAGE
  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text && stagedFiles.length === 0) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      content: text,
      files: stagedFiles.map((f) => ({
        name: f.name,
        size: f.size,
      })),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStagedFiles([]);
    setIsTyping(true);
    window.dispatchEvent(new Event("chat-updated"));

    try {
      let fileId = null;

      // Upload
      if (stagedFiles.length > 0) {
        const uploadRes = await uploadFile(stagedFiles, sessionId);
        fileId = uploadRes.fileId;
      }

      // Query
      const res = await sendQuery({
        query: text,
        sessionId, // ✅ FIXED
        fileId,
      });

      const aiMsg = {
        id: Date.now(),
        role: "assistant",
        content: res.answer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "Something went wrong 😢",
          timestamp: new Date(),
        },
      ]);
    }

    setIsTyping(false);
  }, [input, stagedFiles, sessionId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend =
    (input.trim().length > 0 || stagedFiles.length > 0) && !isTyping;

  return (
    <div className="chat-wrapper">
      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            Ask anything 🚀
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}

        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* File Preview */}
      {stagedFiles.length > 0 && (
        <div className="file-preview">
          {stagedFiles.map((f) => (
            <div key={f.name}>
              {getFileIcon(f.name)} {f.name}
              <button onClick={() => removeFile(f.name)}>x</button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
     <div className="chat-input-area">
        <div className="input-container">
          {/* + Upload button */}
          <button
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Attach files"
          >
            +
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden-input"
            onChange={handleFileChange}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Ask your second brain anything…"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isTyping}
          />



                  {/* Send button */}
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!canSend}
            title="Send message"
          >
            ➤
          </button>
        </div>

        <p className="input-hint">
          Press Enter to send · Shift+Enter for new line · + to attach files
        </p>
      </div>
    </div>
  );
}