import actorApi from "@/features/actors/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ actorId: string }> }
) {
  const { actorId } = await params;

  const data = await actorApi.fetchActorDetailsData(actorId);
  return NextResponse.json(data);
}
