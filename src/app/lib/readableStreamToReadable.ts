// lib/readableStreamToReadable.ts
import { Readable } from "stream";

export async function readableStreamToReadable(webStream: ReadableStream<Uint8Array>): Promise<Readable> {
  const reader = webStream.getReader();

  return Readable.from((async function* () {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  })());
}

