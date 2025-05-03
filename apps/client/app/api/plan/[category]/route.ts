import { NextResponse } from "next/server";
import prisma from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/authOptions";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { category } = await params;
    const plans = await prisma.plan.findMany({
      where: { category },
      orderBy: { price: "asc" },
    });

    if (!plans || plans.length === 0) {
      return NextResponse.json(
        { error: "No plans found for this category" },
        { status: 404 }
      );
    }
    return NextResponse.json(plans);
  } catch (err) {
    console.error("Error fetching plans by category:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
