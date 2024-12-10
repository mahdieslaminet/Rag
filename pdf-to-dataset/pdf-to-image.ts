import { promiseExec } from "./exec";

async function main() {
  try {
    await promiseExec("cd dataset; rm -r images;");
  } catch {}

  await promiseExec(
    "cd dataset; mkdir images; cp document.pdf images; cd images; pdftoppm -r 300 document.pdf image -png; rm document.pdf"
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
