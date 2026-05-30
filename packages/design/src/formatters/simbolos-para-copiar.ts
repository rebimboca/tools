const SYMBOLS: Record<string, string[]> = {
  geral: [
    "★", "☆", "✦", "✧", "✓", "✔", "✕", "✖", "✗", "❣",
    "❤", "♥", "♦", "♣", "♠", "✪", "❂", "❋", "❄", "⚡",
    "🔥", "✨", "🌟", "⭐", "✉", "✍", "☕", "✌", "⚓", "✈"
  ],
  moedas: [
    "$", "€", "£", "¥", "₿", "₽", "₹", "₩", "₫", "₭",
    "₮", "₯", "₰", "₦", "₱", "₲", "₪", "₵", "₸", "₺",
    "₼", "₾"
  ],
  matematico: [
    "∞", "≈", "≠", "≤", "≥", "±", "∑", "√", "π", "∫",
    "∂", "∆", "∏", "µ", "÷", "×", "°", "‰", "¼", "½",
    "¾", "¹", "²", "³", "ⁿ", "ƒ", "∝", "∧", "∨", "∩",
    "∪", "≡", "⊂", "⊃", "⊆", "⊇", "⊕", "⊗", "⊥", "⊿"
  ],
  setas: [
    "→", "←", "↑", "↓", "➔", "➜", "➘", "➙", "➚", "➛",
    "➜", "➝", "➞", "➟", "➠", "➡", "➢", "➣", "➤", "➥",
    "➦", "⇄", "⇆", "⇇", "⇈", "⇉", "⇊", "⇋", "⇌", "⇅",
    "⇦", "⇨", "⇧", "⇩", "⬀", "⬁", "⬂", "⬃", "⬄", "⬈",
    "⬉", "⬊", "⬋", "⬌", "⬍", "⇿", "⟳", "⟲", "↻", "↺"
  ],
  formas: [
    "■", "□", "▲", "△", "▼", "▽", "◆", "◇", "●", "○",
    "▪", "▫", "◀", "▶", "◣", "◢", "◤", "◥", "▰", "▱",
    "▵", "▿", "◃", "▹", "⬔", "⬕", "⬘", "⬙", "⬚", "⬝",
    "⬞"
  ],
  tecnologia: [
    "📁", "📂", "🔌", "⚙️", "🖥️", "💻", "📱", "💾", "🔒", "🔓",
    "🔔", "✉️", "📧", "📥", "📤", "📦", "🏷️", "📷", "🎥", "🎬",
    "🎤", "🎧", "🎨", "🎮", "🕹️", "🔋", "📶", "📡", "🔍", "🔎",
    "🛠️", "🔧", "🔨", "🚀", "🛸"
  ],
  clima: [
    "☀", "☁", "☂", "☃", "☄", "☼", "☽", "☾", "⚡", "❄",
    "🔥", "💧", "🌈", "🪐", "🌍", "🌎", "🌏", "🌑", "🌒", "🌓",
    "🌔", "🌕", "🌖", "🌗", "🌘"
  ],
  musica: [
    "♩", "♪", "♫", "♬", "♭", "♮", "♯", "𝄞", "𝄢", "𝄡",
    "🔇", "🔈", "🔉", "🔊", "🎵", "🎶", "🎙️", "📻", "🎷", "🎸",
    "🎹", "🎺", "🎻"
  ],
  jogos: [
    "♔", "♕", "♖", "♗", "♘", "♙", "♚", "♛", "♜", "♝",
    "♞", "♟", "♠", "♥", "♦", "♣", "♤", "♡", "♢", "♧",
    "🎲", "🎯", "🎳", "🧩", "👾"
  ],
  linhas: [
    "─", "━", "│", "┃", "┄", "┅", "┆", "┇", "┈", "┉",
    "┊", "┋", "┌", "┍", "┎", "┏", "┐", "┑", "┒", "┓",
    "└", "┕", "┖", "┗", "┘", "┙", "┚", "┛", "├", "┝",
    "┞", "┟", "┠", "┡", "┢", "┣", "┤", "┥", "┦", "┧",
    "┨", "┩", "┪", "┫", "┬", "┭", "┮", "┯", "┰", "┱",
    "┲", "┳", "┴", "┵", "┶", "┷", "┸", "┹", "┺", "┻",
    "┼", "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅",
    "╆", "╇", "╈", "╉", "╊", "╋"
  ],
  emojis_carinhas: [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸",
    "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️",
    "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡"
  ],
  emojis_gestos: [
    "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞",
    "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍",
    "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝",
    "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦵", "🦿", "🦶", "👂"
  ],
  emojis_animais: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
    "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒",
    "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇",
    "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜"
  ],
  emojis_comidas: [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐",
    "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑",
    "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🧅", "🧄", "🥔",
    "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🥞", "🧇",
    "🍕", "🍔", "🍟", "🌭", "🍿", "🍩", "🍪", "🎂", "🍰", "🍫"
  ],
  emojis_viagem: [
    "🚗", "🚕", "🚙", "🚌", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻",
    "🚚", "🚛", "🚜", "🛵", "🏍️", "🚲", "🛴", "🛹", "🚨", "✈️",
    "🚁", "🚀", "🛸", "⛵", "🛥️", "🚢", "⚓", "⛽", "🚧", "🗺️",
    "🗼", "🎪", "🎡", "🎢", "⛲", "⛱️", "🏖️", "🏔️", "🌋", "🏕️"
  ]
};

/**
 * Returns a list of copyable special symbols grouped by category.
 *
 * @param category - The symbol category to fetch.
 * @returns Array of symbol characters, or `null` if the category is not found.
 *
 * @see https://unicode.org/emoji/charts/full-emoji-list.html - Full Emoji List (Unicode CLDR)
 * @see https://www.unicode.org/standard/standard.html - The Unicode Standard (Official Consortium Portal)
 */
export function symbolsToCopy(category = "geral"): string[] | null {
  return SYMBOLS[category] ?? null;
}

/**
 * Busca por símbolos ou emojis em todas as categorias com base em um termo de pesquisa.
 *
 * Se a busca coincidir com o nome de uma categoria (ex: "comidas", "animais"),
 * retorna todos os símbolos dessa categoria. Caso contrário, faz uma busca por aproximação
 * nos nomes das categorias.
 *
 * @param termo - O termo de busca (ex: "moedas", "seta", "clima").
 * @returns Array de símbolos que correspondem à busca, ou `null` se nenhum for encontrado.
 *
 * @see https://unicode.org/emoji/charts/full-emoji-list.html - Unicode CLDR Emoji List
 *
 * @example
 * ```ts
 * searchSymbols("moeda"); // ["$", "€", "£", ...]
 * searchSymbols("clima"); // ["☀", "☁", "☂", ...]
 * ```
 */
export function searchSymbols(termo: string): string[] | null {
  if (typeof termo !== "string" || !termo.trim()) return null;

  const normalizedQuery = termo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Tenta encontrar uma correspondência exata ou parcial nas chaves das categorias
  const matchingCategories = Object.keys(SYMBOLS).filter((key) => {
    const normalizedKey = key
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    return normalizedKey.includes(normalizedQuery);
  });

  if (matchingCategories.length > 0) {
    const result: string[] = [];
    for (const cat of matchingCategories) {
      const symbols = SYMBOLS[cat];
      if (symbols) {
        result.push(...symbols);
      }
    }
    return result;
  }

  return null;
}

