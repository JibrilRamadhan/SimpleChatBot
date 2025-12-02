"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { useChat } from "../components/context/ChatContext";
import { useRouter, usePathname } from "next/navigation";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages } = useChat();
  const router = useRouter();
  const pathname = usePathname();

  // 🚨 Hooks selalu dipanggil (tidak ada return di atas)
  useEffect(() => {
    if (messages.length === 5 && isOpen) {
      // Bisa diganti dengan toast biar lebih bagus
      alert(
        "⚠️ Anda sudah mengirim lebih dari 5 pesan. Silakan lanjut ke halaman Customer Service penuh."
      );
      router.push("/customer-services");
    }
  }, [messages, isOpen, router]);

  // ✅ lakukan pengecekan di return, bukan di atas
  if (pathname === "/customer-services") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-80 h-[420px] bg-black/80 backdrop-blur-lg 
                       border border-white/20 rounded-2xl 
                       shadow-[0_0_25px_rgba(255,255,255,0.3)] 
                       p-4 flex flex-col"
          >
            <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
              <h3 className="text-lg font-semibold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]">
                Customer Support
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            <div className="flex-1">
              <ChatBox />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chatbutton"
            onClick={() => setIsOpen(true)}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 20px rgba(255,255,255,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 flex items-center justify-center 
                       rounded-full bg-black text-white 
                       border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)] 
                       transition-all duration-300"
          >
            💬
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
