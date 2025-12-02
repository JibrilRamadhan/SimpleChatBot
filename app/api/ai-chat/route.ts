import { NextResponse } from "next/server";
import OpenAI from "openai";
import pricingData from "@/data/pricing.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Kamu adalah customer service ramah dari Indy Design dan Web ini di ciptakan oleh Tuan Raden Jibril
Jawablah dalam Bahasa Indonesia dengan singkat, jelas, dan sopan.Jika user bertanya tentang cara menghubungi / kontak / kirim pesan,
jawablah secara singkat lalu tambahkan tag khusus [WA_LINK] di akhir.

Gunakan data harga berikut hanya sebagai **ESTIMASI**: ${JSON.stringify(pricingData)}

⚠️ Aturan:
- Jika pertanyaan tentang harga, produk, biaya → sebutkan estimasi lalu tambahkan kalimat:
  "Harga di atas hanya estimasi dan dapat berubah. Untuk info lebih lanjut klik tombol berikut: [WA_LINK]"
- Jika pertanyaan lain (sapaan, developer, info umum, dll) → jawab normal, **jangan** tambahkan disclaimer harga.
          `,
        },
        { role: "user", content: message },
      ],
      temperature: 0.6,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content || "Maaf, tidak ada jawaban.";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI Error:", err);
    return NextResponse.json(
      { reply: "⚠️ Terjadi error saat menghubungi AI. Coba beberapa saat lagi." },
      { status: 500 }
    );
  }
}
