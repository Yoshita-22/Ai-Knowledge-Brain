import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChatLayout from "./pages/ChatLayout"

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Problem from "./components/Problem";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import UseCases from "./components/UseCases";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import { initAuth } from "./utils/initAuth";

export default function App() {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const setupAuth = async () => {
      await initAuth();
      setIsAuthReady(true);
    };
    setupAuth();
  }, []);

  if (!isAuthReady) return <div>Loading...</div>;

  return (
    <Routes>

      {/* LANDING PAGE */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-[#0B0F19] text-white">
            <Navbar />
            <Hero />
            <Stats />
            <Problem />
            <Features />
            <HowItWorks />
            <UseCases />
            <Testimonials />
            <CTA />
            <Footer />
          </div>
        }
      />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* CHAT (NO NAVBAR HERE) */}
      <Route path="/chat/:sessionId" element={<ChatLayout />} />

    </Routes>
  );
}