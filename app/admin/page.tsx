"use client"

import Link from "next/link"
import { GradientButton } from "../components/gradient-button"

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center mt-64">
      <h1 className="text-4xl font-extrabold text-white mb-4 tracking-wide">
        Welcome to Admin Dashboard
      </h1>
      <p className="text-gray-400 mb-12">
        Pilih menu di bawah untuk mengelola data.
      </p>

      <div className="flex gap-8">
        {/* Button Portfolios */}
        <GradientButton asChild>
          <Link href="/admin/portofolio">📁 Manage Portfolios</Link>
        </GradientButton>

        {/* Button Testimonials */}
        <GradientButton asChild variant="variant">
          <Link href="/admin/testimonial">💬 Manage Testimonials</Link>
        </GradientButton>
      </div>
    </div>
  )
}
