"use client";
import { motion } from "framer-motion";

export default function SectionWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`relative min-h-screen flex items-center justify-center ${className}`}
    >
      {children}

      {/* Gradient overlay bawah → transisi halus ke section berikutnya */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </motion.section>
  );
}
