import { bench, describe } from "vitest";
import { removeAccents, sortAlphabetically, countCharacters } from "../src";

const txt = "ação informação conexão árvore coração São Paulo";

describe("text bench", () => {
  bench("removeAccents", () => {
    removeAccents(txt);
  });

  bench("sortAlphabetically", () => {
    sortAlphabetically("c\na\nb");
  });

  bench("countCharacters", () => {
    countCharacters(txt);
  });
});
