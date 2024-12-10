export function splitTextIntoChunks(
  text: string,
  chunkSize = 1000,
  overlap = 200
) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.trim().slice(start, end).trim());
    start += chunkSize - overlap;
  }

  return chunks;
}
