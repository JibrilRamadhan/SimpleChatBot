import { TestimonialsSection } from "../testimoni/testimonials-with-marquee"

// ✅ export array data supaya bisa dipakai di file lain
export const testimonials = [
  {
    author: {
      name: "Ratna Sari",
      handle: "@indylabs",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    },
    text: "Indy Label membantu bisnis kami tampil profesional dengan desain packaging premium yang langsung menarik perhatian klien.",
    href: "#",
  },
  {
    author: {
      name: "Udin Pratama",
      handle: "@printco",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    text: "Kolaborasi dengan Indy Label mempercepat proses produksi cetak. Hasil desain konsisten, modern, dan sesuai tren.",
    href: "#",
  },
  {
    author: {
      name: "Sarah Wijayanto",
      handle: "@creativeid",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    },
    text: "Tim kreatif yang benar-benar memahami kebutuhan branding. Desain grafis mereka menaikkan citra brand kami.",
    href: "#",
  },
    {
    author: {
      name: "Rizky Aditya",
      handle: "@rizkyad",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Pelayanan cepat dan hasil cetak sangat memuaskan. Packaging desainnya benar-benar premium.",
    href: "#",
  },
  {
    author: {
      name: "Fajar Nugroho",
      handle: "@fajarnugroho",
      avatar:
        "https://images.unsplash.com/photo-1718900109613-457f76a456b2?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Sangat direkomendasikan untuk bisnis yang ingin tampil beda. Desain dan print sangat detail.",
    href: "#",
  },
  {
    author: {
      name: "Dimas Saputra",
      handle: "@dimassaputra",
      avatar:
        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Hasil print sangat tajam dan warna sesuai ekspektasi. Proses desain juga sangat komunikatif.",
    href: "#",
  },
  {
    author: {
      name: "Arif Maulana",
      handle: "@arifmaulana",
      avatar:
        "https://images.unsplash.com/photo-1544502062-f82887f03d1c?q=80&w=959&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Packaging custom yang saya pesan benar-benar unik dan eksklusif. Terima kasih Indy Label!",
    href: "#",
  },
  {
    author: {
      name: "Budi Santoso",
      handle: "@budisantoso",
      avatar:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Desain grafis dan hasil cetak sangat profesional. Proses pengiriman juga cepat dan aman.",
    href: "#",
  },
  {
    author: {
      name: "Yoga Pratama",
      handle: "@yogapratama",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    text: "Sangat puas dengan hasil desain dan print. Tim sangat responsif dan profesional.",
    href: "#",
  },
];


// ✅ contoh demo component lokal
export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by developers worldwide"
      description="Join thousands of developers who are already building the future with our AI platform"
      testimonials={testimonials}
    />
  )
}
