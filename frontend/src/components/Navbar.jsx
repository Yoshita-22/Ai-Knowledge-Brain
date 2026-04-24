import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../hooks/utils";

const navLinks = [
  { name: "Features", id: "features" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Use Cases", id: "use-cases" },
  { name: "Reviews", id: "reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(11,15,25,0.97)" : "rgba(11,15,25,0.70)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-lg"
            style={{
              background: "linear-gradient(135deg,#7C3AED,#3B82F6)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
          >
            🧠
          </div>
          <span className="font-sora font-bold text-xl text-white">
            AI Brain
          </span>
        </Link>

        {/* Desktop links (SCROLL) */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={`#${link.id}`}
                className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-200 no-underline"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Login (ROUTER) */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Login */}
          <Link
            to="/login"
            className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-200 no-underline"
          >
            Login
          </Link>

          {/* Signup */}
          <Link to="/signup">
            <PrimaryButton>Get Started Free</PrimaryButton>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen
                ? "rotate(45deg) translate(4px,4px)"
                : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 bg-white transition-all duration-300"
            style={{
              transform: menuOpen
                ? "rotate(-45deg) translate(4px,-4px)"
                : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 py-4 px-4 rounded-xl"
          style={{
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.id}`}
              className="block py-3 text-[#9CA3AF] hover:text-white text-sm font-medium border-b border-[#1E293B] last:border-none no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Login */}
          <Link
            to="/login"
            className="block py-3 text-[#9CA3AF] hover:text-white text-sm font-medium border-b border-[#1E293B] no-underline"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>

          {/* Signup */}
          <Link to="/signup" onClick={() => setMenuOpen(false)}>
            <PrimaryButton className="w-full justify-center mt-4">
              Get Started Free
            </PrimaryButton>
          </Link>
        </div>
      )}
    </nav>
  );
}