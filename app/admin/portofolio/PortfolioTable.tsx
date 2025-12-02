"use client"

import { useState } from "react"
import Image from "next/image"

interface Portfolio {
  id: number
  title: string
  description: string
  image: string
  category: string
}

export default function PortfolioTable({ portfolios }: { portfolios: Portfolio[] }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<Portfolio>({
    id: 0,
    title: "",
    description: "",
    image: "",
    category: "",
  })
  const [isEdit, setIsEdit] = useState(false)

  // Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isEdit ? "PUT" : "POST"
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/portfolios/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/portfolios`

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      alert(isEdit ? "✅ Portfolio berhasil diupdate!" : "✅ Portfolio berhasil ditambahkan!")
      setShowForm(false)
      window.location.reload()
    }
  }

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus portfolio ini?")) return
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/portfolios/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      alert("🗑️ Portfolio berhasil dihapus")
      window.location.reload()
    }
  }

  // Open Edit Form
  const handleEdit = (p: Portfolio) => {
    setFormData(p)
    setIsEdit(true)
    setShowForm(true)
  }

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold text-gray-100 tracking-wide">📁 Portfolios</h3>
        <button
          onClick={() => {
            setFormData({ id: 0, title: "", description: "", image: "", category: "" })
            setIsEdit(false)
            setShowForm(true)
          }}
          className="px-5 py-2 rounded-full font-medium bg-gray-800 text-gray-100 
            hover:bg-gray-700 hover:shadow-[0_0_12px_rgba(34,197,94,0.4)] 
            transition-all duration-300"
        >
          ➕ Add Portfolio
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-700 shadow-lg shadow-black/30">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-800/80 text-gray-300 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {portfolios.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-800/50 transition-colors duration-300"
              >
                <td className="px-6 py-3">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={60}
                      height={40}
                      className="rounded-md border border-gray-700 object-cover"
                    />
                  ) : (
                    <div className="w-[60px] h-[40px] flex items-center justify-center bg-gray-700 text-gray-400 rounded-md text-xs">
                      No Img
                    </div>
                  )}
                </td>

                <td className="px-6 py-3 font-medium">{p.title}</td>
                <td className="px-6 py-3 text-sm text-green-400">{p.category}</td>
                <td className="px-6 py-3 text-gray-400 max-w-lg truncate">{p.description}</td>
                <td className="px-6 py-3 text-center space-x-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-4 py-2 rounded-full text-sm font-medium 
                      bg-gray-800 text-gray-200 
                      hover:bg-blue-600 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] 
                      transition-all duration-300"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-4 py-2 rounded-full text-sm font-medium 
                      bg-gray-800 text-gray-200 
                      hover:bg-red-600 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] 
                      transition-all duration-300"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
    {showForm && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-gray-900 p-8 rounded-2xl w-[400px] shadow-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-gray-100">
            {isEdit ? "✏️ Edit Portfolio" : "➕ Add Portfolio"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 
                focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-gray-100"
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />

            {/* Category */}
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 
                focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-gray-100"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />

            {/* Upload Image */}
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700 text-gray-300"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const form = new FormData()
                form.append("file", file)

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: form,
                })
                const data = await res.json()
                if (data.url) {
                  setFormData({ ...formData, image: data.url })
                }
              }}
            />

            {/* Preview Image */}
            {formData.image ? (
            <div className="mt-3 flex justify-center">
              <Image
                src={formData.image}
                alt="Preview"
                width={200}
                height={120}
                className="rounded-md border border-gray-700 shadow-md object-cover"
              />
            </div>
              ) : (
                <div className="mt-3 flex w-[200px] h-[120px] bg-gray-800 border border-gray-700 rounded-md text-gray-500 items-center justify-center">
                  No Preview
                </div>
              )}


            {/* Description */}
            <textarea
              placeholder="Description"
              value={formData.description}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 
                focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-gray-100 min-h-[100px]"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-full font-medium bg-gray-700 text-gray-200 
                  hover:bg-gray-600 hover:shadow-[0_0_10px_rgba(156,163,175,0.4)] 
                  transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-full font-medium text-white 
                  bg-green-600 hover:bg-green-500 
                  hover:shadow-[0_0_12px_rgba(34,197,94,0.5)] 
                  transition-all duration-300"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
  )
}
