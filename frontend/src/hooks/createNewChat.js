// hooks/useChatNavigation.js
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const useChatNavigation = () => {
  const navigate = useNavigate();

  const createNewChat = () => {
    const newSessionId = uuidv4();
    navigate(`/chat/${newSessionId}`);
  };

  return { createNewChat };
};