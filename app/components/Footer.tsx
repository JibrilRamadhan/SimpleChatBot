"use client"
import { motion } from "framer-motion"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
}

const socialVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 10 },
  },
}

const backgroundVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 2, ease: "easeOut" as const },
  },
}

// Footer data
const footerData = {
  sections: [
    { title: "About", links: ["Home", "Projects", "Our Mission", "Contact Us"] },
    { title: "Education", links: ["News", "Learn", "Certification", "Publications"] },
    { title: "Services", links: ["Web Design", "Development", "Consulting", "Support"] },
    { title: "Resources", links: ["Blog", "Documentation", "Community", "Help Center"] },
  ],
  title: "Design Graphic",
  subtitle: "Creative solutions for your business",
  copyright: "©2025 All rights reserved",
}

const NavSection = ({ title, links, index }: { title: string; links: string[]; index: number }) => (
  <motion.div variants={itemVariants} className="flex flex-col gap-2">
    <motion.h3
      variants={itemVariants}
      className="mb-2 uppercase text-white/60 text-xs font-semibold tracking-wider border-b border-white/10 pb-1 hover:text-white hover:text-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
    >
      {title}
    </motion.h3>
    {links.map((link, linkIndex) => (
      <motion.a
        key={linkIndex}
        variants={linkVariants}
        href="#"
        whileHover={{
          x: 8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="text-white/70 hover:text-white hover:text-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 font-sans text-xs md:text-sm group relative"
      >
        {link}
      </motion.a>
    ))}
  </motion.div>
)

export default function StickyFooter() {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-2xl py-8 md:py-14 px-4 md:px-12 border-t border-white/10 relative overflow-hidden">

      {/* Background */}
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="absolute top-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"
      />
      <motion.div
        variants={backgroundVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="absolute bottom-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"
      />

      {/* Navigation */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-20">
          {footerData.sections.map((section, index) => (
            <NavSection key={section.title} title={section.title} links={section.links} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Bottom */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end relative z-10 gap-4 md:gap-6 mt-6"
      >
       <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            className="text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[6vw] leading-[0.8] font-serif bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent cursor-default"
          >
            {footerData.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center gap-3 md:gap-4 mt-3 md:mt-4"
          >
            <motion.div
              className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-white to-gray-200"
              animate={{
                scaleX: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="text-white/60 text-xs md:text-sm font-sans hover:text-white hover:text-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              {footerData.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} className="text-left md:text-right">
          <motion.p variants={linkVariants} className="text-white/60 text-xs md:text-sm mb-2 md:mb-3">
            {footerData.copyright}
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </footer>
  )
}