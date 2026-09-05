import { NextResponse } from "next/server";
import { getLoveNotes } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getLoveNotes();
    return NextResponse.json(
      {
        success: true,
        ...data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("[API/reviews] Unexpected error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Love Notes are currently being updated. Please check back soon.",
      },
      { status: 500 }
    );
  }
}
