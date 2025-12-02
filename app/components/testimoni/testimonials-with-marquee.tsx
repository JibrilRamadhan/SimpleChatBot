import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "../testimoni/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-4 sm:py-24 md:py-32 px-0",
        className
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        {/* Title */}
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        {/* Testimonials infinite scroll */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee gap-6">
            {/* set pertama */}
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={`a-${i}`} {...testimonial} />
            ))}
            {/* set kedua (duplikat) */}
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={`b-${i}`} {...testimonial} />
            ))}
          </div>

          {/* Gradient fade kiri-kanan */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background" />
        </div>
      </div>
    </section>
  )
}
