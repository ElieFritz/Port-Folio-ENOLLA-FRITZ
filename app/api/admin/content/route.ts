import { NextResponse } from "next/server";
import type { PortfolioContent } from "@/data/site-content";
import {
  getContentFilePath,
  getPortfolioContent,
  isPortfolioContent,
  savePortfolioContent
} from "@/lib/portfolio-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getPortfolioContent();

  return NextResponse.json({
    content,
    filePath: getContentFilePath()
  });
}

export async function PUT(request: Request) {
  let payload: unknown;

  try {
    payload = (await request.json()) as PortfolioContent;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  if (!isPortfolioContent(payload)) {
    return NextResponse.json(
      {
        error:
          "The content structure is invalid. Check contactEmail, homePageContent, and projects."
      },
      { status: 400 }
    );
  }

  const content = await savePortfolioContent(payload);

  return NextResponse.json({
    content,
    filePath: getContentFilePath()
  });
}
