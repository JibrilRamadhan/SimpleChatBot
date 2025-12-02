// app/layout.tsx
import "../styles/globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import "aos/dist/aos.css";
import TransitionProvider from "@/app/components/transition-provider";
import CustomerSupportWrapper from "@/app/customer-services/wrapper-chat";
import { ChatProvider } from "@/app/components/context/ChatContext";

export const metadata = {
  title: "Printing Co.",
  description: "High-quality printing & packaging solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white font-sans no-scrollbar">
        {/* Global Chat Context agar semua page & komponen share data chat */}
        <ChatProvider>
          <Navbar />

          {/* Transition animation antar page */}
          <TransitionProvider>
            <main className="min-h-screen">{children}</main>
          </TransitionProvider>

          <Footer />

          {/* Floating Chat (Customer Service) */}
          <CustomerSupportWrapper />
        </ChatProvider>
      </body>
    </html>
  );
}
