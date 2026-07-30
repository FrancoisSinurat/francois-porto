import { NextResponse } from "next/server";
import { getGithubActivity } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const activity = await getGithubActivity();
    return NextResponse.json(activity, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load GitHub activity";
    console.error("[github/activity]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
