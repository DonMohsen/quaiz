export function getTextDirection(text: string): "rtl" | "ltr" {
  if (!text) return "ltr";

  // Take the first 20 characters (including spaces/punctuation)
  const snippet = text.slice(0, 20);

  for (let i = 0; i < snippet.length; i++) {
    const char = snippet[i];
    // Unicode ranges for RTL scripts (Persian, Arabic, Hebrew, etc)
    if (char.match(/[\u0591-\u08FF\uFB1D-\uFDFD\uFE70-\uFEFC]/)) {
      return "rtl";
    }
  }

  return "ltr";
}
