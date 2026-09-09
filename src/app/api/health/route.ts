import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "sortie-projects",
    timestamp: new Date().toISOString(),
  });
}
