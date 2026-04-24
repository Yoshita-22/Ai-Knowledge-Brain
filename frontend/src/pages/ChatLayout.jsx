import React from 'react'
import ChatSection from '../components/ChatSection'
import Sidebar from '../components/Sidebar'
export default function ChatLayout() {
    let sessions = [
        {
    sessionId: "abc123",
    title: "Transformer Architecture",
    updatedAt: "2 min ago"
  }
    ]
  return (
    <div className="flex h-screen w-screen bg-[#0B0F19] overflow-hidden">
      <Sidebar/>
      <div className="flex-1">
        <ChatSection />
      </div>
    </div>
  );
}



 