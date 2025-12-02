// app/api/pricing/update/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const pin = req.headers.get("x-admin-pin") || "";
  if (pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  // body should contain new pricing object (full replace)
  const pricingPath = path.join(process.cwd(), "data", "pricing.json");
  await fs.writeFile(pricingPath, JSON.stringify(body, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
