import { NextResponse } from "next/server";
import { getGitlabActivity } from "@/lib/gitlab";

export const revalidate = 3600;

export async function GET() {
  try {
    const activity = await getGitlabActivity();
    return NextResponse.json(activity, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load GitLab activity";
    console.error("[gitlab/activity]", message);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
