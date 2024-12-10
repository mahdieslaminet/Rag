import { promiseExec } from "./exec";

async function main() {
  try {
    await promiseExec("cd dataset; rm -r texts;");
  } catch {}

  const images = (
    (await promiseExec("cd dataset; cp -r images texts; cd texts; ls")) as string
  )
    .split("\n")
    .filter((el) => Boolean(el?.trim()));
  for (const image of images) {
    await promiseExec(
      `cd dataset; cd texts; tesseract ${image} ${image
        .replace("image", "text")
        .replace(".png", "")} -l fas --oem 1 --dpi 300 --psm 6; rm ${image}`
    );
  }
}

main().catch((e) => {
  console.error(e);
  promiseExec("cd dataset; rm -r texts")
    .then(() => process.exit(1))
    .catch(() => process.exit(1));
});
