"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface Portfolio {
  id: number
  title: string
  description: string
  image: string
  category: string
}

export default function PortfolioSection() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/portfolios"
        )
        const data = await res.json()
        setPortfolios(data)
      } catch (error) {
        console.error("Error fetching portfolios:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="bg-black text-white py-20 text-center">
        <p className="text-gray-400">Loading portfolio...</p>
      </section>
    )
  }

  return (
    <section
      id="portfolio"
      className="bg-black text-white py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-5xl font-extrabold text-center mb-16 tracking-wider text-gray-100 uppercase"
        >
          Portfolio
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.3 }}
              className="group relative overflow-hidden rounded-xl shadow-2xl bg-black transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={800}
                height={600}
                className="object-cover w-full h-72 md:h-96 transition-all duration-500 group-hover:scale-110 group-hover:opacity-60"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                {item.category && (
                  <motion.span className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-widest">
                    {item.category}
                  </motion.span>
                )}
                <motion.h3 className="text-2xl font-bold text-gray-100 mb-3">
                  {item.title}
                </motion.h3>
                <motion.p className="text-base text-gray-300">
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
