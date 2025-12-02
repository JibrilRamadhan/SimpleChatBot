"use client";

import ChatBox from "../customer-services/ChatBox";

export default function CustomerServicePage() {
  return (
    <div className="mt-24 min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">Customer Service</h1>
      <div className="w-full max-w-2xl h-[600px] bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-4">
        <ChatBox />
      </div>
    </div>
  );
}
