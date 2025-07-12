import { NextRequest } from "next/server";
import formidable, { Fields, Files } from "formidable";
import { IncomingMessage } from "http";
import fs from "fs";
import path from "path";
import { readableStreamToReadable } from "./readableStreamToReadable";

// Convert NextRequest to Node's IncomingMessage
export async function nextRequestToIncomingMessage(
  req: NextRequest
): Promise<IncomingMessage> {
  const webStream = req.body;
  if (!webStream) throw new Error("No request body");

  const body = await readableStreamToReadable(webStream);

  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  const incoming = body as IncomingMessage;
  incoming.headers = headers;
  incoming.method = req.method;

  return incoming;
}

// Main form parser for App Router
export async function parseFormAppRouter(
  req: NextRequest
): Promise<{ fields: Fields; files: Files }> {
  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    multiples: true,
    uploadDir: uploadDir,
    keepExtensions: true,
  });
  console.log(form);
  const incomingReq = await nextRequestToIncomingMessage(req);

  return new Promise((resolve, reject) => {
    form.parse(incomingReq, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
