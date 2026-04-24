import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useChatNavigation } from "../hooks/createNewChat";
import { getSessions } from "../api/Session";
import { useState,useEffect } from "react";
import { logoutUser } from "../api/auth";
export default function Sidebar() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
 const [sessions,setSessions] = useState([])
  const { createNewChat } = useChatNavigation();
const loadSessions = async () => {
    try {
      const data = await getSessions();
      console.log("Sessions from sidebar",data)
      setSessions(data);
    } catch (err) {
      console.error("Failed to load sessions");
    }
  };

 useEffect(() => {
  loadSessions();
}, [sessionId]);


const handleLogout = async () => {
  await logoutUser();
  navigate("/login");
};

  return (
    <div className="w-[260px] h-screen bg-[#0B0F19] border-r border-white/10 flex flex-col p-4">

      {/* Logo */}
      <div className="text-xl font-semibold mb-6">
        🧠 AI Brain
      </div>

      {/* New Chat */}
      <button
        onClick={createNewChat}
        className="mb-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:opacity-90"
      >
        ✨ New Chat
      </button>

      {/* Sessions */}
      <div className="flex flex-col gap-2 overflow-y-auto">
        {sessions.map((s) => (
          <div
            key={s.sessionId}
            onClick={() => navigate(`/chat/${s.sessionId}`)}
            className={`p-3 rounded-lg cursor-pointer transition ${
              sessionId === s.sessionId
                ? "bg-white/10 border border-white/10"
                : "hover:bg-white/5"
            }`}
          >
            <div className="text-sm font-medium truncate">
              {s.title || "New Chat"}
            </div>
            <div className="text-xs text-gray-400">
              {s.updatedAt}
            </div>
          </div>
        ))}
      </div>
     
      {/* Logout */}
<div className="mt-auto pt-4">
  <button
    onClick={handleLogout}
    className="w-full p-[1px] rounded-lg bg-gradient-to-r from-purple-500 to-blue-500"
  >
    <div className="w-full h-full rounded-lg bg-[#0B0F19] hover:bg-white/5 transition px-4 py-2 text-sm text-white">
       Logout
    </div>
  </button>
</div>
    </div>
  );
}