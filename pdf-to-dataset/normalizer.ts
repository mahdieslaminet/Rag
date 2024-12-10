import {
  halfSpace,
  digitsArToEn,
  digitsFaToEn,
} from "@persian-tools/persian-tools";

export function normalizeText(text: string) {
  text = text.replace(/[إأآا]/g, "ا");

  text = text.replace(/ي/g, "ی");

  text = text.replace(/ك/g, "ک");
  text = text.replace(/،/g, "");

  text = text.replace(/[!"#$%&'()*+,\-./:;<=>?@\[\\\]\^_`{|}~]/g, "");

  text = text.replace(/[\u0610-\u061A\u064B-\u0652\u065F\u0670]/g, "");
  text = text.replace(/\u200E/g, "");
  text = text.replace(/\u200F/g, "");

  text = text.replace(/\s+/g, " ").trim();

  text = digitsArToEn(text);
  text = digitsFaToEn(text);
  text = halfSpace(text);

  return text;
}
