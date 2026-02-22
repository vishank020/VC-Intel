import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string" || !url.startsWith("http")) {
      return NextResponse.json(
        { error: "A valid public company website URL is required" },
        { status: 400 }
      );
    }

    // 1. Fetch the public homepage
    const fetchRes = await fetch(url, {
      headers: {
        "User-Agent":
          "VC-Intel-Enrich/1.0 (take-home assignment; non-commercial research use)",
      },
      redirect: "follow",
      // no credentials, no cookies → safe & public only
    });

    if (!fetchRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch website: ${fetchRes.statusText}` },
        { status: fetchRes.status }
      );
    }

    const html = await fetchRes.text();

    // Very simple HTML → text cleaning (good enough for MVP)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 32000); // keep under ~30k tokens

    if (textContent.length < 300) {
      return NextResponse.json(
        { error: "Insufficient readable content on page" },
        { status: 400 }
      );
    }

    // 2. Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // 3. Structured extraction prompt
    const prompt = `
You are a venture capital analyst. From the website content below, extract exactly the following fields:

Return **ONLY** valid JSON — no explanations, no markdown, no extra text.

{
  "summary": "1–2 concise sentences summarizing what the company does",
  "whatTheyDo": ["3–6 short bullet points describing core products, services or value proposition"],
  "keywords": ["5–10 relevant industry, technology or thematic keywords"],
  "derivedSignals": ["2–4 inferred business signals, examples: 'Careers page exists → actively hiring', 'Recent blog post → content is active', 'Changelog section → product iteration ongoing'"],
  "sources": [
    {
      "url": "${url}",
      "timestamp": "${new Date().toISOString()}"
    }
  ]
}

Website content:
${textContent}
`;

    const result = await model.generateContent(prompt);
    const rawResponse = result.response.text();

    let parsed;
    try {
      parsed = JSON.parse(rawResponse);
    } catch (e) {
      console.error("Gemini did not return valid JSON:", rawResponse);
      return NextResponse.json(
        { error: "AI model returned invalid format" },
        { status: 500 }
      );
    }

    // Minimal validation
    if (
      typeof parsed.summary !== "string" ||
      !Array.isArray(parsed.whatTheyDo) ||
      !Array.isArray(parsed.sources)
    ) {
      return NextResponse.json(
        { error: "Incomplete extraction from AI model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ enrichment: parsed });
  } catch (err: any) {
    console.error("Enrichment error:", err);
    return NextResponse.json(
      { error: "Failed to enrich company – please try again" },
      { status: 500 }
    );
  }
}