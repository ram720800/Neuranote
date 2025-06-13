import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file uploaded" });
  }

  const arrayBuffer = await file.arrayBuffer();
  const loader = new PDFLoader(new Blob([arrayBuffer]));

  try {
    const docs = await loader.load();
    const text = docs
      .map((d) => d.pageContent)
      .join("\n")
      .trim();

    if (!text) {
      console.warn("No extractable text found in uploaded PDF.");
      return NextResponse.json({
        success: false,
        message: "No text could be extracted. Please upload a text-based PDF.",
      });
    }

    return NextResponse.json({ success: true, text });
  } catch (error) {
    console.error("LangChain PDFLoader failed", error);
    return NextResponse.json({ success: false, message: "Extraction failed" });
  }
}
