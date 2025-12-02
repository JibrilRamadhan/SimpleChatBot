"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Flower } from "lucide-react"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // 🎭 Animasi parallax gambar
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const imageY = useSpring(rawY, { stiffness: 70, damping: 20 })

  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const imageScale = useSpring(rawScale, { stiffness: 70, damping: 20 })

  const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const imageOpacity = useSpring(rawOpacity, { stiffness: 70, damping: 20 })

  // ✨ Parallax untuk teks & button
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <div
      ref={containerRef}
      className="relative isolate overflow-hidden text-white min-h-screen flex items-center"
    >
      {/* Background Glow Dekoratif */}
      <motion.div
        className="absolute -top-40 left-1/2 w-[500px] h-[500px] rounded-full bg-white/5 blur-[150px] -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-12 lg:px-8 relative z-10">
        {/* Konten Teks */}
        <motion.div
          className="max-w-2xl mt-8"
          style={{ y: textY }} // 👈 parallax text
        >
            {/* Label */}
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 mb-4"
            >
            <Flower className="h-5 w-5 text-white" />
            <p className="text-sm font-semibold text-white tracking-wider">
              Creative Print & Digital
            </p>
            </motion.div>

            {/* Title dengan shimmer effect */}
            <motion.h1
            initial={{ opacity:0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.9, ease:"easeOut" }}
            viewport={{ once:true }}
            className="mt-4 text-3xl sm:text-7xl lg:text-8xl font-extrabold leading-tight"
            >
            <span className="bg-gradient-to-r from-white via-gray-400 to-white bg-clip-text text-transparent animate-text-shimmer">
              Design Solution 
            </span>
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
            initial={{ opacity:0, y:30 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.2, ease:"easeOut" }}
            viewport={{ once:true }}
            className="mt-6 text-lg sm:text-xl leading-9 text-gray-300"
            >
            Elevate your brand with innovative graphic design and high-quality printing services. We deliver creative solutions for digital and print media to help your business stand out and make a lasting impression.
            </motion.p>

          {/* Tombol */}
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ y: buttonY }} // 👈 parallax button
          >
            <a
              href="https://www.flowersandsaints.com.au"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center px-7 py-3 rounded-full text-black font-semibold shadow-lg bg-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              Explore Our Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#about"
              className="relative inline-flex items-center px-7 py-3 rounded-full text-white border border-white/30 font-medium hover:bg-white/10 hover:scale-105 transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>

        {/* Bagian Gambar */}
        <motion.div
          className="mt-16 lg:mt-0 lg:ml-auto relative max-w-xl"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creative-SW6QDQbcVuwPgb6a2CYtYmRbsJa4k1.png"
            alt="Flowers & Saints Concept"
            width={400}
            height={400}
            className="w-full"
            style={{
              y: imageY,
              scale: imageScale,
              opacity: imageOpacity,
            }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </div>
  )
}
