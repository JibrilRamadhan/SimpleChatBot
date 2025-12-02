"use client"

import { useRef, useEffect, useState } from "react"
import emailjs from "@emailjs/browser"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ContactCard } from "../components/contact/contact-card"
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react"
import { Input } from "../components/contact/ui/input"
import { Button } from "../components/contact/ui/button"
import { Label } from "../components/contact/ui/label"
import { Textarea } from "../components/contact/ui/textarea"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.current) return
    emailjs
      .sendForm(
        "service_ensuye8", // Service ID
        "template_ewywqwl", // Template ID
        form.current,
        "6-F0TVfDkUXzb-b3t" // Public Key
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully")
          form.current?.reset()
        },
        (error) => {
          console.error(error.text)
          setStatus("❌ Failed to send")
        }
      )
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Card animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )

      // Title animation
      gsap.fromTo(
        ".contact-title",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )

      // Description animation
      gsap.fromTo(
        ".contact-description",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )

      // Contact info items stagger
      gsap.fromTo(
        ".contact-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )

      // Form fields stagger (labels and inputs)
      gsap.fromTo(
        ".form-field",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )

      // Button animation
      gsap.fromTo(
        ".submit-button",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 1.0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "restart none restart reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center bg-black px-6 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
      <div className="mx-auto max-w-6xl w-full">
        <div ref={cardRef}>
          <ContactCard
            title="Let’s Connect"
            description="Ready to elevate your brand with premium design, printing, and packaging solutions? Reach out to us for creative consultation, custom print services, or seamless delivery for your business needs. Let’s bring your ideas to life—contact our team today!"
            className="bg-black border border-white"
            formSectionClassName="bg-black"
            contactInfo={[
              { icon: MailIcon, label: "Email", value: "PangeranDesign@gmail.com" },
              { icon: PhoneIcon, label: "Phone", value: "+62 85714186422" },
              {
                icon: MapPinIcon,
                label: "Address",
                value: "Jakarta, Indonesia",
                className: "col-span-2",
              },
            ]}
          >
            <form
              ref={form}
              onSubmit={sendEmail}
              className="w-full space-y-4"
            >
              <div className="form-field flex flex-col gap-2">
                <Label className="text-sm text-zinc-200">Name</Label>
                <Input
                  type="text"
                  name="user_name"
                  required
                  className="bg-black border-[#18181b] text-white"
                />
              </div>
              <div className="form-field flex flex-col gap-2">
                <Label className="text-sm text-zinc-200">Email</Label>
                <Input
                  type="email"
                  name="user_email"
                  required
                  className="bg-black border-[#18181b] text-white"
                />
              </div>
              <div className="form-field flex flex-col gap-2">
                <Label className="text-sm text-zinc-200">Phone</Label>
                <Input
                  type="tel"
                  name="user_phone"
                  className="bg-black border-[#18181b] text-white"
                />
              </div>
              <div className="form-field flex flex-col gap-2">
                <Label className="text-sm text-zinc-200">Message</Label>
                <Textarea
                  name="message"
                  required
                  className="bg-black border-[#18181b] text-white"
                />
              </div>
              <Button
                className="submit-button w-full bg-white/90 hover:bg-white text-black font-semibold shadow transition-all duration-200"
                type="submit"
              >
                Send Message
              </Button>
              {status && (
                <p className="text-sm text-center mt-2 text-zinc-300">
                  {status}
                </p>
              )}
            </form>
          </ContactCard>
        </div>
      </div>
    </section>
  )
}
