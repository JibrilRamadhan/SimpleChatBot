"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
};

type ChatContextType = {
  messages: Message[];
  addMessage: (msg: Message, replaceLast?: boolean) => void;
  clearMessages: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (msg: Message, replaceLast = false) => {
    setMessages((prev) => {
      // Jika replaceLast true → ganti pesan terakhir (khusus streaming bot)
      if (
        replaceLast &&
        prev.length > 0 &&
        prev[prev.length - 1].sender === "bot"
      ) {
        return [...prev.slice(0, -1), msg];
      }
      return [...prev, msg];
    });
  };

  const clearMessages = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
