import { NextResponse } from "next/server";
import { getScheduleData, saveScheduleData, ScheduleData, SessionItem } from "@/lib/schedule";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getScheduleData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read schedule data:", error);
    return NextResponse.json(
      { error: "Failed to load schedule data" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as Partial<ScheduleData>;
    const current = await getScheduleData();

    const updated: ScheduleData = {
      heroStats: Array.isArray(body.heroStats) ? body.heroStats : current.heroStats,
      sessions: Array.isArray(body.sessions) ? body.sessions : current.sessions,
    };

    await saveScheduleData(updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update schedule data:", error);
    return NextResponse.json(
      { error: "Failed to update schedule data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newSession = (await request.json()) as SessionItem;
    const current = await getScheduleData();

    const sessionWithId: SessionItem = {
      ...newSession,
      id: newSession.id || `session-${Date.now()}`,
    };

    const updated: ScheduleData = {
      ...current,
      sessions: [...current.sessions, sessionWithId],
    };

    await saveScheduleData(updated);
    return NextResponse.json(updated, { status: 201 });
  } catch (error) {
    console.error("Failed to add session:", error);
    return NextResponse.json(
      { error: "Failed to add session" },
      { status: 500 }
    );
  }
}
