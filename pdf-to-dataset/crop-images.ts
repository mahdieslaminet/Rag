import sharp from "sharp";
import { promiseExec } from "./exec";
import { join } from "path";

async function main() {
  const images = ((await promiseExec("cd dataset; cd images; ls")) as string)
    .split("\n")
    .filter((el) => Boolean(el?.trim()));
  for (const image of images) {
    const newImage = `${image.replace(".png", "")}-new.png`;
    const inpFilePath = join(__dirname, "./dataset/images", image);
    const outFilePath = join(__dirname, "./dataset/images", newImage);
    const metadata = await sharp(inpFilePath).metadata();
    await sharp(inpFilePath)
      .extract({
        left: 0,
        top: 0,
        width: metadata.width as number,
        height: (metadata.height as number) - 300,
      })
      .toFile(outFilePath);
    await promiseExec(
      `cd dataset; cd images; rm ${image}; mv ${newImage} ${image}`
    );
  }
}

main().catch((e) => {
  console.error(e);
});
