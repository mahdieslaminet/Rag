import { join } from "path";
import { readFile, writeFile } from "fs/promises";

import { promiseExec } from "./exec";
import { normalizeText } from "./normalizer";

async function main() {
  try {
    await promiseExec("cd dataset; rm text.txt;");
  } catch {}

  const texts = ((await promiseExec("cd dataset; cd texts; ls")) as string)
    .split("\n")
    .filter((el) => Boolean(el?.trim()));

  const textsArray = await Promise.all(
    texts.map(async (txt) =>
      normalizeText(
        await readFile(join(__dirname, "./dataset/texts", txt), "utf8")
      )
    )
  );

  const doc = normalizeText(textsArray.join(" "));
  await writeFile(join(__dirname, "./dataset/document.txt"), doc, "utf8");

  try {
    await promiseExec("cd dataset; rm -r images;");
    await promiseExec("cd dataset; rm -r texts;");
  } catch {}
}

main().catch((e) => {
  console.error(e);
});
