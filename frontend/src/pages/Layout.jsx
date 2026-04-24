import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-inter overflow-x-hidden">
      
      {/* Ambient blobs (global background) */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Navbar (always visible) */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-10">
        <Outlet />
      </main>
    </div>
  );
}