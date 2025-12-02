import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "../testimoni/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
            {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
            className={cn(
                "group relative flex flex-col flex-shrink-0",
                "rounded-3xl border border-white/10 overflow-hidden",
                "bg-black/50 backdrop-blur-md",
                "p-6 text-start shadow-sm shadow-white/5",
                "hover:border-white/20 hover:shadow-md hover:shadow-white/10",
                "transition-all duration-300 ease-in-out",
                "hover:scale-[1.02] hover:translate-y-[-2px]",
                "w-[280px] sm:w-[320px]",
                "cursor-pointer select-none",
                className
            )}
            data-aos="zoom-in"
            data-aos-delay="200"
>


      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-radial from-white/20 to-transparent blur-2xl" />

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <Avatar className="h-12 w-12 ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-medium text-white group-hover:text-white transition-colors duration-300">
            {author.name}
          </h3>
          <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
            {author.handle}
          </p>
        </div>
      </div>

      <p className="relative mt-4 text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
        “{text}”
      </p>
    </Card>
  )
}