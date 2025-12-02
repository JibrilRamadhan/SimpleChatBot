"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useChat } from "../components/context/ChatContext";

export default function ChatBox() {
  const { messages, addMessage } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke bawah
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Tambah pesan user
    addMessage({ text, sender: "user", timestamp: now });
    setInputMessage("");

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      let reply: string = data.reply || "⚠️ Maaf, tidak ada respon.";

      // Ganti placeholder [WA_LINK] dengan tombol WA custom
      if (reply.includes("[WA_LINK]")) {
        reply = reply.replace(
          "[WA_LINK]",
          `<a href="https://wa.me/6285714186422" 
              target="_blank" 
              class="inline-flex items-center gap-2 mt-1 px-4 py-2
                     rounded-full border border-green-500 text-green-500 
                     font-medium transition-all duration-300
                     hover:border-transparent hover:bg-green-500 
                     hover:text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.8)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" 
                   fill="currentColor" class="w-5 h-5">
                <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.7 5.4 2 7.7L0 32l8.6-2.7c2.2 1.2 4.7 1.9 7.4 1.9 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.8c-2.4 0-4.6-.6-6.5-1.8l-.5-.3-5.1 1.6 1.7-5-.3-.5C4 20 3.4 18 3.4 16 3.4 9.4 9.4 3.4 16 3.4S28.6 9.4 28.6 16 22.6 28.6 16 28.6zm7.4-10.9c-.4-.2-2.3-1.1-2.6-1.2-.4-.2-.7-.2-1 .2-.3.4-1 1.2-1.2 1.5-.2.2-.4.3-.8.1s-1.5-.6-2.8-1.9c-1-1-1.7-2.1-1.9-2.5-.2-.4 0-.6.1-.8.1-.1.3-.4.4-.5.1-.1.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-1-2.4-1.4-3.2-.4-.9-.7-.8-1-.8h-.9c-.3 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 3s1.2 3.5 1.4 3.7c.2.2 2.3 3.6 5.6 5 3.3 1.4 3.3.9 3.9.8.6-.1 2-1 2.3-1.9.3-.9.3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z"/>
              </svg>
              Hubungi via WhatsApp
          </a>`
        );
      }

      addMessage({ text: reply, sender: "bot", timestamp: now });
    } catch {
      addMessage({
        text: "⚠️ Terjadi error saat menghubungi AI. Coba beberapa saat lagi.",
        sender: "bot",
        timestamp: now,
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/90 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)] p-4">
      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-3 pr-1 space-y-3 no-scrollbar"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[80%] p-3 text-sm shadow-md text-white flex flex-col gap-1
              ${
                m.sender === "user"
                  ? "ml-auto bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl"
                  : "mr-auto bg-gradient-to-r from-gray-900 to-black rounded-xl"
              }`}
          >
            {/* Isi pesan */}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: m.text }}
            />

            {/* Timestamp */}
            {m.timestamp && (
              <span
                className={`self-end text-[10px] text-gray-400 ${
                  m.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {m.timestamp}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="w-full p-2 rounded-xl bg-black/60 text-white placeholder:text-white/40 
                     focus:outline-none focus:ring-2 focus:ring-white/50 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
          placeholder="Ketik pesan..."
        />
        <button
          onClick={handleSendMessage}
          className="px-4 rounded-xl bg-white/5 hover:bg-white/10 transition shadow-[0_0_10px_rgba(255,255,255,0.2)] text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
