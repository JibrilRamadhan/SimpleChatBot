'use client'

import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { TestimonialsSection } from "./testimonials-with-marquee"

// tipe data sesuai BE
interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  text: string
  href?: string
}

export default function TestimoniPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    })

    // fetch data dari BE
    fetch("http://localhost:5000/api/testimonials") 
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err))
  }, [])

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          data-aos="fade-up"
        >
          Dipercaya oleh Brand & Partner
        </h2>

        <p
          className="text-gray-400 max-w-2xl mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Indy Label berkolaborasi dengan berbagai toko printing besar untuk
          menciptakan desain packaging yang elegan dan modern.
        </p>

        <div className="relative" data-aos="fade-up" data-aos-delay="400">
          <TestimonialsSection
            title=""
            description=""
            testimonials={testimonials.map((t) => ({
              author: {
                name: t.name,
                handle: t.handle,
                avatar: t.avatar,
              },
              text: t.text,
              href: t.href || "#",
            }))}
          />
        </div>
      </div>
    </section>
  )
}
