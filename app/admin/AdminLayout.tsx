"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const links = [
    { href: "/admin", label: "🏠 Dashboard" },
    { href: "/admin/testimonial", label: "💬 Testimonials" },
    { href: "/admin/portofolio", label: "📁 Portfolios" },
  ]

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col shadow-xl">
        <h2 className="text-2xl font-bold mb-10 text-green-400">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-md transition-all duration-300 ${
                pathname === link.href
                  ? "bg-green-600 text-white shadow-md"
                  : "hover:bg-gray-700 hover:text-green-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Konten */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
