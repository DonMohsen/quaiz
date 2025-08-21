// utils/getTextDirection.ts
export function getTextDirection(text: string): "rtl" | "ltr" {
  if (!text) return "ltr";

  // Take only the first 20 meaningful characters
  const snippet = text.replace(/\s/g, "").slice(0, 20);

  for (let i = 0; i < snippet.length; i++) {
    const char = snippet[i];
    // Unicode ranges for RTL scripts (Persian, Arabic, Hebrew, etc)
    if (char.match(/[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/)) {
      return "rtl";
    }
  }

  // If no RTL char found in first 20, assume LTR
  return "ltr";
}
