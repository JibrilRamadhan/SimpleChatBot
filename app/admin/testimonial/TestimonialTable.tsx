"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  text: string
  href?: string
}

export default function TestimonialTable({ testimonials }: { testimonials: Testimonial[] }) {
  const [showForm, setShowForm] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [formData, setFormData] = useState<Testimonial>({
    id: 0,
    name: "",
    handle: "",
    avatar: "",
    text: "",
    href: "",
  })
  const [uploading, setUploading] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [notifyClass, setNotifyClass] = useState("opacity-0 -translate-y-10")

  useEffect(() => {
    if (notification) {
      setNotifyClass("opacity-0 -translate-y-10")
      const enterTimer = setTimeout(() => setNotifyClass("opacity-100 translate-y-0"), 50)
      const exitTimer = setTimeout(() => {
        setNotifyClass("opacity-0 -translate-y-10")
        setTimeout(() => {
          setNotification(null)
          window.location.reload()
        }, 300)
      }, 2000)

      return () => {
        clearTimeout(enterTimer)
        clearTimeout(exitTimer)
      }
    }
  }, [notification])

  // 📌 Upload ke Supabase via API
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const formDataFile = new FormData()
    formDataFile.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataFile,
      })

      const data = await res.json()
      if (data.url) {
        setFormData({ ...formData, avatar: data.url })
      }
    } catch (err) {
      console.error("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  // ✅ Create or Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = isEdit ? "PUT" : "POST"
    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setNotification(isEdit ? "✅ Testimonial berhasil diupdate!" : "✅ Testimonial berhasil ditambahkan!")
      setShowForm(false)
    }
  }

  // ❌ Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin hapus testimonial ini?")) return
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/testimonials/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      setNotification("🗑️ Testimonial berhasil dihapus")
    }
  }

  // ✏️ Open Edit Form
  const handleEdit = (t: Testimonial) => {
    setFormData(t)
    setIsEdit(true)
    setShowForm(true)
  }

  return (
    <div>
      {/* Notification Popup */}
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${
            notification.includes("dihapus") ? "bg-red-800" : "bg-green-800"
          } text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 transition-all duration-300 ease-in-out ${notifyClass}`}
        >
          <span>{notification}</span>
        </div>
      )}

      {/* Tombol Add */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">Testimonials</h3>
        <button
          onClick={() => {
            setFormData({ id: 0, name: "", handle: "", avatar: "", text: "", href: "" })
            setIsEdit(false)
            setShowForm(true)
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 hover:shadow-[0_0_12px_rgba(34,197,94,0.5)] transition-all duration-300"
        >
          ➕ Add Testimonial
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
        <table className="min-w-full text-sm divide-y divide-gray-700">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Avatar</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Handle</th>
              <th className="px-4 py-3 text-left font-medium">Text</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-gray-800 transition-colors duration-200">
                <td className="px-4 py-3">
                  <Image src={t.avatar} alt={t.name} width={40} height={40} className="rounded-full shadow-sm" />
                </td>
                <td className="px-4 py-3 text-white">{t.name}</td>
                <td className="px-4 py-3 text-white">{t.handle}</td>
                <td className="px-4 py-3 text-gray-400 truncate max-w-md">{t.text}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 hover:shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.5)] transition-all duration-300"
                  >
                    Delete
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
          <div className="bg-gray-900 p-6 rounded-2xl w-96 shadow-2xl border border-gray-700">
            <h3 className="text-lg font-bold mb-4 text-white">
              {isEdit ? "Edit Testimonial" : "Add Testimonial"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-green-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Handle"
                value={formData.handle}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-green-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
              />

              {/* Upload File ke Supabase */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-gray-300"
              />
              {uploading && <p className="text-sm text-gray-400">Uploading...</p>}
              {formData.avatar && (
                <div className="mt-2 flex justify-center">
                  <Image src={formData.avatar} alt="Preview" width={80} height={80} className="rounded-full border border-gray-700" />
                </div>
              )}

              <textarea
                placeholder="Text"
                value={formData.text}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-green-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              />
              <input
                type="text"
                placeholder="Href (opsional)"
                value={formData.href}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:border-green-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-full bg-gray-600 text-white hover:bg-gray-500 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-500 hover:shadow-[0_0_12px_rgba(34,197,94,0.5)] transition-all"
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
