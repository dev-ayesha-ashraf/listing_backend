import { NextRequest } from "next/server";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";
import path from "path";
import { readableStreamToReadable } from "./readableStreamToReadable";
import Category from "../models/Category";
import connectDB from "./db";

export async function nextRequestToIncomingMessage(
  webStream: ReadableStream<Uint8Array>,
  headersObj: Record<string, string>,
  method: string
): Promise<IncomingMessage> {
  const body = await readableStreamToReadable(webStream);
  const incoming = body as IncomingMessage;
  incoming.headers = headersObj;
  incoming.method = method;
  return incoming;
}

export async function parseFormAppRouter(
  req: NextRequest,
  folderOverride?: string
): Promise<{ fields: Fields; files: Files; categorySlug: string }> {
  await connectDB();

  if (!req.body) throw new Error("No request body");

  const [stream1, stream2] = req.body.tee();

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });
  const method = req.method;

  // Step 1: Parse fields to get categoryId
  const tempReq = await nextRequestToIncomingMessage(stream1, headers, method);
  const tempForm = formidable({ multiples: true });

  const fieldsOnly = await new Promise<{ fields: Fields }>((resolve, reject) => {
    tempForm.parse(tempReq, (err, fields) => {
      if (err) reject(err);
      else resolve({ fields });
    });
  });

  let folderName = folderOverride || "misc";

  if (!folderOverride) {
    const categoryId = Array.isArray(fieldsOnly.fields.categoryId)
      ? fieldsOnly.fields.categoryId[0]
      : fieldsOnly.fields.categoryId;

    if (!categoryId) throw new Error("Missing categoryId in form");

    const categoryDoc = await Category.findById(categoryId).lean();
    if (!categoryDoc || !categoryDoc.name)
      throw new Error("Invalid categoryId or category not found");

    const rawCategory = categoryDoc.name;
    folderName = rawCategory.replace(/[^a-zA-Z0-9_-]/g, "");
  }

  const uploadDir = path.join(process.cwd(), "public/uploads", folderName);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fullReq = await nextRequestToIncomingMessage(stream2, headers, method);
  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(fullReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files, categorySlug: folderName });
    });
  });
}
