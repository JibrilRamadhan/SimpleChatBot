"use client"

import { useEffect, useState } from "react"
import PortfolioTable from "./PortfolioTable"

interface Portfolio {
  id: number
  title: string
  description: string
  image: string
  category: string
}

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/portfolios")
      .then((res) => res.json())
      .then((data) => setPortfolios(data))
      .catch((err) => console.error("Error fetching portfolios:", err))
  }, [])

  return (
    <div>
      
      <PortfolioTable portfolios={portfolios} />
    </div>
  )
}
