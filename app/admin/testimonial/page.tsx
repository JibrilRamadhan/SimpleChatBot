"use client"

import { useEffect, useState } from "react"
import TestimonialTable from "./TestimonialTable"

interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  text: string
  href?: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err))
  }, [])

  return (
    <div>
      
      <TestimonialTable testimonials={testimonials} />
    </div>
  )
}
