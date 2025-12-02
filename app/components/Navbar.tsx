  "use client"

  import Link from "next/link"
  import { useState, useEffect } from "react"

  export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
      <header
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          scrolled
            ? "w-full max-w-6xl backdrop-blur-xl  shadow-2xl border border-white/30"
            : "w-full max-w-5xl backdrop-blur-xl bg-black/20 shadow-xl border border-white/20"
        } rounded-full`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-40 rounded-full pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-full opacity-30 pointer-events-none"></div>

        <div className="relative px-6 py-3 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/" prefetch
            className="group relative flex items-center space-x-3 transition-all duration-500 hover:scale-110"
          >
            <div className="relative">
              <img
                src="../img/logov2.png"
                alt="Design Graphic Logo"
                className="w-[60px] h-[59px] transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10 scale-150"></div>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            {[
              { href: "/services", label: "Services" },
              { href: "/portofolio", label: "Portfolio" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.href} prefetch
                href={item.href}
                className="group relative px-6 py-3 text-white font-medium text-sm tracking-wide transition-all duration-400 hover:text-white rounded-xl"
              >
                <span className="relative z-10">{item.label}</span>

                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl"></div>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-4/5 transition-all duration-500 rounded-full"></div>

                <div className="absolute inset-0 border border-transparent group-hover:border-white/30 transition-all duration-400 rounded-xl"></div>
              </Link>
            ))}
          </nav>

          <Link
            href="/customer-services"
            className="group relative px-8 py-3 bg-black/50 text-white font-bold text-sm rounded-full shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500 hover:scale-105 overflow-hidden border border-white/20 backdrop-blur-sm"
          >
            <span className="relative z-10 tracking-wide">Need Help?</span>

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
          </Link>

          <button className="md:hidden p-3 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/10 rounded-xl hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2/5 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent animate-pulse"></div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </header>
    )
  }