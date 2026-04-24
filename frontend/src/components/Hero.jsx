import { PrimaryButton, SecondaryButton} from "../hooks/utils"
import ChatDemo from "./ChatDemo";

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-36 pb-20 text-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 hero-anim-1"
          style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] pulse-dot" />
          <span className="text-[13px] font-medium text-[#A78BFA]">
            Now in Public Beta — Join 12,000+ early users
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-sora font-extrabold leading-[1.1] tracking-tight mb-6 hero-anim-2"
          style={{ fontSize: "clamp(38px, 6vw, 68px)" }}
        >
          Your Second Brain,
          <br />
          <span className="gradient-text">Powered by AI</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-[#9CA3AF] max-w-[540px] mb-11 leading-relaxed hero-anim-3"
          style={{ fontSize: "clamp(16px, 2vw, 20px)" }}
        >
          Upload anything. Ask anything. Get precise, context-aware answers
          instantly — from your own knowledge base.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20 hero-anim-4">
          <PrimaryButton className="text-base px-7 py-3.5">
            ✨ Try AI Brain Free
          </PrimaryButton>
          <SecondaryButton className="text-base px-7 py-3.5">
            ▶ See How It Works
          </SecondaryButton>
        </div>

        {/* Interactive Mockup */}
        <div className="w-full hero-anim-5">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}